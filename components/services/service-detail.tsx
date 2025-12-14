"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";

type ServiceDetailProps = {
  slug: string;
};

const slugToTranslationKey: Record<string, string> = {
  "express-shipping": "expressShipping",
  "freight-services": "freightServices",
  warehousing: "warehousing",
  "supply-chain": "supplyChain",
};

const slugToFeatureKeys: Record<string, string[]> = {
  "express-shipping": ["speed", "tracking", "coverage", "reliability"],
  "freight-services": ["modes", "capacity", "customs", "costEffective"],
  warehousing: ["facilities", "management", "fulfillment", "scalable"],
  "supply-chain": ["optimization", "visibility", "integration", "consulting"],
};

export function ServiceDetail({ slug }: ServiceDetailProps) {
  const locale = useLocale();
  const isRTL = locale === "ar";
  const translationKey = slugToTranslationKey[slug];
  const t = useTranslations(`Services.${translationKey}`);
  const tServices = useTranslations("Services");
  const featureKeys = slugToFeatureKeys[slug];

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 overflow-hidden bg-linear-to-b from-[#1e3a8a] via-[#1e40af] to-[#14b8a6]">
        <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[20px_20px]" />
        <div className="container relative z-10 px-4 md:px-6 mx-auto">
          <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-4xl mx-auto">
            <Link
              href="/services"
              className={`flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4 ${
                isRTL ? "flex-row-reverse" : ""
              }`}
            >
              <ArrowLeft
                className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`}
              />
              <span>{tServices("backToServices")}</span>
            </Link>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-clip-text text-transparent bg-linear-to-r from-white via-teal-200 to-teal-400">
              {t("title")}
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-100 md:text-lg">
              {t("description")}
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white dark:bg-gray-950">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1e40af] mb-12 text-center">
              {t("features.title")}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              {featureKeys.map((featureKey, index) => (
                <Card
                  key={index}
                  className="border-2 border-[#1e40af]/20 hover:border-[#14b8a6]/40 transition-all"
                >
                  <CardHeader>
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-6 w-6 text-[#14b8a6] flex-shrink-0 mt-1" />
                      <div>
                        <CardTitle className="text-xl text-gray-900 dark:text-gray-100 mb-2">
                          {t(`features.${featureKey}.title`)}
                        </CardTitle>
                        <CardDescription className="text-base text-gray-700 dark:text-gray-300">
                          {t(`features.${featureKey}.description`)}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="container px-4 md:px-6 mx-auto">
          <div className="max-w-4xl mx-auto">
            <div className="bg-linear-to-br from-[#1e40af]/5 to-[#14b8a6]/5 rounded-lg p-8 md:p-12 border-2 border-[#1e40af]/20">
              <h2 className="text-3xl font-bold text-[#1e40af] mb-6">
                {tServices("benefits")}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("benefits")}
              </p>
              <div className="mt-8">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-linear-to-r from-[#1e40af] to-[#14b8a6] hover:opacity-90 text-white"
                  >
                    {tServices("getStarted")}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

