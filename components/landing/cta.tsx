"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export function CTA() {
  const t = useTranslations("CTA");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <section className="py-24 bg-linear-to-r from-[#1e40af] via-[#1e3a8a] to-[#14b8a6]">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-8 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
          <p className="max-w-[700px] text-gray-100 md:text-xl">
            {t("description")}
          </p>
          <Button
            size="lg"
            variant="secondary"
            className={`group bg-white text-[#1e40af] hover:bg-gray-100 hover:text-[#14b8a6] transition-colors ${isRTL ? "flex-row-reverse" : ""}`}
          >
            {t("contactUs")}
            <ArrowRight
              className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? "mr-2 rotate-180" : "ml-2"}`}
            />
          </Button>
        </div>
      </div>
    </section>
  );
}
