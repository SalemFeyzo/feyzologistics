import { routing } from "@/i18n/routing";
import { getBaseUrl } from "@/lib/site";

/** Absolute URLs for all locale home pages (same set as `app/sitemap.ts`). */
export function getIndexedPageUrls(): string[] {
  const baseUrl = getBaseUrl();
  return routing.locales.map((locale) => `${baseUrl}/${locale}`);
}
