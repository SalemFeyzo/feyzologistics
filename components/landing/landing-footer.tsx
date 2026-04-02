import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SocialMediaLinks } from "@/components/social-media-links";

export async function LandingFooter() {
  const t = await getTranslations("Footer");
  const locale = await getLocale();
  const year = new Date().getFullYear();
  const bottomLogo =
    locale === "ar" ? "/logo-bottom-ar.svg" : "/logo-bottom-en.svg";

  return (
    <footer className="border-t border-border bg-muted/20 px-4 py-12">
      <div className="container mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-4">
          <Image
            src={bottomLogo}
            alt=""
            width={240}
            height={64}
            className="max-h-11 w-auto max-w-none object-contain opacity-90 sm:max-h-12 md:max-h-14 dark:invert"
            style={{ width: "auto", height: "auto" }}
          />
          <p className="text-sm text-muted-foreground">{t("tagline")}</p>
          <SocialMediaLinks />
        </div>
        <nav
          className="flex flex-wrap gap-6 text-sm font-medium text-muted-foreground"
          aria-label="Footer"
        >
          <Link href="/#services" className="hover:text-foreground">
            {t("navServices")}
          </Link>
          <Link href="/#about" className="hover:text-foreground">
            {t("navAbout")}
          </Link>
          <Link href="/#contact" className="hover:text-foreground">
            {t("navContact")}
          </Link>
        </nav>
      </div>
      <div className="container mx-auto mt-10 max-w-6xl border-t border-border pt-6">
        <p className="text-center text-xs text-muted-foreground">
          © {year} {t("companyName")}. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
