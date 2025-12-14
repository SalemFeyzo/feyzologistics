"use client";

import { useTranslations } from "next-intl";
import { Globe, Package, Users, Award } from "lucide-react";

export function AboutStats() {
  const t = useTranslations("About.stats");

  const stats = [
    {
      icon: Globe,
      value: "150+",
      label: t("countries"),
    },
    {
      icon: Package,
      value: "2M+",
      label: t("packages"),
    },
    {
      icon: Users,
      value: "50K+",
      label: t("customers"),
    },
    {
      icon: Award,
      value: "15+",
      label: t("experience"),
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center space-y-4 p-8 rounded-lg border-2 border-[#1e40af]/20 hover:border-[#14b8a6]/40 hover:shadow-lg transition-all"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-[#1e40af]/10 to-[#14b8a6]/10">
                  <Icon className="h-8 w-8 text-[#14b8a6]" />
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-[#1e40af] mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

