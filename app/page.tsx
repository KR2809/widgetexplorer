import { getSiteUrl } from '@/lib/env';
import { ShareButtons } from '@/components/ShareButtons';
import { WaitlistForm } from '@/components/WaitlistForm';

const product = {
  name: 'Acme',
  description: 'A minimal product landing page with analytics and SEO essentials configured.',
  category: 'WebApplication',
};

export default function HomePage() {
  const siteUrl = getSiteUrl();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: product.name,
    description: product.description,
    applicationCategory: product.category,
    operatingSystem: 'Web',
    url: siteUrl.toString(),
    offers: {
      '@type': 'Offer',
      url: siteUrl.toString(),
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/PreOrder',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section style={{ display: 'grid', gap: 18 }}>
        <h1 style={{ fontSize: 44, margin: 0, lineHeight: 1.05 }}>{product.name}</h1>
        <p style={{ margin: 0, color: 'var(--muted)', fontSize: 18, maxWidth: 680 }}>
          {product.description}
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 16, maxWidth: 560 }}>
          <WaitlistForm />
          <ShareButtons />
        </div>
      </section>
    </>
  );
}
