import { getTranslations } from "next-intl/server";

type TrustItem = {
  value: string;
  label: string;
};

export async function LandingTrust() {
  const t = await getTranslations("Trust");
  const items = t.raw("items") as TrustItem[];

  return (
    <section
      className="border-b border-border bg-muted/30 px-4 py-16 md:py-20"
      aria-labelledby="trust-heading"
    >
      <div className="container mx-auto max-w-6xl">
        <h2
          id="trust-heading"
          className="text-center text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
        >
          {t("title")}
        </h2>
        <ul className="mt-12 grid gap-8 sm:grid-cols-3">
          {items.map((item) => (
            <li
              key={item.label}
              className="flex flex-col items-center text-center"
            >
              <span className="text-4xl font-semibold tabular-nums text-foreground md:text-5xl">
                {item.value}
              </span>
              <span className="mt-2 text-sm text-muted-foreground">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
