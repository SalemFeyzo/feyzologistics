"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "@/i18n/react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function LandingNavbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const logoSrc = locale === "ar" ? "/logo-ar.svg" : "/logo-en.svg";

  const closeMenu = () => setIsOpen(false);

  const navLinkClass =
    "text-sm font-medium text-foreground/80 transition-colors hover:text-foreground";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md supports-backdrop-filter:bg-background/80">
      <div className="container mx-auto flex min-h-18 max-w-6xl items-center justify-between gap-4 px-4 py-2 md:min-h-21 md:px-6">
        <a
          href={`/${locale}`}
          className="flex shrink-0 items-center gap-2"
          onClick={closeMenu}
        >
          <img
            src={logoSrc}
            alt={t("logoAlt")}
            className="max-h-12 w-auto max-w-none object-contain sm:max-h-14 md:max-h-16 dark:invert"
          />
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
          <a href="#services" className={navLinkClass}>
            {t("services")}
          </a>
          <a href="#about" className={navLinkClass}>
            {t("about")}
          </a>
          <a href="#contact" className={navLinkClass}>
            {t("contact")}
          </a>
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <div className="flex items-center rounded-full border border-border px-0.5 text-xs font-medium">
            <a
              href="/en"
              className={cn(
                "rounded-full px-2 py-1 transition-colors",
                locale === "en"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-current={locale === "en" ? "page" : undefined}
            >
              EN
            </a>
            <a
              href="/ar"
              className={cn(
                "rounded-full px-2 py-1 transition-colors",
                locale === "ar"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-current={locale === "ar" ? "page" : undefined}
            >
              AR
            </a>
          </div>

          <ThemeToggle />

          <Button asChild size="sm" className="hidden md:inline-flex">
            <a href="#contact">{t("cta")}</a>
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen((open) => !open)}
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={t("toggleMenu")}
          >
            {isOpen ? (
              <CloseIcon className="size-5" />
            ) : (
              <MenuIcon className="size-5" />
            )}
          </Button>
        </div>
      </div>

      {isOpen ? (
        <div
          id="mobile-nav"
          className="border-t border-border bg-background md:hidden"
        >
          <nav
            className="container mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4"
            aria-label="Mobile primary"
          >
            <a
              href="#services"
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
              onClick={closeMenu}
            >
              {t("services")}
            </a>
            <a
              href="#about"
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
              onClick={closeMenu}
            >
              {t("about")}
            </a>
            <a
              href="#contact"
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
              onClick={closeMenu}
            >
              {t("contact")}
            </a>
            <Button asChild className="mt-2 w-full">
              <a href="#contact" onClick={closeMenu}>
                {t("cta")}
              </a>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}

function MenuIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden
    >
      <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
    </svg>
  );
}
