"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Package, Clock, Shield, Globe } from "lucide-react";
import { useTranslations } from "next-intl";

export function Features() {
  const t = useTranslations("Features");
  const features = [
    {
      icon: Package,
      titleKey: "fastDelivery.title",
      descriptionKey: "fastDelivery.description",
    },
    {
      icon: Clock,
      titleKey: "realTimeTracking.title",
      descriptionKey: "realTimeTracking.description",
    },
    {
      icon: Shield,
      titleKey: "secureHandling.title",
      descriptionKey: "secureHandling.description",
    },
    {
      icon: Globe,
      titleKey: "globalReach.title",
      descriptionKey: "globalReach.description",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-950">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-linear-to-r from-[#1e40af] to-[#14b8a6]">
            {t("title")}
          </h2>
          <p className="max-w-[900px] text-gray-900 md:text-xl dark:text-gray-300">
            {t("description")}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 justify-items-center lg:justify-items-stretch max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card
                key={index}
                className="border-2 border-[#1e40af]/20 hover:shadow-xl hover:border-[#14b8a6]/40 transition-all"
              >
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-[#1e40af]/10 to-[#14b8a6]/10 mb-4">
                    <Icon className="h-6 w-6 text-[#14b8a6]" />
                  </div>
                  <CardTitle className="text-gray-400">
                    {t(feature.titleKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-400">
                    {t(feature.descriptionKey)}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
