import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Pagamento cancelado | Theracorp',
  description: 'Você cancelou o pagamento. Pode tentar novamente quando quiser.',
  path: '/checkout-cancelado',
});

export default function CheckoutCanceladoPage() {
  return (
    <section className="tc-section-wrapper py-16 md:py-24">
      <div className="mx-auto w-full max-w-[640px] px-4 text-center md:px-8">
        <div
          aria-hidden="true"
          className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-tc-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-10 w-10 text-tc-gray-500"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>

        <h1 className="header-1 text-4xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900 md:text-5xl">
          Pagamento não concluído
        </h1>

        <p className="content-2 mt-5 text-tc-gray-500">
          Você cancelou o pagamento antes de finalizar. Nenhuma cobrança foi feita. Quando quiser, basta voltar e tentar
          novamente.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/#wm-quiz"
            className="inline-flex items-center justify-center rounded-full bg-tc-gray-900 px-8 py-3 text-sm font-semibold text-white transition hover:bg-tc-gray-700"
          >
            Tentar novamente
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-tc-gray-200 px-8 py-3 text-sm font-semibold text-tc-gray-700 transition hover:bg-tc-gray-50"
          >
            Voltar para o início
          </Link>
        </div>
      </div>
    </section>
  );
}
