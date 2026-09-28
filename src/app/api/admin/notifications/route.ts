import { NextResponse } from "next/server";
import { getNotifs, markNotifsRead, exportDemoOverlayIfNeeded } from "@/lib/data/repository";
import { overlaySetCookieHeader } from "@/lib/data/demo-sync";
import { isSupabaseConfigured } from "@/lib/supabase/server";

export async function GET() {
  const notifs = await getNotifs();
  return NextResponse.json({
    notifs,
    unread: notifs.filter((n) => !n.read).length,
  });
}

export async function PATCH(req: Request) {
  const body = await req.json().catch(() => ({}));
  const ids = Array.isArray(body.ids) ? body.ids.map(String) : undefined;
  await markNotifsRead(ids);
  const notifs = await getNotifs();
  const res = NextResponse.json({
    ok: true,
    notifs,
    unread: notifs.filter((n) => !n.read).length,
  });
  if (!isSupabaseConfigured()) {
    const overlay = await exportDemoOverlayIfNeeded();
    if (overlay) {
      const c = overlaySetCookieHeader(overlay);
      res.cookies.set(c.name, c.value, c.options);
    }
  }
  return res;
}
