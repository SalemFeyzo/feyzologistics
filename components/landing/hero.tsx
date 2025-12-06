"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Truck } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export function Hero() {
  const t = useTranslations("Hero");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-b from-[#1e3a8a] via-[#1e40af] to-[#14b8a6]">
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[20px_20px]" />
      <div className="absolute inset-0 opacity-5 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.03)_2px,rgba(255,255,255,0.03)_4px)]" />
      <div className="container relative z-10 px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-8 text-center max-w-4xl mx-auto">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-linear-to-r from-white via-teal-200 to-teal-400">
              {t("title")}
              <br />
              {t("subtitle")}
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-100 md:text-xl">
              {t("description")}
            </p>
          </div>
          <div
            className={`flex flex-col gap-4 min-[400px]:flex-row justify-center ${
              isRTL ? "flex-row-reverse" : ""
            }`}
          >
            <Button
              size="lg"
              className={`group bg-white text-[#1e40af] hover:bg-gray-100 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              {t("getStarted")}
              <ArrowRight
                className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${
                  isRTL ? "mr-2 rotate-180" : "ml-2"
                }`}
              />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={`border-white/30 text-white hover:bg-white/10 hover:text-white backdrop-blur-sm ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <Truck className={isRTL ? "ml-2 h-4 w-4" : "mr-2 h-4 w-4"} />
              {t("trackShipment")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
