import { getTranslations } from "next-intl/server";

type ServiceItem = {
  title: string;
  description: string;
};

export async function LandingServices() {
  const t = await getTranslations("Services");
  const items = t.raw("items") as ServiceItem[];

  return (
    <section
      id="services"
      className="scroll-mt-20 border-b border-border bg-muted/30 px-4 py-20 md:py-24"
      aria-labelledby="services-heading"
    >
      <div className="container mx-auto max-w-6xl">
        <h2
          id="services-heading"
          className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
        >
          {t("title")}
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">{t("subtitle")}</p>
        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <li
              key={item.title}
              className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-sm"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
