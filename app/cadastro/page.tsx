import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';
import { Disclaimer } from '@/components/ui/disclaimer';

export const metadata: Metadata = buildMetadata({
  title: 'Cadastro | Theracorp',
  description: 'Inicie sua avaliação clínica na Theracorp com triagem estruturada e encaminhamento para telemedicina.',
  path: '/cadastro'
});

export default function CadastroPage() {
  return (
    <section className="tc-section-wrapper py-16 md:py-20">
      <div className="mx-auto w-full max-w-[720px] px-4 md:px-8">
        <h1 className="header-1 text-4xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900">Cadastro</h1>
        <p className="content-2 mt-4 text-tc-gray-500">
          Preencha seus dados para iniciar triagem clínica e direcionar sua avaliação médica por telemedicina.
        </p>

        <form className="mt-8 grid gap-4 tc-card" aria-label="Formulário de cadastro">
          <div>
            <label htmlFor="nome" className="content-1 mb-1 block text-sm font-medium text-tc-gray-900">Nome completo</label>
            <input id="nome" className="tc-input" type="text" autoComplete="name" required />
          </div>
          <div>
            <label htmlFor="email" className="content-1 mb-1 block text-sm font-medium text-tc-gray-900">E-mail</label>
            <input id="email" className="tc-input" type="email" autoComplete="email" required />
          </div>
          <div>
            <label htmlFor="telefone" className="content-1 mb-1 block text-sm font-medium text-tc-gray-900">Telefone</label>
            <input id="telefone" className="tc-input" type="tel" autoComplete="tel" required />
          </div>
          <div>
            <label htmlFor="objetivo" className="content-1 mb-1 block text-sm font-medium text-tc-gray-900">Objetivo principal</label>
            <select id="objetivo" className="tc-input" required defaultValue="">
              <option value="" disabled>Selecione uma opção</option>
              <option value="controle-peso">Controle de peso</option>
              <option value="avaliacao-geral">Avaliação clínica geral</option>
              <option value="exames">Exames e monitoramento</option>
            </select>
          </div>
          <button type="submit" className="tc-btn-primary">Começar avaliação clínica</button>
        </form>

        <Disclaimer className="mt-6" />
      </div>
    </section>
  );
}
