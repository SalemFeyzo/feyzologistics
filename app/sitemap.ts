import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getBaseUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const defaultUrl = `${baseUrl}/${routing.defaultLocale}`;

  const languageAlternates: Record<string, string> = {
    "x-default": defaultUrl,
    ...Object.fromEntries(
      routing.locales.map((loc) => [loc, `${baseUrl}/${loc}`]),
    ),
  };

  return routing.locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: locale === routing.defaultLocale ? 1 : 0.9,
    alternates: {
      languages: languageAlternates,
    },
  }));
}
