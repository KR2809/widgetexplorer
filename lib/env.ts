export type AppEnv = 'development' | 'preview' | 'staging' | 'production';

export function getAppEnv(): AppEnv {
  const explicit = process.env.NEXT_PUBLIC_APP_ENV;
  if (explicit === 'production') return 'production';
  if (explicit === 'staging') return 'staging';
  if (explicit === 'preview') return 'preview';
  if (explicit === 'development') return 'development';

  const vercelEnv = process.env.VERCEL_ENV;
  if (vercelEnv === 'preview') return 'preview';
  if (vercelEnv === 'development') return 'development';

  if (vercelEnv === 'production') {
    const ref = process.env.VERCEL_GIT_COMMIT_REF;
    if (ref && ref !== 'main') return 'staging';
    return 'production';
  }

  return process.env.NODE_ENV === 'production' ? 'production' : 'development';
}

export function isProductionIndexable(): boolean {
  return getAppEnv() === 'production';
}

export function getSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  try {
    if (raw) return new URL(raw);
  } catch {
    // ignore
  }

  return new URL('http://localhost:3000');
}

export function isConsentRequired(): boolean {
  const raw = process.env.NEXT_PUBLIC_ANALYTICS_CONSENT_REQUIRED;
  if (raw === undefined) return getAppEnv() === 'production';
  return raw === 'true' || raw === '1';
}
