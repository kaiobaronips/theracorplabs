import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { Disclaimer } from '@/components/ui/disclaimer';

export const metadata: Metadata = buildMetadata({
  title: 'Planos | Theracorp',
  description: 'Conheça os planos da Theracorp para acompanhamento clínico em saúde masculina com foco em cuidado contínuo.',
  path: '/planos'
});

const plans = [
  {
    id: 'essencial',
    title: 'Essencial',
    description: 'Avaliação médica e plano inicial com direcionamento clínico objetivo.'
  },
  {
    id: 'continuo',
    title: 'Contínuo',
    description: 'Acompanhamento periódico para monitoramento de evolução e ajustes.'
  },
  {
    id: 'integrado',
    title: 'Integrado',
    description: 'Combina acompanhamento médico e leitura estruturada de exames.'
  }
];

export default function PlanosPage() {
  return (
    <section className="tc-section-wrapper py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1100px] px-4 md:px-8">
        <h1 className="header-1 text-4xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900 md:text-5xl">Planos</h1>
        <p className="content-2 mt-5 max-w-[70ch] text-tc-gray-500">
          Estrutura de planos desenhada para jornada clínica progressiva e acompanhamento longitudinal.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <article key={plan.id} className="tc-card">
              <h2 className="content-1 text-xl font-semibold text-tc-gray-900">{plan.title}</h2>
              <p className="content-2 mt-3 text-sm text-tc-gray-500">{plan.description}</p>
            </article>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/cadastro" className="tc-btn-primary">Solicitar avaliação para plano adequado</Link>
          <Link href="/como-funciona" className="content-2 text-sm text-tc-gray-500 underline-offset-2 hover:text-tc-gray-900 hover:underline">Entender a jornada</Link>
        </div>

        <Disclaimer className="mt-6" />
      </div>
    </section>
  );
}
