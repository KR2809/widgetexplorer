import crypto from 'node:crypto';

const DEFAULT_ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

/**
 * @param {object} [options]
 * @param {number} [options.length]
 * @param {string} [options.alphabet]
 * @param {(maxExclusive: number) => number} [options.randomInt] For testing.
 */
export function generateReferralCode(options = {}) {
  const length = options.length ?? 6;
  const alphabet = options.alphabet ?? DEFAULT_ALPHABET;
  const randomInt = options.randomInt ?? ((maxExclusive) => crypto.randomInt(0, maxExclusive));

  if (!Number.isInteger(length) || length < 4) {
    throw new Error('length must be an integer >= 4');
  }

  if (typeof alphabet !== 'string' || alphabet.length < 10) {
    throw new Error('alphabet must be a non-empty string');
  }

  let code = '';
  for (let i = 0; i < length; i += 1) {
    code += alphabet[randomInt(alphabet.length)];
  }

  return code;
}

/**
 * Minimal validation for a referral code that will be used in URLs.
 * @param {string} code
 * @param {object} [options]
 * @param {number} [options.minLength]
 * @param {number} [options.maxLength]
 */
export function isValidReferralCode(code, options = {}) {
  const minLength = options.minLength ?? 4;
  const maxLength = options.maxLength ?? 32;

  if (typeof code !== 'string') return false;
  if (code.length < minLength || code.length > maxLength) return false;

  return /^[A-Za-z0-9]+$/.test(code);
}

export const REFERRAL_CODE_ALPHABET = DEFAULT_ALPHABET;
