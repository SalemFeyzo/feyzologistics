import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { ContactHero } from "@/components/contact/contact-hero";
import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/contact/contact-info";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ContactMetadata" });
  
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
      canonical: `${baseUrl}/${locale}/contact`,
      languages: {
        'en': `${baseUrl}/en/contact`,
        'ar': `${baseUrl}/ar/contact`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/contact`,
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

export default async function ContactPage({ params }: Props) {
  return (
    <main className="min-h-screen w-full">
      <Navbar />
      <ContactHero />
      <div className="container px-4 md:px-6 py-16 mx-auto">
        <div className="grid gap-12 md:grid-cols-2 max-w-6xl mx-auto">
          <ContactForm />
          <ContactInfo />
        </div>
      </div>
      <Footer />
    </main>
  );
}

