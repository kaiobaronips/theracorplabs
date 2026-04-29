export function CarePillars() {
  return (
    <section aria-labelledby="como-funciona-titulo" className="tc-section-wrapper py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
        <h2 id="como-funciona-titulo" className="header-1 text-3xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900 md:text-4xl">
          Como funciona
        </h2>
        <p className="content-2 mt-4 max-w-[70ch] text-tc-gray-500">
          Fluxo clínico claro, com baixo atrito operacional e alta transparência em cada etapa.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <article className="tc-card">
            <svg className="h-6 w-6 stroke-tc-teal-dark" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" aria-hidden>
              <path d="M4 7h16M4 12h16M4 17h10" />
            </svg>
            <h3 className="content-1 mt-3 text-lg font-semibold text-tc-gray-900">Anamnese estruturada</h3>
            <p className="content-2 mt-2 text-sm text-tc-gray-500">
              Coleta de dados clínicos para triagem e elegibilidade com critérios médicos objetivos.
            </p>
          </article>

          <article className="tc-card">
            <svg className="h-6 w-6 stroke-tc-teal-dark" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" aria-hidden>
              <path d="M12 3v18M3 12h18" />
            </svg>
            <h3 className="content-1 mt-3 text-lg font-semibold text-tc-gray-900">Avaliação médica</h3>
            <p className="content-2 mt-2 text-sm text-tc-gray-500">
              Consulta por telemedicina com decisão clínica individual e orientações de segurança.
            </p>
          </article>

          <article className="tc-card">
            <svg className="h-6 w-6 stroke-tc-teal-dark" viewBox="0 0 24 24" fill="none" strokeWidth="1.5" aria-hidden>
              <path d="M4 14l5 5 11-11" />
            </svg>
            <h3 className="content-1 mt-3 text-lg font-semibold text-tc-gray-900">Acompanhamento contínuo</h3>
            <p className="content-2 mt-2 text-sm text-tc-gray-500">
              Monitoramento de evolução e ajustes de conduta conforme resposta clínica e adesão.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
