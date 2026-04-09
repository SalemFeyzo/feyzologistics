import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getBaseUrl } from "@/lib/site";
import { getIndexedPageUrls } from "@/lib/sitemap-urls";

/**
 * Multilingual URLs + alternates for hreflang (e.g. https://feyzologistics.com/en,
 * https://feyzologistics.com/ar). Uses NEXT_PUBLIC_SITE_URL or https://feyzologistics.com.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getBaseUrl();
  const pageUrls = getIndexedPageUrls();
  const defaultUrl = `${baseUrl}/${routing.defaultLocale}`;

  const languageAlternates: Record<string, string> = {
    "x-default": defaultUrl,
    ...Object.fromEntries(
      routing.locales.map((loc) => [loc, `${baseUrl}/${loc}`]),
    ),
  };

  return pageUrls.map((url) => {
    const locale = url.replace(`${baseUrl}/`, "");
    return {
      url,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: locale === routing.defaultLocale ? 1 : 0.9,
      alternates: {
        languages: languageAlternates,
      },
    };
  });
}
