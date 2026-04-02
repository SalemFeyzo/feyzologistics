"use client";

import { useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link, usePathname } from "@/i18n/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";

export function LandingNavbar() {
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);
  const logoSrc = locale === "ar" ? "/logo-ar.svg" : "/logo-en.svg";

  const closeMenu = () => setIsOpen(false);

  const navLinkClass =
    "text-sm font-medium text-foreground/80 transition-colors hover:text-foreground";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md supports-backdrop-filter:bg-background/80">
      <div className="container mx-auto flex min-h-[4.5rem] max-w-6xl items-center justify-between gap-4 px-4 py-2 md:min-h-[5.25rem] md:px-6">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          onClick={closeMenu}
        >
          <Image
            src={logoSrc}
            alt={t("logoAlt")}
            width={320}
            height={64}
            className="max-h-12 w-auto max-w-none object-contain sm:max-h-14 md:max-h-16 dark:invert"
            style={{ width: "auto", height: "auto" }}
            priority
          />
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          <Link href="/#services" className={navLinkClass}>
            {t("services")}
          </Link>
          <Link href="/#about" className={navLinkClass}>
            {t("about")}
          </Link>
          <Link href="/#contact" className={navLinkClass}>
            {t("contact")}
          </Link>
        </nav>

        <div className="flex items-center gap-1 md:gap-2">
          <div className="flex items-center rounded-full border border-border px-0.5 text-xs font-medium">
            <Link
              href={pathname}
              locale="en"
              className={cn(
                "rounded-full px-2 py-1 transition-colors",
                locale === "en"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-current={locale === "en" ? "page" : undefined}
            >
              EN
            </Link>
            <Link
              href={pathname}
              locale="ar"
              className={cn(
                "rounded-full px-2 py-1 transition-colors",
                locale === "ar"
                  ? "bg-foreground text-background"
                  : "text-muted-foreground hover:text-foreground",
              )}
              aria-current={locale === "ar" ? "page" : undefined}
            >
              AR
            </Link>
          </div>

          <ThemeToggle />

          <Button
            asChild
            size="sm"
            className="hidden md:inline-flex"
          >
            <Link href="/#contact">{t("cta")}</Link>
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
            <Link
              href="/#services"
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
              onClick={closeMenu}
            >
              {t("services")}
            </Link>
            <Link
              href="/#about"
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
              onClick={closeMenu}
            >
              {t("about")}
            </Link>
            <Link
              href="/#contact"
              className="rounded-lg px-3 py-2 text-sm font-medium hover:bg-muted"
              onClick={closeMenu}
            >
              {t("contact")}
            </Link>
            <Button asChild className="mt-2 w-full">
              <Link href="/#contact" onClick={closeMenu}>
                {t("cta")}
              </Link>
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
