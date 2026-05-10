'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function SiteHeader() {
  const pathname = usePathname();
  const isTermos = pathname === '/termos';

  return (
    <header
      className={`sticky top-0 z-50 pt-2 ${
        isTermos
          ? 'bg-[#00d4aa]/[0.92] backdrop-blur-[14px]'
          : 'bg-tc-teal'
      }`}
    >
      <div className="rounded-tl-2xl rounded-tr-2xl bg-white">
        <div className="mx-auto flex min-h-20 w-full max-w-[1200px] items-center justify-center px-4 py-3 md:px-8">
          <Link
            href="/"
            aria-label="Theracorp, página inicial"
            className="inline-flex items-center"
          >
            <Image src="/logo-theracorp-header-transparent.png" alt="Logo Theracorp" width={843} height={596} className="h-20 w-auto" priority />
          </Link>
        </div>
      </div>
    </header>
  );
}
