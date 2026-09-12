"use client";

import * as React from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme-inline-script";

export type ThemeName = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  resolvedTheme: "light" | "dark" | undefined;
  systemTheme: "light" | "dark" | undefined;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function getSystemEffective(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function applyDom(effective: "light" | "dark") {
  const root = document.documentElement;
  root.classList.toggle("dark", effective === "dark");
  root.style.colorScheme = effective;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<ThemeName>("system");
  const [systemTheme, setSystemTheme] = React.useState<
    "light" | "dark" | undefined
  >(undefined);
  const [isHydrated, setIsHydrated] = React.useState(false);

  // Calculate resolvedTheme during render instead of inside an effect.
  const resolvedTheme = isHydrated
    ? theme === "system"
      ? systemTheme
      : theme
    : undefined;

  // 1. Initial Mount
  React.useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName | null;
    const initial: ThemeName =
      stored === "light" || stored === "dark" || stored === "system"
        ? stored
        : "system";

    setThemeState(initial);
    setSystemTheme(getSystemEffective());
    setIsHydrated(true);

    const effective = initial === "system" ? getSystemEffective() : initial;
    applyDom(effective);
  }, []);

  // 2. Handle theme changes (user interaction)
  React.useEffect(() => {
    if (!isHydrated) return;

    const effective = theme === "system" ? systemTheme || "light" : theme;
    applyDom(effective);

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* private mode */
    }
  }, [theme, systemTheme, isHydrated]);

  // 3. Listen for OS system preference changes
  React.useEffect(() => {
    if (!isHydrated) return;

    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      setSystemTheme(getSystemEffective());
    };

    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [isHydrated]);

  const setTheme = React.useCallback((next: ThemeName) => {
    setThemeState(next);
  }, []);

  const value = React.useMemo(
    () => ({ theme, setTheme, resolvedTheme, systemTheme }),
    [theme, setTheme, resolvedTheme, systemTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return {
    theme: ctx.theme,
    setTheme: ctx.setTheme,
    resolvedTheme: ctx.resolvedTheme,
    themes: ["light", "dark", "system"] as const,
    systemTheme: ctx.systemTheme,
  };
}
