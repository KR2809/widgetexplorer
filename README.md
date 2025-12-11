# Referral mechanics (Supabase + JS reference implementation)

This repository contains a minimal, dependency-free reference implementation for:

- A Supabase/Postgres schema to support short referral codes
- Atomic referral recording (duplicate referrals ignored)
- Waitlist ranking (position) computation
- A small JS “service + repository” layer suitable for calling Supabase RPC endpoints
- A frontend helper to render a referral success modal with copy/share flows

## Supabase schema

Apply the migration in `supabase/migrations/*_referrals.sql`.

Key RPCs:

- `public.join_waitlist(email, referral_code)`
- `public.get_waitlist_stats(user_id)`
- `public.get_referral_leaderboard(limit)`

## Node tests

```bash
npm test
```

Tests cover referral code generation and service-layer referral accounting (duplicate referrals ignored).
