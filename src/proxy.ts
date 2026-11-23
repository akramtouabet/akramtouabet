import { NextResponse, type NextRequest } from "next/server";
import { isLocale, pickLocale } from "@/i18n";

/** Préfixe la langue aux adresses qui n'en ont pas, selon les préférences du navigateur. */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (isLocale(pathname.split("/")[1] ?? "")) return;

  const url = request.nextUrl.clone();
  url.pathname = `/${pickLocale(request.headers.get("accept-language"))}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next|icon|sitemap.xml|robots.txt|.*\\..*).*)"],
};
