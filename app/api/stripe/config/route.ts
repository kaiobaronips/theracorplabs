import { NextResponse } from 'next/server';

export async function GET() {
  const publishableKey = process.env.STRIPE_PUBLISHABLE_KEY || '';

  if (!publishableKey) {
    return NextResponse.json({ error: 'stripe_publishable_key_missing' }, { status: 503 });
  }

  return NextResponse.json({ publishableKey });
}
