import Link from 'next/link';
import { HeroSection } from '@/components/home/hero-section';
import { CarePillars } from '@/components/home/care-pillars';

type PlanCard = {
  title: string;
  description: string;
  href: string;
  cta: string;
};

const planCards: PlanCard[] = [
  {
    title: 'Controle de peso',
    description: 'Protocolos médicos para acompanhamento de peso e saúde metabólica.',
    href: '/emagrecimento',
    cta: 'Ver detalhes clínicos',
  },
  {
    title: 'Exames e monitoramento',
    description: 'Solicitação e leitura de exames para tomada de decisão baseada em dados.',
    href: '/exames',
    cta: 'Consultar exames',
  },
  {
    title: 'Jornada digital',
    description: 'Acompanhamento com visibilidade de histórico, orientações e próximos passos.',
    href: '/app',
    cta: 'Conhecer app',
  },
];

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
            {planCards.map((card) => (
              <article key={card.href} className="tc-card">
                <h3 className="content-1 text-lg font-semibold text-tc-gray-900">{card.title}</h3>
                <p className="content-2 mt-2 text-sm text-tc-gray-500">{card.description}</p>
                <Link href={card.href} className="content-2 mt-3 inline-block text-sm text-tc-gray-500 underline-offset-2 hover:text-tc-gray-900 hover:underline">
                  {card.cta}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
