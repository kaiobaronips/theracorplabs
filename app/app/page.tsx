import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'App do Paciente | Theracorp',
  description: 'Acompanhe sua jornada clínica com histórico, orientações e próximos passos em um ambiente seguro.',
  path: '/app'
});

export default function AppPage() {
  return (
    <section className="tc-section-wrapper py-16 md:py-20">
      <div className="mx-auto w-full max-w-[900px] px-4 md:px-8">
        <h1 className="header-1 text-4xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900 md:text-5xl">App do paciente</h1>
        <p className="content-2 mt-5 text-tc-gray-500">
          Ambiente digital para acompanhar histórico clínico, orientações e marcos de acompanhamento.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <article className="tc-card">
            <h2 className="content-1 text-lg font-semibold">Histórico consolidado</h2>
            <p className="content-2 mt-2 text-sm text-tc-gray-500">Eventos clínicos e evolução em um único lugar.</p>
          </article>
          <article className="tc-card">
            <h2 className="content-1 text-lg font-semibold">Orientações ativas</h2>
            <p className="content-2 mt-2 text-sm text-tc-gray-500">Próximos passos e recomendações clínicas aplicáveis.</p>
          </article>
          <article className="tc-card">
            <h2 className="content-1 text-lg font-semibold">Acompanhamento contínuo</h2>
            <p className="content-2 mt-2 text-sm text-tc-gray-500">Contato estruturado durante toda a jornada.</p>
          </article>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href="/cadastro" className="tc-btn-primary">Criar acesso</Link>
          <Link href="/login" className="content-2 text-sm text-tc-gray-500 underline-offset-2 hover:text-tc-gray-900 hover:underline">Já tenho conta</Link>
        </div>
      </div>
    </section>
  );
}
