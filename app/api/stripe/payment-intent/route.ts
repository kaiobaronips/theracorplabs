import { NextRequest, NextResponse } from 'next/server';

const FALLBACK_USD_BRL_RATE = 5.1243;
const STRIPE_API_BASE = 'https://api.stripe.com/v1';

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
  const currency = String(body?.currency || 'BRL').toLowerCase() === 'usd' ? 'usd' : 'brl';
  const email = normaliseEmail(body?.email);
  const amountBrl = PLAN_PRICES_BRL[planName];

  if (!amountBrl) {
    return NextResponse.json({ error: 'invalid_plan' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      {
        error: 'contact_email_required',
        message: 'Informe um e-mail válido para finalizar o pagamento e receber o recibo.',
      },
      { status: 400 }
    );
  }

  const rate = currency === 'usd' ? await getUsdBrlRate() : FALLBACK_USD_BRL_RATE;
  const amount = currency === 'usd'
    ? Math.max(50, Math.round(amountBrl / rate))
    : amountBrl;

  const customerParams = new URLSearchParams();
  customerParams.set('email', email);
  customerParams.set('metadata[source]', 'theracorp_checkout_modal');
  customerParams.set('metadata[contact_email]', email);

  const customerResult = await stripePost('/customers', secretKey, customerParams);

  if (!customerResult.response.ok) {
    console.error('[stripe/customer]', customerResult.data);
    const stripeError = customerResult.data?.error;
    return NextResponse.json(
      {
        error: 'customer_failed',
        code: stripeError?.code || stripeError?.type || 'stripe_error',
        message: stripeError?.message || 'Falha ao criar o cliente para assinatura.',
      },
      { status: 502 }
    );
  }

  const productParams = new URLSearchParams();
  productParams.set('name', `THERACORP ${planName}`);
  productParams.set('metadata[plan]', planName);
  productParams.set('metadata[source]', 'theracorp_checkout_modal');

  const productResult = await stripePost('/products', secretKey, productParams);

  if (!productResult.response.ok) {
    console.error('[stripe/product]', productResult.data);
    const stripeError = productResult.data?.error;
    return NextResponse.json(
      {
        error: 'product_failed',
        code: stripeError?.code || stripeError?.type || 'stripe_error',
        message: stripeError?.message || 'Falha ao criar o produto da assinatura.',
      },
      { status: 502 }
    );
  }

  const subscriptionParams = new URLSearchParams();
  subscriptionParams.set('customer', customerResult.data.id);
  subscriptionParams.set('collection_method', 'charge_automatically');
  subscriptionParams.set('payment_behavior', 'default_incomplete');
  subscriptionParams.set('payment_settings[save_default_payment_method]', 'on_subscription');
  subscriptionParams.set('items[0][price_data][currency]', currency);
  subscriptionParams.set('items[0][price_data][unit_amount]', String(amount));
  subscriptionParams.set('items[0][price_data][recurring][interval]', 'month');
  subscriptionParams.set('items[0][price_data][product]', productResult.data.id);
  subscriptionParams.set('items[0][quantity]', '1');
  subscriptionParams.set('metadata[plan]', planName);
  subscriptionParams.set('metadata[source]', 'theracorp_checkout_modal');
  subscriptionParams.set('metadata[contact_email]', email);
  subscriptionParams.append('expand[]', 'latest_invoice.confirmation_secret');
  subscriptionParams.append('expand[]', 'latest_invoice.payment_intent');

  const subscriptionResult = await stripePost('/subscriptions', secretKey, subscriptionParams);

  if (!subscriptionResult.response.ok) {
    console.error('[stripe/subscription]', subscriptionResult.data);
    const stripeError = subscriptionResult.data?.error;
    return NextResponse.json(
      {
        error: 'subscription_failed',
        code: stripeError?.code || stripeError?.type || 'stripe_error',
        message: stripeError?.message || 'Falha ao criar a assinatura mensal.',
      },
      { status: 502 }
    );
  }

  const subscription = subscriptionResult.data;
  const clientSecret =
    subscription?.latest_invoice?.confirmation_secret?.client_secret ||
    subscription?.latest_invoice?.payment_intent?.client_secret ||
    null;

  if (!clientSecret) {
    console.error('[stripe/subscription] missing client secret', subscription);
    return NextResponse.json(
      {
        error: 'subscription_confirmation_secret_missing',
        message: 'Assinatura criada sem segredo de confirmação de pagamento.',
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    clientSecret,
    paymentIntentId: null,
    subscriptionId: subscription.id,
    customerId: customerResult.data.id,
    amount,
    currency,
    rate,
    interval: 'month',
  });
}
