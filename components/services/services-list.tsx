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
import { Link } from "@/i18n/routing";
import { Package, Truck, Warehouse, Network } from "lucide-react";

export function ServicesList() {
  const t = useTranslations("Services");

  const services = [
    {
      slug: "express-shipping",
      icon: Package,
      titleKey: "expressShipping.title",
      descriptionKey: "expressShipping.description",
      translationKey: "expressShipping",
    },
    {
      slug: "freight-services",
      icon: Truck,
      titleKey: "freightServices.title",
      descriptionKey: "freightServices.description",
      translationKey: "freightServices",
    },
    {
      slug: "warehousing",
      icon: Warehouse,
      titleKey: "warehousing.title",
      descriptionKey: "warehousing.description",
      translationKey: "warehousing",
    },
    {
      slug: "supply-chain",
      icon: Network,
      titleKey: "supplyChain.title",
      descriptionKey: "supplyChain.description",
      translationKey: "supplyChain",
    },
  ];

  return (
    <section className="py-24 bg-gray-50 dark:bg-gray-950">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card
                key={index}
                className="border-2 border-[#1e40af]/20 hover:shadow-xl hover:border-[#14b8a6]/40 transition-all flex flex-col"
              >
                <CardHeader>
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-linear-to-br from-[#1e40af]/10 to-[#14b8a6]/10 mb-4">
                    <Icon className="h-8 w-8 text-[#14b8a6]" />
                  </div>
                  <CardTitle className="text-2xl text-gray-900 dark:text-gray-100 mb-2">
                    {t(`${service.titleKey}`)}
                  </CardTitle>
                  <CardDescription className="text-base text-gray-700 dark:text-gray-300">
                    {t(`${service.descriptionKey}`)}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto">
                  <Link href={`/services/${service.slug}`}>
                    <Button
                      variant="outline"
                      className="w-full border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af] hover:text-white"
                    >
                      {t("learnMore")}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

