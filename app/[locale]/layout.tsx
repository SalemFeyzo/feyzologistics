import type { Metadata } from "next";
import { Geist, Tajawal } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { JsonLd } from "@/components/seo/json-ld";
import { ThemeProvider } from "@/components/theme-provider";
import { routing } from "@/i18n/routing";
import { getBaseUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import "../globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" });

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "700"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  const baseUrl = getBaseUrl();
  const pageUrl = `${baseUrl}/${locale}`;

  return {
    metadataBase: new URL(baseUrl),
    title: t("title"),
    description: t("description"),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    icons: {
      icon: [
        {
          url: "/favicon-light.ico",
          media: "(prefers-color-scheme: light)",
        },
        {
          url: "/favicon-dark.ico",
          media: "(prefers-color-scheme: dark)",
        },
      ],
    },
    openGraph: {
      title: t("ogTitle"),
      description: t("ogDescription"),
      locale: locale === "ar" ? "ar_SA" : "en_US",
      alternateLocale: locale === "en" ? ["ar_SA"] : ["en_US"],
      type: "website",
      url: pageUrl,
      siteName: t("ogTitle"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        "x-default": `/${routing.defaultLocale}`,
        en: "/en",
        ar: "/ar",
      },
    },
  };
}

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as (typeof routing.locales)[number])) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const isRtl = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      className={cn("h-full", geist.variable, tajawal.variable)}
      suppressHydrationWarning
    >
      <body
        className={cn(
          "min-h-full flex flex-col bg-background text-foreground antialiased",
          isRtl ? "font-(family-name:--font-tajawal)" : "font-sans",
        )}
      >
        <JsonLd locale={locale} />
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
