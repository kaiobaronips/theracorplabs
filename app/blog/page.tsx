import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/metadata';

export const metadata: Metadata = buildMetadata({
  title: 'Blog | Theracorp',
  description: 'Conteúdo clínico e educativo da Theracorp, com linguagem acessível e revisão de consistência técnica.',
  path: '/blog'
});

const posts = [
  {
    title: 'Como preparar sua primeira consulta por telemedicina',
    excerpt: 'Checklist prático para chegar à consulta com dados relevantes e dúvidas objetivas.'
  },
  {
    title: 'Leitura de exames: o que observar com contexto clínico',
    excerpt: 'Interpretação de exames deve considerar histórico, sintomas e plano terapêutico.'
  },
  {
    title: 'Adesão terapêutica: por que acompanhamento muda desfechos',
    excerpt: 'A consistência no acompanhamento ajuda a reduzir risco e ajustar conduta com segurança.'
  }
];

export default function BlogPage() {
  return (
    <section className="py-16 md:py-20">
      <div className="mx-auto w-full max-w-[1100px] px-4 md:px-8">
        <h1 className="text-4xl font-bold leading-tight tracking-[-0.02em] text-tc-gray-900 md:text-5xl">Blog</h1>
        <p className="mt-5 max-w-[70ch] text-tc-gray-500">
          Conteúdo educativo para apoiar decisões informadas. Material com foco clínico, linguagem clara e sem promessas indevidas.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.title} className="tc-card">
              <h2 className="text-lg font-semibold text-tc-gray-900">{post.title}</h2>
              <p className="mt-2 text-sm text-tc-gray-500">{post.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
