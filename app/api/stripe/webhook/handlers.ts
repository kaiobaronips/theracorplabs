type StripeEvent = {
  id: string;
  type: string;
  created: number;
  data: { object: Record<string, unknown> };
};

type SubscriptionObject = {
  id: string;
  customer: string;
  status: string;
  items?: { data?: Array<{ price?: { id?: string; unit_amount?: number; currency?: string; recurring?: { interval?: string } } }> };
  metadata?: Record<string, string>;
  latest_invoice?: string;
};

type InvoiceObject = {
  id: string;
  customer: string;
  subscription?: string | null;
  amount_paid?: number;
  amount_due?: number;
  currency?: string;
  customer_email?: string | null;
  hosted_invoice_url?: string | null;
  receipt_number?: string | null;
  metadata?: Record<string, string>;
};

type PaymentIntentObject = {
  id: string;
  customer?: string | null;
  amount?: number;
  currency?: string;
  status?: string;
  receipt_email?: string | null;
  last_payment_error?: { message?: string; code?: string } | null;
  metadata?: Record<string, string>;
};

type CheckoutSessionObject = {
  id: string;
  customer?: string | null;
  customer_email?: string | null;
  payment_status?: string;
  amount_total?: number;
  currency?: string;
  metadata?: Record<string, string>;
};

const RESEND_API = 'https://api.resend.com/emails';

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'Theracorp <no-reply@theracorp.org>';

async function sendEmail(to: string, subject: string, html: string) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log('[email/skip]', { to, subject, reason: 'RESEND_API_KEY not set' });
    return { skipped: true };
  }

  try {
    const res = await fetch(RESEND_API, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ from: FROM_EMAIL, to, subject, html }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error('[email/error]', { to, subject, status: res.status, body });
      return { error: 'send_failed', status: res.status };
    }
    const data = await res.json();
    return { id: data?.id };
  } catch (err) {
    console.error('[email/exception]', { to, subject, err: err instanceof Error ? err.message : err });
    return { error: 'exception' };
  }
}

