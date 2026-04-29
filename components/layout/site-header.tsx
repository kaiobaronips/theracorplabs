import Image from 'next/image';
import Link from 'next/link';
import { navLinks } from '@/lib/site';

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-tc-teal pt-2">
      <div className="rounded-tl-2xl rounded-tr-2xl bg-white">
        <div className="mx-auto flex min-h-20 w-full max-w-[1200px] flex-col items-start justify-between gap-4 px-4 py-3 md:flex-row md:items-center md:px-8">
          <Link
            href="/"
            aria-label="Theracorp, página inicial"
            className="content-1 inline-flex items-center gap-3 text-base font-semibold text-tc-gray-900"
          >
            <Image src="/logo-theracorp-header-transparent.png" alt="Logo Theracorp" width={120} height={44} className="h-11 w-auto" priority />
            <span>Theracorp</span>
          </Link>

          <nav aria-label="Navegação principal" className="w-full md:w-auto">
            <ul className="flex flex-wrap items-center gap-4 text-sm text-tc-gray-500">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link className="content-2 underline-offset-2 hover:text-tc-gray-900 hover:underline" href={item.href}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
