import type { Lang } from "@/lib/types";

export function stripLocalePrefix(pathname: string): string {
  if (pathname === "/ar" || pathname.startsWith("/ar/")) {
    const rest = pathname.slice(3) || "/";
    return rest.startsWith("/") ? rest : `/${rest}`;
  }
  return pathname || "/";
}

export function withLocale(path: string, lang: Lang): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === "ar") {
    if (clean === "/") return "/ar";
    return `/ar${clean}`;
  }
  return clean === "/ar" ? "/" : clean.replace(/^\/ar/, "") || "/";
}

export function localeFromPath(pathname: string): Lang {
  return pathname === "/ar" || pathname.startsWith("/ar/") ? "ar" : "fr";
}

export function alternateUrls(path: string, siteUrl: string) {
  const base = stripLocalePrefix(path);
  const frPath = base === "/" ? "" : base;
  const arPath = base === "/" ? "/ar" : `/ar${base}`;
  return {
    fr: `${siteUrl}${frPath || "/"}`,
    ar: `${siteUrl}${arPath}`,
    "fr-MA": `${siteUrl}${frPath || "/"}`,
    "ar-MA": `${siteUrl}${arPath}`,
    "x-default": `${siteUrl}${frPath || "/"}`,
  };
}
