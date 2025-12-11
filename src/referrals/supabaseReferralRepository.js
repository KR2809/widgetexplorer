function assertString(name, value) {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${name} must be a non-empty string`);
  }
}

export class SupabaseReferralRepository {
  /**
   * @param {{ supabaseUrl: string, supabaseKey: string, schema?: string }} config
   */
  constructor(config) {
    assertString('supabaseUrl', config.supabaseUrl);
    assertString('supabaseKey', config.supabaseKey);

    this.supabaseUrl = config.supabaseUrl.replace(/\/$/, '');
    this.supabaseKey = config.supabaseKey;
    this.schema = config.schema ?? 'public';
  }

  async _rpc(fnName, body) {
    const url = `${this.supabaseUrl}/rest/v1/rpc/${fnName}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        apikey: this.supabaseKey,
        authorization: `Bearer ${this.supabaseKey}`,
        'content-type': 'application/json',
        accept: 'application/json',
        'accept-profile': this.schema,
        'content-profile': this.schema
      },
      body: JSON.stringify(body ?? {})
    });

    const text = await res.text();
    const payload = text ? JSON.parse(text) : null;

    if (!res.ok) {
      const message = payload?.message ?? payload?.error_description ?? payload?.error ?? text;
      throw new Error(`Supabase RPC ${fnName} failed: ${message}`);
    }

    return payload;
  }

  /**
   * @param {{ email: string, referralCode?: string | null }} input
   */
  async joinWaitlist(input) {
    const rows = await this._rpc('join_waitlist', {
      p_email: input.email,
      p_referral_code: input.referralCode ?? null
    });

    const row = Array.isArray(rows) ? rows[0] : rows;
    return {
      userId: row.user_id,
      referralCode: row.referral_code,
      referralsCount: row.referrals_count,
      position: row.position,
      wasCreated: row.was_created,
      referralWasApplied: row.referral_was_applied
    };
  }

  async getWaitlistStats(userId) {
    const rows = await this._rpc('get_waitlist_stats', { p_user_id: userId });
    const row = Array.isArray(rows) ? rows[0] : rows;

    return {
      userId: row.user_id,
      referralCode: row.referral_code,
      referralsCount: row.referrals_count,
      position: row.position,
      totalWaitlist: row.total_waitlist,
      totalReferrals: row.total_referrals
    };
  }

  async getReferralLeaderboard(limit = 10) {
    const rows = await this._rpc('get_referral_leaderboard', { p_limit: limit });
    return (rows ?? []).map((row) => ({
      userId: row.user_id,
      referralCode: row.referral_code,
      referralsCount: row.referrals_count,
      position: row.position
    }));
  }
}
