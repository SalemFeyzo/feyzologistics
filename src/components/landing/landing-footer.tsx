import { useLocale, useTranslations } from "@/i18n/react";
import { SocialMediaLinks } from "@/components/social-media-links";

export function LandingFooter() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const year = new Date().getFullYear();
  const bottomLogo =
    locale === "ar" ? "/logo-bottom-ar.svg" : "/logo-bottom-en.svg";

  return (
    <footer className="border-t border-border bg-muted/20 px-4 py-12">
      <div className="container mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4">
          <img
            src={bottomLogo}
            alt={t("bottomLogoAlt")}
            className="max-h-11 w-auto max-w-none object-contain opacity-90 sm:max-h-12 md:max-h-14 dark:invert"
          />
          <p className="text-sm text-muted-foreground">{t("tagline")}</p>
          <p className="max-w-sm text-sm text-muted-foreground">{t("address")}</p>
          <SocialMediaLinks />
        </div>
        <nav
          className="flex flex-wrap gap-6 text-sm font-medium text-muted-foreground"
          aria-label="Footer"
        >
          <a href="#services" className="hover:text-foreground">
            {t("navServices")}
          </a>
          <a href="#about" className="hover:text-foreground">
            {t("navAbout")}
          </a>
          <a href="#contact" className="hover:text-foreground">
            {t("navContact")}
          </a>
        </nav>
      </div>
      <div className="container mx-auto mt-10 max-w-6xl space-y-4 border-t border-border pt-6">
        <p className="mx-auto max-w-3xl text-center text-[11px] leading-relaxed text-muted-foreground/90">
          {t("legalDisclaimer")}
        </p>
        <p className="text-center text-xs text-muted-foreground">
          © {year} {t("companyName")}. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
