'use client';

import { useMemo, useState } from 'react';

import { track } from '@/lib/analytics';

function emailDomain(email: string): string | null {
  const idx = email.lastIndexOf('@');
  if (idx === -1) return null;
  return email.slice(idx + 1).toLowerCase();
}

export function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const domain = useMemo(() => emailDomain(email), [email]);

  async function submit() {
    setStatus('loading');

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Request failed');

      track('waitlist_joined', {
        email_domain: domain ?? undefined,
      });

      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className="card">
      <h2 style={{ marginTop: 0 }}>Join the waitlist</h2>
      <div style={{ display: 'grid', gap: 10 }}>
        <input
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="email"
        />
        <button
          type="button"
          disabled={!email || status === 'loading'}
          onClick={submit}
        >
          {status === 'loading' ? 'Joining…' : 'Get early access'}
        </button>
        {status === 'success' ? <small>Thanks — you’re on the list.</small> : null}
        {status === 'error' ? <small>Something went wrong. Please try again.</small> : null}
        <small>
          No spam. We only use your email for product updates. (In analytics we only store the domain.)
        </small>
      </div>
    </div>
  );
}
