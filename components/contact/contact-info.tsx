"use client";

import { useTranslations } from "next-intl";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export function ContactInfo() {
  const t = useTranslations("Contact.info");

  const contactItems = [
    {
      icon: MapPin,
      label: t("address.label"),
      value: t("address.value"),
    },
    {
      icon: Phone,
      label: t("phone.label"),
      value: t("phone.value"),
    },
    {
      icon: Mail,
      label: t("email.label"),
      value: t("email.value"),
    },
    {
      icon: Clock,
      label: t("hours.label"),
      value: t("hours.value"),
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-2 border-[#1e40af]/20">
        <CardHeader>
          <CardTitle className="text-2xl text-[#1e40af]">{t("title")}</CardTitle>
          <CardDescription className="text-base">
            {t("description")}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {contactItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-linear-to-br from-[#1e40af]/10 to-[#14b8a6]/10 shrink-0">
                  <Icon className="h-6 w-6 text-[#14b8a6]" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                    {item.label}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                    {item.value}
                  </p>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}

