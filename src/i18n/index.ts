import ar from "./messages/ar.json";
import en from "./messages/en.json";

export type AppLocale = "ar" | "en";

export const locales: AppLocale[] = ["ar", "en"];
export const defaultLocale: AppLocale = "ar";

export type JsonPrimitive = string | number | boolean | null;
export type JsonValue =
  | JsonPrimitive
  | JsonValue[]
  | { [key: string]: JsonValue };

type MessageDictionary = { [key: string]: JsonValue };

const dictionaries: Record<AppLocale, MessageDictionary> = {
  ar: ar as unknown as MessageDictionary,
  en: en as unknown as MessageDictionary,
};

function resolveValue(
  source: JsonValue | undefined,
  path: string,
): JsonValue | undefined {
  if (!path) return source;
  return path.split(".").reduce<JsonValue | undefined>((current, key) => {
    if (current && typeof current === "object" && !Array.isArray(current)) {
      return (current as { [key: string]: JsonValue })[key];
    }
    return undefined;
  }, source);
}

export type Translator = ((key?: string) => string) & {
  raw: (key?: string) => JsonValue | undefined;
};

export function useTranslations(locale: AppLocale, namespace: string): Translator {
  const ns = dictionaries[locale][namespace] as JsonValue | undefined;

  const t = ((key?: string): string => {
    const value = resolveValue(ns, key ?? "");
    if (typeof value === "string") return value;
    if (value === undefined) return key ?? "";
    return String(value);
  }) as Translator;

  t.raw = (key?: string): JsonValue | undefined => resolveValue(ns, key ?? "");

  return t;
}

export function getMessages(locale: AppLocale): MessageDictionary {
  return dictionaries[locale];
}
