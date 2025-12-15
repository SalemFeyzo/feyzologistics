import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ServicesHero } from "@/components/services/services-hero";
import { ServicesList } from "@/components/services/services-list";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesMetadata" });
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://feyzologistics.com';
  const title = t("title");
  const description = t("description");
  const keywords = t("keywords");
  const ogImage = `${baseUrl}/logo.png`;

  return {
    title,
    description,
    keywords: keywords.split(', '),
    alternates: {
      canonical: `${baseUrl}/${locale}/services`,
      languages: {
        'en': `${baseUrl}/en/services`,
        'ar': `${baseUrl}/ar/services`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/services`,
      type: 'website',
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

export default async function ServicesPage({ params }: Props) {
  return (
    <main className="min-h-screen w-full">
      <Navbar />
      <ServicesHero />
      <ServicesList />
      <Footer />
    </main>
  );
}

