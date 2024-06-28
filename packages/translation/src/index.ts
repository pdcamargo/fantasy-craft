import { Formats, TranslationValues, useTranslations } from "next-intl";

import { TranslationKey } from "./utils";

const translation = {
  en: async () => (await import("./en.json")).default,
  "pt-BR": async () => (await import("./pt-BR.json")).default,
};

export default translation;

export type TranslationNamespaces = keyof typeof import("./pt-BR.json");

export type Locales = keyof typeof translation;

export function useTranslation() {
  const t = useTranslations();

  return {
    t: (
      key: TranslationKey,
      values?: TranslationValues,
      formats?: Partial<Formats>,
    ) => t(key, values, formats),
  };
}
