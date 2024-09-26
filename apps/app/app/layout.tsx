import "./global.scss";

import { getLocale, getMessages } from "next-intl/server";
import { Inter as FontSans } from "next/font/google";
import { Roboto } from "next/font/google";
import { AppProvider } from "./providers";
import { Locales } from "@craft/translation";
import { getFeatureFlags } from "./feature-flags";
import NextAuthProvider from "./auth-provider";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontRoboto = Roboto({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
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

  const featureFlags = await getFeatureFlags();

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
        className={`min-h-screen bg-background font-sans antialiased ${fontSans.variable} ${fontRoboto.variable}`}
      >
        <NextAuthProvider>
          <AppProvider
            messages={messages}
            defaultLocale={locale as Locales}
            featureFlags={featureFlags}
          >
            {children}
          </AppProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
