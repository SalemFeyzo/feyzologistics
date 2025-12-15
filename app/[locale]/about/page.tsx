import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { AboutHero } from "@/components/about/about-hero";
import { AboutMission } from "@/components/about/about-mission";
import { AboutVision } from "@/components/about/about-vision";
import { AboutValues } from "@/components/about/about-values";
import { AboutStats } from "@/components/about/about-stats";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "AboutMetadata" });
  
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
      canonical: `${baseUrl}/${locale}/about`,
      languages: {
        'en': `${baseUrl}/en/about`,
        'ar': `${baseUrl}/ar/about`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/about`,
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

export default async function AboutPage({ params }: Props) {
  return (
    <main className="min-h-screen w-full">
      <Navbar />
      <AboutHero />
      <AboutStats />
      <AboutMission />
      <AboutVision />
      <AboutValues />
      <Footer />
    </main>
  );
}

