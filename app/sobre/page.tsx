import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Sobre a Theracorp | Theracorp',
  description: 'Conheça a Theracorp, healthtech clínica premium com foco em precisão, transparência e cuidado contínuo.',
  path: '/sobre'
});

export default function SobrePage() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto w-full max-w-[900px] px-4 md:px-8">
        <h1 className="text-4xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900 md:text-5xl">Sobre a Theracorp</h1>
        <p className="mt-5 text-tc-gray-500">
          A Theracorp é uma healthtech clínica premium focada em transformar a primeira interação digital em confiança
          clínica real. Nosso princípio é precisão antes de impacto.
        </p>

        <div className="mt-8 tc-card">
          <h2 className="text-xl font-semibold text-tc-gray-900">Compromissos institucionais</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-tc-gray-500">
            <li>Conduta baseada em evidências e contexto individual.</li>
            <li>Transparência de limites terapêuticos e variação de resultados.</li>
            <li>Jornada digital com linguagem clínica acessível.</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/cadastro" className="tc-btn-primary">Conhecer a jornada clínica</Link>
          <Link href="/como-funciona" className="text-sm text-tc-gray-500 underline-offset-2 hover:text-tc-gray-900 hover:underline">Ver como funciona</Link>
        </div>
      </div>
    </section>
  );
}
