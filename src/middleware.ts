import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { stripLocalePrefix } from "@/lib/locale";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    !pathname.startsWith("/admin") &&
    !pathname.startsWith("/api") &&
    (pathname === "/ar" || pathname.startsWith("/ar/"))
  ) {
    const bare = stripLocalePrefix(pathname);
    const url = request.nextUrl.clone();
    url.pathname = bare;
    const res = NextResponse.rewrite(url);
    res.headers.set("x-locale", "ar");
    return res;
  }

  return updateSession(request);
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif)$).*)",
  ],
};
