import type { Metadata } from 'next';
import { siteUrl } from '@/lib/site';

const logoUrl = `${siteUrl}/logo-theracorp.png`;

const ogImage = {
  url: logoUrl,
  width: 843,
  height: 596,
  alt: 'Logo Theracorp',
};

type BuildMetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function buildMetadata({ title, description, path }: BuildMetadataInput): Metadata {
  const canonical = `${siteUrl}${path}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'Theracorp',
      locale: 'pt_BR',
      type: 'website',
      images: [ogImage],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [logoUrl],
    },
  };
}
