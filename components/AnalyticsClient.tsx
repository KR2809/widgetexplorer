'use client';

import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { analyticsEnabled, pageView, persistAttributionFromLocation } from '@/lib/analytics';
import { isConsentRequired } from '@/lib/env';
import { ConsentBanner } from '@/components/ConsentBanner';

export function AnalyticsClient() {
  const pathname = usePathname();

  useEffect(() => {
    persistAttributionFromLocation();
  }, [persistAttributionFromLocation]);

  useEffect(() => {
    const search = typeof window === 'undefined' ? '' : window.location.search;
    pageView(search ? `${pathname}${search}` : pathname);
  }, [pageView, pathname]);

  const enabled = analyticsEnabled();
  const consentRequired = isConsentRequired();

  return (
    <>
      {consentRequired ? <ConsentBanner /> : null}
      {enabled ? (
        <>
          <Analytics />
          <SpeedInsights />
        </>
      ) : null}
    </>
  );
}
