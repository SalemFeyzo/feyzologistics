import { useTranslations } from "@/i18n/react";
import { Button } from "@/components/ui/button";

export function LandingHero() {
  const t = useTranslations("Hero");

  return (
    <section
      className="relative overflow-hidden border-b border-border px-4 py-20 md:py-28"
      aria-labelledby="hero-heading"
    >
      <img
        src="/background.png"
        alt={t("heroImageAlt")}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div
        className="pointer-events-none absolute inset-0 bg-background/65 dark:bg-background/70"
        aria-hidden
      />
      <div className="container relative z-10 mx-auto max-w-6xl">
        <h1
          id="hero-heading"
          className="max-w-3xl whitespace-pre-line text-4xl font-semibold leading-snug tracking-tight text-foreground md:text-5xl lg:text-6xl"
        >
          {t("headline")}
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-foreground/90 md:text-xl dark:text-muted-foreground">
          {t("subheadline")}
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button asChild size="lg" className="rounded-full px-8">
            <a href="#contact">{t("primaryCta")}</a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-foreground/20 bg-transparent px-8"
          >
            <a href="#services">{t("secondaryCta")}</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
