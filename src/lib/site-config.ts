/**
 * Source unique NAP / identité AMANPLANET (C.I.S.).
 * Remplace toute ancienne donnée Casablanca / ancien téléphone.
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
  /** Placeholder unique — à remplacer par l'adresse Marrakech réelle */
  addressPlaceholder: "{{ADRESSE_MARRAKECH}}",
  address: {
    fr: "{{ADRESSE_MARRAKECH}} — Marrakech, Maroc",
    ar: "{{ADRESSE_MARRAKECH}} — مراكش، المغرب",
  },
  streetAddress: "{{ADRESSE_MARRAKECH}}",
  locality: "Marrakech",
  region: "Marrakech-Safi",
  country: "MA",
  phoneDisplay: "+212 6 41 76 63 54",
  phoneE164: "+212641766354",
  whatsappDisplay: "+212 6 41 76 63 54",
  whatsappE164: "212641766354",
  email: "amanplanet@gmail.com",
  zone: {
    fr: "Tout le Maroc",
    ar: "جميع أنحاء المغرب",
  },
  hqCity: "Marrakech",
  manager: "Karim Aman",
  hours: {
    fr: "Lundi – vendredi : 9 h – 18 h 30 · Samedi : 9 h – 13 h",
    ar: "الاثنين – الجمعة: 9:00 – 18:30 · السبت: 9:00 – 13:00",
  },
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

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://amanplanet.com";

/** Témoignages affichés — à confirmer par le client (pas d’AggregateRating). */
export const TESTIMONIALS_NEED_USER_CONFIRMATION = true as const;
