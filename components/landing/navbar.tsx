"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export function Navbar() {
  const t = useTranslations("Navbar");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className="sticky top-0 z-50 w-full border-b border-[#1e40af]/20 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/95 dark:bg-gray-950/95"
      dir="ltr"
    >
      <div className="container flex h-20 items-center justify-between px-4 md:px-6 mx-auto">
        <Link href="/" className="flex items-center justify-center h-full">
          <Image
            src="/logo.png"
            alt="Feyzo Logistics"
            width={220}
            height={60}
            className="h-12 w-auto md:h-16 object-contain"
            priority
          />
          <div className="flex flex-col justify-center">
            <span className="text-xl md:text-2xl font-bold text-[#1e40af] leading-tight logo-text">
              Feyzo
            </span>
            <span className="text-xl md:text-2xl font-bold text-[#14b8a6] leading-tight logo-text">
              Logistics
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center justify-center gap-4 h-full">
          <Link
            href="/services"
            className="text-sm font-medium text-[#1e40af] transition-colors hover:text-[#14b8a6]"
          >
            {t("services")}
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-[#1e40af] transition-colors hover:text-[#14b8a6]"
          >
            {t("about")}
          </Link>
          <Link href="/contact">
            <Button
              variant="outline"
              size="sm"
              className="border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af] hover:text-white"
            >
              {t("contact")}
            </Button>
          </Link>
          <Button
            size="sm"
            className="bg-linear-to-r from-[#1e40af] to-[#14b8a6] hover:opacity-90 text-white"
          >
            {t("getStarted")}
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMobileMenu}
          className="md:hidden flex items-center justify-center p-2 rounded-md text-[#1e40af] hover:text-[#14b8a6] hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-50 dark:hover:bg-gray-800 transition-colors"
          aria-label={t("toggleMenu")}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/95 dark:bg-gray-950/95">
          <div className="container px-4 py-4 mx-auto space-y-3">
            <Link
              href="/services"
              onClick={closeMobileMenu}
              className="block text-sm font-medium text-[#1e40af] transition-colors hover:text-[#14b8a6] py-2"
            >
              {t("services")}
            </Link>
            <Link
              href="/about"
              onClick={closeMobileMenu}
              className="block text-sm font-medium text-[#1e40af] transition-colors hover:text-[#14b8a6] py-2"
            >
              {t("about")}
            </Link>
            <div className="flex flex-col gap-2 pt-2">
              <Link href="/contact" onClick={closeMobileMenu} className="w-full">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full border-[#1e40af] text-[#1e40af] hover:bg-[#1e40af] hover:text-white"
                >
                  {t("contact")}
                </Button>
              </Link>
              <Button
                size="sm"
                onClick={closeMobileMenu}
                className="w-full bg-linear-to-r from-[#1e40af] to-[#14b8a6] hover:opacity-90 text-white"
              >
                {t("getStarted")}
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
