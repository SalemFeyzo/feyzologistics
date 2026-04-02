import { getTranslations } from "next-intl/server";
import { getBaseUrl, getSocialProfileUrls } from "@/lib/site";

type JsonLdProps = {
  locale: string;
};

export async function JsonLd({ locale }: JsonLdProps) {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/${locale}`;
  const logoUrl = `${baseUrl}${locale === "ar" ? "/logo-ar.svg" : "/logo-en.svg"}`;

  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: t("title"),
    url: baseUrl,
    logo: logoUrl,
    description: t("description"),
    sameAs: getSocialProfileUrls(),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("title"),
    url: baseUrl,
    description: t("description"),
    inLanguage: locale === "ar" ? "ar-SY" : "en-US",
    publisher: {
      "@type": "Organization",
      name: t("title"),
      logo: { "@type": "ImageObject", url: logoUrl },
    },
  };

  const webPage = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("title"),
    description: t("description"),
    url: pageUrl,
    isPartOf: { "@type": "WebSite", name: t("title"), url: baseUrl },
    inLanguage: locale === "ar" ? "ar-SY" : "en-US",
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organization, website, webPage],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
