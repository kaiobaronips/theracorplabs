import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { Disclaimer } from '@/components/ui/disclaimer';

export const metadata: Metadata = buildMetadata({
  title: 'Emagrecimento | Theracorp',
  description: 'Acompanhamento clínico para controle de peso com avaliação individual e condutas baseadas em evidências.',
  path: '/emagrecimento'
});

export default function EmagrecimentoPage() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto w-full max-w-[900px] px-4 md:px-8">
        <h1 className="text-4xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900 md:text-5xl">Emagrecimento</h1>
        <p className="mt-5 text-tc-gray-500">
          Programa clínico para controle de peso com acompanhamento médico, revisão de exames e decisão terapêutica
          individualizada.
        </p>

        <div className="mt-8 grid gap-4">
          <article className="tc-card">
            <h2 className="text-xl font-semibold text-tc-gray-900">Critérios de elegibilidade</h2>
            <p className="mt-2 text-sm text-tc-gray-500">
              Avaliados por médico credenciado com base em histórico clínico, contexto metabólico e risco-benefício.
            </p>
          </article>
          <article className="tc-card">
            <h2 className="text-xl font-semibold text-tc-gray-900">Acompanhamento de resposta</h2>
            <p className="mt-2 text-sm text-tc-gray-500">
              A evolução é monitorada periodicamente para orientar ajustes de conduta de forma segura.
            </p>
          </article>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/cadastro" className="tc-btn-primary">Avaliar elegibilidade clínica</Link>
          <Link href="/exames" className="text-sm text-tc-gray-500 underline-offset-2 hover:text-tc-gray-900 hover:underline">Ver exames relacionados</Link>
        </div>

        <Disclaimer className="mt-6" />
      </div>
    </section>
  );
}
