import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { LandingAbout } from "@/components/landing/landing-about";
import { LandingContact } from "@/components/landing/landing-contact";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingServices } from "@/components/landing/landing-services";
import { LandingTrust } from "@/components/landing/landing-trust";
import { routing } from "@/i18n/routing";
import { getBaseUrl } from "@/lib/site";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/${locale}`;

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "en" ? ["ar_SA"] : ["en_US"],
      type: "website",
      url: pageUrl,
      siteName: t("siteName"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("ogDescription"),
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        "x-default": `${baseUrl}/${routing.defaultLocale}`,
        en: `${baseUrl}/en`,
        ar: `${baseUrl}/ar`,
      },
    },
  };
}

export default async function Home({ params }: Props) {
  await params;
  return (
    <main className="min-h-screen w-full">
      <LandingNavbar />
      <LandingHero />
      <LandingServices />
      <LandingAbout />
      <LandingTrust />
      <LandingContact />
      <LandingFooter />
    </main>
  );
}
