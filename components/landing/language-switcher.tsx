"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/routing";
import { Button } from "@/components/ui/button";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: "en" | "ar") => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={locale === "en" ? "default" : "outline"}
        size="sm"
        onClick={() => switchLocale("en")}
        className="text-xs"
      >
        EN
      </Button>
      <Button
        variant={locale === "ar" ? "default" : "outline"}
        size="sm"
        onClick={() => switchLocale("ar")}
        className="text-xs"
      >
        AR
      </Button>
    </div>
  );
}
