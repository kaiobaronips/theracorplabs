import Link from 'next/link';
import { Disclaimer } from '@/components/ui/disclaimer';

export function HeroSection() {
  return (
    <section aria-labelledby="hero-titulo" className="tc-hero">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 px-4 py-16 md:grid-cols-[1.1fr_0.9fr] md:px-8 md:py-24">
        <div>
          <p className="content-1 mb-4 text-xs font-semibold uppercase tracking-[0.12em] text-tc-teal-dark">
            Telemedicina Clínica Premium
          </p>
          <h1 id="hero-titulo" className="header-1 text-balance text-4xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900 md:text-5xl">
            Precisão clínica para saúde masculina, com jornada digital simples e acompanhamento médico contínuo.
          </h1>
          <p className="content-2 mt-6 max-w-[62ch] text-pretty text-base text-tc-gray-500">
            Avaliação individual por médico credenciado, conduta baseada em evidências e suporte estruturado para
            decisões clínicas responsáveis.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <Link href="/cadastro" className="tc-btn-primary">
              Começar avaliação clínica
            </Link>
            <Link href="/como-funciona" className="content-2 text-sm text-tc-gray-500 underline-offset-2 hover:text-tc-gray-900 hover:underline">
              Entender o processo
            </Link>
          </div>

          <Disclaimer className="mt-6" />
        </div>

        <div className="grid min-h-[320px] place-items-center" aria-hidden={true}>
          <div className="tc-orb" />
        </div>
      </div>
    </section>
  );
}
