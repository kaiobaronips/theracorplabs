import { NextRequest, NextResponse } from 'next/server';

const STRIPE_API_BASE = 'https://api.stripe.com/v1';

const PLAN_PRICES_BRL: Record<string, number> = {
  'Smart Care': 34900,
  'Essencial Care': 79700,
  Signature: 119700,
};

function normalisePlanName(value: unknown) {
  return String(value || '').replace(/^THERACORP\s+/i, '').trim();
}

function normaliseEmail(value: unknown) {
  return String(value || '').trim().toLowerCase();
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: NextRequest) {
  const secretKey = process.env.STRIPE_SECRET_KEY || '';

  if (!secretKey) {
    return NextResponse.json({ error: 'stripe_secret_key_missing' }, { status: 503 });
  }

  const body = await req.json().catch(() => null);
  const planName = normalisePlanName(body?.planName);
  const email = normaliseEmail(body?.email);
  const amountBrl = PLAN_PRICES_BRL[planName];

  if (!amountBrl) {
    return NextResponse.json({ error: 'invalid_plan' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      {
        error: 'contact_email_required',
        message: 'Informe um e-mail válido para ativar o débito automático.',
      },
      { status: 400 }
    );
  }

  const origin = req.nextUrl.origin;
  const params = new URLSearchParams();
  params.set('mode', 'subscription');
  params.set('customer_email', email);
  params.set('payment_method_types[0]', 'pix');
  params.set('payment_method_options[pix][mandate_options][amount]', String(amountBrl));
  params.set('payment_method_options[pix][mandate_options][payment_schedule]', 'monthly');
  params.set('line_items[0][price_data][currency]', 'brl');
  params.set('line_items[0][price_data][unit_amount]', String(amountBrl));
  params.set('line_items[0][price_data][recurring][interval]', 'month');
  params.set('line_items[0][price_data][product_data][name]', `THERACORP ${planName}`);
  params.set('line_items[0][quantity]', '1');
  params.set('metadata[plan]', planName);
  params.set('metadata[source]', 'theracorp_pix_automatico_checkout');
  params.set('metadata[contact_email]', email);
  params.set('subscription_data[metadata][plan]', planName);
  params.set('subscription_data[metadata][source]', 'theracorp_pix_automatico_checkout');
  params.set('subscription_data[metadata][contact_email]', email);
  params.set('success_url', `${origin}/?checkout=pix-automatico-success`);
  params.set('cancel_url', `${origin}/?checkout=pix-automatico-cancel`);

  const response = await fetch(`${STRIPE_API_BASE}/checkout/sessions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });
  const data = await response.json();

  if (!response.ok) {
    console.error('[stripe/pix-automatico-checkout]', data);
    const stripeError = data?.error;
    return NextResponse.json(
      {
        error: 'pix_automatico_checkout_failed',
        code: stripeError?.code || stripeError?.type || 'stripe_error',
        message: stripeError?.message || 'Falha ao criar o checkout de débito automático Pix.',
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    sessionId: data.id,
    url: data.url,
  });
}
