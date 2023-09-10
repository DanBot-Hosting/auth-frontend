import { NextRequest, NextResponse } from "next/server";
import {
  getPreferredLocale,
  locale as supportedLocale,
} from "@/utils/dictionary";

// Locale middleware
export function middleware(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = supportedLocale.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale =
      getPreferredLocale(
        request.headers.get("accept-language") as string,
        supportedLocale as unknown as Locale[]
      ) ?? "en";

    // e.g. incoming request is /products
    // The new URL is now /en-US/products
    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
