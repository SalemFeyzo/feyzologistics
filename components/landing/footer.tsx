"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "./language-switcher";
import { Link } from "@/i18n/routing";

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="border-t border-[#1e40af]/20 bg-linear-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container px-4 md:px-6 py-12 mx-auto">
        <div className="grid gap-6 md:grid-cols-4 place-items-start">
          <div className="space-y-4">
            <Image
              src="/logo2.png"
              alt="Feyzo Logistics"
              width={280}
              height={90}
              className="h-20 w-auto md:h-24"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t("description")}
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-[#1e40af]">
              {t("services.title")}
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="/services/express-shipping"
                  className="hover:text-[#14b8a6] transition-colors cursor-pointer block"
                >
                  {t("services.expressShipping")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/freight-services"
                  className="hover:text-[#14b8a6] transition-colors cursor-pointer block"
                >
                  {t("services.freightServices")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/warehousing"
                  className="hover:text-[#14b8a6] transition-colors cursor-pointer block"
                >
                  {t("services.warehousing")}
                </Link>
              </li>
              <li>
                <Link
                  href="/services/supply-chain"
                  className="hover:text-[#14b8a6] transition-colors cursor-pointer block"
                >
                  {t("services.supplyChain")}
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-[#1e40af]">
              {t("company.title")}
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>
                <Link
                  href="/about"
                  className="hover:text-[#14b8a6] transition-colors cursor-pointer block"
                >
                  {t("company.aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-[#14b8a6] transition-colors cursor-pointer block"
                >
                  {t("company.contact")}
                </Link>
              </li>
              <li className="hover:text-[#14b8a6] transition-colors cursor-pointer">
                {t("company.careers")}
              </li>
              <li className="hover:text-[#14b8a6] transition-colors cursor-pointer">
                {t("company.news")}
              </li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-[#1e40af]">
              {t("support.title")}
            </h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="hover:text-[#14b8a6] transition-colors cursor-pointer">
                {t("support.helpCenter")}
              </li>
              <li className="hover:text-[#14b8a6] transition-colors cursor-pointer">
                {t("support.trackShipment")}
              </li>
              <li className="hover:text-[#14b8a6] transition-colors cursor-pointer">
                {t("support.faqs")}
              </li>
              <li className="hover:text-[#14b8a6] transition-colors cursor-pointer">
                {t("support.support")}
              </li>
            </ul>
            <div className="pt-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-[#1e40af]/20 text-center text-sm text-gray-600 dark:text-gray-400">
          <p>{t("copyright")}</p>
        </div>
      </div>
    </footer>
  );
}
