import { NextRequest, NextResponse } from 'next/server';

const FALLBACK_USD_BRL_RATE = 5.1243;

const PLAN_PRICES_BRL: Record<string, number> = {
  'Smart Care': 34900,
  'Essencial Care': 79700,
  Signature: 119700,
};

async function getUsdBrlRate() {
  try {
    const response = await fetch('https://api.frankfurter.dev/v1/latest?base=USD&symbols=BRL', {
      cache: 'no-store',
    });
    if (!response.ok) return FALLBACK_USD_BRL_RATE;
    const data = await response.json();
    const rate = Number(data?.rates?.BRL);
    return Number.isFinite(rate) && rate > 0 ? rate : FALLBACK_USD_BRL_RATE;
  } catch {
    return FALLBACK_USD_BRL_RATE;
  }
}

function normalisePlanName(value: unknown) {
  return String(value || '').replace(/^THERACORP\s+/i, '').trim();
}

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY || '';

  if (!secretKey) {
    return NextResponse.json({ error: 'stripe_secret_key_missing' }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  const planName = normalisePlanName(body?.planName);
  const currency = String(body?.currency || 'BRL').toLowerCase() === 'usd' ? 'usd' : 'brl';
  const amountBrl = PLAN_PRICES_BRL[planName];

  if (!amountBrl) {
    return NextResponse.json({ error: 'invalid_plan' }, { status: 400 });
  }

  const rate = currency === 'usd' ? await getUsdBrlRate() : FALLBACK_USD_BRL_RATE;
  const amount = currency === 'usd'
    ? Math.max(50, Math.round(amountBrl / rate))
    : amountBrl;

  const params = new URLSearchParams();
  params.set('amount', String(amount));
  params.set('currency', currency);
  params.set('automatic_payment_methods[enabled]', 'true');
  params.set('metadata[plan]', planName);
  params.set('metadata[source]', 'theracorp_checkout_modal');

  if (body?.email) {
    params.set('receipt_email', String(body.email));
  }

  const response = await fetch('https://api.stripe.com/v1/payment_intents', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });

  const data = await response.json();

  if (!response.ok) {
    console.error('[stripe/payment-intent]', data);
    return NextResponse.json({ error: 'payment_intent_failed' }, { status: 502 });
  }

  return NextResponse.json({
    clientSecret: data.client_secret,
    amount,
    currency,
    rate,
  });
}
