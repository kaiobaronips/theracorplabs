import { NextRequest, NextResponse } from 'next/server';

const FALLBACK_USD_BRL_RATE = 5.1243;
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
  const currency = String(body?.currency || 'USD').toLowerCase() === 'usd' ? 'usd' : 'brl';
  const email = normaliseEmail(body?.email);
  const amountBrl = PLAN_PRICES_BRL[planName];

  if (!amountBrl) {
    return NextResponse.json({ error: 'invalid_plan' }, { status: 400 });
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      {
        error: 'contact_email_required',
        message: 'Informe um e-mail válido para receber a fatura bancária.',
      },
      { status: 400 }
    );
  }

  if (currency !== 'usd') {
    return NextResponse.json(
      {
        error: 'bank_transfer_currency_unsupported',
        message: 'Transferências bancárias nativas da Stripe não estão disponíveis em BRL. Para bancos brasileiros, use boleto.',
      },
      { status: 400 }
    );
  }

  const rate = await getUsdBrlRate();
  const amountUsd = Math.max(50, Math.round(amountBrl / rate));

  const customerParams = new URLSearchParams();
  customerParams.set('email', email);
  customerParams.set('metadata[source]', 'theracorp_bank_transfer_subscription');
  customerParams.set('metadata[contact_email]', email);

  const customerResult = await stripePost('/customers', secretKey, customerParams);

  if (!customerResult.response.ok) {
    console.error('[stripe/bank-transfer/customer]', customerResult.data);
    const stripeError = customerResult.data?.error;
    return NextResponse.json(
      {
        error: 'customer_failed',
        code: stripeError?.code || stripeError?.type || 'stripe_error',
        message: stripeError?.message || 'Falha ao criar o cliente para transferência bancária.',
      },
      { status: 502 }
    );
  }

  const productParams = new URLSearchParams();
  productParams.set('name', `THERACORP ${planName}`);
  productParams.set('metadata[plan]', planName);
  productParams.set('metadata[source]', 'theracorp_bank_transfer_subscription');

  const productResult = await stripePost('/products', secretKey, productParams);

  if (!productResult.response.ok) {
    console.error('[stripe/bank-transfer/product]', productResult.data);
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
  subscriptionParams.set('collection_method', 'send_invoice');
  subscriptionParams.set('days_until_due', '30');
  subscriptionParams.set('payment_settings[payment_method_types][0]', 'customer_balance');
  subscriptionParams.set('items[0][price_data][currency]', 'usd');
  subscriptionParams.set('items[0][price_data][unit_amount]', String(amountUsd));
  subscriptionParams.set('items[0][price_data][recurring][interval]', 'month');
  subscriptionParams.set('items[0][price_data][product]', productResult.data.id);
  subscriptionParams.set('items[0][quantity]', '1');
  subscriptionParams.set('metadata[plan]', planName);
  subscriptionParams.set('metadata[source]', 'theracorp_bank_transfer_subscription');
  subscriptionParams.set('metadata[contact_email]', email);
  subscriptionParams.set('expand[]', 'latest_invoice');

  const subscriptionResult = await stripePost('/subscriptions', secretKey, subscriptionParams);

  if (!subscriptionResult.response.ok) {
    console.error('[stripe/bank-transfer/subscription]', subscriptionResult.data);
    const stripeError = subscriptionResult.data?.error;
    return NextResponse.json(
      {
        error: 'bank_transfer_subscription_failed',
        code: stripeError?.code || stripeError?.type || 'stripe_error',
        message: stripeError?.message || 'Falha ao criar a assinatura por transferência bancária.',
      },
      { status: 502 }
    );
  }

  const subscription = subscriptionResult.data;
  const hostedInvoiceUrl = subscription?.latest_invoice?.hosted_invoice_url;

  if (!hostedInvoiceUrl) {
    console.error('[stripe/bank-transfer/subscription] missing hosted invoice url', subscription);
    return NextResponse.json(
      {
        error: 'hosted_invoice_url_missing',
        message: 'Assinatura criada sem link de fatura bancária.',
      },
      { status: 502 }
    );
  }

  return NextResponse.json({
    subscriptionId: subscription.id,
    invoiceId: subscription.latest_invoice.id,
    url: hostedInvoiceUrl,
    amount: amountUsd,
    currency: 'usd',
    interval: 'month',
  });
}
