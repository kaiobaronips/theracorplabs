const fs = require('fs');
const path = require('path');

const footerBlock = fs.readFileSync('/tmp/footer_block.txt', 'utf8');

const pages = [
  {
    dir: 'app/praticas-privacidade',
    title: 'Pr\xe1ticas de Privacidade | Theracorp',
    desc: 'Conhe\xe7a as pr\xe1ticas de privacidade da Theracorp e como protegemos seus dados pessoais.',
    h1: 'Pr\xe1ticas de Privacidade',
    sections: [
      {
        h2: 'Nosso Compromisso com a Privacidade',
        text: 'A Theracorp est\xe1 comprometida em proteger a privacidade e a seguran\xe7a das informa\xe7\xf5es pessoais de todos os nossos usu\xe1rios. Esta p\xe1gina descreve nossas pr\xe1ticas de privacidade e como tratamos seus dados em conformidade com a Lei Geral de Prote\xe7\xe3o de Dados (LGPD).'
      },
      {
        h2: 'Coleta de Dados',
        text: 'Coletamos apenas os dados necess\xe1rios para prestar nossos servi\xe7os de telemedicina, incluindo informa\xe7\xf5es de identifica\xe7\xe3o, dados de sa\xfade e informa\xe7\xf5es de pagamento. Todos os dados s\xe3o coletados com seu consentimento expl\xedcito.'
      },
      {
        h2: 'Armazenamento e Seguran\xe7a',
        text: 'Seus dados s\xe3o armazenados em servidores seguros com criptografia de ponta a ponta. Mantemos rigorosos controles de acesso para garantir que apenas profissionais autorizados tenham acesso \xe0s suas informa\xe7\xf5es.'
      },
      {
        h2: 'Compartilhamento de Dados',
        text: 'N\xe3o compartilhamos seus dados pessoais com terceiros sem seu consentimento, exceto quando necess\xe1rio para a presta\xe7\xe3o dos servi\xe7os de sa\xfade (m\xe9dicos, farm\xe1cias e laborat\xf3rios parceiros) ou por obriga\xe7\xe3o legal.'
      },
      {
        h2: 'Seus Direitos',
        text: 'Voc\xea tem direito a acessar, corrigir, excluir e portar seus dados pessoais. Para exercer esses direitos, entre em contato conosco pelo e-mail'
      }
    ]
  },
  {
    dir: 'app/politica-reembolso',
    title: 'Pol\xedtica de Reembolso | Theracorp',
    desc: 'Conhe\xe7a a pol\xedtica de reembolso e cancelamento da Theracorp.',
    h1: 'Pol\xedtica de Reembolso',
    sections: [
      { h2: 'Pol\xedtica de Cancelamento e Reembolso', text: 'Agradecemos por escolher a Theracorp. Esta pol\xedtica descreve os termos de cancelamento e reembolso para nossos servi\xe7os de telemedicina e planos de assinatura.' },
      { h2: 'Consultas M\xe9dicas', text: 'As taxas de consulta m\xe9dica n\xe3o s\xe3o reembols\xe1veis ap\xf3s a realiza\xe7\xe3o da consulta. Caso voc\xea cancele com pelo menos 24 horas de anteced\xedncia, o valor ser\xe1 integralmente reembolsado.' },
      { h2: 'Planos de Assinatura', text: 'Voc\xea pode cancelar sua assinatura a qualquer momento. O cancelamento ser\xe1 efetivado ao final do per\xedodo de faturamento vigente. N\xe3o oferecemos reembolso proporcional para cancelamentos no meio do ciclo de faturamento.' },
      { h2: 'Medicamentos', text: 'N\xe3o aceitamos devolu\xe7\xf5es de medicamentos prescritos para reutiliza\xe7\xe3o ou revenda, e todas as vendas s\xe3o finais. Caso haja algum problema com seu pedido, entre em contato conosco para avalia\xe7\xe3o caso a caso.' },
      { h2: 'Como Solicitar um Reembolso', text: 'Para solicitar um reembolso, entre em contato conosco pelo e-mail' }
    ]
  },
  {
    dir: 'app/consentimento-medico',
    title: 'Consentimento M\xe9dico | Theracorp',
    desc: 'Termo de Consentimento Informado para Telemedicina da Theracorp.',
    h1: 'Consentimento Informado para Telemedicina',
    sections: [
      { h2: 'O Que \xe9 Telemedicina', text: 'A telemedicina utiliza tecnologias de comunica\xe7\xe3o eletr\xf4nica para conectar pacientes a profissionais de sa\xfade licenciados em localidades diferentes, permitindo consultas, avalia\xe7\xf5es e acompanhamento m\xe9dico remoto.' },
      { h2: 'Benef\xedcios da Telemedicina', text: null, isList: true },
      { h2: 'Riscos e Limita\xe7\xf5es', text: null, isList: true },
      { h2: 'Confidencialidade', text: 'Todas as comunica\xe7\xf5es realizadas durante a consulta de telemedicina s\xe3o confidenciais e protegidas pelas leis de privacidade aplic\xe1veis, incluindo a LGPD. Suas informa\xe7\xf5es de sa\xfade ser\xe3o armazenadas de forma segura e acess\xedveis apenas a profissionais autorizados.' },
      { h2: 'Seu Consentimento', text: 'Ao utilizar os servi\xe7os da Theracorp, voc\xea reconhece que leu e compreendeu este termo de consentimento e concorda em participar de consultas por telemedicina. Voc\xea tem o direito de recusar ou interromper o uso da telemedicina a qualquer momento e buscar atendimento presencial.' },
      { h2: 'Contato', text: 'Em caso de d\xfavidas sobre este consentimento, entre em contato pelo e-mail' }
    ]
  },
  {
    dir: 'app/declaracao-direitos',
    title: 'Declara\xe7\xe3o de Direitos | Theracorp',
    desc: 'Conhe\xe7a seus direitos como paciente da Theracorp.',
    h1: 'Declara\xe7\xe3o de Direitos',
    sections: [
      { h2: null, text: null, isRightsIntro: true },
      { h2: '1. Direito a Informa\xe7\xe3o Clara', text: 'Voc\xea tem direito a receber informa\xe7\xf5es claras e completas sobre seus diagn\xf3sticos, op\xe7\xf5es de tratamento, riscos e benef\xedcios, em linguagem acess\xedvel.' },
      { h2: '2. Direito ao Consentimento', text: 'Nenhum procedimento ou tratamento ser\xe1 realizado sem seu consentimento informado. Voc\xea tem o direito de recusar qualquer tratamento a qualquer momento.' },
      { h2: '3. Direito \xe0 Privacidade', text: 'Suas informa\xe7\xf5es de sa\xfade e dados pessoais s\xe3o confidenciais e protegidos. Nenhuma informa\xe7\xe3o ser\xe1 divulgada sem sua autoriza\xe7\xe3o, exceto quando exigido por lei.' },
      { h2: '4. Direito ao Acesso aos Registros', text: 'Voc\xea tem direito a acessar, solicitar c\xf3pias e corrigir seus registros m\xe9dicos e informa\xe7\xf5es de sa\xfade a qualquer momento.' },
      { h2: '5. Direito a Atendimento Respeitoso', text: 'Voc\xea tem direito a ser tratado com dignidade, respeito e sem discrimina\xe7\xe3o de qualquer natureza, incluindo ra\xe7a, g\xeanero, orienta\xe7\xe3o sexual, religi\xe3o ou condi\xe7\xe3o socioecon\xf4mica.' },
      { h2: '6. Direito a Segunda Opini\xe3o', text: 'Voc\xea tem direito a buscar uma segunda opini\xe3o m\xe9dica sobre seu diagn\xf3stico ou plano de tratamento a qualquer momento.' },
      { h2: '7. Direito a Transpar\xea\xedncia de Custos', text: 'Voc\xea tem direito a receber informa\xe7\xf5es detalhadas sobre custos dos servi\xe7os antes de realizar qualquer procedimento ou contratar qualquer plano.' },
      { h2: '8. Direito a Apresentar Reclama\xe7\xf5es', text: 'Voc\xea tem direito a apresentar reclama\xe7\xf5es sobre qualquer aspecto do seu atendimento sem retalia\xe7\xe3o. Todas as reclama\xe7\xf5es ser\xe3o investigadas e receber\xe3o uma resposta.' },
      { h2: 'Contato para D\xfavidas', text: 'Se tiver d\xfavidas sobre seus direitos como paciente, entre em contato conosco pelo e-mail' }
    ]
  }
];

