import {Navbar} from '@/components/landing/navbar';
import {Hero} from '@/components/landing/hero';
import {Features} from '@/components/landing/features';
import {CTA} from '@/components/landing/cta';
import {Footer} from '@/components/landing/footer';
import {getTranslations} from 'next-intl/server';
import type {Metadata} from 'next';

type Props = {
  params: Promise<{locale: string}>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://feyzologistics.com';
  const title = t('title');
  const description = t('description');
  const ogImage = `${baseUrl}/logo.png`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}`,
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Home({params}: Props) {
  await params; // Ensure params are awaited
  return (
    <main className="min-h-screen w-full">
      <Navbar />
      <Hero />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}
