"use client";

import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Lightbulb, Star, Heart } from "lucide-react";

export function AboutValues() {
  const t = useTranslations("About.values");

  const values = [
    {
      icon: Shield,
      titleKey: "reliability.title",
      descriptionKey: "reliability.description",
    },
    {
      icon: Lightbulb,
      titleKey: "innovation.title",
      descriptionKey: "innovation.description",
    },
    {
      icon: Star,
      titleKey: "excellence.title",
      descriptionKey: "excellence.description",
    },
    {
      icon: Heart,
      titleKey: "integrity.title",
      descriptionKey: "integrity.description",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-linear-to-r from-[#1e40af] to-[#14b8a6]">
            {t("title")}
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 justify-items-center lg:justify-items-stretch max-w-7xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card
                key={index}
                className="border-2 border-[#1e40af]/20 hover:shadow-xl hover:border-[#14b8a6]/40 transition-all"
              >
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-[#1e40af]/10 to-[#14b8a6]/10 mb-4">
                    <Icon className="h-6 w-6 text-[#14b8a6]" />
                  </div>
                  <CardTitle className="text-gray-900 dark:text-gray-100">
                    {t(value.titleKey)}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-gray-700 dark:text-gray-300">
                    {t(value.descriptionKey)}
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

