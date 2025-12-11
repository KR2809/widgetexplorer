/**
 * Repository interface documentation.
 *
 * Implementations should provide:
 *
 * - joinWaitlist({ email, referralCode })
 *     -> { userId, referralCode, referralsCount, position, wasCreated, referralWasApplied }
 *
 * - getWaitlistStats(userId)
 *     -> { userId, referralCode, referralsCount, position, totalWaitlist, totalReferrals }
 *
 * - getReferralLeaderboard(limit)
 *     -> [{ userId, referralCode, referralsCount, position }]
 */

export {}; // ESM marker
