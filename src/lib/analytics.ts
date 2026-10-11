/**
 * Préparation GSC / GA4 — brancher NEXT_PUBLIC_GA_ID quand disponible.
 * Events métier : tel, WhatsApp, devis, panier.
 */

export type AnalyticsEvent =
  | "click_tel"
  | "click_whatsapp"
  | "submit_devis"
  | "add_to_cart"
  | "view_catalogue";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: AnalyticsEvent, params?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event, ...params });
    if (typeof window.gtag === "function") {
      window.gtag("event", event, params);
    }
  } catch {
    /* ignore */
  }
}
