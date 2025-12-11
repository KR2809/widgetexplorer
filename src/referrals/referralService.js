const DEFAULT_TIERS = [
  { referralsRequired: 0, label: 'On the waitlist' },
  { referralsRequired: 5, label: 'Unlock beta access' },
  { referralsRequired: 10, label: 'Priority onboarding' },
  { referralsRequired: 25, label: 'VIP perks' }
];

function clamp01(n) {
  if (Number.isNaN(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

function getTierProgress(referralsCount, tiers) {
  const sorted = [...tiers].sort((a, b) => a.referralsRequired - b.referralsRequired);

  let currentTierIndex = 0;
  for (let i = 0; i < sorted.length; i += 1) {
    if (referralsCount >= sorted[i].referralsRequired) currentTierIndex = i;
  }

  const currentTier = sorted[currentTierIndex];
  const nextTier = sorted[currentTierIndex + 1] ?? null;

  if (!nextTier) {
    return {
      currentTier,
      nextTier: null,
      progressToNextTier: 1,
      remainingToNextTier: 0
    };
  }

  const span = nextTier.referralsRequired - currentTier.referralsRequired;
  const progressed = referralsCount - currentTier.referralsRequired;

  return {
    currentTier,
    nextTier,
    progressToNextTier: clamp01(progressed / span),
    remainingToNextTier: Math.max(0, nextTier.referralsRequired - referralsCount)
  };
}

export class ReferralService {
  /**
   * @param {{ repository: any, baseUrl: string, tiers?: Array<{ referralsRequired: number, label: string }> }} config
   */
  constructor(config) {
    if (!config?.repository) throw new Error('repository is required');
    if (typeof config?.baseUrl !== 'string' || config.baseUrl.trim().length === 0) {
      throw new Error('baseUrl is required');
    }

    this.repository = config.repository;
    this.baseUrl = config.baseUrl.replace(/\/$/, '');
    this.tiers = config.tiers ?? DEFAULT_TIERS;
  }

  /**
   * Joins the waitlist and returns everything the UI needs to show the referral modal.
   *
   * @param {{ email: string, referralCode?: string | null }} input
   */
  async joinWaitlist(input) {
    const result = await this.repository.joinWaitlist(input);

    const stats = await this.repository.getWaitlistStats(result.userId);
    const leaderboard = await this.repository.getReferralLeaderboard(5);

    const referralLink = `${this.baseUrl}/?ref=${encodeURIComponent(stats.referralCode)}`;

    const tierProgress = getTierProgress(stats.referralsCount, this.tiers);

    return {
      userId: stats.userId,
      referralCode: stats.referralCode,
      referralLink,
      referralsCount: stats.referralsCount,
      position: stats.position,
      totalWaitlist: stats.totalWaitlist,
      totalReferrals: stats.totalReferrals,
      leaderboard,
      tiers: this.tiers,
      tierProgress,
      joinMeta: {
        wasCreated: result.wasCreated,
        referralWasApplied: result.referralWasApplied
      }
    };
  }

  async getDashboard(userId) {
    const stats = await this.repository.getWaitlistStats(userId);
    const leaderboard = await this.repository.getReferralLeaderboard(10);

    const referralLink = `${this.baseUrl}/?ref=${encodeURIComponent(stats.referralCode)}`;

    return {
      ...stats,
      referralLink,
      tiers: this.tiers,
      tierProgress: getTierProgress(stats.referralsCount, this.tiers),
      leaderboard
    };
  }
}

export { DEFAULT_TIERS };
