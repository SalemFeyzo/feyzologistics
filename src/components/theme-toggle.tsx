"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme-inline-script";
import { useTranslations, type AppLocale } from "@/i18n";

function useIsClient() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ThemeToggle({ locale }: { locale: AppLocale }) {
  const t = useTranslations(locale, "Navbar");
  const isClient = useIsClient();
  const [isDark, setIsDark] = useState(false);

  // Sync with the blocking inline script that already applied `.dark` before paint.
  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  if (!isClient) {
    return <span className="inline-flex size-9 shrink-0" aria-hidden />;
  }

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    setIsDark(next === "dark");
    document.documentElement.classList.toggle("dark", next === "dark");
    document.documentElement.style.colorScheme = next;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      /* private mode */
    }
  };

  return (
    <button
      type="button"
      className="inline-flex size-9 shrink-0 items-center justify-center rounded-4xl border border-transparent text-sm font-medium text-foreground transition-all hover:bg-muted hover:text-foreground"
      onClick={toggle}
      aria-label={isDark ? t("themeLight") : t("themeDark")}
      aria-pressed={isDark}
    >
      {isDark ? (
        <SunIcon className="size-5" />
      ) : (
        <MoonIcon className="size-5" />
      )}
    </button>
  );
}

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}
