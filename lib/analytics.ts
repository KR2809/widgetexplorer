'use client';

import posthog from 'posthog-js';

import { isConsentRequired } from '@/lib/env';
import { logger } from '@/lib/logger';

type Dict = Record<string, unknown>;

const CONSENT_COOKIE = 'analytics_consent';
const ATTR_KEY = 'analytics_attribution_v1';

export type AnalyticsEvent = 'page_view' | 'waitlist_joined' | 'referral_shared';

export type ConsentState = 'granted' | 'denied' | null;

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]!) : null;
}

function setCookie(name: string, value: string, days = 180): void {
  if (typeof document === 'undefined') return;
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; Expires=${expires}; Path=/; SameSite=Lax`;
}

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export function getConsent(): ConsentState {
  const v = getCookie(CONSENT_COOKIE);
  if (v === 'granted' || v === 'denied') return v;
  return null;
}

export function setConsent(consent: Exclude<ConsentState, null>): void {
  setCookie(CONSENT_COOKIE, consent);

  if (consent === 'denied') {
    try {
      posthog.opt_out_capturing();
    } catch {
      // ignore
    }
  }
}

export function analyticsEnabled(): boolean {
  if (typeof window === 'undefined') return false;
  if (!isConsentRequired()) return true;
  return getConsent() === 'granted';
}

export function initAnalytics(): void {
  if (typeof window === 'undefined') return;
  if (!analyticsEnabled()) return;

  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
  if (!key) {
    logger.debug('PostHog disabled: missing NEXT_PUBLIC_POSTHOG_KEY');
    return;
  }

  if ((posthog as unknown as { __inited?: boolean }).__inited) return;
  (posthog as unknown as { __inited?: boolean }).__inited = true;

  posthog.init(key, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://app.posthog.com',
    capture_pageview: false,
    autocapture: false,
    loaded: (ph) => {
      const consent = getConsent();
      if (isConsentRequired() && consent !== 'granted') {
        ph.opt_out_capturing();
      }
    },
  });
}

export type Attribution = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  referrer?: string;
  landing_path?: string;
};

export function persistAttributionFromLocation(): void {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  const params = url.searchParams;

  const next: Attribution = {
    utm_source: params.get('utm_source') ?? undefined,
    utm_medium: params.get('utm_medium') ?? undefined,
    utm_campaign: params.get('utm_campaign') ?? undefined,
    utm_term: params.get('utm_term') ?? undefined,
    utm_content: params.get('utm_content') ?? undefined,
  };

  const hasAnyUtm = Object.values(next).some(Boolean);
  const existing = getAttribution();

  const merged: Attribution = {
    ...(existing ?? {}),
    ...(hasAnyUtm ? next : {}),
    referrer: existing?.referrer ?? document.referrer || undefined,
    landing_path: existing?.landing_path ?? url.pathname,
  };

  try {
    window.localStorage.setItem(ATTR_KEY, JSON.stringify(merged));
  } catch {
    // ignore
  }
}

export function getAttribution(): Attribution | null {
  if (typeof window === 'undefined') return null;
  try {
    return safeJsonParse<Attribution>(window.localStorage.getItem(ATTR_KEY));
  } catch {
    return null;
  }
}

function baseProps(extra?: Dict): Dict {
  const currentUrl = typeof window === 'undefined' ? undefined : window.location.href;

  return {
    ...(currentUrl ? { $current_url: currentUrl } : {}),
    ...(getAttribution() ?? {}),
    ...(extra ?? {}),
  };
}

export function pageView(pathname: string, extra?: Dict): void {
  if (!analyticsEnabled()) return;
  initAnalytics();

  const props = baseProps({
    pathname,
    ...(extra ?? {}),
  });

  posthog.capture('$pageview', props);
  posthog.capture('page_view', props);
}

export function track(event: AnalyticsEvent, props?: Dict): void {
  if (!analyticsEnabled()) return;
  initAnalytics();

  posthog.capture(event, baseProps(props));
}
