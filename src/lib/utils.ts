import type { Lang, Localized, Product, Settings } from "./types";
import { CATS, ROLES, SPECK, STATUSES, TYPES, CHANS } from "./data/constants";
import { L, money, t } from "./data/i18n";

export function pad(n: number) {
  return (n < 10 ? "0" : "") + n;
}

export function fmtD(s: string) {
  const d = new Date(s);
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()}`;
}

export function fmtT(s: string) {
  const d = new Date(s);
  return `${pad(d.getHours())}h${pad(d.getMinutes())}`;
}

export function fmtDT(s: string) {
  return `${fmtD(s)} · ${fmtT(s)}`;
}

export function initials(n: string) {
  return String(n || "?")
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export function feeFor(settings: Settings, city: string) {
  const f = settings.fees.find((x) => x[0] === city);
  return f ? f[1] : null;
}

export function catOf(id: string) {
  return CATS.find((c) => c.id === id) || CATS[0];
}

export function statusOf(id: string) {
  return STATUSES.find((s) => s.id === id) || STATUSES[0];
}

export function typeOf(id: string) {
  return TYPES.find((s) => s.id === id) || TYPES[0];
}

export function chanOf(id: string) {
  return CHANS.find((s) => s.id === id) || CHANS[0];
}

export function roleOf(id: string) {
  return ROLES.find((r) => r.id === id) || ROLES[1];
}

export function specLabel(lang: Lang, key: string) {
  return SPECK[key] ? L(lang, SPECK[key]) : key;
}

export function stockLabel(lang: Lang, p: Product) {
  if (p.stock <= 0) return { text: t(lang, "outstock"), cls: "pill-mute" };
  if (p.stock <= 5) return { text: t(lang, "lowstock"), cls: "pill-warn" };
  return { text: t(lang, "instock"), cls: "pill-ok" };
}

export function isToday(s: string, day = new Date()) {
  const d = new Date(s);
  return (
    d.getFullYear() === day.getFullYear() &&
    d.getMonth() === day.getMonth() &&
    d.getDate() === day.getDate()
  );
}

export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function localizeFeeLine(
  lang: Lang,
  settings: Settings,
  city?: string,
) {
  const c = city || settings.fees[0]?.[0] || "Casablanca";
  const fee = feeFor(settings, c);
  return t(lang, "h_fee", {
    fee: fee != null ? money(lang, fee) : t(lang, "q_feeask"),
    city: c,
  });
}

export function normalizePhone(v: string) {
  return v.replace(/[\s().-]/g, "");
}

export type { Localized };
