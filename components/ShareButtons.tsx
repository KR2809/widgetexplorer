'use client';

import { useState } from 'react';

import { track } from '@/lib/analytics';

export function ShareButtons() {
  const [copied, setCopied] = useState(false);

  async function share(channel: 'native' | 'copy') {
    const url = window.location.href;

    if (channel === 'native' && navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          url,
        });
        track('referral_shared', { channel });
        return;
      } catch {
        // fall back to copy
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1500);
      track('referral_shared', { channel: 'copy' });
    } catch {
      // ignore
    }
  }

  return (
    <div className="card">
      <h3 style={{ marginTop: 0 }}>Share</h3>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <button type="button" onClick={() => share('native')}>
          Share link
        </button>
        <button
          type="button"
          onClick={() => share('copy')}
          style={{ background: 'transparent', border: '1px solid var(--border)' }}
        >
          {copied ? 'Copied' : 'Copy link'}
        </button>
      </div>
      <div style={{ marginTop: 8 }}>
        <small>Invite teammates to help validate traffic sources + referrals from day one.</small>
      </div>
    </div>
  );
}
