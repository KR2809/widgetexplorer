import type { MetadataRoute } from 'next';

import { getSiteUrl } from '@/lib/env';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();

  const now = new Date();

  return [
    {
      url: new URL('/', base).toString(),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: new URL('/privacy', base).toString(),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
    {
      url: new URL('/terms', base).toString(),
      lastModified: now,
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ];
}
