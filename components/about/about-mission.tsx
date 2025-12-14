"use client";

import { useTranslations } from "next-intl";
import { Target } from "lucide-react";

export function AboutMission() {
  const t = useTranslations("About.mission");

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="flex-shrink-0">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-linear-to-br from-[#1e40af] to-[#14b8a6]">
                <Target className="h-10 w-10 text-white" />
              </div>
            </div>
            <div className="flex-1 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1e40af]">
                {t("title")}
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {t("description")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

