import type { Metadata } from 'next';
import Link from 'next/link';

import './globals.css';

import { AnalyticsClient } from '@/components/AnalyticsClient';
import { getSiteUrl, isProductionIndexable } from '@/lib/env';

const siteUrl = getSiteUrl();

const title = 'Acme';
const description = 'A minimal product landing page with SEO + analytics wired from day one.';

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: title,
    template: `%s | ${title}`,
  },
  description,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    url: '/',
    title,
    description,
    siteName: title,
    images: [
      {
        url: 'https://placehold.co/1200x630/png?text=Acme',
        width: 1200,
        height: 630,
        alt: `${title} OpenGraph image`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: ['https://placehold.co/1200x630/png?text=Acme'],
  },
  robots: isProductionIndexable()
    ? { index: true, follow: true }
    : {
        index: false,
        follow: false,
        nocache: true,
      },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header style={{ display: 'flex', justifyContent: 'space-between', gap: 16 }}>
            <div style={{ fontWeight: 700 }}>{title}</div>
            <nav style={{ display: 'flex', gap: 12 }}>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </nav>
          </header>

          <main style={{ marginTop: 28 }}>{children}</main>

          <footer style={{ marginTop: 40, paddingBottom: 20 }}>
            <hr />
            <small>
              © {new Date().getFullYear()} {title}
            </small>
          </footer>
        </div>

        <AnalyticsClient />
      </body>
    </html>
  );
}
