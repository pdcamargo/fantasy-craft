"use client";

import { Locales } from "@craft/translation";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { PropsWithChildren, createContext, useContext, useState } from "react";

type ContextType = {
  locale: Locales;
  setLocale: (locale: Locales) => void;
  timeZone: string;
  setTimeZone: (timeZone: string) => void;
};

const AppContext = createContext<ContextType>({
  locale: "en",
  setLocale: () => {},
  timeZone: "UTC",
  setTimeZone: () => {},
});

const useAppContext = () => {
  const val = useContext(AppContext);

  if (!val) {
    throw new Error("useAppContext must be used within AppProvider");
  }

  return val;
};
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const AppProvider: React.FC<{
  children: React.ReactNode;
  messages?: AbstractIntlMessages;
  defaultLocale?: Locales;
  defaultTimeZone?: string;
}> = ({ children, messages, defaultLocale, defaultTimeZone }) => {
  const [locale, setLocale] = useState<Locales>(defaultLocale || "en");
  const [timeZone, setTimeZone] = useState<string>(defaultTimeZone || "UTC");
  const [queryClient] = useState(() => new QueryClient());

  return (
    <AppContext.Provider value={{ locale, setLocale, timeZone, setTimeZone }}>
      <NextIntlClientProvider
        messages={messages}
        timeZone={timeZone}
        locale={locale}
      >
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </NextIntlClientProvider>
    </AppContext.Provider>
  );
};

export const useLocaleState = () => {
  const { setLocale, locale } = useAppContext();

  return [locale, setLocale] as const;
};
