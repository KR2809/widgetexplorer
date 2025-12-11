import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const body = (await req.json().catch(() => null)) as { email?: string } | null;

  if (!body?.email) {
    return NextResponse.json({ ok: false, error: 'Missing email' }, { status: 400 });
  }

  // Placeholder endpoint.
  // Wire this up to Supabase + Resend later (confirmations / drip sequencing).
  return NextResponse.json({ ok: true });
}
