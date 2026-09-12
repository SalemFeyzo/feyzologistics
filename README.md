# Feyzo Logistics

International freight forwarding & customs clearance management — built with [Astro](https://astro.build).

## Stack

- **Astro** (static output) + **React** (`@astrojs/react`) for interactive islands
- **Tailwind CSS v4** via `@tailwindcss/vite`
- **i18n**: `/ar` (primary) and `/en`, with messages in `src/i18n/messages/`
- **Fonts** (self-hosted via Fontsource): Geist Variable (Latin) + Tajawal (Arabic)

## Commands

```sh
pnpm install      # install dependencies
pnpm dev          # start the dev server (astro dev)
pnpm build        # production build (output to dist/)
pnpm preview      # preview the production build
pnpm indexnow     # ping Bing IndexNow
```

## Environment variables

Copy `.env.example` to `.env` and adjust. Variables prefixed with `PUBLIC_` are
exposed to the client bundle.

| Variable                      | Purpose                              |
| ----------------------------- | ------------------------------------ |
| `PUBLIC_SITE_URL`             | Canonical origin (default `https://feyzologistics.com`) |
| `PUBLIC_GA_MEASUREMENT_ID`    | Google Analytics 4 measurement ID    |
| `PUBLIC_CONTACT_EMAIL`        | Contact email                        |
| `PUBLIC_PHONE_NUMBER`         | Phone (E.164)                        |
| `PUBLIC_WHATSAPP_NUMBER`      | WhatsApp number                      |
| `PUBLIC_SOCIAL_*_URL`         | Social profile URLs                  |

