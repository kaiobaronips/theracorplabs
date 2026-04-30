import Image from 'next/image';
import Link from 'next/link';
import { Disclaimer } from '@/components/ui/disclaimer';

export function SiteFooter() {
  return (
    <footer className="border-t border-tc-gray-100 bg-white pb-16 pt-12">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">

        <div className="flex flex-col items-center gap-6">
          <Link
            href="/"
            aria-label="Theracorp, página inicial"
            className="inline-flex items-center"
          >
            <Image
              src="/logo-theracorp.png"
              alt="Logo Theracorp"
              width={843}
              height={596}
              className="h-11 w-auto"
            />
          </Link>

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
      </div>
    </footer>
  );
}
