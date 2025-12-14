"use client";

import { useTranslations } from "next-intl";

export function AboutHero() {
  const t = useTranslations("About.hero");

  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-linear-to-b from-[#1e3a8a] via-[#1e40af] to-[#14b8a6]">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[20px_20px]" />
      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-linear-to-r from-white via-teal-200 to-teal-400">
            {t("title")}
          </h1>
          <p className="text-xl md:text-2xl font-semibold text-white/90">
            {t("subtitle")}
          </p>
          <p className="mx-auto max-w-[700px] text-gray-100 md:text-lg">
            {t("description")}
          </p>
        </div>
      </div>
    </section>
  );
}

