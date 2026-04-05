import { getTranslations } from "next-intl/server";
import {
  getContactEmail,
  getTelephoneE164,
} from "@/lib/contact-details";
import { getBaseUrl, getSocialProfileUrls } from "@/lib/site";

type JsonLdProps = {
  locale: string;
};

type ServiceItem = {
  title: string;
  description: string;
};

/** Same legal entity: Arabic + English trade names for cross-language entity reconciliation. */
const ENTITY_NAMES = [
  "Feyzo Logistics",
  "فيزو للخدمات اللوجستية",
] as const;

export async function JsonLd({ locale }: JsonLdProps) {
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const tServices = await getTranslations({ locale, namespace: "Services" });
  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/${locale}`;
  const logoUrl = `${baseUrl}${locale === "ar" ? "/logo-ar.svg" : "/logo-en.svg"}`;
  const businessId = `${baseUrl}/#business`;
  const websiteId = `${baseUrl}/#website`;

  /** Legal / display name: AR → فيزو للخدمات اللوجستية, EN → Feyzo Logistics */
  const businessName = t("siteName");
  const serviceItems = tServices.raw("items") as ServiceItem[];
  const coreServices = serviceItems.slice(0, 3);

  const postalAddress = {
    "@type": "PostalAddress",
    streetAddress: t("address.streetAddress"),
    addressLocality: t("address.addressLocality"),
    addressRegion: t("address.addressRegion"),
    addressCountry: t("address.addressCountry"),
  };

  const makesOffer = coreServices.map((item) => ({
    "@type": "Offer",
    itemOffered: {
      "@type": "Service",
      name: item.title,
      description: item.description,
    },
  }));

  const organizationAndLocalBusiness = {
    "@id": businessId,
    "@type": ["Organization", "LocalBusiness"],
    name: businessName,
    legalName: businessName,
    alternateName: ENTITY_NAMES.filter((n) => n !== businessName),
    knowsLanguage: ["ar", "en"],
    url: baseUrl,
    image: [logoUrl],
    logo: { "@type": "ImageObject", url: logoUrl },
    description: t("description"),
    telephone: getTelephoneE164(),
    email: getContactEmail(),
    address: postalAddress,
    sameAs: getSocialProfileUrls(),
    makesOffer,
    areaServed: [
      {
        "@type": "Country",
        name: locale === "ar" ? "سوريا" : "Syria",
      },
      {
        "@type": "City",
        name: t("address.addressLocality"),
      },
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: getTelephoneE164(),
        email: getContactEmail(),
        contactType: locale === "ar" ? "خدمة العملاء" : "Customer service",
        areaServed: {
          "@type": "Country",
          name: locale === "ar" ? "سوريا" : "Syria",
        },
        availableLanguage:
          locale === "ar"
            ? ["ar", "en"]
            : ["en", "ar"],
      },
    ],
  };

  const website = {
    "@id": websiteId,
    "@type": "WebSite",
    name: businessName,
    url: baseUrl,
    description: t("description"),
    inLanguage: ["ar-SY", "en-US"],
    publisher: { "@id": businessId },
  };

  const webPage = {
    "@type": "WebPage",
    name: t("title"),
    description: t("description"),
    url: pageUrl,
    inLanguage: locale === "ar" ? "ar-SY" : "en-US",
    isPartOf: { "@id": websiteId },
    about: { "@id": businessId },
  };

  const graph = {
    "@context": "https://schema.org",
    "@graph": [organizationAndLocalBusiness, website, webPage],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
