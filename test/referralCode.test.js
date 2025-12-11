import test from 'node:test';
import assert from 'node:assert/strict';

import { generateReferralCode, isValidReferralCode } from '../src/referrals/referralCode.js';

test('generateReferralCode: length + allowed chars', () => {
  const code = generateReferralCode({ length: 6, randomInt: (max) => max - 1 });
  assert.equal(code.length, 6);
  assert.ok(isValidReferralCode(code));
});

test('generateReferralCode: uniqueness is reasonably high', () => {
  const seen = new Set();
  for (let i = 0; i < 500; i += 1) {
    const code = generateReferralCode({ length: 8 });
    assert.ok(isValidReferralCode(code));
    seen.add(code);
  }

  // Extremely unlikely to collide at 500 samples; this is not a hard guarantee
  // but catches deterministic or broken RNGs.
  assert.ok(seen.size > 490);
});

test('isValidReferralCode rejects non-url-safe input', () => {
  assert.equal(isValidReferralCode('ab_cd'), false);
  assert.equal(isValidReferralCode('ab cd'), false);
  assert.equal(isValidReferralCode(''), false);
});
