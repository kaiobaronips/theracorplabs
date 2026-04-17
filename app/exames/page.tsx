import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { Disclaimer } from '@/components/ui/disclaimer';

export const metadata: Metadata = buildMetadata({
  title: 'Exames | Theracorp',
  description: 'Exames laboratoriais para suporte à decisão clínica e monitoramento de evolução com contexto médico.',
  path: '/exames'
});

export default function ExamesPage() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto w-full max-w-[900px] px-4 md:px-8">
        <h1 className="text-4xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900 md:text-5xl">Exames</h1>
        <p className="mt-5 text-tc-gray-500">
          Exames laboratoriais podem ser solicitados para complementar avaliação clínica, monitorar segurança terapêutica
          e apoiar decisões médicas.
        </p>

        <ul className="mt-8 grid gap-3 text-sm text-tc-gray-500">
          <li className="tc-card">Painéis metabólicos e marcadores de risco cardiometabólico.</li>
          <li className="tc-card">Leitura clínica contextualizada durante acompanhamento médico.</li>
          <li className="tc-card">Repetição programada conforme plano clínico individual.</li>
        </ul>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/cadastro" className="tc-btn-primary">Iniciar jornada com avaliação clínica</Link>
          <Link href="/como-funciona" className="text-sm text-tc-gray-500 underline-offset-2 hover:text-tc-gray-900 hover:underline">Entender fluxo completo</Link>
        </div>

        <Disclaimer className="mt-6" />
      </div>
    </section>
  );
}
