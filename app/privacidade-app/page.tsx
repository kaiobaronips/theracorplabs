import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/metadata';

// Política de Privacidade do APP Theracorp (exames e biomarcadores), a URL que a
// App Store e o Google Play exigem. É diferente da /politica-privacidade do site.
//
// Espelha o rascunho que o app mostra em
// theracorp/apps/app/src/conteudo/documentos-legais.ts — mudou lá, muda aqui.
// RASCUNHO: os campos "[a definir]" dependem do jurídico e não podem ser inventados.

export const metadata: Metadata = buildMetadata({
  title: 'Política de Privacidade do App | Theracorp',
  description: 'Como o app Theracorp trata os seus dados de saúde, conforme a LGPD.',
  path: '/privacidade-app'
});

const SECOES: { titulo: string; paragrafos: React.ReactNode[] }[] = [
  {
    titulo: 'Quem cuida dos seus dados',
    paragrafos: [
      'Controlador: [a definir — razão social e CNPJ]. Encarregado de dados (DPO): [a definir — nome e contato].'
    ]
  },
  {
    titulo: 'Quais dados coletamos',
    paragrafos: [
      'Dados da conta: nome, sobrenome, e-mail, senha (guardada só de forma cifrada), data de nascimento, sexo ao nascer e, se você informar, tipo sanguíneo.',
      'Dados de saúde: os laudos que você envia e os resultados lidos deles. São dados pessoais sensíveis pela LGPD (Lei 13.709/2018).',
      'Dados de uso e segurança: registros de acesso aos seus dados (quem, quando e com que finalidade), sem copiar o conteúdo dos exames.'
    ]
  },
  {
    titulo: 'Para que usamos',
    paragrafos: [
      'Para organizar e explicar os seus exames, montar o histórico de cada biomarcador, escolher a faixa de referência certa para você, responder às suas perguntas no Theracorp AI e manter a sua conta segura.',
      'Coletamos só o necessário para isso. Não vendemos dados.'
    ]
  },
  {
    titulo: 'Com quem compartilhamos',
    paragrafos: [
      'Com profissionais de saúde que você autorizar, no escopo e pelo prazo que você escolher.',
      'Com operadores que prestam serviço à Theracorp (hospedagem, armazenamento, e-mail e o provedor do Theracorp AI), sob contrato de proteção de dados: [a definir — lista de operadores].'
    ]
  },
  {
    titulo: 'Como protegemos',
    paragrafos: [
      'Conexões cifradas, arquivos em armazenamento privado com links de acesso curtos, senhas e códigos guardados só de forma cifrada, e um registro de auditoria que não pode ser alterado.',
      'No aparelho, a sessão fica no armazenamento seguro do sistema (Keychain no iPhone, Keystore no Android). Se você ativar o Face ID ou a biometria para entrar, o acesso fica protegido por ela e preso a este aparelho.'
    ]
  },
  {
    titulo: 'Seus direitos',
    paragrafos: [
      <>
        Você pode confirmar e acessar os seus dados, corrigir o perfil, pedir uma cópia, revogar acessos de
        profissionais e pedir a exclusão da conta, nos termos da LGPD. Veja{' '}
        <Link className="underline" href="/excluir-conta">
          como excluir sua conta
        </Link>
        .
      </>,
      'Alguns registros podem precisar ser guardados por obrigação legal. Prazos de retenção: [a definir].'
    ]
  },
  {
    titulo: 'Contato',
    paragrafos: ['Para exercer os seus direitos ou tirar dúvidas: [a definir — canal do encarregado].']
  }
];

export default function PrivacidadeAppPage() {
  return (
    <section className="bg-white py-16 md:py-20 font-red-hat">
      <div className="mx-auto w-full max-w-[900px] px-4 md:px-8">
        <h1 className="header-1 text-4xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900 md:text-5xl">
          Política de Privacidade do App
        </h1>
        <p className="content-2 mt-3 text-sm text-tc-gray-500">App Theracorp · Rascunho de 16 de novembro de 2026</p>
        <p className="content-2 mt-4 rounded-lg bg-tc-gray-100 p-4 text-sm text-tc-gray-900">
          Versão preliminar, em revisão jurídica. Pode mudar antes do lançamento; quando mudar, o app avisa e pede
          um novo aceite.
        </p>

        <div className="mt-10 space-y-8">
          {SECOES.map((secao) => (
            <div key={secao.titulo} className="tc-card">
              <h2 className="content-1 text-xl font-semibold text-tc-gray-900">{secao.titulo}</h2>
              {secao.paragrafos.map((p, i) => (
                <p key={i} className="content-2 mt-3 text-sm text-tc-gray-500">
                  {p}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
