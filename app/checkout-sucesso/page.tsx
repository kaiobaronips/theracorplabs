import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Pagamento confirmado | Theracorp',
  description: 'Seu pagamento foi confirmado com sucesso.',
  path: '/checkout-sucesso',
});

export const dynamic = 'force-dynamic';

export default function CheckoutSucessoPage() {
  return (
    <section className="tc-section-wrapper py-16 md:py-24">
      <div className="mx-auto w-full max-w-[640px] px-4 text-center md:px-8">
        <div
          aria-hidden="true"
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10 text-emerald-600"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <h1 className="header-1 text-4xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900 md:text-5xl">
          Pagamento confirmado
        </h1>

        <p className="content-2 mt-5 text-tc-gray-500">
          Sua assinatura Theracorp foi ativada com sucesso. Em instantes você receberá um e-mail com o recibo e os
          próximos passos do seu acompanhamento.
        </p>

        <p className="content-3 mt-3 text-sm text-tc-gray-500">
          Caso não receba o e-mail em alguns minutos, verifique a pasta de spam ou fale conosco respondendo qualquer
          comunicação que enviarmos.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-tc-gray-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-tc-gray-700"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </section>
  );
}
