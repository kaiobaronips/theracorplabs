const fs = require('fs');
const path = require('path');

const footerBlock = fs.readFileSync('/tmp/footer_block.txt', 'utf8');

const pages = [
  {
    dir: 'app/praticas-privacidade',
    title: 'Práticas de Privacidade | Theracorp',
    desc: 'Conheça as práticas de privacidade da Theracorp e como protegemos seus dados pessoais.',
    h1: 'Práticas de Privacidade',
    sections: [
      { h2: 'Nosso Compromisso com a Privacidade', text: 'A Theracorp está comprometida em proteger a privacidade e a segurança das informações pessoais de todos os nossos usuários. Esta página descreve nossas práticas de privacidade e como tratamos seus dados em conformidade com a Lei Geral de Proteção de Dados (LGPD).' },
      { h2: 'Coleta de Dados', text: 'Coletamos apenas os dados necessários para prestar nossos serviços de telemedicina, incluindo informações de identificação, dados de saúde e informações de pagamento. Todos os dados são coletados com seu consentimento explícito.' },
      { h2: 'Armazenamento e Segurança', text: 'Seus dados são armazenados em servidores seguros com criptografia de ponta a ponta. Mantemos rigorosos controles de acesso para garantir que apenas profissionais autorizados tenham acesso às suas informações.' },
      { h2: 'Compartilhamento de Dados', text: 'Não compartilhamos seus dados pessoais com terceiros sem seu consentimento, exceto quando necessário para a prestação dos serviços de saúde (médicos, farmácias e laboratórios parceiros) ou por obrigação legal.' },
      { h2: 'Seus Direitos', text: 'Você tem direito a acessar, corrigir, excluir e portar seus dados pessoais. Para exercer esses direitos, entre em contato conosco pelo e-mail' }
    ]
  },
  {
    dir: 'app/politica-reembolso',
    title: 'Política de Reembolso | Theracorp',
    desc: 'Conheça a política de reembolso e cancelamento da Theracorp.',
    h1: 'Política de Reembolso',
    sections: [
      { h2: 'Política de Cancelamento e Reembolso', text: 'Agradecemos por escolher a Theracorp. Esta política descreve os termos de cancelamento e reembolso para nossos serviços de telemedicina e planos de assinatura.' },
      { h2: 'Consultas Médicas', text: 'As taxas de consulta médica não são reembolsáveis após a realização da consulta. Caso você cancele com pelo menos 24 horas de antecedência, o valor será integralmente reembolsado.' },
      { h2: 'Planos de Assinatura', text: 'Você pode cancelar sua assinatura a qualquer momento. O cancelamento será efetivado ao final do período de faturamento vigente. Não oferecemos reembolso proporcional para cancelamentos no meio do ciclo de faturamento.' },
      { h2: 'Medicamentos', text: 'Não aceitamos devoluções de medicamentos prescritos para reutilização ou revenda, e todas as vendas são finais. Caso haja algum problema com seu pedido, entre em contato conosco para avaliação caso a caso.' },
      { h2: 'Como Solicitar um Reembolso', text: 'Para solicitar um reembolso, entre em contato conosco pelo e-mail' }
    ]
  },
  {
    dir: 'app/consentimento-medico',
    title: 'Consentimento Médico | Theracorp',
    desc: 'Termo de Consentimento Informado para Telemedicina da Theracorp.',
    h1: 'Consentimento Informado para Telemedicina',
    sections: [
      { h2: 'O Que é Telemedicina', text: 'A telemedicina utiliza tecnologias de comunicação eletrônica para conectar pacientes a profissionais de saúde licenciados em localidades diferentes, permitindo consultas, avaliações e acompanhamento médico remoto.' },
      { h2: 'Benefícios da Telemedicina', text: null, isList: true, listItems: ['Acesso conveniente a cuidados de saúde sem necessidade de deslocamento', 'Redução do tempo de espera para consultas', 'Continuidade do cuidado com acompanhamento remoto', 'Acesso a especialistas independentemente da localização geográfica'] },
      { h2: 'Riscos e Limitações', text: null, isList: true, listItems: ['Possibilidade de falhas técnicas na transmissão de áudio e vídeo', 'Limitações na realização de exames físicos completos', 'Nem todas as condições médicas podem ser avaliadas adequadamente por telemedicina', 'Em caso de emergência, você deve procurar atendimento presencial imediatamente'] },
      { h2: 'Confidencialidade', text: 'Todas as comunicações realizadas durante a consulta de telemedicina são confidenciais e protegidas pelas leis de privacidade aplicáveis, incluindo a LGPD. Suas informações de saúde serão armazenadas de forma segura e acessíveis apenas a profissionais autorizados.' },
      { h2: 'Seu Consentimento', text: 'Ao utilizar os serviços da Theracorp, você reconhece que leu e compreendeu este termo de consentimento e concorda em participar de consultas por telemedicina. Você tem o direito de recusar ou interromper o uso da telemedicina a qualquer momento e buscar atendimento presencial.' },
      { h2: 'Contato', text: 'Em caso de dúvidas sobre este consentimento, entre em contato pelo e-mail' }
    ]
  },
  {
    dir: 'app/declaracao-direitos',
    title: 'Declaração de Direitos | Theracorp',
    desc: 'Conheça seus direitos como paciente da Theracorp.',
    h1: 'Declaração de Direitos',
    sections: [
      { h2: null, isIntro: true },
      { h2: '1. Direito a Informação Clara', text: 'Você tem direito a receber informações claras e completas sobre seus diagnósticos, opções de tratamento, riscos e benefícios, em linguagem acessível.' },
      { h2: '2. Direito ao Consentimento', text: 'Nenhum procedimento ou tratamento será realizado sem seu consentimento informado. Você tem o direito de recusar qualquer tratamento a qualquer momento.' },
      { h2: '3. Direito à Privacidade', text: 'Suas informações de saúde e dados pessoais são confidenciais e protegidos. Nenhuma informação será divulgada sem sua autorização, exceto quando exigido por lei.' },
      { h2: '4. Direito ao Acesso aos Registros', text: 'Você tem direito a acessar, solicitar cópias e corrigir seus registros médicos e informações de saúde a qualquer momento.' },
      { h2: '5. Direito a Atendimento Respeitoso', text: 'Você tem direito a ser tratado com dignidade, respeito e sem discriminação de qualquer natureza, incluindo raça, gênero, orientação sexual, religião ou condição socioeconômica.' },
      { h2: '6. Direito a Segunda Opinião', text: 'Você tem direito a buscar uma segunda opinião médica sobre seu diagnóstico ou plano de tratamento a qualquer momento.' },
      { h2: '7. Direito a Transparência de Custos', text: 'Você tem direito a receber informações detalhadas sobre custos dos serviços antes de realizar qualquer procedimento ou contratar qualquer plano.' },
      { h2: '8. Direito a Apresentar Reclamações', text: 'Você tem direito a apresentar reclamações sobre qualquer aspecto do seu atendimento sem retaliação. Todas as reclamações serão investigadas e receberão uma resposta.' },
      { h2: 'Contato para Dúvidas', text: 'Se tiver dúvidas sobre seus direitos como paciente, entre em contato conosco pelo e-mail' }
    ]
  }
];

