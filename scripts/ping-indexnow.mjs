#!/usr/bin/env node
/**
 * Ping Bing IndexNow after deploy or content changes.
 * Uses https://www.bing.com/indexnow (IndexNow protocol; Yandex also consumes).
 *
 * Required env:
 *   INDEXNOW_KEY — same as public/{INDEXNOW_KEY}.txt
 *   PUBLIC_SITE_URL or SITE_URL — site origin (default https://feyzologistics.com)
 *
 * Optional:
 *   INDEXNOW_LOCALES — comma-separated (default ar,en; keep in sync with src/i18n)
 */

const baseUrl = (
  process.env.PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  "https://feyzologistics.com"
).replace(/\/$/, "");

const key = process.env.INDEXNOW_KEY?.trim();

if (!key) {
  console.warn("[indexnow] INDEXNOW_KEY not set — skipping (set in CI or .env for production).");
  process.exit(0);
}

const locales = (process.env.INDEXNOW_LOCALES || "ar,en")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const urlList = locales.map((loc) => `${baseUrl}/${loc}`);
const host = new URL(baseUrl).host;
const keyLocation = `${baseUrl}/${key}.txt`;

const body = JSON.stringify({
  host,
  key,
  keyLocation,
  urlList,
});

try {
  const res = await fetch("https://www.bing.com/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body,
  });

  const text = await res.text();

  if (!res.ok) {
    console.error("[indexnow] Bing returned", res.status, text.slice(0, 500));
    process.exit(1);
  }

  console.log(
    `[indexnow] OK (${res.status}) — submitted ${urlList.length} URL(s) for host ${host}`,
  );
  urlList.forEach((u) => console.log("  ", u));
  process.exit(0);
} catch (err) {
  console.error("[indexnow] Request failed:", err);
  process.exit(1);
}
