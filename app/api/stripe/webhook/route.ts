import { NextRequest, NextResponse } from 'next/server';
import crypto from 'node:crypto';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TOLERANCE_SECONDS = 300;

function verifyStripeSignature(payload: string, header: string, secret: string) {
  const parts = header.split(',').reduce<Record<string, string[]>>((acc, part) => {
    const [k, v] = part.split('=');
    if (!k || !v) return acc;
    (acc[k] ||= []).push(v);
    return acc;
  }, {});

  const timestamp = Number(parts.t?.[0]);
  const signatures = parts.v1 || [];

  if (!Number.isFinite(timestamp) || signatures.length === 0) {
    throw new Error('signature_format_invalid');
  }

  if (Math.abs(Math.floor(Date.now() / 1000) - timestamp) > TOLERANCE_SECONDS) {
    throw new Error('signature_timestamp_outside_tolerance');
  }

  const expected = crypto
    .createHmac('sha256', secret)
    .update(`${timestamp}.${payload}`, 'utf8')
    .digest('hex');

  const expectedBuf = Buffer.from(expected, 'hex');
  const matches = signatures.some((sig) => {
    const sigBuf = Buffer.from(sig, 'hex');
    return sigBuf.length === expectedBuf.length && crypto.timingSafeEqual(sigBuf, expectedBuf);
  });

  if (!matches) throw new Error('signature_mismatch');
}

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET || '';
  if (!secret) {
    return NextResponse.json({ error: 'webhook_secret_missing' }, { status: 503 });
  }

  const signature = req.headers.get('stripe-signature') || '';
  if (!signature) {
    return NextResponse.json({ error: 'signature_header_missing' }, { status: 400 });
  }

  const payload = await req.text();

  try {
    verifyStripeSignature(payload, signature, secret);
  } catch (err) {
    const reason = err instanceof Error ? err.message : 'signature_verification_failed';
    console.error('[stripe/webhook] signature rejected', reason);
    return NextResponse.json({ error: reason }, { status: 400 });
  }

  let event: { id?: string; type?: string; data?: { object?: { id?: string } } };
  try {
    event = JSON.parse(payload);
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  console.log('[stripe/webhook]', {
    id: event.id,
    type: event.type,
    objectId: event.data?.object?.id,
  });

  return NextResponse.json({ received: true, type: event.type });
}
