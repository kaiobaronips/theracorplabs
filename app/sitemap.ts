import type { MetadataRoute } from 'next';
import { scopedRoutes, siteUrl } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  return scopedRoutes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date('2026-04-30'),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7
  }));
}
