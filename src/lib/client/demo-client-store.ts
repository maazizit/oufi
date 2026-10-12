import type { Notif, Request } from "@/lib/types";

const REQ_KEY = "oufi-demo-requests";
const NOTIF_KEY = "oufi-demo-notifs";
const LAST_KEY = "oufi-last-request";

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* quota / private mode */
  }
}

export function saveLastRequest(request: Request) {
  try {
    sessionStorage.setItem(LAST_KEY, JSON.stringify(request));
  } catch {
    /* ignore */
  }
  upsertClientRequest(request);
}

export function readLastRequest(ref?: string | null): Request | null {
  try {
    const raw = sessionStorage.getItem(LAST_KEY);
    if (!raw) return null;
    const r = JSON.parse(raw) as Request;
    if (ref && r.ref !== ref) return null;
    return r;
  } catch {
    return null;
  }
}

export function listClientRequests(): Request[] {
  if (typeof window === "undefined") return [];
  return readJson<Request[]>(REQ_KEY, []);
}

export function getClientRequest(ref: string): Request | null {
  return listClientRequests().find((r) => r.ref === ref) || null;
}

export function upsertClientRequest(request: Request) {
  if (typeof window === "undefined") return;
  const list = listClientRequests().filter((r) => r.ref !== request.ref);
  list.unshift(request);
  writeJson(REQ_KEY, list.slice(0, 40));

  const notifs = listClientNotifs().filter((n) => n.ref !== request.ref || n.read);
  notifs.unshift({
    id: `local-${request.ref}`,
    at: request.created,
    ref: request.ref,
    read: false,
    txt: {
      fr: `Nouvelle demande de ${request.name}`,
      ar: `طلب جديد من ${request.name}`,
    },
  });
  writeJson(NOTIF_KEY, notifs.slice(0, 40));
}

export function listClientNotifs(): Notif[] {
  if (typeof window === "undefined") return [];
  return readJson<Notif[]>(NOTIF_KEY, []);
}

export function markClientNotifsRead() {
  const next = listClientNotifs().map((n) => ({ ...n, read: true }));
  writeJson(NOTIF_KEY, next);
}

/** Merge server list with localStorage (local wins on same ref). */
export function mergeRequests(server: Request[], local: Request[]): Request[] {
  const map = new Map<string, Request>();
  for (const r of server) map.set(r.ref, r);
  for (const r of local) map.set(r.ref, r);
  return [...map.values()].sort((a, b) =>
    String(b.created).localeCompare(String(a.created)),
  );
}
