import Image from 'next/image';
import Link from 'next/link';
import { Disclaimer } from '@/components/ui/disclaimer';

const footerLinks = [
  { href: '/sobre', label: 'Sobre' },
  { href: '/blog', label: 'Blog' },
  { href: '/login', label: 'Entrar' },
  { href: '/cadastro', label: 'Cadastro' },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-tc-gray-100 bg-white pb-16 pt-12">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <div className="flex-shrink-0 flex items-center justify-center md:justify-start">
            <Link href="/" aria-label="Theracorp, página inicial" className="inline-flex items-center">
              <Image src="/logo-theracorp.png" alt="Logo Theracorp" width={843} height={596} className="h-11 w-auto" />
            </Link>
          </div>

          <nav aria-label="Navegação do rodapé" className="w-full md:w-auto">
            <div className="flex flex-col sm:flex-row sm:gap-8 md:gap-12 lg:gap-20 items-start justify-center">
              <ul className="flex flex-col gap-2 text-sm text-tc-gray-500">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="content-2 underline-offset-2 hover:text-tc-gray-900 hover:underline">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </nav>

          <div className="w-full md:w-1/3 md:max-w-[360px]">
            <Disclaimer className="mt-4 md:mt-0" />
          </div>
        </div>
      </div>
    </footer>
  );
}
