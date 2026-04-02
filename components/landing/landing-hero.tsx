import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export async function LandingHero() {
  const t = await getTranslations("Hero");

  return (
    <section
      className="relative overflow-hidden border-b border-border px-4 py-20 md:py-28"
      aria-labelledby="hero-heading"
    >
      <Image
        src="/background.png"
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
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
            <Link href="/#contact">{t("primaryCta")}</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full border-foreground/20 bg-transparent px-8"
          >
            <Link href="/#services">{t("secondaryCta")}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
