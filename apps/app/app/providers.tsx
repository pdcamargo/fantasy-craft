"use client";

import { Locales } from "@craft/translation";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { createContext, useContext, useState } from "react";
import NiceModal from "@ebay/nice-modal-react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@craft/ui";

import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/pt-br";

import { FeatureFlags } from "./feature-flags";

type ContextType = {
  locale: Locales;
  setLocale: (locale: Locales) => void;
  timeZone: string;
  setTimeZone: (timeZone: string) => void;
  featureFlags: FeatureFlags;
};

const AppContext = createContext<ContextType>({
  locale: "en",
  setLocale: () => {},
  timeZone: "UTC",
  setTimeZone: () => {},
  featureFlags: {} as FeatureFlags,
});

const useAppContext = () => {
  const val = useContext(AppContext);

  if (!val) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return val;
};

export const useFeatureFlags = () => {
  const { featureFlags } = useAppContext();

  return featureFlags;
};

export const AppProvider: React.FC<{
  children: React.ReactNode;
  messages?: AbstractIntlMessages;
  defaultLocale?: Locales;
  defaultTimeZone?: string;
  featureFlags: FeatureFlags;
}> = ({ children, messages, defaultLocale, defaultTimeZone, featureFlags }) => {
  const [locale, setLocale] = useState<Locales>(defaultLocale || "en");
  const [timeZone, setTimeZone] = useState<string>(defaultTimeZone || "UTC");
  const [queryClient] = useState(() => new QueryClient());

  if (locale === "pt-BR") {
    dayjs.locale("pt-br");
  } else {
    dayjs.locale("en");
  }

  return (
    <NiceModal.Provider>
      <AppContext.Provider
        value={{ locale, setLocale, timeZone, setTimeZone, featureFlags }}
      >
        <NextIntlClientProvider
          messages={messages}
          timeZone={timeZone}
          locale={locale}
        >
          <QueryClientProvider client={queryClient}>
            {children}

            <Toaster />
          </QueryClientProvider>
        </NextIntlClientProvider>
      </AppContext.Provider>
    </NiceModal.Provider>
  );
};

export const useLocaleState = () => {
  const { setLocale, locale } = useAppContext();

  return [locale, setLocale] as const;
};
