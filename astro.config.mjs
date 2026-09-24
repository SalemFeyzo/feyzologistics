// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import vercel from '@astrojs/vercel';

// ═══════════════════════════════════════════════════════════
// Constants
// ═══════════════════════════════════════════════════════════

const SITE = (
  process.env.PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://www.feyzologistics.com'
).replace(/\/$/, '');

const DEFAULT_LOCALE = 'ar';
const LOCALES = ['ar', 'en'];

// ═══════════════════════════════════════════════════════════
// Config
// ═══════════════════════════════════════════════════════════

// https://astro.build/config
export default defineConfig({
  site: SITE,

  // Consistent URLs + no duplicate `/ar` vs `/ar/` pages.
  trailingSlash: 'never',

  // Minify the HTML output (default, made explicit).
  compressHTML: true,

  // ═══════════════════════════════════════════════════════════
  // i18n
  // ═══════════════════════════════════════════════════════════
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: LOCALES,
    routing: {
      prefixDefaultLocale: true,
    },
  },

  // ═══════════════════════════════════════════════════════════
  // Build — fixes render-blocking CSS (Button.kDiMoq4a.css)
  // ═══════════════════════════════════════════════════════════
  build: {
    inlineStylesheets: 'always',
    assets: '_astro',
  },

  // ═══════════════════════════════════════════════════════════
  // Image Optimization — fixes LCP + 66 KiB savings
  // ═══════════════════════════════════════════════════════════
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        quality: 60,
      },
    },
  },

  // ═══════════════════════════════════════════════════════════
  // Prefetch — smoother navigation
  // ═══════════════════════════════════════════════════════════
  prefetch: {
    prefetchAll: false,
    defaultStrategy: 'hover',
  },

  // ═══════════════════════════════════════════════════════════
  // Integrations
  // ═══════════════════════════════════════════════════════════
  integrations: [
    // Sitemap — unified i18n with Astro config.
    // NOTE: priority/changefreq removed — Google ignores both since 2023.
    sitemap({
      i18n: {
        defaultLocale: DEFAULT_LOCALE,
        locales: {
          ar: 'ar-SY',
          en: 'en-US',
        },
      },
      filter: (page) =>
        !page.includes('/404') && !page.includes('/api/'),
      // lastmod is added automatically by @astrojs/sitemap.
    }),

    // Robots.txt
    robotsTxt({
      policy: [
        {
          userAgent: '*',
          allow: '/',
        },
      ],
      sitemap: true,
    }),
  ],

  // ═══════════════════════════════════════════════════════════
  // Vite
  // ═══════════════════════════════════════════════════════════
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssCodeSplit: true,
      minify: 'esbuild',
    },
  },

  // ═══════════════════════════════════════════════════════════
  // Adapter — Vercel with image optimization
  // ═══════════════════════════════════════════════════════════
  adapter: vercel({
    imageService: true,
    imagesConfig: {
      sizes: [320, 640, 960, 1280, 1920],
      formats: ['image/avif', 'image/webp'],
      minimumCacheTTL: 60 * 60 * 24 * 60, // 60 days
    },
  }),
});