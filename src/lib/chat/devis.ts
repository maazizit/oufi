import type { ChatDevisDraft } from "./types";

const ALLOWED_TYPE = new Set(["install", "prod", "maint", "fix"]);
const ALLOWED_SVC = new Set(["cam", "net", "it", "acc", "other"]);
const ALLOWED_LOCAL = new Set(["shop", "cafe", "office", "depot", "villa", "other"]);

export function buildDevisUrl(draft: ChatDevisDraft | undefined | null): string {
  if (!draft) return "/devis";
  const q = new URLSearchParams();
  q.set("from_chat", "1");
  if (draft.type && ALLOWED_TYPE.has(draft.type)) q.set("type", draft.type);
  if (draft.svc && ALLOWED_SVC.has(draft.svc)) q.set("svc", draft.svc);
  if (draft.city) q.set("city", draft.city.slice(0, 80));
  if (draft.desc) q.set("desc", draft.desc.slice(0, 500));
  if (draft.cams) q.set("cams", draft.cams.slice(0, 20));
  if (draft.local && ALLOWED_LOCAL.has(draft.local)) q.set("local", draft.local);
  if (draft.name) q.set("name", draft.name.slice(0, 120));
  if (draft.company) q.set("company", draft.company.slice(0, 120));
  if (draft.addr) q.set("addr", draft.addr.slice(0, 200));
  if (draft.phone) q.set("phone", draft.phone.slice(0, 30));
  return `/devis?${q.toString()}`;
}

export function normalizeDraft(raw: unknown): ChatDevisDraft | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const o = raw as Record<string, unknown>;
  const draft: ChatDevisDraft = {};
  if (typeof o.type === "string" && ALLOWED_TYPE.has(o.type)) draft.type = o.type;
  if (typeof o.svc === "string" && ALLOWED_SVC.has(o.svc)) draft.svc = o.svc;
  if (typeof o.city === "string") draft.city = o.city.trim();
  if (typeof o.desc === "string") draft.desc = o.desc.trim();
  if (typeof o.cams === "string") draft.cams = o.cams.trim();
  if (typeof o.local === "string" && ALLOWED_LOCAL.has(o.local)) draft.local = o.local;
  if (typeof o.name === "string") draft.name = o.name.trim();
  if (typeof o.company === "string") draft.company = o.company.trim();
  if (typeof o.addr === "string") draft.addr = o.addr.trim();
  if (typeof o.phone === "string") draft.phone = o.phone.trim();
  const has = Object.values(draft).some((v) => v && String(v).length > 0);
  return has ? draft : undefined;
}
