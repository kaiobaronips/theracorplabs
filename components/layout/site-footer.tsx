import Link from 'next/link';
import { Disclaimer } from '@/components/ui/disclaimer';

export function SiteFooter() {
  return (
    <footer className="border-t border-tc-gray-100 bg-white pb-16 pt-12">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
        <nav aria-label="Navegação do rodapé">
          <ul className="flex flex-wrap gap-4 text-sm text-tc-gray-500">
            <li>
              <Link href="/sobre" className="content-2 underline-offset-2 hover:text-tc-gray-900 hover:underline">
                Sobre
              </Link>
            </li>
            <li>
              <Link href="/blog" className="content-2 underline-offset-2 hover:text-tc-gray-900 hover:underline">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/cadastro" className="content-2 underline-offset-2 hover:text-tc-gray-900 hover:underline">
                Cadastro
              </Link>
            </li>
            <li>
              <Link href="/login" className="content-2 underline-offset-2 hover:text-tc-gray-900 hover:underline">
                Entrar
              </Link>
            </li>
          </ul>
        </nav>

        <Disclaimer className="mt-6" />
      </div>
    </footer>
  );
}
