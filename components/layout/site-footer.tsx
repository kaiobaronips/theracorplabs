import Image from 'next/image';
import Link from 'next/link';

const footerLinks = [
  { href: '/termos', label: 'Terms & Conditions' },
  { href: '/privacidade', label: 'Privacy Policy' },
  { href: '#', label: 'Privacy Practices' },
  { href: '#', label: 'Refund Policy' },
  { href: '#', label: 'Medical Consent' },
  { href: '#', label: 'Bill of Rights' },
] as const;

export function SiteFooter() {
  return (
    <footer className="border-t border-tc-gray-100 bg-white py-6">
      <div className="mx-auto w-full max-w-[1200px] px-4 md:px-8">
        {/* Top row: copyright + links */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="text-sm font-semibold text-tc-gray-900 whitespace-nowrap">
            &copy; 2026 Theracorp Inc. All rights reserved
          </p>

          <nav aria-label="Navegação do rodapé">
            <ul className="flex flex-wrap items-center gap-x-1 text-sm text-tc-gray-500">
              {footerLinks.map((link, index) => (
                <li key={link.label} className="flex items-center">
                  {index > 0 && (
                    <span className="mx-2 text-tc-gray-200" aria-hidden="true">|</span>
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

        {/* Bottom row: LegitScript badge */}
        <div className="mt-5">
          <Image
            src="/legit-script.avif"
            alt="LegitScript Certified"
            width={100}
            height={100}
            className="h-20 w-auto"
          />
        </div>
      </div>
    </footer>
  );
}
