import { NextResponse } from "next/server";
import type { Notif, Request as QuoteRequest } from "@/lib/types";
import * as demo from "@/lib/data/demo-store";
import { syncDemoFromCookies, overlaySetCookieHeader } from "@/lib/data/demo-sync";
import { isSupabaseConfigured } from "@/lib/supabase/server";

/**
 * Demo-only: import requests created in the browser (localStorage)
 * into the cookie-backed demo store so SSR/admin keep seeing them.
 */
export async function POST(req: globalThis.Request) {
  if (isSupabaseConfigured()) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const body = await req.json().catch(() => ({}));
  const requests = Array.isArray(body.requests) ? (body.requests as QuoteRequest[]) : [];
  const notifs = Array.isArray(body.notifs) ? (body.notifs as Notif[]) : [];

  await syncDemoFromCookies();

  const overlay = demo.demoExportOverlay();
  for (const r of requests) {
    if (!r?.ref) continue;
    const i = overlay.requests.findIndex((x) => x.ref === r.ref);
    if (i >= 0) overlay.requests[i] = r;
    else overlay.requests.unshift(r);
    const num = Number(String(r.ref).split("-").pop());
    if (Number.isFinite(num) && num >= overlay.seq) overlay.seq = num + 1;
  }
  for (const n of notifs) {
    if (!n?.id) continue;
    if (!overlay.notifs.some((x) => x.id === n.id || (x.ref === n.ref && !x.read))) {
      overlay.notifs.unshift(n);
    }
  }

  demo.demoHydrateFromOverlay(overlay);
  const merged = demo.demoExportOverlay();
  const res = NextResponse.json({
    ok: true,
    count: merged.requests.length,
    refs: merged.requests.map((r) => r.ref),
  });
  const c = overlaySetCookieHeader(merged);
  res.cookies.set(c.name, c.value, c.options);
  return res;
}