function buildSections(sections) {
  let html = '';
  for (const s of sections) {
    if (s.isIntro) {
      html += `          <div className="tc-card">\n            <p className="content-2 text-sm text-tc-gray-500">\n              <strong className="text-tc-gray-900">\n                Na Theracorp, acreditamos que pacientes informados são pacientes empoderados.\n                Abaixo estão seus direitos fundamentais ao utilizar nossos serviços.\n              </strong>\n            </p>\n          </div>\n`;
      continue;
    }
    html += `          <div className="tc-card">\n`;
    if (s.h2) html += `            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">${s.h2}</h2>\n`;
    if (s.text) {
      html += `            <p className="content-2 mt-3 text-sm text-tc-gray-500">${s.text}</p>\n`;
    }
    if (s.isList && s.listItems) {
      html += `            <ul className="content-2 mt-3 list-disc space-y-2 pl-5 text-sm text-tc-gray-500">\n`;
      for (const item of s.listItems) {
        html += `              <li>${item}</li>\n`;
      }
      html += `            </ul>\n`;
    }
    html += `          </div>\n`;
  }
  return html;
}

for (const page of pages) {
  const funcName = page.dir.split('/').pop().split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Page';
  const sections = buildSections(page.sections);
  
  let content = `import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildMetadata } from '@/lib/metadata';
import { ShieldCheck, Truck, Stethoscope, CircleDollarSign, AtSign, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: '${page.title}',
  description: '${page.desc}',
  path: '/${page.dir.split('/').pop()}'
});

export default function ${funcName}() {
  return (
    <section className="bg-white py-16 md:py-20 font-red-hat">
      <div className="mx-auto w-full max-w-[900px] px-4 md:px-8">
        <h1 className="header-1 text-4xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900 md:text-5xl">
          ${page.h1}
        </h1>
        <p className="content-2 mt-3 text-sm text-tc-gray-500">Última atualização: 10 de maio de 2026</p>

        <div className="mt-10 space-y-8">
${sections}        </div>
      </div>
    </section>
  );
}`.trim() + '\n';

  const idx = content.lastIndexOf('</section>');
  content = content.slice(0, idx) + '\n' + footerBlock + content.slice(idx);

  fs.mkdirSync(page.dir, { recursive: true });
  fs.writeFileSync(page.dir + '/page.tsx', content, 'utf8');
  console.log('OK: ' + page.dir + '/page.tsx');
}

console.log('All done!');
