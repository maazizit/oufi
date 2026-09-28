import type { Request } from "@/lib/types";

const KEY = "oufi-last-request";

export function saveLastRequest(request: Request) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(request));
  } catch {
    /* ignore */
  }
}

export function readLastRequest(ref?: string | null): Request | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    const r = JSON.parse(raw) as Request;
    if (ref && r.ref !== ref) return null;
    return r;
  } catch {
    return null;
  }
}
