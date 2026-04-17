import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { Disclaimer } from '@/components/ui/disclaimer';

export const metadata: Metadata = buildMetadata({
  title: 'Como funciona | Theracorp',
  description: 'Conheça o fluxo clínico da Theracorp: triagem estruturada, avaliação médica por telemedicina e acompanhamento contínuo.',
  path: '/como-funciona'
});

export default function ComoFuncionaPage() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto w-full max-w-[900px] px-4 md:px-8">
        <h1 className="text-4xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900 md:text-5xl">Como funciona</h1>
        <p className="mt-5 text-tc-gray-500">
          A jornada clínica é estruturada para reduzir incerteza, aumentar segurança e manter acompanhamento médico ao longo
          do tratamento.
        </p>

        <ol className="mt-8 grid gap-4">
          <li className="tc-card">
            <h2 className="text-xl font-semibold text-tc-gray-900">1. Triagem inicial</h2>
            <p className="mt-2 text-sm text-tc-gray-500">Coleta de dados de saúde, histórico e objetivos para direcionar a avaliação clínica.</p>
          </li>
          <li className="tc-card">
            <h2 className="text-xl font-semibold text-tc-gray-900">2. Avaliação por telemedicina</h2>
            <p className="mt-2 text-sm text-tc-gray-500">Médico credenciado revisa contexto clínico e define conduta individual quando aplicável.</p>
          </li>
          <li className="tc-card">
            <h2 className="text-xl font-semibold text-tc-gray-900">3. Acompanhamento contínuo</h2>
            <p className="mt-2 text-sm text-tc-gray-500">Evolução monitorada com ajustes progressivos de conduta e orientação clínica.</p>
          </li>
        </ol>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/cadastro" className="tc-btn-primary">Iniciar avaliação clínica</Link>
          <Link href="/planos" className="text-sm text-tc-gray-500 underline-offset-2 hover:text-tc-gray-900 hover:underline">Ver planos</Link>
        </div>

        <Disclaimer className="mt-6" />
      </div>
    </section>
  );
}
