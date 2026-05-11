import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildMetadata } from '@/lib/metadata';
import { ShieldCheck, Truck, Stethoscope, CircleDollarSign, AtSign, Phone, Mail } from 'lucide-react';

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
        <p className="content-2 mt-3 text-sm text-tc-gray-500">Última atualização: 10 de maio de 2026</p>

        <div className="mt-10 space-y-8">

          {/* Preambulo */}
          <div className="tc-card">
            <p className="content-2 text-sm text-tc-gray-500">
              <strong className="text-tc-gray-900">LEIA ESTA POLÍTICA DE PRIVACIDADE COM ATENÇÃO ANTES DE USAR NOSSOS SERVIÇOS OU SITE.</strong>
            </p>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              <strong className="text-tc-gray-900">NOTA IMPORTANTE</strong> — Nosso Aviso de Práticas de Privacidade é um documento separado que rege como as informações de saúde protegidas ("PHI") sobre você podem ser usadas e divulgadas em conexão com os serviços de saúde, de acordo com a Lei de Portabilidade e Responsabilidade de Seguro de Saúde (HIPAA).
            </p>
          </div>

          {/* I. Introdução */}
          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">I. Introdução</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Esta Política de Privacidade (a "Política de Privacidade") descreve como a Theracorp Inc. coleta e utiliza Dados Pessoais sobre você por meio do uso do nosso site e através de e-mail, mensagens de texto e outras comunicações eletrônicas entre você e a Theracorp. Os termos "nós", "nosso(a)" e "Theracorp" referem-se à Theracorp Inc., localizada em Av. Ayrton Senna da Silva, 1055 - Guanabara, Londrina - PR.
            </p>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              A Theracorp respeita sua privacidade e está comprometida em protegê-la por meio do cumprimento desta política. Esta Política de Privacidade descreve os tipos de informações que nós e nossos afiliados, incluindo certas entidades profissionais afiliadas (coletivamente, "Theracorp", "nós", "nosso(a)"), podemos coletar de você ou que você pode fornecer ao usar o site da Theracorp ("site" ou "Plataforma").
            </p>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Esta Política de Privacidade também descreve nossas práticas de coleta, uso, manutenção, proteção e divulgação dessas informações. O uso da Plataforma é regido por esta Política de Privacidade e por nossos Termos de Serviço. Esta Política de Privacidade está incorporada aos nossos Termos de Serviço. Todos os termos em maiúsculas usados nesta Política de Privacidade, mas não definidos aqui, têm o significado atribuído a eles nos Termos de Serviço. Ao acessar ou usar a Plataforma, você reconhece que leu, entendeu e concorda em estar legalmente vinculado e em cumprir esta Política de Privacidade e nossos Termos de Serviço. Se algum termo desta Política de Privacidade for inaceitável para você, não use a Plataforma nem forneça informações pessoais. Esta Política de Privacidade pode ser alterada periodicamente, e seu uso da Plataforma após tais alterações será considerado como aceitação dessas mudanças, portanto, verifique esta Política de Privacidade periodicamente.
            </p>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Esta Política de Privacidade não se aplica a informações coletadas por terceiros, incluindo por meio de qualquer aplicativo ou conteúdo (incluindo publicidade) que possa ter link, estar incorporado ou acessível na Plataforma. Além disso, você pode estar sujeito a políticas de privacidade ou termos de serviço diferentes em outros sites ou aplicativos.
            </p>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              A Theracorp está comprometida em proteger sua privacidade. Fornecemos esta Política de Privacidade para explicar o tipo de informação que coletamos e para informá-lo sobre as práticas e diretrizes que protegem a segurança e a confidencialidade das informações pessoais.
            </p>
          </div>

          {/* II. Informações Que Coletamos */}
          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">II. Informações Que Coletamos Sobre Você e Como São Coletadas</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500"><strong className="text-tc-gray-900">Informações Sobre Você e Seu Tratamento e Pagamento de Saúde</strong></p>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">Coletamos vários tipos de informações de e sobre os usuários da nossa Plataforma, incluindo:</p>
            <ul className="content-2 mt-3 list-disc space-y-2 pl-5 text-sm text-tc-gray-500">
              <li>Informações pelas quais você pode ser pessoalmente identificado, como nome, endereço, e-mail, telefone e informações de conta, endereço postal, gênero, ocupação, dados de cobrança e pagamento que você nos fornecer, informações relacionadas à sua elegibilidade, ou qualquer outra informação coletada na Plataforma definida como informação pessoal sob a lei aplicável ("Informações Pessoais").</li>
              <li>Informações relacionadas à saúde, como histórico clínico e condições, e quaisquer outras informações trocadas em e-mails, mensagens, chats ou chamadas entre você e a Theracorp.</li>
              <li>Informações sobre sua conexão com a Internet, o equipamento que você usa para acessar nossa Plataforma e detalhes de uso.</li>
              <li>Informações sobre você, como se é um usuário atual, seus interesses em produtos, localização ou dados demográficos, ou informações relacionadas à sua solicitação.</li>
              <li>Qualquer outra informação que solicitarmos especificamente.</li>
            </ul>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">Coletamos essas informações:</p>
            <ul className="content-2 mt-3 list-disc space-y-2 pl-5 text-sm text-tc-gray-500">
              <li>Diretamente de você quando você as fornece.</li>
              <li>Automaticamente enquanto você navega na Plataforma (por exemplo, detalhes de uso, endereço IP e informações coletadas por cookies, web beacons e outras tecnologias de rastreamento).</li>
              <li>De terceiros com os quais trabalhamos para fornecer serviços, como médicos, profissionais de saúde e farmácias.</li>
            </ul>

            <p className="content-2 mt-5 text-sm text-tc-gray-500"><strong className="text-tc-gray-900">Informações Que Você Nos Fornece</strong></p>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">As informações que coletamos na ou por meio da nossa Plataforma podem incluir:</p>
            <ul className="content-2 mt-3 list-disc space-y-2 pl-5 text-sm text-tc-gray-500">
              <li>Informações coletadas quando você navega no site. Mesmo sem criar uma conta, podemos coletar algumas dessas informações.</li>
              <li>Informações fornecidas ao se registrar ou fazer login, ou ao solicitar serviços fornecidos por nossos afiliados, ou através de comunicações decorrentes de serviços de saúde.</li>
              <li>Informações para processar ou responder solicitações, incluindo dados de pagamento. Processamos pagamentos via conexão criptografada a um processador terceirizado. A Theracorp não coleta nem armazena detalhes completos do cartão.</li>
              <li>Registros e cópias de suas correspondências (incluindo e-mails) se você nos contatar.</li>
              <li>Informações que você fornece para exibição pública ou depoimentos, lembrando que aparecerão em áreas públicas.</li>
              <li>Suas consultas de busca na Plataforma.</li>
              <li>Também coletamos automaticamente dados estatísticos, que podem incluir Informações Pessoais, para melhorar a Plataforma, personalizar serviços, estimar usos, armazenar preferências, acelerar pesquisas e reconhecê-lo em visitas futuras.</li>
            </ul>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              A Plataforma pode usar "cookies" para melhorar funcionalidades. Visitantes que não desejam cookies devem configurar seus navegadores para recusá-los, cientes de que algumas áreas podem ficar inacessíveis.
            </p>

            <p className="content-2 mt-5 text-sm text-tc-gray-500"><strong className="text-tc-gray-900">Ferramentas de Terceiros</strong></p>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Usamos Quickbooks e/ou Stripe como processadores de pagamento, que instalam cookies de sessão para prevenção de fraude (duram geralmente 24 horas). Consulte suas políticas de privacidade:
            </p>
            <ul className="content-2 mt-3 list-disc space-y-1 pl-5 text-sm text-tc-gray-500">
              <li><a href="https://quickbooks.intuit.com/hk/privacy/" target="_blank" rel="noopener noreferrer" className="text-tc-teal hover:underline">https://quickbooks.intuit.com/hk/privacy/</a></li>
              <li><a href="https://stripe.com/au/privacy" target="_blank" rel="noopener noreferrer" className="text-tc-teal hover:underline">https://stripe.com/au/privacy</a></li>
            </ul>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Também usamos ferramentas de terceiros para monitorar desempenho, erros e detalhes técnicos.
            </p>

            <p className="content-2 mt-5 text-sm text-tc-gray-500"><strong className="text-tc-gray-900">Informações Recebidas de Outras Fontes</strong></p>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Podemos receber informações de terceiros, como subcontratados, provedores de análise, publicidade ou provedores de busca, bem como de prestadores de serviços de saúde.
            </p>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Podemos combinar essas informações com as que você nos fornece.
            </p>
          </div>

          {/* III. Como Usamos Suas Informações */}
          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">III. Como Usamos Suas Informações</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">Podemos usar suas informações, incluindo Informações Pessoais, para:</p>
            <ul className="content-2 mt-3 list-disc space-y-2 pl-5 text-sm text-tc-gray-500">
              <li>Concluir registros e transações, incluindo pagamentos.</li>
              <li>Finalidades de tratamento, pagamento ou operações de saúde.</li>
              <li>Comunicar sobre serviços, produtos e informações que você solicita.</li>
              <li>Administrar sua conta, processar pagamentos e pedidos.</li>
              <li>Operar a Plataforma, fornecer suporte técnico, melhorar produtos e serviços.</li>
              <li>Criar informações desidentificadas para estatísticas agregadas.</li>
              <li>Medir a eficácia de comunicações e publicidade.</li>
              <li>Melhorar segurança, prevenir fraudes e atividades ilegais.</li>
              <li>Notificar sobre mudanças nos serviços.</li>
              <li>Cumprir leis aplicáveis.</li>
            </ul>
          </div>

          {/* IV. Divulgação de Suas Informações */}
          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">IV. Divulgação de Suas Informações</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">Podemos divulgar Informações Pessoais:</p>
            <ul className="content-2 mt-3 list-disc space-y-2 pl-5 text-sm text-tc-gray-500">
              <li>Para fins de saúde, pagamento ou operações.</li>
              <li>A prestadores de serviço que mantêm e otimizam a Plataforma.</li>
              <li>A médicos, farmácias, laboratórios e afiliados.</li>
              <li>A processadores de cartão para pagamentos.</li>
              <li>Conforme exigido por lei ou com seu consentimento.</li>
              <li>Em caso de fusão, venda ou reorganização da empresa.</li>
            </ul>
          </div>

          {/* V. Suas Opções */}
          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">V. Suas Opções</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">Você pode:</p>
            <ul className="content-2 mt-3 list-disc space-y-2 pl-5 text-sm text-tc-gray-500">
              <li>Configurar seu navegador para recusar cookies (com risco de funcionalidades limitadas).</li>
              <li>Atualmente não respondemos a sinais "Do Not Track".</li>
            </ul>
          </div>

          {/* VI. Segurança dos Dados */}
          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">VI. Segurança dos Dados</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Implementamos medidas para proteger suas Informações Pessoais contra perdas e acessos não autorizados. Senhas são de sua responsabilidade.
            </p>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              A transmissão pela Internet não é totalmente segura e o uso da Plataforma é por sua conta e risco.
            </p>
          </div>

          {/* VII. Plataformas de Terceiros */}
          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">VII. Plataformas de Terceiros</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Nosso site pode conter links para sites de terceiros, aos quais esta Política não se aplica. Leia as políticas desses sites.
            </p>
          </div>

          {/* VIII. Serviços Para Maiores de 18 Anos */}
          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">VIII. Serviços Para Maiores de 18 Anos</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              A Theracorp não presta serviços a menores de 18 anos.
            </p>
          </div>

          {/* IX. Direitos de Privacidade de Residentes da Califórnia */}
          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">IX. Direitos de Privacidade de Residentes da Califórnia</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Se você é residente da Califórnia, a CCPA lhe concede direitos adicionais sobre suas informações pessoais, incluindo direito de saber, deletar, optar pela não venda e não sofrer discriminação. Nem todas as informações estão cobertas, como PHI regida pela HIPAA.
            </p>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Para exercer direitos, envie solicitação ao Compliance Officer pelo e-mail <a href="mailto:help@theracorp.org" className="text-tc-teal hover:underline">help@theracorp.org</a>.
            </p>
          </div>

          {/* X. Revisões da Política de Privacidade */}
          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">X. Revisões da Política de Privacidade</h2>
            <ul className="content-2 mt-3 list-disc space-y-2 pl-5 text-sm text-tc-gray-500">
              <li>Reservamo-nos o direito de alterar esta Política a qualquer momento. Publicaremos quaisquer alterações nesta página.</li>
            </ul>
          </div>

          {/* XI. Contato */}
          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">XI. Contato</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">Dúvidas ou comentários:</p>
            <p className="content-2 mt-2 text-sm text-tc-gray-500">
              <strong className="text-tc-gray-900">Theracorp Inc.</strong><br />
              Av. Ayrton Senna da Silva, 1055 - Guanabara<br />
              Londrina - PR<br />
              <a href="mailto:help@theracorp.org" className="text-tc-teal hover:underline">help@theracorp.org</a>
            </p>
          </div>

        </div>
      </div>

      {/* Barra de confiança */}
      <div className="mt-16 border-t border-tc-gray-200">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8 py-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 lg:divide-x divide-tc-gray-200">
            <div className="flex items-center gap-3 py-4 lg:py-0 lg:pl-0 lg:pr-6">
              <ShieldCheck className="h-6 w-6 text-tc-gray-700 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-tc-gray-900 whitespace-nowrap">Garantia Theracorp</span>
            </div>
            <div className="flex items-center gap-3 py-4 lg:py-0 lg:px-6">
              <Truck className="h-6 w-6 text-tc-gray-700 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-tc-gray-900 whitespace-nowrap">Entrega rápida e gratuita</span>
            </div>
            <div className="flex items-center gap-3 py-4 lg:py-0 lg:px-6">
              <Stethoscope className="h-6 w-6 text-tc-gray-700 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-tc-gray-900 whitespace-nowrap">Planos e acompanhamento médico</span>
            </div>
            <div className="flex items-center gap-3 py-4 lg:py-0 lg:pl-6 lg:pr-0">
              <CircleDollarSign className="h-6 w-6 text-tc-gray-700 flex-shrink-0" strokeWidth={1.5} />
              <span className="text-sm font-semibold text-tc-gray-900 whitespace-nowrap">Sem taxas ocultas</span>
            </div>
          </div>
        </div>
      </div>

      {/* Barra de contato */}
      <div className="border-t border-tc-gray-200">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8 py-5">
          <div className="flex flex-row items-center justify-between gap-4 flex-nowrap">
            <Link href="/" aria-label="Theracorp, página inicial">
              <Image src="/logo-theracorp.png" alt="Logo Theracorp" width={804} height={169} className="h-8 w-auto" />
            </Link>
            <div className="flex items-center gap-x-6 whitespace-nowrap">
              <div className="flex items-center gap-1.5 text-xs text-tc-gray-600 whitespace-nowrap">
                <AtSign className="h-3.5 w-3.5 text-tc-gray-500" strokeWidth={1.5} />
                <a href="mailto:help@theracorp.org" className="hover:text-tc-gray-900 hover:underline">help@theracorp.org</a>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-tc-gray-600 whitespace-nowrap">
                <Phone className="h-3.5 w-3.5 text-tc-gray-500" strokeWidth={1.5} />
                <a href="tel:+55449914808833" className="hover:text-tc-gray-900 hover:underline">(44) 9 9148-08833</a>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-tc-gray-600 whitespace-nowrap">
                <Mail className="h-3.5 w-3.5 text-tc-gray-500" strokeWidth={1.5} />
                <span>Av. Ayrton Senna da Silva, 1055 - Guanabara, Londrina - PR</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Avisos e disclaimers */}
      <div className="border-t border-tc-gray-200">
        <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8 py-8">
          <div className="space-y-4 text-xs text-tc-gray-500 leading-relaxed text-justify">
            <p>A avaliação disponibilizada no site da Theracorp não estabelece uma relação médico-paciente entre o indivíduo que a preenche e a Theracorp. Os médicos licenciados Theracorp seguem protocolos médicos rigorosos, concebidos para a segurança do paciente, estabelecemos critérios de exclusão para determinar se um indivíduo não se qualifica para o uso de GLP-1. As respostas fornecidas pelo indivíduo na avaliação da Theracorp determinam se ele é considerado inelegível para a medicação com GLP-1, e um profissional clínico da Theracorp se reunirá com o indivíduo após a finalização da compra para determinar se ele se qualifica para uma prescrição. Os profissionais clínicos da Theracorp têm a decisão de prescrever GLP-1 manipulado aos pacientes.</p>

            <p>Todas as alegações e benefícios neste site referem-se a dados autodeclarados de clientes de GLP-1 em um plano de tratamento que inclui medicamentos GLP-1 manipulados e consultas com profissionais médicos. Os clientes informaram seu peso no questionário médico inicial a cada 3-4 semanas subsequentes. Os resultados dos medicamentos manipulados encontrados na plataforma Theracorp podem variar e ser afetados pela adesão do indivíduo ao programa e às recomendações do seu médico. Os GLP-1 manipulados são produzidos em instalações regulamentadas pela ANVISA. Embora essas instalações sejam altamente regulamentadas, os medicamentos não são aprovados pela ANVISA nem avaliados quanto à segurança, eficácia ou qualidade. A decisão de usar medicamentos manipulados é orientada pelo julgamento médico do profissional licenciado, que é baseado em uma consulta de telemedicina e no histórico médico.</p>

            <p>Recomendamos que todos os potenciais usuários de medicamentos manipulados conversem com seu médico sobre os riscos e benefícios específicos que podem advir do uso desses medicamentos. A Theracorp não produz medicamentos manipulados e os indivíduos podem receber medicamentos com aparência diferente daquela apresentada no site.</p>

            <p><strong className="text-tc-gray-700">Parceiros Farmacêuticos:</strong> Temos parceria com diversas farmácias certificadas nos Brasil para oferecer os melhores produtos e a melhor experiência possível aos nossos membros. Nossa equipe se reúne regularmente com as farmácias para discutir possíveis faltas de produtos, atrasos no envio e obter relatórios atualizados sobre os testes de medicamentos.</p>

            <p>*Os resultados variam de acordo com o peso inicial e a adesão ao programa. Medidas de perda de peso nos quadris, cintura, peito, coxas e braços no primeiro mês. Os pacientes praticaram exercícios diariamente e seguiram uma dieta com redução de calorias. A perda de gordura relatada não é típica. Os resultados podem variar. A prescrição de medicamentos fica a critério dos profissionais de saúde e pode não ser adequada para todos. Pacientes tratados com Theracorp geralmente apresentam perda de peso de 0,5 a 1 kg por semana após 4 semanas, com uma dieta saudável e mudanças nos exercícios. Consulte um profissional de saúde antes de usar qualquer medicamento ou iniciar qualquer programa de perda de peso. *Com base na perda de peso média relatada por pacientes sem diabetes que atingiram e mantiveram uma dose de 2,4 mg/semana de tratamento com GLP-1, juntamente com uma dieta com redução de calorias e aumento da atividade física.</p>

            <p>A medicação está incluída no custo do Programa Theracorp. Wegovy® é aprovado pelo ANVISA para perda de peso. Ozempic® é aprovado pelo ANVISA para o tratamento de diabetes tipo 2, mas também pode ser prescrito para perda de peso. As marcas registradas, marcas de serviço, nomes comerciais (Wegovy®, Ozempic®) e produtos exibidos neste site são protegidos e pertencem aos seus respectivos proprietários. O tratamento médico é fornecido pela "CareGLP Affiliated PCs" e pela OpenLoop Health, redes afiliadas para corporações e associações médicas profissionais. Nenhum dado, foto, alegação ou qualquer outra informação está associada a resultados derivados de ensaios clínicos, estudos ou informações públicas e representa sempre a experiência do paciente Theracorp.</p>

            <p>Alguns materiais neste site, incluindo textos, imagens e outras mídias, podem ser gerados ou aprimorados por meio de tecnologias de inteligência artificial. Não garantimos a exatidão, integridade ou confiabilidade de tais conteúdos. As pessoas que aparecem nos anúncios podem ser atores ou modelos.</p>

            <p>Os depoimentos no site são de pacientes da Theracorp. Para preservar a privacidade dos pacientes, as imagens que representam esses depoimentos podem utilizar modelos.</p>

            <p>Ao aceitar nossos Termos de Uso, você também compreende e concorda que a Theracorp não atua como farmácia, nem controla ou interfere em quaisquer serviços desse tipo. Ao aceitar estes Termos de Uso, você compreende e concorda que pode estar estabelecendo um relacionamento com uma farmácia, farmacêutico e/ou grupo de farmácias ou outro tipo de relacionamento com uma ou mais entidades terceirizadas.</p>
          </div>
        </div>
      </div>

    </section>
  );
}
