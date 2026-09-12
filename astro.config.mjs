// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

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
  i18n: {
    defaultLocale: 'en',
    locales: ['ar', 'en'],
    routing: {
      prefixDefaultLocale: true,
    },
  },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
