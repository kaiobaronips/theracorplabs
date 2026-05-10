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

async function stripePost(path: string, secretKey: string, params: URLSearchParams) {
  const response = await fetch(`${STRIPE_API_BASE}${path}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${secretKey}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params,
  });
  const data = await response.json();
  return { response, data };
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
      { error: 'contact_email_required', message: 'Informe um e-mail válido para finalizar o pagamento.' },
      { status: 400 }
    );
  }

  const origin = req.headers.get('origin') || 'https://www.theracorp.org';

  const productParams = new URLSearchParams();
  productParams.set('name', `THERACORP ${planName}`);
  productParams.set('metadata[plan]', planName);
  productParams.set('metadata[source]', 'theracorp_checkout_session');

  const productResult = await stripePost('/products', secretKey, productParams);
  if (!productResult.response.ok) {
    console.error('[stripe/checkout-session/product]', productResult.data);
    return NextResponse.json(
      {
        error: 'product_failed',
        message: productResult.data?.error?.message || 'Falha ao criar o produto.',
      },
      { status: 502 }
    );
  }

  const sessionParams = new URLSearchParams();
  sessionParams.set('mode', 'subscription');
  sessionParams.set('customer_email', email);
  sessionParams.set('locale', 'auto');
  sessionParams.set('success_url', `${origin}/checkout-sucesso?session_id={CHECKOUT_SESSION_ID}`);
  sessionParams.set('cancel_url', `${origin}/checkout-cancelado`);
  sessionParams.set('billing_address_collection', 'auto');
  sessionParams.set('allow_promotion_codes', 'true');

  sessionParams.set('line_items[0][price_data][currency]', 'brl');
  sessionParams.set('line_items[0][price_data][unit_amount]', String(amountBrl));
  sessionParams.set('line_items[0][price_data][recurring][interval]', 'month');
  sessionParams.set('line_items[0][price_data][product]', productResult.data.id);
  sessionParams.set('line_items[0][quantity]', '1');

  sessionParams.set('metadata[plan]', planName);
  sessionParams.set('metadata[source]', 'theracorp_checkout_session');
  sessionParams.set('metadata[contact_email]', email);

  sessionParams.set('subscription_data[metadata][plan]', planName);
  sessionParams.set('subscription_data[metadata][source]', 'theracorp_checkout_session');
  sessionParams.set('subscription_data[metadata][contact_email]', email);

  const sessionResult = await stripePost('/checkout/sessions', secretKey, sessionParams);
  if (!sessionResult.response.ok) {
    console.error('[stripe/checkout-session]', sessionResult.data);
    return NextResponse.json(
      {
        error: 'session_failed',
        message: sessionResult.data?.error?.message || 'Falha ao criar sessão de checkout.',
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    sessionId: sessionResult.data.id,
    url: sessionResult.data.url,
  });
}
