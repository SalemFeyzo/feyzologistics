import {NextIntlClientProvider} from 'next-intl';
import {getMessages, getTranslations} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {Geist, Geist_Mono, Cairo} from 'next/font/google';
import '../globals.css';

type Locale = (typeof routing.locales)[number];

function isValidLocale(locale: string): locale is Locale {
  return (routing.locales as readonly string[]).includes(locale);
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['latin', 'arabic'],
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  // Ensure that the incoming `locale` is valid
  if (!isValidLocale(locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  const bodyFontFamily = locale === 'ar' 
    ? `var(--font-cairo), system-ui, sans-serif`
    : `var(--font-geist-sans), system-ui, sans-serif`;

  return (
    <html lang={locale} dir={dir}>
      <body
        className={`${geistSans.variable} ${cairo.variable} ${geistMono.variable} antialiased w-full`}
        style={{ fontFamily: bodyFontFamily }}
      >
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
