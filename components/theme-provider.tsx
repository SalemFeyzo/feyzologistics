"use client";

import * as React from "react";
import { THEME_STORAGE_KEY } from "@/lib/theme-inline-script";

export type ThemeName = "light" | "dark" | "system";

type ThemeContextValue = {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  resolvedTheme: "light" | "dark" | undefined;
};

const ThemeContext = React.createContext<ThemeContextValue | null>(null);

function getSystemEffective(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function resolveEffective(theme: ThemeName): "light" | "dark" {
  return theme === "system" ? getSystemEffective() : theme;
}

function applyDom(effective: "light" | "dark") {
  const root = document.documentElement;
  root.classList.toggle("dark", effective === "dark");
  root.style.colorScheme = effective;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = React.useState<ThemeName>("system");
  const [resolvedTheme, setResolvedTheme] = React.useState<
    "light" | "dark" | undefined
  >(undefined);
  const [isHydrated, setIsHydrated] = React.useState(false);

  React.useEffect(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY) as ThemeName | null;
    const initial: ThemeName =
      stored === "light" || stored === "dark" || stored === "system"
        ? stored
        : "system";
    setThemeState(initial);
    const effective = resolveEffective(initial);
    setResolvedTheme(effective);
    applyDom(effective);
    setIsHydrated(true);
  }, []);

  React.useEffect(() => {
    if (!isHydrated) return;
    const effective = resolveEffective(theme);
    setResolvedTheme(effective);
    applyDom(effective);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* private mode */
    }
  }, [theme, isHydrated]);

  React.useEffect(() => {
    if (!isHydrated || theme !== "system") return;
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const effective = getSystemEffective();
      setResolvedTheme(effective);
      applyDom(effective);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [theme, isHydrated]);

  const setTheme = React.useCallback((next: ThemeName) => {
    setThemeState(next);
  }, []);

  const value = React.useMemo(
    () => ({ theme, setTheme, resolvedTheme }),
    [theme, setTheme, resolvedTheme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

/** Compatible with the subset of `next-themes` used in this app. */
export function useTheme() {
  const ctx = React.useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return {
    theme: ctx.theme,
    setTheme: (name: string) => {
      if (name === "light" || name === "dark" || name === "system") {
        ctx.setTheme(name);
      }
    },
    resolvedTheme: ctx.resolvedTheme,
    themes: ["light", "dark", "system"] as const,
    systemTheme:
      typeof window === "undefined" ? undefined : getSystemEffective(),
  };
}
