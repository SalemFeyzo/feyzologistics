// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { imageService } from "@unpic/astro/service";
import sitemap from '@astrojs/sitemap';
import robotsTxt from 'astro-robots-txt';
import vercel from '@astrojs/vercel';

const SITE = (
  process.env.PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'https://feyzologistics.com'
).replace(/\/$/, '');

// https://astro.build/config
export default defineConfig({
  site: SITE,

  // Consistent URLs + no duplicate `/ar` vs `/ar/` pages.
  trailingSlash: 'never',

  // Minify the HTML output (default, made explicit).
  compressHTML: true,
  image: {
    service: imageService({
      // This can usually be auto-detected
      fallbackService: "sharp",
      placeholder: "blurhash",
      // This is the default
      layout: "constrained",
    }),
  },
  i18n: {
    defaultLocale: 'ar',
    locales: ['ar', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },

  integrations: [sitemap({
    i18n: {
      defaultLocale: 'en',
      locales: {
        ar: 'ar',
        en: 'en',
      }
    },
    serialize(item) {
      if (item.url === 'https://feyzologistics.com/en/' || item.url === 'https://feyzologistics.com/ar/') {
        item.priority = 1.0;
      } else {
        item.priority = 0.8;
      }
      // @ts-ignore
      item.changefreq = 'weekly';
      return item;
    },
  }), robotsTxt({
    policy: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    sitemap: true,
  })],

  vite: {
    plugins: [tailwindcss()],
  },

  adapter: vercel(),
});