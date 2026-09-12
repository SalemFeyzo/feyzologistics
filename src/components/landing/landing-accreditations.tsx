import { useTranslations } from "@/i18n/react";
import { FIATA_WEBSITE_URL, SIFFA_WEBSITE_URL } from "@/lib/site";

export function LandingAccreditations() {
  const t = useTranslations("Accreditations");

  return (
    <section
      id="accreditations"
      className="scroll-mt-20 border-b border-border bg-background px-4 py-16 md:py-20"
      aria-labelledby="accreditations-heading"
    >
      <div className="container mx-auto max-w-6xl">
        <h2
          id="accreditations-heading"
          className="text-center text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
        >
          {t("title")}
        </h2>
        <div className="mx-auto mt-10 max-w-5xl rounded-3xl border border-border bg-muted/20 px-6 py-10 md:px-10 md:py-12">
          <div className="grid gap-12 sm:grid-cols-2 sm:gap-10 md:gap-14">
            <div className="flex min-w-0 flex-col items-center text-center sm:items-center">
              <a
                href={SIFFA_WEBSITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-28 w-full max-w-xs items-center justify-center rounded-xl outline-offset-4 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-ring sm:h-32 md:h-36"
                aria-label={t("siffaLinkAria")}
              >
                <img
                  src="/logo-siffa.png"
                  alt={t("siffaLogoAlt")}
                  className="max-h-full w-auto max-w-full object-contain object-center"
                />
              </a>
              <p className="mt-5 max-w-sm text-sm font-medium leading-relaxed text-foreground md:text-base">
                {t("memberLineSiffa")}
              </p>
              <a
                href={SIFFA_WEBSITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-xs font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                {t("siffaWebsiteLink")}
              </a>
            </div>
            <div className="flex min-w-0 flex-col items-center text-center sm:items-center">
              <a
                href={FIATA_WEBSITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex h-28 w-full max-w-xs items-center justify-center rounded-xl outline-offset-4 transition-opacity hover:opacity-90 focus-visible:outline focus-visible:outline-ring sm:h-32 md:h-36"
                aria-label={t("fiataLinkAria")}
              >
                <img
                  src="/logo-fiata.png"
                  alt={t("fiataLogoAlt")}
                  className="max-h-full w-auto max-w-full object-contain object-center"
                />
              </a>
              <p className="mt-5 max-w-sm text-sm font-medium leading-relaxed text-foreground md:text-base">
                {t("memberLineFiata")}
              </p>
              <a
                href={FIATA_WEBSITE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 text-xs font-medium text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline"
              >
                {t("fiataWebsiteLink")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
