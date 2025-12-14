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

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
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

