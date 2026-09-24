/**
 * Font preload descriptors for above-the-fold text.
 *
 * ─────────────────────────────────────────────────────────────────────
 * WHY THIS FILE EXISTS
 * ─────────────────────────────────────────────────────────────────────
 * Fonts are discovered by the browser only AFTER CSS is parsed. On a
 * cold load this chains: HTML → CSS → font (≈1.4s critical path).
 *
 * `<link rel="preload" as="font">` in `<head>` breaks the chain by
 * starting the font fetch in parallel with CSS, cutting the critical
 * path by ~60%.
 *
 * ─────────────────────────────────────────────────────────────────────
 * WHY LOCALE-AWARE
 * ─────────────────────────────────────────────────────────────────────
 * - EN pages render in Geist (variable font — one file covers 100-900).
 * - AR pages render in Tajawal (static weights — 400 body, 700 headings).
 *
 * Preloading both locales' fonts on every page wastes bandwidth and
 * competes for the same connection. This helper returns only the set
 * that the current page will actually paint above the fold.
 *
 * ─────────────────────────────────────────────────────────────────────
 * WHY `?url` IMPORTS
 * ─────────────────────────────────────────────────────────────────────
 * Vite rewrites font filenames with content hashes on every build
 * (e.g. `geist-latin-wght-normal.BgDaEnEv.woff2`). Hard-coding paths in
 * `public/` would desync on every upgrade of @fontsource.
 *
 * The `?url` suffix asks Vite to resolve the hashed URL at build time,
 * so this file always matches the actual emitted asset.
 *
 * ─────────────────────────────────────────────────────────────────────
 * IMPORT PATHS — VERIFY ONCE
 * ─────────────────────────────────────────────────────────────────────
 * Run the commands below once after installing/upgrading fonts and
 * adjust the import paths if filenames changed:
 *
 *   ls node_modules/@fontsource-variable/geist/files/ | grep -i latin
 *   ls node_modules/@fontsource/tajawal/files/         | grep -i arabic
 *
 * Expected (as of @fontsource 5.x):
 *   geist-latin-wght-normal.woff2
 *   tajawal-arabic-400-normal.woff2
 *   tajawal-arabic-700-normal.woff2
 */

import geistLatinUrl from "@fontsource-variable/geist/files/geist-latin-wght-normal.woff2?url";
import tajawalArabic400Url from "@fontsource/tajawal/files/tajawal-arabic-400-normal.woff2?url";
import tajawalArabic700Url from "@fontsource/tajawal/files/tajawal-arabic-700-normal.woff2?url";

/** Supported locales — kept narrow to catch typos at compile time. */
export type FontLocale = "en" | "ar";

/** Shape of a single `<link rel="preload" as="font">` descriptor. */
export interface FontPreload {
  /** Resolved, hashed URL to the .woff2 file. */
  href: string;
  /** MIME type — always `font/woff2` in this project. */
  type: "font/woff2";
  /**
   * Fonts are always fetched with CORS in this setup because they are
   * served from the same origin but Vite's dev server uses a different
   * port; `anonymous` keeps preload and actual fetch in sync.
   */
  crossOrigin: "anonymous";
}

/**
 * Per-locale preload map.
 *
 * Only include weights that are rendered ABOVE THE FOLD:
 *   • 400 → body text, paragraphs
 *   • 700 → h1/h2/h3
 *
 * Weights like 500 are used in UI (below-the-fold) and rely on
 * `font-display: swap`, so preloading them would waste bandwidth.
 */
export const FONT_PRELOADS_BY_LOCALE: Record<
  FontLocale,
  readonly FontPreload[]
> = {
  en: [
    {
      href: geistLatinUrl,
      type: "font/woff2",
      crossOrigin: "anonymous",
    },
  ],

  ar: [
    {
      href: tajawalArabic400Url,
      type: "font/woff2",
      crossOrigin: "anonymous",
    },
    {
      href: tajawalArabic700Url,
      type: "font/woff2",
      crossOrigin: "anonymous",
    },
  ],
};

/**
 * Returns the preload descriptors to emit for a given locale.
 *
 * Safe against unknown values: callers pass `Astro.props.locale` which
 * is typed, but this guards against runtime surprises (e.g. future
 * locales added to the i18n config before this file is updated).
 */
export function getFontPreloads(locale: string): readonly FontPreload[] {
  if (locale === "en" || locale === "ar") {
    return FONT_PRELOADS_BY_LOCALE[locale];
  }
  // Unknown locale → preload Geist as the safest default (Latin script).
  return FONT_PRELOADS_BY_LOCALE.en;
}
