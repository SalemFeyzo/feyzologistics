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

  return {
    title: t("title"),
    description: t("description"),
    keywords: t("keywords"),
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

