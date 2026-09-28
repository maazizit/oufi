import { cookies } from "next/headers";
import {
  DEMO_OVERLAY_COOKIE,
  DEMO_OVERLAY_COOKIE_OPTS,
  parseDemoOverlay,
  serializeDemoOverlay,
  type DemoOverlay,
} from "./demo-overlay";
import * as demo from "./demo-store";
import { isSupabaseConfigured } from "@/lib/supabase/server";

/** Load cookie overlay into the in-memory demo DB (no-op if Supabase is configured). */
export async function syncDemoFromCookies() {
  if (isSupabaseConfigured()) return;
  try {
    const jar = await cookies();
    const overlay = parseDemoOverlay(jar.get(DEMO_OVERLAY_COOKIE)?.value);
    demo.demoHydrateFromOverlay(overlay);
  } catch {
    /* cookies() unavailable outside request scope */
  }
}

export function overlaySetCookieHeader(overlay: DemoOverlay): {
  name: string;
  value: string;
  options: typeof DEMO_OVERLAY_COOKIE_OPTS;
} {
  return {
    name: DEMO_OVERLAY_COOKIE,
    value: serializeDemoOverlay(overlay),
    options: DEMO_OVERLAY_COOKIE_OPTS,
  };
}
