import { getRequestConfig } from "next-intl/server";
import { cookies } from "next/headers";
import { routing } from "./routing";
import { hasLocale } from "next-intl";

export default getRequestConfig(async ({requestLocale}) => {
  //varriables
  const requestedLocale = await requestLocale;
  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;
 

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});


