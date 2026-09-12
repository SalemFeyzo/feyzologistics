import type { APIRoute } from "astro";
import { defaultLocale, locales } from "@/i18n";
import { getBaseUrl } from "@/lib/site";

export const GET: APIRoute = () => {
  const baseUrl = getBaseUrl();
  const defaultUrl = `${baseUrl}/${defaultLocale}`;

  const urls = locales
    .map((locale) => {
      const url = `${baseUrl}/${locale}`;
      const priority = locale === defaultLocale ? "1" : "0.9";
      const alternates = [
        `<xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}" />`,
        ...locales.map(
          (l) =>
            `<xhtml:link rel="alternate" hreflang="${l}" href="${baseUrl}/${l}" />`,
        ),
      ].join("\n    ");

      return `  <url>
    <loc>${url}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority}</priority>
    ${alternates}
  </url>`;
    })
    .join("\n");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>`;

  return new Response(sitemap, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
