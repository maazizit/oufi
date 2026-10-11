/**
 * Source unique NAP / identité AMANPLANET (C.I.S.).
 * Téléphone, email et adresse rue : valeurs temporaires — à confirmer par le client.
 */

export const SITE = {
  name: "AMANPLANET",
  legalName: "AMANPLANET",
  cis: "C.I.S. (Conseil • Installation • Suivi)",
  cisShort: "Conseil • Installation • Suivi",
  tagline: {
    fr: "Conseil • Installation • Suivi",
    ar: "معك من الاختيار إلى التركيب والمتابعة",
  },
  /** Adresse partielle confirmée (pas de numéro de rue inventé). */
  addressPlaceholder: "Boulevard Nakhil",
  address: {
    fr: "Boulevard Nakhil — Marrakech, Maroc",
    ar: "بوليفار النخيل — مراكش، المغرب",
  },
  streetAddress: "Boulevard Nakhil",
  locality: "Marrakech",
  region: "Marrakech-Safi",
  country: "MA",
  /** Confirmé client — affichage + E.164 / WhatsApp */
  phoneDisplay: "+212 641-766354",
  phoneE164: "+212641766354",
  whatsappDisplay: "+212 641-766354",
  whatsappE164: "212641766354",
  /** Email non fourni — conserver temporairement */
  email: "amanplanet@gmail.com",
  zone: {
    fr: "Tout le Maroc",
    ar: "جميع أنحاء المغرب",
  },
  hqCity: "Marrakech",
  /** Nom confirmé (ابراهيم العوفي) — champ manager / contact légal */
  manager: "Ibrahim El Oufi",
  hours: {
    fr: "Lundi – vendredi : 9 h – 18 h 30 · Samedi : 9 h – 13 h",
    ar: "الاثنين – الجمعة: 9:00 – 18:30 · السبت: 9:00 – 13:00",
  },
  /** Garantie pose + main-d’œuvre (hors garantie fabricant matériel). */
  installWarrantyMonths: 12,
  slaHours: 24,
  brands: [
    "Hikvision",
    "Dahua",
    "Ezviz",
    "TP-Link",
    "Ubiquiti",
    "MikroTik",
    "ZKTeco",
    "Eaton",
    "HP",
    "Epson",
  ] as const,
  clients: {
    fr: [
      "magasins",
      "cafés / restaurants",
      "cabinets médicaux",
      "dépôts",
      "écoles privées",
      "syndics",
      "villas",
      "riads",
      "hôtels",
    ],
    ar: [
      "محلات تجارية",
      "مقاهي / مطاعم",
      "عيادات طبية",
      "مستودعات",
      "مدارس خاصة",
      "نقابات السكن",
      "فيلات",
      "رياضات",
      "فنادق",
    ],
  },
  /**
   * Frais déplacement — VALIDATION PRIX REQUISE (user).
   * Ancien « 200 DH Casablanca » retiré. Marrakech en tête.
   */
  FEE_NEEDS_USER_VALIDATION: true as const,
  fees: [
    ["Marrakech", 250],
    ["Casablanca", 350],
    ["Rabat", 350],
    ["Tanger", 450],
    ["Agadir", 400],
    ["Fès", 400],
    ["Meknès", 400],
  ] as [string, number][],
  telHref: "tel:+212641766354",
  waHref: "https://wa.me/212641766354",
  mailHref: "mailto:amanplanet@gmail.com",
} as const;

/** Always HTTPS — never emit http:// canonicals / OG. */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://amanplanet.com"
).replace(/^http:\/\//i, "https://");

/** Témoignages affichés — à confirmer par le client (pas d’AggregateRating). */
export const TESTIMONIALS_NEED_USER_CONFIRMATION = true as const;
