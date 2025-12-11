import { generateReferralCode } from './referralCode.js';

function computeRankings(usersById) {
  const users = [...usersById.values()];
  users.sort((a, b) => {
    if (b.referralsCount !== a.referralsCount) return b.referralsCount - a.referralsCount;
    return a.createdAt - b.createdAt;
  });

  const positionById = new Map();
  users.forEach((u, idx) => positionById.set(u.id, idx + 1));
  return { users, positionById };
}

export class InMemoryReferralRepository {
  constructor() {
    /** @type {Map<string, any>} */
    this.usersById = new Map();
    /** @type {Map<string, string>} */
    this.userIdByEmail = new Map();
    /** @type {Map<string, string>} */
    this.userIdByReferralCode = new Map();

    /** @type {Set<string>} */
    this.refereeIdsThatWereCredited = new Set();

    this._idCounter = 0;
  }

  _newId() {
    this._idCounter += 1;
    return `user_${this._idCounter}`;
  }

  _ensureUniqueReferralCode() {
    for (let attempt = 0; attempt < 20; attempt += 1) {
      const code = generateReferralCode({ length: 6 });
      if (!this.userIdByReferralCode.has(code)) return code;
    }
    throw new Error('failed to generate unique referral code');
  }

  /**
   * @param {{ email: string, referralCode?: string | null }} input
   */
  async joinWaitlist(input) {
    const email = input.email?.trim().toLowerCase();
    const referralCode = input.referralCode?.trim() || null;

    if (!email) throw new Error('email is required');

    const existingId = this.userIdByEmail.get(email);
    if (existingId) {
      const { positionById } = computeRankings(this.usersById);
      const existing = this.usersById.get(existingId);
      return {
        userId: existing.id,
        referralCode: existing.referralCode,
        referralsCount: existing.referralsCount,
        position: positionById.get(existing.id),
        wasCreated: false,
        referralWasApplied: false
      };
    }

    const id = this._newId();
    const newUser = {
      id,
      email,
      createdAt: new Date(),
      referralCode: this._ensureUniqueReferralCode(),
      referredById: null,
      referralsCount: 0
    };

    this.usersById.set(id, newUser);
    this.userIdByEmail.set(email, id);
    this.userIdByReferralCode.set(newUser.referralCode, id);

    let referralWasApplied = false;
    if (referralCode) {
      const referrerId = this.userIdByReferralCode.get(referralCode);
      if (referrerId && referrerId !== id && !this.refereeIdsThatWereCredited.has(id)) {
        this.refereeIdsThatWereCredited.add(id);
        referralWasApplied = true;

        const referrer = this.usersById.get(referrerId);
        referrer.referralsCount += 1;
        newUser.referredById = referrerId;
      }
    }

    const { positionById } = computeRankings(this.usersById);

    return {
      userId: id,
      referralCode: newUser.referralCode,
      referralsCount: newUser.referralsCount,
      position: positionById.get(id),
      wasCreated: true,
      referralWasApplied
    };
  }

  async getWaitlistStats(userId) {
    const user = this.usersById.get(userId);
    if (!user) throw new Error('user not found');

    const { users, positionById } = computeRankings(this.usersById);

    const totalWaitlist = users.length;
    const totalReferrals = users.reduce((sum, u) => sum + u.referralsCount, 0);

    return {
      userId: user.id,
      referralCode: user.referralCode,
      referralsCount: user.referralsCount,
      position: positionById.get(user.id),
      totalWaitlist,
      totalReferrals
    };
  }

  async getReferralLeaderboard(limit = 10) {
    const { users, positionById } = computeRankings(this.usersById);

    return users.slice(0, Math.max(1, limit)).map((u) => ({
      userId: u.id,
      referralCode: u.referralCode,
      referralsCount: u.referralsCount,
      position: positionById.get(u.id)
    }));
  }
}
