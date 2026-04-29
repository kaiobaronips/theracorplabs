import Link from 'next/link';
import { HeroSection } from '@/components/home/hero-section';
import { CarePillars } from '@/components/home/care-pillars';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CarePillars />

      <section aria-labelledby="planos-titulo" className="tc-section-wrapper py-16 md:py-20">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
          <h2 id="planos-titulo" className="header-1 text-3xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900 md:text-4xl">
            Planos e frentes de cuidado
          </h2>
          <p className="content-2 mt-4 max-w-[70ch] text-tc-gray-500">
            Estrutura modular para suporte clínico longitudinal e integração com exames.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <article className="tc-card">
              <h3 className="content-1 text-lg font-semibold text-tc-gray-900">Controle de peso</h3>
              <p className="content-2 mt-2 text-sm text-tc-gray-500">
                Protocolos médicos para acompanhamento de peso e saúde metabólica.
              </p>
              <Link href="/emagrecimento" className="content-2 mt-3 inline-block text-sm text-tc-gray-500 underline-offset-2 hover:text-tc-gray-900 hover:underline">
                Ver detalhes clínicos
              </Link>
            </article>

            <article className="tc-card">
              <h3 className="content-1 text-lg font-semibold text-tc-gray-900">Exames e monitoramento</h3>
              <p className="content-2 mt-2 text-sm text-tc-gray-500">
                Solicitação e leitura de exames para tomada de decisão baseada em dados.
              </p>
              <Link href="/exames" className="content-2 mt-3 inline-block text-sm text-tc-gray-500 underline-offset-2 hover:text-tc-gray-900 hover:underline">
                Consultar exames
              </Link>
            </article>

            <article className="tc-card">
              <h3 className="content-1 text-lg font-semibold text-tc-gray-900">Jornada digital</h3>
              <p className="content-2 mt-2 text-sm text-tc-gray-500">
                Acompanhamento com visibilidade de histórico, orientações e próximos passos.
              </p>
              <Link href="/app" className="content-2 mt-3 inline-block text-sm text-tc-gray-500 underline-offset-2 hover:text-tc-gray-900 hover:underline">
                Conhecer app
              </Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