function buildSections(sections, funcName) {
  let html = '';
  for (const s of sections) {
    if (s.isRightsIntro) {
      html += '          <div className="tc-card">\n            <p className="content-2 text-sm text-tc-gray-500">\n              <strong className="text-tc-gray-900">\n                Na Theracorp, acreditamos que pacientes informados s\xe3o pacientes empoderados.\n                Abaixo est\xe3o seus direitos fundamentais ao utilizar nossos servi\xe7os.\n              </strong>\n            </p>\n          </div>\n';
      continue;
    }
    if (s.isList && funcName === 'ConsentimentoMedicoPage') {
      let items = [];
      if (s.h2 === 'Benef\xedcios da Telemedicina') {
        items = ['Acesso conveniente a cuidados de sa\xfade sem necessidade de deslocamento','Redu\xe7\xe3o do tempo de espera para consultas','Continuidade do cuidado com acompanhamento remoto','Acesso a especialistas independentemente da localiza\xe7\xe3o geogr\xe1fica'];
      } else if (s.h2 === 'Riscos e Limita\xe7\xf5es') {
        items = ['Possibilidade de falhas t\xe9cnicas na transmiss\xe3o de \xe1udio e v\xeddeo','Limita\xe7\xf5es na realiza\xe7\xe3o de exames f\xedsicos completos','Nem todas as condi\xe7\xf5es m\xe9dicas podem ser avaliadas adequadamente por telemedicina','Em caso de emerg\xeancias, voc\xea deve procurar atendimento presencial imediatamente'];
      }
      html += '          <div className="tc-card">\n            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">' + s.h2 + '</h2>\n            <ul className="content-2 mt-3 list-disc space-y-2 pl-5 text-sm text-tc-gray-500">\n';
      for (const item of items) {
        html += '              <li>' + item + '</li>\n';
      }
      html += '            </ul>\n          </div>\n';
      continue;
    }
    html += '          <div className="tc-card">\n            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">' + s.h2 + '</h2>\n';
    if (s.text) {
      html += '            <p className="content-2 mt-3 text-sm text-tc-gray-500">' + s.text + '</p>\n';
    }
    html += '          </div>\n';
  }
  return html;
}

