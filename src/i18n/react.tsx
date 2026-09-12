"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import {
  useTranslations as createTranslator,
  type AppLocale,
  type Translator,
} from "./index";

const LocaleContext = createContext<AppLocale>("ar");

export function I18nProvider({
  locale,
  children,
}: {
  locale: AppLocale;
  children: ReactNode;
}) {
  return (
    <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>
  );
}

export function useLocale(): AppLocale {
  return useContext(LocaleContext);
}

export function useTranslations(namespace: string): Translator {
  const locale = useContext(LocaleContext);
  return createTranslator(locale, namespace);
}
