-- Referral mechanics schema + RPC helpers
-- Designed for Supabase/Postgres.

create extension if not exists pgcrypto;

-- Main waitlist table
create table if not exists public.waitlist_users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  created_at timestamptz not null default now(),

  referral_code text not null unique,
  referred_by_id uuid null references public.waitlist_users(id) on delete set null,

  referrals_count integer not null default 0
);

create index if not exists waitlist_users_created_at_idx on public.waitlist_users(created_at);
create index if not exists waitlist_users_referrals_count_idx on public.waitlist_users(referrals_count);

-- Track successful referrals to dedupe.
-- A referee can only be credited once.
create table if not exists public.referral_events (
  id bigserial primary key,
  created_at timestamptz not null default now(),

  referrer_id uuid not null references public.waitlist_users(id) on delete cascade,
  referee_id uuid not null references public.waitlist_users(id) on delete cascade,

  constraint referral_events_referee_unique unique (referee_id),
  constraint referral_events_pair_unique unique (referrer_id, referee_id)
);

create index if not exists referral_events_referrer_id_idx on public.referral_events(referrer_id);

-- Generate an alphanumeric referral code.
-- Uses base64 output filtered down to [A-Za-z0-9].
create or replace function public.generate_referral_code(p_length int default 6)
returns text
language plpgsql
as $$
declare
  candidate text;
begin
  if p_length < 4 then
    raise exception 'p_length must be >= 4';
  end if;

  loop
    candidate := substring(
      regexp_replace(
        encode(gen_random_bytes(24), 'base64'),
        '[^A-Za-z0-9]',
        '',
        'g'
      ),
      1,
      p_length
    );

    if length(candidate) = p_length then
      return candidate;
    end if;
  end loop;
end;
$$;

-- Ranking view: higher referrals_count ranks earlier; ties broken by created_at.
create or replace view public.waitlist_rankings as
select
  u.id,
  u.email,
  u.created_at,
  u.referral_code,
  u.referrals_count,
  row_number() over (order by u.referrals_count desc, u.created_at asc) as position
from public.waitlist_users u;

-- Leaderboard helper
create or replace function public.get_referral_leaderboard(p_limit int default 10)
returns table(
  user_id uuid,
  referral_code text,
  referrals_count int,
  position bigint
)
language sql
stable
as $$
  select r.id, r.referral_code, r.referrals_count, r.position
  from public.waitlist_rankings r
  order by r.referrals_count desc, r.created_at asc
  limit greatest(p_limit, 1);
$$;

-- Social proof / stats for a user
create or replace function public.get_waitlist_stats(p_user_id uuid)
returns table(
  user_id uuid,
  referral_code text,
  referrals_count int,
  position bigint,
  total_waitlist bigint,
  total_referrals bigint
)
language sql
stable
as $$
  with totals as (
    select
      count(*)::bigint as total_waitlist,
      coalesce(sum(referrals_count), 0)::bigint as total_referrals
    from public.waitlist_users
  ),
  me as (
    select * from public.waitlist_rankings where id = p_user_id
  )
  select
    me.id,
    me.referral_code,
    me.referrals_count,
    me.position,
    totals.total_waitlist,
    totals.total_referrals
  from me
  cross join totals;
$$;

-- Main RPC: join the waitlist.
-- If p_email already exists, returns existing user stats and does NOT apply referral credit.
-- If p_referral_code matches an existing user, creates a referral event and increments referrer count atomically.
create or replace function public.join_waitlist(p_email text, p_referral_code text default null)
returns table(
  user_id uuid,
  referral_code text,
  referrals_count int,
  position bigint,
  was_created boolean,
  referral_was_applied boolean
)
language plpgsql
as $$
declare
  existing_id uuid;
  new_id uuid;
  new_code text;
  referrer_id uuid;
  inserted int;
begin
  select id into existing_id from public.waitlist_users where email = p_email;
  if existing_id is not null then
    return query
      select r.id, r.referral_code, r.referrals_count, r.position, false as was_created, false as referral_was_applied
      from public.waitlist_rankings r
      where r.id = existing_id;
    return;
  end if;

  -- Create new user with unique referral_code
  loop
    new_code := public.generate_referral_code(6);
    begin
      insert into public.waitlist_users(email, referral_code)
      values (p_email, new_code)
      returning id into new_id;
      exit;
    exception when unique_violation then
      -- retry on email/referral_code collision
    end;
  end loop;

  -- Apply referral credit if possible
  if p_referral_code is not null and length(trim(p_referral_code)) > 0 then
    select id into referrer_id from public.waitlist_users where referral_code = p_referral_code;

    if referrer_id is not null and referrer_id <> new_id then
      insert into public.referral_events(referrer_id, referee_id)
      values (referrer_id, new_id)
      on conflict do nothing
      returning 1 into inserted;

      if inserted is not null then
        update public.waitlist_users
        set referrals_count = referrals_count + 1
        where id = referrer_id;

        update public.waitlist_users
        set referred_by_id = referrer_id
        where id = new_id;

        return query
          select r.id, r.referral_code, r.referrals_count, r.position, true as was_created, true as referral_was_applied
          from public.waitlist_rankings r
          where r.id = new_id;
        return;
      end if;
    end if;
  end if;

  return query
    select r.id, r.referral_code, r.referrals_count, r.position, true as was_created, false as referral_was_applied
    from public.waitlist_rankings r
    where r.id = new_id;
end;
$$;
