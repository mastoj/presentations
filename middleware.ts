import { precomputedFlags } from "@/lib/flags";
import { precompute } from "flags/next";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const languageCookieName = "nextndc-lang";

const getLanguagePath = (pathname: string) => {
  const languagePath = pathname.split("/")[3];
  return languagePath;
};

const getUrl = (request: NextRequest, code: string, pathOverride?: string) =>
  new URL(
    `/${code}${pathOverride ?? request.nextUrl.pathname}${
      request.nextUrl.search
    }`,
    request.url
  ).href;

const HandleI18nDemo = (request: NextRequest, code: string) => {
  const languagePath = getLanguagePath(request.nextUrl.pathname);

  if (languagePath) {
    const response = NextResponse.redirect(getUrl(request, code));
    response.cookies.set(languageCookieName, languagePath);
    return response;
  }
  const languageCookie = request.cookies.get(languageCookieName);
  if (languageCookie) {
    const pathOverride = `${request.nextUrl.pathname}/${languageCookie.value}`;
    return NextResponse.rewrite(getUrl(request, code, pathOverride));
  }

  const pathOverride = `${request.nextUrl.pathname}/en`;
  request.cookies.set(languageCookieName, "en");
  const response = NextResponse.rewrite(getUrl(request, code, pathOverride), {
    request,
  });
  return response;
};

export async function middleware(request: NextRequest) {
  const code = await precompute(precomputedFlags);
  if (request.nextUrl.pathname.startsWith("/demos/i18n")) {
    return HandleI18nDemo(request, code);
  }
  const url = getUrl(request, code);
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/demos/i18n/:path*", "/demos/:path*", "/reactparis/:path*", "/"],
};
