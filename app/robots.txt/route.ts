import { getSiteUrl, isProductionIndexable } from '@/lib/env';

export const dynamic = 'force-static';

export function GET() {
  const base = getSiteUrl();
  const indexable = isProductionIndexable();

  const lines: string[] = [];

  lines.push('User-agent: *');
  lines.push(indexable ? 'Allow: /' : 'Disallow: /');
  lines.push('');
  lines.push(`Sitemap: ${new URL('/sitemap.xml', base).toString()}`);
  lines.push('');

  return new Response(lines.join('\n'), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=0, must-revalidate',
    },
  });
}
