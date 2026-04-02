import { getTranslations } from "next-intl/server";

export async function LandingAbout() {
  const t = await getTranslations("About");

  return (
    <section
      id="about"
      className="scroll-mt-20 border-b border-border bg-background px-4 py-20 md:py-24"
      aria-labelledby="about-heading"
    >
      <div className="container mx-auto max-w-6xl">
        <h2
          id="about-heading"
          className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
        >
          {t("title")}
        </h2>
        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
          {t("body")}
        </p>
      </div>
    </section>
  );
}