for (const page of pages) {
  const funcName = path.basename(page.dir).split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join('') + 'Page';
  
  const sections = buildSections(page.sections, funcName);
  
  const content = `import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { buildMetadata } from '@/lib/metadata';
import { ShieldCheck, Truck, Stethoscope, CircleDollarSign, AtSign, Phone, Mail } from 'lucide-react';

export const metadata: Metadata = buildMetadata({
  title: '${page.title}',
  description: '${page.desc}',
  path: '/${path.basename(page.dir)}'
});

export default function ${funcName}() {
  return (
    <section className="bg-white py-16 md:py-20 font-red-hat">
      <div className="mx-auto w-full max-w-[900px] px-4 md:px-8">
        <h1 className="header-1 text-4xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900 md:text-5xl">
          ${page.h1}
        </h1>
        <p className="content-2 mt-3 text-sm text-tc-gray-500">\xdaltima atualiza\xe7\xe3o: 10 de maio de 2026</p>

        <div className="mt-10 space-y-8">
${sections}        </div>
      </div>
    </section>
  );
}`.trim() + '\n';

  // Add footer before last </section>
  const idx = content.lastIndexOf('</section>');
  const finalContent = content.slice(0, idx) + '\n' + footerBlock + content.slice(idx);

  fs.mkdirSync(page.dir, { recursive: true });
  fs.writeFileSync(page.dir + '/page.tsx', finalContent, 'utf8');
  console.log('OK: ' + page.dir + '/page.tsx');
}

console.log('All pages created!');