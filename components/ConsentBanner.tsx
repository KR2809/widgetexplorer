'use client';

import { useEffect, useState } from 'react';

import { getConsent, setConsent } from '@/lib/analytics';
import { isConsentRequired } from '@/lib/env';

export function ConsentBanner() {
  const consentRequired = isConsentRequired();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!consentRequired) return;
    const consent = getConsent();
    if (!consent) setOpen(true);
  }, [consentRequired, getConsent]);

  if (!consentRequired || !open) return null;

  return (
    <div
      style={{
        position: 'fixed',
        left: 16,
        right: 16,
        bottom: 16,
        zIndex: 50,
      }}
    >
      <div className="card" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <strong>Analytics</strong>
          <div style={{ marginTop: 4 }}>
            <small>
              We use privacy-friendly analytics to understand traffic sources and improve the product.
            </small>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button
            type="button"
            onClick={() => {
              setConsent('denied');
              setOpen(false);
            }}
            style={{ background: 'transparent', border: '1px solid var(--border)' }}
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => {
              setConsent('granted');
              setOpen(false);
            }}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
