import type { Intervention, Notif, Request } from "../types";

export const DEMO_OVERLAY_COOKIE = "oufi-demo-overlay";

export type DemoOverlay = {
  requests: Request[];
  notifs: Notif[];
  interv: Intervention[];
  seq: number;
};

function slimRequest(r: Request): Request {
  return {
    ...r,
    desc: (r.desc || "").slice(0, 400),
    notes: (r.notes || []).slice(-4),
    tl: (r.tl || []).slice(-6),
    items: (r.items || []).slice(0, 30),
  };
}

export function parseDemoOverlay(raw?: string | null): DemoOverlay | null {
  if (!raw) return null;
  try {
    const decoded = raw.includes("%") ? decodeURIComponent(raw) : raw;
    const data = JSON.parse(decoded) as DemoOverlay;
    if (!data || !Array.isArray(data.requests)) return null;
    return {
      requests: data.requests,
      notifs: Array.isArray(data.notifs) ? data.notifs : [],
      interv: Array.isArray(data.interv) ? data.interv : [],
      seq: Number(data.seq) || 143,
    };
  } catch {
    return null;
  }
}

export function serializeDemoOverlay(overlay: DemoOverlay): string {
  const slim: DemoOverlay = {
    seq: overlay.seq,
    requests: overlay.requests.slice(0, 10).map(slimRequest),
    notifs: overlay.notifs.slice(0, 20),
    interv: overlay.interv.slice(0, 10),
  };
  return encodeURIComponent(JSON.stringify(slim));
}

export const DEMO_OVERLAY_COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
};
