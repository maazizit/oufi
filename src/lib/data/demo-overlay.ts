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
    ref: r.ref,
    src: r.src,
    type: r.type,
    svc: r.svc || "",
    status: r.status,
    created: r.created,
    name: r.name,
    company: r.company || "",
    city: r.city || "",
    addr: (r.addr || "").slice(0, 120),
    local: r.local || "",
    surface: r.surface || "",
    rooms: r.rooms || "",
    cams: r.cams || "",
    place: r.place || "",
    net: r.net || "",
    exist: r.exist || "",
    delay: r.delay || "",
    budget: (r.budget || "").slice(0, 60),
    chan: r.chan,
    phone: r.phone || "",
    email: r.email || "",
    slot: r.slot || "any",
    fee: r.fee,
    desc: (r.desc || "").slice(0, 220),
    svcother: (r.svcother || "").slice(0, 80),
    tech: r.tech || "",
    items: (r.items || []).slice(0, 12),
    notes: (r.notes || []).slice(-2),
    tl: (r.tl || []).slice(-4),
  };
}

export function parseDemoOverlay(raw?: string | null): DemoOverlay | null {
  if (!raw) return null;
  try {
    let text = raw;
    // support base64 or uri-encoded JSON
    if (!text.startsWith("{") && !text.startsWith("%")) {
      try {
        text = Buffer.from(text, "base64").toString("utf8");
      } catch {
        /* keep */
      }
    }
    if (text.includes("%7B") || text.startsWith("%")) {
      text = decodeURIComponent(text);
    }
    const data = JSON.parse(text) as DemoOverlay;
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
  // Prefer newest user-created requests; keep cookie under ~3.5KB
  const slim: DemoOverlay = {
    seq: overlay.seq,
    requests: overlay.requests.slice(0, 6).map(slimRequest),
    notifs: overlay.notifs.slice(0, 8).map((n) => ({
      id: n.id,
      at: n.at,
      ref: n.ref,
      read: n.read,
      txt: { fr: (n.txt?.fr || "").slice(0, 80), ar: (n.txt?.ar || "").slice(0, 80) },
    })),
    interv: [],
  };
  const json = JSON.stringify(slim);
  return Buffer.from(json, "utf8").toString("base64");
}

export const DEMO_OVERLAY_COOKIE_OPTS = {
  httpOnly: true,
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 30,
  secure: process.env.NODE_ENV === "production",
};
