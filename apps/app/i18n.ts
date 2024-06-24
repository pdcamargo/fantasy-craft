import { getRequestConfig } from "next-intl/server";

import translations from "@craft/translation";

export default getRequestConfig(async (config) => {
  // Provide a static locale, fetch a user setting,
  // read from `cookies()`, `headers()`, etc.
  const locale = "pt-BR";

  return {
    locale,
    messages: await translations[locale](),
    timeZone: "UTC",
  };
});
