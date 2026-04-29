import Link from 'next/link';
import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Entrar | Theracorp',
  description: 'Acesse sua área do paciente para acompanhar orientações, histórico clínico e próximos passos.',
  path: '/login'
});

export default function LoginPage() {
  return (
    <section className="tc-section-wrapper py-16 md:py-20">
      <div className="mx-auto w-full max-w-[560px] px-4 md:px-8">
        <h1 className="header-1 text-4xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900">Entrar</h1>
        <p className="content-2 mt-4 text-sm text-tc-gray-500">Acesso seguro ao portal do paciente.</p>

        <form className="mt-8 space-y-4 tc-card" aria-label="Formulário de login">
          <div>
            <label htmlFor="email" className="content-1 mb-1 block text-sm font-medium text-tc-gray-900">E-mail</label>
            <input className="tc-input" id="email" type="email" autoComplete="email" required />
          </div>
          <div>
            <label htmlFor="senha" className="content-1 mb-1 block text-sm font-medium text-tc-gray-900">Senha</label>
            <input className="tc-input" id="senha" type="password" autoComplete="current-password" required />
          </div>
          <button type="submit" className="tc-btn-primary w-full">Entrar no portal</button>
        </form>

        <p className="content-2 mt-4 text-sm text-tc-gray-500">Ainda não possui acesso? <Link href="/cadastro" className="underline underline-offset-2">Criar cadastro</Link></p>
      </div>
    </section>
  );
}
