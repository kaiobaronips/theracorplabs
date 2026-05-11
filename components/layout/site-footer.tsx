import Image from 'next/image';
import Link from 'next/link';

const footerLinks = [
  { href: '/termos', label: 'Termos e Condições' },
  { href: '/privacidade', label: 'Política de Privacidade' },
  { href: '/praticas-privacidade', label: 'Práticas de Privacidade' },
  { href: '/politica-reembolso', label: 'Política de Reembolso' },
  { href: '/consentimento-medico', label: 'Consentimento Médico' },
  { href: '/declaracao-direitos', label: 'Declaração de Direitos' },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-tc-gray-100 bg-white py-4">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
        {/* Main row: badge + copyright + links */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Left group: badge + copyright */}
          <div className="flex items-center gap-3 flex-shrink-0">
            <Image
              src="/legit-script.avif"
              alt="Certificado LegitScript"
              width={80}
              height={80}
              className="h-12 w-auto"
            />
            <p className="font-red-hat text-xs font-semibold text-tc-gray-900 whitespace-nowrap">
              &copy; 2026 Theracorp Inc. Todos os direitos reservados
            </p>
          </div>

          {/* Right group: links */}
          <nav aria-label="Navegação do rodapé">
            <ul className="flex flex-nowrap items-center text-xs text-tc-gray-500">
              {footerLinks.map((link, index) => (
                <li key={link.label} className="flex items-center">
                  {index > 0 && (
                    <span className="mx-1.5 text-tc-gray-200" aria-hidden="true">|</span>
                  )}
                  <Link
                    href={link.href}
                    className="hover:text-tc-gray-900 hover:underline underline-offset-2 transition-colors whitespace-nowrap"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Bottom row: LGPD seals — aligned right */}
        <div className="mt-3 flex justify-end items-center gap-3">
          <Image
            src="/seal-lgpd-2.avif"
            alt="Selo LGPD"
            width={80}
            height={80}
            className="h-14 w-auto"
          />
          <Image
            src="/lgpd-seal.png"
            alt="Selo de Conformidade LGPD"
            width={80}
            height={80}
            className="h-14 w-auto"
          />
          <Image
            src="/LGPD-brasil.png"
            alt="LGPD Brasil"
            width={200}
            height={100}
            className="h-14 w-auto"
          />
        </div>
      </div>
    </footer>
  );
}
