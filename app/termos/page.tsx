import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Termos de Uso | Theracorp',
  description: 'Termos e condições de uso dos serviços da Theracorp.',
  path: '/termos'
});

export default function TermosPage() {
  return (
    <section className="tc-section-wrapper py-16 md:py-20">
      <div className="mx-auto w-full max-w-[900px] px-4 md:px-8">
        <h1 className="header-1 text-4xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900 md:text-5xl">
          Termos de Uso
        </h1>
        <p className="content-2 mt-3 text-sm text-tc-gray-500">Última atualização: maio de 2026</p>

        <div className="mt-10 space-y-8">

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">1. Aceitação dos Termos</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Ao acessar ou utilizar os serviços da Theracorp Inc. (&ldquo;Theracorp&rdquo;, &ldquo;nós&rdquo;), você concorda com estes Termos de
              Uso. Se não concordar com qualquer disposição, não utilize nossos serviços.
            </p>
          </div>

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">2. Descrição dos Serviços</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              A Theracorp oferece uma plataforma de telemedicina e acompanhamento de saúde que inclui:
            </p>
            <ul className="content-2 mt-3 list-disc space-y-2 pl-5 text-sm text-tc-gray-500">
              <li>Consultas médicas por teleconsulta com profissionais habilitados;</li>
              <li>Acompanhamento de saúde preditiva e controle de peso;</li>
              <li>Exames laboratoriais e análise de biomarcadores;</li>
              <li>Prescrição eletrônica conforme legislação vigente;</li>
              <li>Planos de assinatura mensal com acesso contínuo aos serviços.</li>
            </ul>
          </div>

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">3. Elegibilidade</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Para utilizar os serviços da Theracorp, você deve:
            </p>
            <ul className="content-2 mt-3 list-disc space-y-2 pl-5 text-sm text-tc-gray-500">
              <li>Ter no mínimo 18 anos de idade;</li>
              <li>Fornecer informações verdadeiras, precisas e completas no cadastro;</li>
              <li>Atender aos critérios de elegibilidade clínica avaliados por nossos médicos;</li>
              <li>Residir em território brasileiro.</li>
            </ul>
          </div>

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">4. Assinaturas e Pagamentos</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Os planos de assinatura da Theracorp são cobrados mensalmente de forma automática. Ao assinar, você autoriza
              a cobrança recorrente no cartão ou método de pagamento cadastrado. O cancelamento pode ser solicitado a
              qualquer momento sem multa, com efeito a partir do próximo ciclo de cobrança.
            </p>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Medicamentos prescritos, quando aplicável, são cobrados separadamente e estão condicionados à avaliação e
              prescrição médica. A assinatura não garante prescrição.
            </p>
          </div>

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">5. Limitações Médicas</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Os serviços da Theracorp não substituem atendimento de emergência. Em caso de emergência médica, ligue
              imediatamente para o SAMU (192) ou Bombeiros (193). A Theracorp não realiza diagnósticos definitivos e os
              resultados de saúde podem variar individualmente.
            </p>
          </div>

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">6. Responsabilidades do Usuário</h2>
            <ul className="content-2 mt-3 list-disc space-y-2 pl-5 text-sm text-tc-gray-500">
              <li>Manter suas informações de cadastro atualizadas e verídicas;</li>
              <li>Não compartilhar suas credenciais de acesso com terceiros;</li>
              <li>Seguir as orientações dos profissionais de saúde da Theracorp;</li>
              <li>Informar corretamente seu histórico de saúde e medicamentos em uso;</li>
              <li>Utilizar os serviços apenas para fins lícitos e pessoais.</li>
            </ul>
          </div>

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">7. Propriedade Intelectual</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Todo o conteúdo disponível na plataforma Theracorp — incluindo textos, imagens, logotipos, softwares e
              interfaces — é de propriedade exclusiva da Theracorp Inc. ou licenciado por terceiros. É proibida a
              reprodução, distribuição ou uso comercial sem autorização expressa.
            </p>
          </div>

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">8. Alterações nos Termos</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              A Theracorp reserva o direito de atualizar estes Termos a qualquer momento. Alterações significativas serão
              comunicadas por e-mail ou notificação na plataforma. O uso continuado dos serviços após a comunicação
              implica aceitação dos novos termos.
            </p>
          </div>

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">9. Foro e Legislação</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Estes Termos são regidos pelas leis da República Federativa do Brasil. Fica eleito o foro da comarca de São
              Paulo/SP para dirimir quaisquer controvérsias, com renúncia a qualquer outro, por mais privilegiado que seja.
            </p>
          </div>

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">10. Contato</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Para dúvidas sobre estes Termos, entre em contato:
            </p>
            <ul className="content-2 mt-3 space-y-1 text-sm text-tc-gray-500">
              <li><strong className="text-tc-gray-900">E-mail:</strong> legal@theracorp.org</li>
              <li><strong className="text-tc-gray-900">Empresa:</strong> Theracorp Inc.</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
