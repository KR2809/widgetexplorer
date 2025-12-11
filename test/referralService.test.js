import test from 'node:test';
import assert from 'node:assert/strict';

import { InMemoryReferralRepository } from '../src/referrals/inMemoryReferralRepository.js';
import { ReferralService } from '../src/referrals/referralService.js';

test('ReferralService: applies referral exactly once and ignores duplicates', async () => {
  const repo = new InMemoryReferralRepository();
  const service = new ReferralService({ repository: repo, baseUrl: 'https://widgetexplorer.com' });

  const referrer = await service.joinWaitlist({ email: 'a@example.com' });
  assert.equal(referrer.referralsCount, 0);

  const referee1 = await service.joinWaitlist({ email: 'b@example.com', referralCode: referrer.referralCode });
  assert.equal(referee1.joinMeta.referralWasApplied, true);

  const referrerAfter = await service.getDashboard(referrer.userId);
  assert.equal(referrerAfter.referralsCount, 1);

  // Duplicate join by same email should not increment again.
  const refereeDuplicate = await service.joinWaitlist({ email: 'b@example.com', referralCode: referrer.referralCode });
  assert.equal(refereeDuplicate.joinMeta.wasCreated, false);

  const referrerAfterDup = await service.getDashboard(referrer.userId);
  assert.equal(referrerAfterDup.referralsCount, 1);
});

test('ReferralService: referral link format', async () => {
  const repo = new InMemoryReferralRepository();
  const service = new ReferralService({ repository: repo, baseUrl: 'https://widgetexplorer.com/' });

  const result = await service.joinWaitlist({ email: 'c@example.com' });
  assert.ok(result.referralLink.startsWith('https://widgetexplorer.com/?ref='));
});
