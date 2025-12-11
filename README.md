# SEO + analytics starter (Next.js)

This repo is a minimal Next.js (App Router) starter with:

- SEO metadata (OpenGraph/Twitter), `robots.txt`, `sitemap.xml`
- Product JSON-LD structured data
- Vercel Analytics + PostHog instrumentation from day one
- Environment-aware logging
- A simple consent banner (can be disabled)

## Local development

```bash
npm install
npm run dev
```

Copy env:

```bash
cp .env.example .env
```

## Analytics

### Events

Client-side analytics helper lives in `lib/analytics.ts` and currently emits:

- `page_view`
- `waitlist_joined`
- `referral_shared`

Traffic source properties (when present): `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, plus `referrer`, `landing_path`.

### Consent banner

By default, analytics is gated behind a basic consent banner.

- Set `NEXT_PUBLIC_ANALYTICS_CONSENT_REQUIRED=false` to always enable analytics (useful for internal staging).

## Vercel deployment workflow

### Projects

Create two Vercel projects pointing at the same Git repo:

- **Production project**: connected to `main`
- **Staging project**: connected to `staging` (or your preferred branch)

Enable **Git-based previews** (Vercel previews) on both projects.

Recommended mapping:

- `main` → Production deployments (`VERCEL_ENV=production`)
- `staging` → Staging deployments (set `NEXT_PUBLIC_APP_ENV=staging`)
- PRs → Preview deployments (`VERCEL_ENV=preview`)

SEO safety: on Vercel, production deployments from a non-`main` branch are treated as **staging** for `robots.txt` + `noindex`.
Still, it’s recommended to explicitly set `NEXT_PUBLIC_APP_ENV` per environment so the client-side consent behavior matches.

### Environment variables

Set env vars in Vercel for each environment (Preview / Staging / Production). See `.env.example`.

At minimum for PostHog:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST` (defaults to `https://app.posthog.com`)

If you do not want a consent banner in staging, set:

- `NEXT_PUBLIC_ANALYTICS_CONSENT_REQUIRED=false`

## Supabase migrations

This repo doesn’t ship migrations yet, but the intended workflow is:

1. Install the Supabase CLI.
2. Link your project:

```bash
supabase login
supabase link --project-ref <ref>
```

3. Create a migration:

```bash
supabase db diff --use-migra -f <name>
```

4. Apply locally / remotely:

```bash
supabase db reset
supabase db push
```

## Resend key rotation

Resend API keys should be treated as short-lived secrets:

- Rotate keys periodically and after any suspected exposure.
- Keep **separate keys per environment** (Preview/Staging/Prod) in Vercel.
- Verify key permissions and sender domains after rotation.

## Future: email drip sequencing

Waitlist emails are expected to evolve into a drip sequence (e.g. welcome → product updates → launch notification). Keep templates and scheduling logic isolated so it can be iterated without breaking the waitlist capture flow.
