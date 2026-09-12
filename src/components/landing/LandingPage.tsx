"use client";

import { I18nProvider } from "@/i18n/react";
import type { AppLocale } from "@/i18n";
import { ThemeProvider } from "@/components/theme-provider";
import { LandingNavbar } from "@/components/landing/landing-navbar";
import { LandingHero } from "@/components/landing/landing-hero";
import { LandingServices } from "@/components/landing/landing-services";
import { LandingAbout } from "@/components/landing/landing-about";
import { LandingTrust } from "@/components/landing/landing-trust";
import { LandingAccreditations } from "@/components/landing/landing-accreditations";
import { LandingContact } from "@/components/landing/landing-contact";
import { LandingFooter } from "@/components/landing/landing-footer";

export default function LandingPage({ locale }: { locale: AppLocale }) {
  return (
    <I18nProvider locale={locale}>
      <ThemeProvider>
        <main className="min-h-screen w-full">
          <LandingNavbar />
          <LandingHero />
          <LandingServices />
          <LandingAbout />
          <LandingTrust />
          <LandingAccreditations />
          <LandingContact />
          <LandingFooter />
        </main>
      </ThemeProvider>
    </I18nProvider>
  );
}
