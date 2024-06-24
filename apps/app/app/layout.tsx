import "./global.scss";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import { Inter as FontSans } from "next/font/google";
import { AppProvider } from "./providers";
import { Locales } from "@craft/translation";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages({
    locale,
  });

  return (
    <html lang={locale} className="h-full dark">
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Fantasy Craft</title>
      </head>
      <body
        className={`min-h-screen bg-background font-sans antialiased ${fontSans.variable}`}
      >
        <AppProvider messages={messages} defaultLocale={locale as Locales}>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
