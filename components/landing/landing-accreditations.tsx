import Image from "next/image";
import { getTranslations } from "next-intl/server";

export async function LandingAccreditations() {
  const t = await getTranslations("Accreditations");

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
              <div className="relative flex h-28 w-full max-w-xs items-center justify-center sm:h-32 md:h-36">
                <Image
                  src="/logo-siffa.png"
                  alt={t("siffaLogoAlt")}
                  width={320}
                  height={120}
                  className="max-h-full w-auto max-w-full object-contain object-center"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
              <p className="mt-5 max-w-sm text-sm font-medium leading-relaxed text-foreground md:text-base">
                {t("memberLineSiffa")}
              </p>
            </div>
            <div className="flex min-w-0 flex-col items-center text-center sm:items-center">
              <div className="relative flex h-28 w-full max-w-xs items-center justify-center sm:h-32 md:h-36">
                <Image
                  src="/logo-fiata.png"
                  alt={t("fiataLogoAlt")}
                  width={320}
                  height={120}
                  className="max-h-full w-auto max-w-full object-contain object-center"
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
              <p className="mt-5 max-w-sm text-sm font-medium leading-relaxed text-foreground md:text-base">
                {t("memberLineFiata")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
