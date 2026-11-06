import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

const authPages = new Set(["login", "create-account", "forgot-password"]);

export async function proxy(request: NextRequest) {
  //  Handle next-intl routing
  const response = handleI18nRouting(request);

  // If next-intl redirected the request, return its response
  if (response.status >= 300 && response.status < 400) {
    return response;
  }

  //  Get pathname
  const { pathname } = request.nextUrl;

  const segments = pathname.split("/").filter(Boolean);

  const locale = segments[0];
  const pathnameWithoutLocale = "/" + segments.slice(1).join("/");

  //  Check authentication
  const token = await getToken({ req: request });

  const isAuthPage = authPages.has(pathnameWithoutLocale.slice(1));

  // User is on login/create-account/forgot-password
  if (isAuthPage) {
    // Already logged in -> send to /en or /ar
    if (token) {
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }

    return response;
  }

  // Protected pages
  if (!token) {
    const loginUrl = new URL(`/${locale}/login`, request.url);

    loginUrl.searchParams.set("callbackUrl", pathname);

    return NextResponse.redirect(loginUrl);
  }

  // Everything is OK
  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
