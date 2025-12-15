import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ServiceDetail } from "@/components/services/service-detail";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

const validSlugs = [
  "express-shipping",
  "freight-services",
  "warehousing",
  "supply-chain",
];

const slugToTranslationKey: Record<string, string> = {
  "express-shipping": "expressShipping",
  "freight-services": "freightServices",
  warehousing: "warehousing",
  "supply-chain": "supplyChain",
};

export async function generateStaticParams() {
  return validSlugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale, slug } = await params;

  if (!validSlugs.includes(slug)) {
    return {
      title: "Service Not Found",
    };
  }

  const translationKey = slugToTranslationKey[slug];
  const t = await getTranslations({
    locale,
    namespace: `Services.${translationKey}`,
  });
  
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://feyzologistics.com';
  const title = `${t("title")} - Feyzo Logistics`;
  const description = t("description");
  const ogImage = `${baseUrl}/logo.png`;

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}/${locale}/services/${slug}`,
      languages: {
        'en': `${baseUrl}/en/services/${slug}`,
        'ar': `${baseUrl}/ar/services/${slug}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/services/${slug}`,
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

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;

  if (!validSlugs.includes(slug)) {
    notFound();
  }

  return (
    <main className="min-h-screen w-full">
      <Navbar />
      <ServiceDetail slug={slug} />
      <Footer />
    </main>
  );
}

