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

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
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

