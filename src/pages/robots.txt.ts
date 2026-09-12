import type { APIRoute } from "astro";
import { getBaseUrl } from "@/lib/site";

export const GET: APIRoute = () => {
  const baseUrl = getBaseUrl();
  const host = baseUrl.replace(/^https?:\/\//, "");

  const body = [
    "User-agent: *",
    "Allow: /",
    "",
    `Sitemap: ${baseUrl}/sitemap.xml`,
    `Host: ${host}`,
    "",
  ].join("\n");

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
