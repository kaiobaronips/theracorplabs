import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Política de Privacidade | Theracorp',
  description: 'Saiba como a Theracorp coleta, usa e protege seus dados pessoais em conformidade com a LGPD.',
  path: '/privacidade'
});

export default function PrivacidadePage() {
  return (
    <section className="bg-white py-16 md:py-20 font-red-hat">
      <div className="mx-auto w-full max-w-[900px] px-4 md:px-8">
        <h1 className="header-1 text-4xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900 md:text-5xl">
          Política de Privacidade
        </h1>
        <p className="content-2 mt-3 text-sm text-tc-gray-500">Última atualização: maio de 2026</p>

        <div className="mt-10 space-y-8">

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">1. Introdução</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              A Theracorp Inc. (&ldquo;Theracorp&rdquo;, &ldquo;nós&rdquo;) está comprometida com a proteção dos seus dados pessoais. Esta
              Política descreve como coletamos, usamos, armazenamos e protegemos suas informações, em conformidade com a
              Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018).
            </p>
          </div>

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">2. Dados que Coletamos</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">Coletamos as seguintes categorias de dados:</p>
            <ul className="content-2 mt-3 list-disc space-y-2 pl-5 text-sm text-tc-gray-500">
              <li><strong className="text-tc-gray-900">Dados de cadastro:</strong> nome, e-mail, telefone, data de nascimento e sexo;</li>
              <li><strong className="text-tc-gray-900">Dados de saúde:</strong> histórico médico, medicamentos em uso, resultados de exames e informações fornecidas nas consultas;</li>
              <li><strong className="text-tc-gray-900">Dados de pagamento:</strong> informações de cartão processadas de forma segura pela Stripe (não armazenamos dados de cartão diretamente);</li>
              <li><strong className="text-tc-gray-900">Dados de uso:</strong> endereço IP, tipo de navegador, páginas visitadas e interações com a plataforma.</li>
            </ul>
          </div>

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">3. Como Usamos seus Dados</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">Utilizamos seus dados para:</p>
            <ul className="content-2 mt-3 list-disc space-y-2 pl-5 text-sm text-tc-gray-500">
              <li>Prestar os serviços de telemedicina e acompanhamento de saúde contratados;</li>
              <li>Processar pagamentos e gerenciar assinaturas;</li>
              <li>Comunicar resultados de exames e orientações clínicas;</li>
              <li>Enviar comunicações sobre seu plano, quando necessário;</li>
              <li>Melhorar continuamente a plataforma e a experiência do usuário;</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
          </div>

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">4. Base Legal para o Tratamento</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              O tratamento dos seus dados é realizado com base nas seguintes hipóteses legais previstas na LGPD:
            </p>
            <ul className="content-2 mt-3 list-disc space-y-2 pl-5 text-sm text-tc-gray-500">
              <li><strong className="text-tc-gray-900">Execução de contrato:</strong> para prestar os serviços contratados;</li>
              <li><strong className="text-tc-gray-900">Consentimento:</strong> para comunicações de marketing e uso de dados de saúde;</li>
              <li><strong className="text-tc-gray-900">Obrigação legal:</strong> para cumprimento de exigências regulatórias de saúde;</li>
              <li><strong className="text-tc-gray-900">Legítimo interesse:</strong> para segurança da plataforma e melhoria dos serviços.</li>
            </ul>
          </div>

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">5. Compartilhamento de Dados</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Suas informações nunca são vendidas. Compartilhamos dados apenas com:
            </p>
            <ul className="content-2 mt-3 list-disc space-y-2 pl-5 text-sm text-tc-gray-500">
              <li><strong className="text-tc-gray-900">Parceiros médicos:</strong> profissionais de saúde habilitados que prestam atendimento na plataforma;</li>
              <li><strong className="text-tc-gray-900">Processadores de pagamento:</strong> Stripe, para processar transações com segurança;</li>
              <li><strong className="text-tc-gray-900">Laboratórios parceiros:</strong> para coleta e análise de exames, quando aplicável;</li>
              <li><strong className="text-tc-gray-900">Autoridades competentes:</strong> quando exigido por lei ou ordem judicial.</li>
            </ul>
          </div>

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">6. Segurança dos Dados</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou
              divulgação indevida, incluindo criptografia em trânsito (TLS) e em repouso, controles de acesso baseados em
              função e auditorias periódicas de segurança.
            </p>
          </div>

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">7. Seus Direitos (LGPD)</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Você tem os seguintes direitos em relação aos seus dados pessoais:
            </p>
            <ul className="content-2 mt-3 list-disc space-y-2 pl-5 text-sm text-tc-gray-500">
              <li>Confirmar a existência de tratamento de seus dados;</li>
              <li>Acessar os dados que mantemos sobre você;</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados;</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários;</li>
              <li>Revogar o consentimento a qualquer momento;</li>
              <li>Solicitar a portabilidade dos seus dados.</li>
            </ul>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Para exercer qualquer direito, entre em contato pelo e-mail <strong className="text-tc-gray-900">privacidade@theracorp.org</strong>.
            </p>
          </div>

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">8. Retenção de Dados</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Mantemos seus dados pelo período necessário para cumprir as finalidades descritas nesta Política ou conforme
              exigido por lei. Dados de saúde seguem o prazo mínimo de guarda de prontuários definido pelo CFM (20 anos).
              Após o período de retenção, os dados são excluídos ou anonimizados.
            </p>
          </div>

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">9. Cookies</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Utilizamos cookies essenciais para o funcionamento da plataforma e cookies analíticos para entender como os
              usuários interagem com nossos serviços. Você pode gerenciar suas preferências de cookies nas configurações
              do seu navegador.
            </p>
          </div>

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">10. Contato — Encarregado de Dados (DPO)</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Para questões relacionadas à privacidade e proteção de dados:
            </p>
            <ul className="content-2 mt-3 space-y-1 text-sm text-tc-gray-500">
              <li><strong className="text-tc-gray-900">E-mail:</strong> privacidade@theracorp.org</li>
              <li><strong className="text-tc-gray-900">Empresa:</strong> Theracorp Inc.</li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
