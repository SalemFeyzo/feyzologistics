import { getTranslations } from 'next-intl/server';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://feyzologistics.com';

interface OrganizationSchema {
  '@context': string;
  '@type': string;
  name: string;
  url: string;
  logo: string;
  description: string;
  contactPoint: {
    '@type': string;
    telephone: string;
    contactType: string;
    email: string;
    areaServed: string;
    availableLanguage: string[];
  };
  sameAs: string[];
  address: {
    '@type': string;
    streetAddress: string;
    addressLocality: string;
    addressCountry: string;
    postalCode: string;
  };
}

interface ServiceSchema {
  '@context': string;
  '@type': string;
  name: string;
  description: string;
  provider: {
    '@type': string;
    name: string;
  };
  areaServed: string;
  serviceType: string;
}

export async function generateOrganizationSchema(
  locale: string
): Promise<OrganizationSchema> {
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Feyzo Logistics',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: t('description'),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-555-123-4567',
      contactType: 'Customer Service',
      email: 'info@feyzologistics.com',
      areaServed: 'Worldwide',
      availableLanguage: ['en', 'ar'],
    },
    sameAs: [
      // Add your social media profiles here
      // 'https://www.facebook.com/feyzologistics',
      // 'https://www.twitter.com/feyzologistics',
      // 'https://www.linkedin.com/company/feyzologistics',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: '123 Logistics Street, Business District',
      addressLocality: 'City',
      addressCountry: 'Country',
      postalCode: '12345',
    },
  };
}

export async function generateServiceSchema(
  locale: string,
  serviceName: string,
  serviceDescription: string
): Promise<ServiceSchema> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'Organization',
      name: 'Feyzo Logistics',
    },
    areaServed: 'Worldwide',
    serviceType: 'Logistics Service',
  };
}

export function StructuredData({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

