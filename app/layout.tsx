import type { Metadata, Viewport } from 'next';
import './globals.css';
import { SiteHeader } from '@/components/layout/site-header';
import { SiteFooter } from '@/components/layout/site-footer';
import { siteUrl } from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Theracorp | Telemedicina Clínica Premium para Saúde Masculina',
  description:
    'Avaliação clínica por telemedicina, acompanhamento médico e exames com precisão clínica. Theracorp: cuidado premium, humano e baseado em evidências.',
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Theracorp',
    title: 'Theracorp | Telemedicina Clínica Premium para Saúde Masculina',
    description:
      'Avaliação clínica por telemedicina, acompanhamento médico e exames com precisão clínica. Theracorp: cuidado premium, humano e baseado em evidências.',
    url: '/'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Theracorp | Telemedicina Clínica Premium para Saúde Masculina',
    description:
      'Avaliação clínica por telemedicina, acompanhamento médico e exames com precisão clínica.'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00D4AA'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <a className="tc-skip-link" href="#conteudo-principal">
          Pular para conteúdo principal
        </a>
        <SiteHeader />
        <main id="conteudo-principal">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
