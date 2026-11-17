import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';

// Página pública de exclusão de conta do app Theracorp. O Google Play exige um
// endereço web onde a pessoa consiga pedir a exclusão sem ter o app instalado;
// a App Store exige a exclusão dentro do app (Perfil > Excluir conta).
// O texto espelha o que a API faz: apps/api/src/identity/exclusao-de-conta.service.ts
// no repositório theracorp.

export const metadata: Metadata = buildMetadata({
  title: 'Excluir sua conta | Theracorp',
  description: 'Como excluir sua conta do app Theracorp e o que acontece com seus dados.',
  path: '/excluir-conta'
});

const EMAIL = 'contato@theracorp.org';

export default function ExcluirContaPage() {
  return (
    <section className="bg-white py-16 md:py-20 font-red-hat">
      <div className="mx-auto w-full max-w-[900px] px-4 md:px-8">
        <h1 className="header-1 text-4xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900 md:text-5xl">
          Excluir sua conta
        </h1>
        <p className="content-2 mt-3 text-sm text-tc-gray-500">
          App Theracorp · Última atualização: 17 de novembro de 2026
        </p>

        <div className="mt-10 space-y-8">
          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">Pelo app (na hora)</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Abra o app Theracorp, toque na sua foto para entrar no <strong>Perfil</strong> e escolha{' '}
              <strong>Excluir conta</strong>. Confirme com a sua senha. A exclusão é imediata e você recebe
              uma confirmação por e-mail.
            </p>
          </div>

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">Sem o app</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Envie um e-mail para{' '}
              <a className="underline" href={`mailto:${EMAIL}?subject=Excluir%20minha%20conta%20Theracorp`}>
                {EMAIL}
              </a>{' '}
              a partir do <strong>mesmo endereço de e-mail cadastrado na sua conta</strong>, com o assunto
              “Excluir minha conta Theracorp”. Por segurança, não atendemos pedidos vindos de outro endereço,
              e nunca pedimos sua senha por e-mail. Respondemos confirmando quando a exclusão for concluída.
            </p>
          </div>

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">O que é apagado</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Seus dados de cadastro (nome, e-mail, data de nascimento e demais dados do perfil), seus exames,
              inclusive os arquivos que você enviou, os resultados extraídos deles e o histórico de perguntas ao
              assistente. Os acessos que você concedeu a profissionais são encerrados no mesmo instante. A foto de
              perfil e o acesso por Face ID ficam só no seu aparelho e são apagados dele pelo app.
            </p>
          </div>

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">O que fica, e por quê</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              Por exigência legal e de segurança, guardamos apenas o registro de quem acessou seus dados e quando.
              Ele não contém nenhum conteúdo de exame, nem seu nome ou e-mail. Cópias de segurança do banco de
              dados são substituídas automaticamente em até 7 dias, e o registro de envio de e-mails do nosso
              provedor segue o prazo dele.
            </p>
          </div>

          <div className="tc-card">
            <h2 className="content-1 text-xl font-semibold text-tc-gray-900">Antes de excluir</h2>
            <p className="content-2 mt-3 text-sm text-tc-gray-500">
              A exclusão não pode ser desfeita. Se quiser guardar seus exames, abra cada um no app e baixe o
              laudo original antes.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