function formatAmount(cents?: number, currency?: string) {
  if (!Number.isFinite(cents as number)) return '';
  const value = (cents as number) / 100;
  const code = (currency || 'brl').toUpperCase();
  if (code === 'BRL') {
    return `R$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  if (code === 'USD') {
    return `US$ ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `${value.toFixed(2)} ${code}`;
}

const PROCESSED_EVENTS = new Map<string, number>();
const IDEMPOTENCY_TTL_MS = 60 * 60 * 1000;
const IDEMPOTENCY_MAX = 1000;

export function alreadyProcessed(eventId: string) {
  const now = Date.now();
  for (const [id, seenAt] of PROCESSED_EVENTS) {
    if (now - seenAt > IDEMPOTENCY_TTL_MS) PROCESSED_EVENTS.delete(id);
  }
  if (PROCESSED_EVENTS.has(eventId)) return true;
  if (PROCESSED_EVENTS.size >= IDEMPOTENCY_MAX) {
    const oldest = PROCESSED_EVENTS.keys().next().value;
    if (oldest) PROCESSED_EVENTS.delete(oldest);
  }
  PROCESSED_EVENTS.set(eventId, now);
  return false;
}

async function fetchCustomerEmail(customerId: string) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret || !customerId) return null;
  try {
    const res = await fetch(`https://api.stripe.com/v1/customers/${customerId}`, {
      headers: { Authorization: `Bearer ${secret}` },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data?.email === 'string' ? (data.email as string) : null;
  } catch {
    return null;
  }
}

async function handleSubscriptionCreated(event: StripeEvent) {
  const sub = event.data.object as unknown as SubscriptionObject;
  const price = sub.items?.data?.[0]?.price;
  const planEmail = sub.metadata?.contact_email || (await fetchCustomerEmail(sub.customer));
  const planName = sub.metadata?.plan || 'Theracorp';
  const amount = formatAmount(price?.unit_amount, price?.currency);
  const interval = price?.recurring?.interval || 'month';

  console.log('[subscription/created]', {
    subscription: sub.id,
    customer: sub.customer,
    plan: planName,
    amount,
    interval,
    status: sub.status,
    contact_email: planEmail,
  });

  // TODO: persistir no banco quando houver
  // await db.subscriptions.upsert({ id: sub.id, customer: sub.customer, plan: planName, status: sub.status });
}

async function handleSubscriptionUpdated(event: StripeEvent) {
  const sub = event.data.object as unknown as SubscriptionObject;
  console.log('[subscription/updated]', {
    subscription: sub.id,
    customer: sub.customer,
    status: sub.status,
  });
  // TODO: db.subscriptions.update({ id: sub.id, status: sub.status });
}

async function handleSubscriptionDeleted(event: StripeEvent) {
  const sub = event.data.object as unknown as SubscriptionObject;
  const email = sub.metadata?.contact_email || (await fetchCustomerEmail(sub.customer));
  console.log('[subscription/deleted]', {
    subscription: sub.id,
    customer: sub.customer,
    email,
  });
  // TODO: db.subscriptions.update({ id: sub.id, status: 'canceled' });
  if (email) {
    await sendEmail(
      email,
      'Sua assinatura Theracorp foi cancelada',
      `<p>Olá,</p><p>Confirmamos o cancelamento da sua assinatura Theracorp. Se isso foi um engano, basta responder este e-mail e ajudaremos a reativar.</p><p>Cuide-se,<br/>Equipe Theracorp</p>`
    );
  }
}

async function handlePaymentIntentSucceeded(event: StripeEvent) {
  const pi = event.data.object as unknown as PaymentIntentObject;
  const email = pi.receipt_email || pi.metadata?.contact_email || (pi.customer ? await fetchCustomerEmail(pi.customer) : null);
  const amount = formatAmount(pi.amount, pi.currency);

  console.log('[payment_intent/succeeded]', {
    paymentIntent: pi.id,
    customer: pi.customer,
    amount,
    email,
  });

  // Evitar e-mail duplicado: invoice.paid tambem dispara para subscriptions.
  // Aqui so envia se NAO for de subscription (i.e., compra one-time como Pix).
  if (!pi.metadata?.subscription && email) {
    await sendEmail(
      email,
      'Pagamento confirmado — Theracorp',
      `<p>Olá,</p><p>Recebemos seu pagamento de <strong>${amount}</strong>. Em breve nossa equipe entra em contato com os próximos passos.</p><p>Equipe Theracorp</p>`
    );
  }
}

async function handlePaymentIntentFailed(event: StripeEvent) {
  const pi = event.data.object as unknown as PaymentIntentObject;
  const email = pi.receipt_email || pi.metadata?.contact_email || (pi.customer ? await fetchCustomerEmail(pi.customer) : null);
  const reason = pi.last_payment_error?.message || 'desconhecido';

  console.warn('[payment_intent/failed]', {
    paymentIntent: pi.id,
    customer: pi.customer,
    code: pi.last_payment_error?.code,
    reason,
    email,
  });

  if (email) {
    await sendEmail(
      email,
      'Pagamento não autorizado — Theracorp',
      `<p>Olá,</p><p>Tentamos processar seu pagamento mas não foi autorizado. Motivo informado pelo banco: <em>${reason}</em>.</p><p>Você pode tentar novamente acessando <a href="https://www.theracorp.org">theracorp.org</a> ou usar outro cartão.</p><p>Se precisar de ajuda, basta responder este e-mail.</p><p>Equipe Theracorp</p>`
    );
  }
}

async function handleInvoicePaid(event: StripeEvent) {
  const inv = event.data.object as unknown as InvoiceObject;
  const email = inv.customer_email || inv.metadata?.contact_email || (await fetchCustomerEmail(inv.customer));
  const amount = formatAmount(inv.amount_paid, inv.currency);

  console.log('[invoice/paid]', {
    invoice: inv.id,
    subscription: inv.subscription,
    customer: inv.customer,
    amount,
    email,
  });

  if (email) {
    const receiptLink = inv.hosted_invoice_url
      ? `<p>Recibo: <a href="${inv.hosted_invoice_url}">${inv.hosted_invoice_url}</a></p>`
      : '';
    await sendEmail(
      email,
      'Pagamento recebido — Theracorp',
      `<p>Olá,</p><p>Recebemos sua mensalidade de <strong>${amount}</strong>. Sua assinatura segue ativa.</p>${receiptLink}<p>Equipe Theracorp</p>`
    );
  }
}

async function handleInvoicePaymentFailed(event: StripeEvent) {
  const inv = event.data.object as unknown as InvoiceObject;
  const email = inv.customer_email || inv.metadata?.contact_email || (await fetchCustomerEmail(inv.customer));
  const amount = formatAmount(inv.amount_due, inv.currency);

  console.warn('[invoice/payment_failed]', {
    invoice: inv.id,
    subscription: inv.subscription,
    customer: inv.customer,
    amount,
    email,
  });

  if (email) {
    await sendEmail(
      email,
      'Não conseguimos cobrar sua mensalidade — Theracorp',
      `<p>Olá,</p><p>Tentamos cobrar a mensalidade de <strong>${amount}</strong> mas o pagamento não foi autorizado. O Stripe vai tentar novamente automaticamente nos próximos dias.</p><p>Para evitar interrupção do seu plano, atualize seus dados de pagamento em <a href="https://www.theracorp.org">theracorp.org</a>.</p><p>Equipe Theracorp</p>`
    );
  }
}

async function handleCheckoutSessionCompleted(event: StripeEvent) {
  const session = event.data.object as unknown as CheckoutSessionObject;
  const email = session.customer_email || session.metadata?.contact_email || (session.customer ? await fetchCustomerEmail(session.customer) : null);

  console.log('[checkout/session_completed]', {
    session: session.id,
    customer: session.customer,
    payment_status: session.payment_status,
    amount: formatAmount(session.amount_total, session.currency),
    email,
  });
  // checkout.session.completed cobre Boleto/Pix one-time. Os e-mails de cobranca
  // vem via invoice.paid (subscription) ou payment_intent.succeeded (one-time).
}

async function handleCheckoutSessionAsyncSucceeded(event: StripeEvent) {
  const session = event.data.object as unknown as CheckoutSessionObject;
  console.log('[checkout/async_payment_succeeded]', { session: session.id });
}

async function handleCheckoutSessionAsyncFailed(event: StripeEvent) {
  const session = event.data.object as unknown as CheckoutSessionObject;
  const email = session.customer_email || (session.customer ? await fetchCustomerEmail(session.customer) : null);

  console.warn('[checkout/async_payment_failed]', { session: session.id, email });

  if (email) {
    await sendEmail(
      email,
      'Pagamento não confirmado — Theracorp',
      `<p>Olá,</p><p>Não recebemos a confirmação do seu pagamento (Pix ou boleto). Se preferir tentar outra forma, acesse <a href="https://www.theracorp.org">theracorp.org</a>.</p><p>Equipe Theracorp</p>`
    );
  }
}

export async function dispatch(event: StripeEvent) {
  switch (event.type) {
    case 'customer.subscription.created':
      return handleSubscriptionCreated(event);
    case 'customer.subscription.updated':
      return handleSubscriptionUpdated(event);
    case 'customer.subscription.deleted':
      return handleSubscriptionDeleted(event);
    case 'payment_intent.succeeded':
      return handlePaymentIntentSucceeded(event);
    case 'payment_intent.payment_failed':
      return handlePaymentIntentFailed(event);
    case 'invoice.paid':
      return handleInvoicePaid(event);
    case 'invoice.payment_failed':
      return handleInvoicePaymentFailed(event);
    case 'checkout.session.completed':
      return handleCheckoutSessionCompleted(event);
    case 'checkout.session.async_payment_succeeded':
      return handleCheckoutSessionAsyncSucceeded(event);
    case 'checkout.session.async_payment_failed':
      return handleCheckoutSessionAsyncFailed(event);
    default:
      console.log('[stripe/webhook] unhandled', event.type);
  }
}
