export type ChatPage = {
  href: string;
  titleFr: string;
  titleAr: string;
  keywords: string[];
};

export const CHAT_PAGES: ChatPage[] = [
  {
    href: "/devis",
    titleFr: "Demande de devis",
    titleAr: "طلب عرض سعر",
    keywords: ["devis", "prix", "quote", "عرض", "سعر"],
  },
  {
    href: "/services",
    titleFr: "Nos services",
    titleAr: "خدماتنا",
    keywords: ["installation", "service", "خدمة", "تركيب"],
  },
  {
    href: "/catalogue",
    titleFr: "Catalogue produits",
    titleAr: "كتالوج المنتجات",
    keywords: ["catalogue", "caméra", "camera", "منتج", "كاميرا"],
  },
  {
    href: "/suivi",
    titleFr: "Suivi de demande",
    titleAr: "تتبع الطلب",
    keywords: ["suivi", "référence", "AMP", "تتبع"],
  },
  {
    href: "/contact",
    titleFr: "Contact",
    titleAr: "اتصل بنا",
    keywords: ["contact", "appel", "اتصال"],
  },
  {
    href: "/zones-d-intervention",
    titleFr: "Zones d'intervention",
    titleAr: "مناطق التدخل",
    keywords: ["ville", "marrakech", "casablanca", "zone", "مدينة"],
  },
  {
    href: "/services",
    titleFr: "Installation caméras",
    titleAr: "تركيب كاميرات",
    keywords: ["vidéosurveillance", "surveillance", "مراقبة"],
  },
];

export function catalogForPrompt(): string {
  return CHAT_PAGES.map((p) => `- ${p.href} | ${p.titleFr} / ${p.titleAr}`).join("\n");
}

export function sanitizeLinks(
  links: { href: string; titleFr?: string; titleAr?: string }[],
): { href: string; titleFr: string; titleAr: string }[] {
  const allowed = new Set(CHAT_PAGES.map((p) => p.href));
  const out: { href: string; titleFr: string; titleAr: string }[] = [];
  for (const l of links) {
    const href = l.href?.split("?")[0] || "";
    if (!allowed.has(href)) continue;
    const def = CHAT_PAGES.find((p) => p.href === href)!;
    out.push({
      href,
      titleFr: l.titleFr?.slice(0, 80) || def.titleFr,
      titleAr: l.titleAr?.slice(0, 80) || def.titleAr,
    });
    if (out.length >= 3) break;
  }
  return out;
}
