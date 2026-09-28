import type { Localized, Product, ProductCategory } from "../types";

export const CATS: { id: ProductCategory; fr: string; ar: string }[] = [
  { id: "cam", fr: "Caméras de surveillance", ar: "كاميرات المراقبة" },
  { id: "nvr", fr: "Enregistreurs & stockage", ar: "أجهزة التسجيل والتخزين" },
  { id: "net", fr: "Routeurs & réseau", ar: "الراوترات والشبكات" },
  { id: "acc", fr: "Contrôle d'accès", ar: "التحكم بالوصول" },
  { id: "it", fr: "Informatique & bureautique", ar: "تقنية المعلومات والمكتبيات" },
  { id: "cbl", fr: "Câblage & énergie", ar: "الكابلات والطاقة" },
];

export const SPECK: Record<string, Localized> = {
  res: { fr: "Résolution", ar: "الدقة" },
  lens: { fr: "Objectif", ar: "العدسة" },
  ir: { fr: "Vision nocturne", ar: "الرؤية الليلية" },
  prot: { fr: "Indice de protection", ar: "درجة الحماية" },
  ch: { fr: "Canaux", ar: "القنوات" },
  poe: { fr: "Alimentation PoE", ar: "تغذية PoE" },
  hdd: { fr: "Stockage maximum", ar: "أقصى تخزين" },
  ports: { fr: "Ports", ar: "المنافذ" },
  wifi: { fr: "Wi-Fi", ar: "واي فاي" },
  thr: { fr: "Débit", ar: "الصبيب" },
  cap: { fr: "Capacité", ar: "السعة" },
  pow: { fr: "Puissance", ar: "القدرة" },
  users: { fr: "Utilisateurs", ar: "المستخدمون" },
  zoom: { fr: "Zoom", ar: "التقريب" },
  len: { fr: "Longueur", ar: "الطول" },
  aut: { fr: "Autonomie", ar: "الاستقلالية" },
  cpu: { fr: "Processeur", ar: "المعالج" },
  ram: { fr: "Mémoire", ar: "الذاكرة" },
  disk: { fr: "Disque", ar: "القرص" },
};

export const LOCALS = [
  { id: "shop", fr: "Magasin / commerce", ar: "محل تجاري" },
  { id: "cafe", fr: "Café / restaurant", ar: "مقهى / مطعم" },
  { id: "office", fr: "Bureau / cabinet", ar: "مكتب / عيادة" },
  { id: "depot", fr: "Dépôt / atelier", ar: "مستودع / ورشة" },
  { id: "villa", fr: "Villa / appartement", ar: "فيلا / شقة" },
  { id: "other", fr: "Autre", ar: "آخر" },
];

export const PILLARS = [
  {
    id: "shop",
    k: "pill_shop_t",
    d: "pill_shop_d",
    href: "/catalogue",
    cta: "pill_shop_cta",
    ic: "cart" as const,
  },
  {
    id: "install",
    k: "pill_install_t",
    d: "pill_install_d",
    href: "/devis",
    cta: "pill_install_cta",
    ic: "cam" as const,
  },
  {
    id: "maint",
    k: "pill_maint_t",
    d: "pill_maint_d",
    href: "/devis?type=maint",
    cta: "pill_maint_cta",
    ic: "badge" as const,
  },
];

export const SVCS = [
  {
    id: "cam",
    k: "s_cam_t",
    ic: "cam" as const,
    from: 2400,
    li: ["s_cam_1", "s_cam_2", "s_cam_3"],
  },
  {
    id: "net",
    k: "s_net_t",
    ic: "router" as const,
    from: 1800,
    li: ["s_net_1", "s_net_2", "s_net_3"],
  },
  {
    id: "it",
    k: "s_it_t",
    ic: "pc" as const,
    from: 600,
    li: ["s_it_1", "s_it_2", "s_it_3"],
  },
  {
    id: "acc",
    k: "s_acc_t",
    ic: "badge" as const,
    from: 2100,
    li: ["s_acc_1", "s_acc_2", "s_acc_3"],
  },
];

export const STATUSES = [
  { id: "new", k: "st_new", p: "pill-new" },
  { id: "contacted", k: "st_contacted", p: "pill-warn" },
  { id: "visit", k: "st_visit", p: "pill-warn" },
  { id: "sent", k: "st_sent", p: "pill-new" },
  { id: "won", k: "st_won", p: "pill-ok" },
  { id: "done", k: "st_done", p: "pill-ok" },
  { id: "lost", k: "st_lost", p: "pill-mute" },
] as const;

export const TYPES = [
  { id: "install", k: "ty_install", d: "ty_install_d" },
  { id: "prod", k: "ty_prod", d: "ty_prod_d" },
  { id: "maint", k: "ty_maint", d: "ty_maint_d" },
  { id: "fix", k: "ty_fix", d: "ty_fix_d" },
] as const;

export const CHANS = [
  { id: "phone", k: "ch_phone", ic: "phone" as const },
  { id: "wa", k: "ch_wa", ic: "wa" as const },
  { id: "mail", k: "ch_mail", ic: "mail" as const },
] as const;

export const ROLES = [
  { id: "manager", fr: "Responsable", ar: "المسؤول" },
  { id: "tech", fr: "Technicien", ar: "تقني" },
  { id: "sales", fr: "Commercial", ar: "تجاري" },
] as const;

export const BRANDS = [
  "Hikvision",
  "Dahua",
  "TP-Link",
  "Ubiquiti",
  "MikroTik",
  "ZKTeco",
  "Ezviz",
  "Eaton",
  "HP",
  "Epson",
];

export const SECTORS: Localized[] = [
  { fr: "Magasins & commerces", ar: "المحلات التجارية" },
  { fr: "Cafés & restaurants", ar: "المقاهي والمطاعم" },
  { fr: "Cabinets médicaux", ar: "العيادات الطبية" },
  { fr: "Dépôts & ateliers", ar: "المستودعات والورش" },
  { fr: "Écoles privées", ar: "المدارس الخاصة" },
  { fr: "Syndics de résidence", ar: "إدارات الإقامات السكنية" },
];

export function P(
  id: string,
  ref: string,
  cat: ProductCategory,
  brand: string,
  fr: string,
  ar: string,
  price: number,
  stock: number,
  warr: number,
  specs: [string, string][],
  pop: number,
): Product {
  return {
    id,
    ref,
    cat,
    brand,
    name: { fr, ar },
    price,
    stock,
    warr,
    specs,
    pop,
    active: true,
  };
}

export const SEED_PRODUCTS: Product[] = [
  P("p1", "AP-CAM-D4", "cam", "Hikvision", "Caméra dôme IP 4 MP — intérieure", "كاميرا قبة IP بدقة 4 ميغابكسل — داخلية", 690, 24, 24, [["res", "4 MP (2560×1440)"], ["lens", "2,8 mm"], ["ir", "30 m"], ["poe", "802.3af"]], 98),
  P("p2", "AP-CAM-B4", "cam", "Hikvision", "Caméra bullet IP 4 MP — extérieure", "كاميرا بوليت IP بدقة 4 ميغابكسل — خارجية", 850, 16, 24, [["res", "4 MP"], ["prot", "IP67"], ["ir", "50 m"], ["poe", "802.3af"]], 91),
  P("p3", "AP-CAM-P25", "cam", "Dahua", "Caméra PTZ motorisée — zoom ×25", "كاميرا PTZ متحركة — تقريب ×25", 4200, 3, 24, [["res", "2 MP"], ["zoom", "×25 optique"], ["ir", "100 m"], ["prot", "IP66"]], 44),
  P("p4", "AP-CAM-W2", "cam", "Ezviz", "Caméra Wi-Fi intérieure 2 MP", "كاميرا واي فاي داخلية بدقة 2 ميغابكسل", 390, 41, 12, [["res", "2 MP"], ["wifi", "2,4 GHz"], ["ir", "10 m"], ["cap", "microSD 256 Go"]], 87),
  P("p5", "AP-NVR-8P", "nvr", "Hikvision", "Enregistreur NVR 8 canaux PoE", "مسجل NVR بـ 8 قنوات PoE", 1950, 9, 24, [["ch", "8"], ["poe", "8 ports"], ["hdd", "2 × 8 To"], ["res", "jusqu'à 8 MP"]], 76),
  P("p6", "AP-XVR-16", "nvr", "Dahua", "Enregistreur XVR 16 canaux", "مسجل XVR بـ 16 قناة", 2400, 4, 24, [["ch", "16"], ["hdd", "2 × 10 To"], ["res", "5 MP Lite"]], 52),
  P("p7", "AP-HDD-2T", "nvr", "Seagate", "Disque dur surveillance 2 To", "قرص صلب للمراقبة سعة 2 تيرابايت", 780, 12, 36, [["cap", "2 To"], ["aut", "24/7"]], 69),
  P("p8", "AP-RTR-HEX", "net", "MikroTik", "Routeur hEX RB750Gr3", "راوتر hEX RB750Gr3", 1150, 7, 12, [["ports", "5 × Gigabit"], ["thr", "1 Gb/s"]], 58),
  P("p9", "AP-RTR-AX18", "net", "TP-Link", "Routeur Wi-Fi 6 AX1800", "راوتر واي فاي 6 بسرعة AX1800", 890, 15, 24, [["wifi", "Wi-Fi 6"], ["thr", "1 800 Mb/s"], ["ports", "4 × Gigabit"]], 83),
  P("p10", "AP-AP-U6L", "net", "Ubiquiti", "Point d'accès UniFi U6 Lite", "نقطة ولوج UniFi U6 Lite", 1450, 6, 24, [["wifi", "Wi-Fi 6"], ["users", "≈ 150"], ["poe", "802.3af"]], 61),
  P("p11", "AP-SW-8P", "net", "TP-Link", "Switch PoE+ 8 ports — 120 W", "سويتش PoE+ بـ 8 منافذ — 120 واط", 1090, 5, 36, [["ports", "8 × PoE+"], ["pow", "120 W"]], 64),
  P("p12", "AP-ACC-BIO", "acc", "ZKTeco", "Pointeuse biométrique empreinte + badge", "جهاز بصمة وبطاقة للحضور والانصراف", 1690, 4, 12, [["users", "3 000 empreintes"], ["ports", "TCP/IP, USB"]], 47),
  P("p13", "AP-ACC-INT", "acc", "Dahua", "Interphone vidéo IP — 2 fils", "إنتركوم فيديو IP بسلكين", 2250, 2, 24, [["res", "2 MP"], ["prot", "IP65"]], 33),
  P("p14", "AP-PC-I5", "it", "HP", "PC de bureau i5 — 8 Go / SSD 256 Go", "حاسوب مكتبي i5 — 8 غيغا / SSD 256 غيغا", 4900, 3, 12, [["cpu", "Intel Core i5"], ["ram", "8 Go"], ["disk", "SSD 256 Go"]], 40),
  P("p15", "AP-IMP-MF", "it", "Epson", "Imprimante multifonction Wi-Fi", "طابعة متعددة الوظائف بالواي فاي", 1350, 6, 12, [["wifi", "Wi-Fi"], ["ports", "USB, réseau"]], 38),
  P("p16", "AP-CBL-C6", "cbl", "Générique", "Câble réseau Cat6 UTP — rouleau 305 m", "كابل شبكة Cat6 UTP — بكرة 305 متر", 1250, 8, 0, [["len", "305 m"], ["thr", "1 Gb/s"]], 55),
  P("p17", "AP-UPS-1K", "cbl", "Eaton", "Onduleur 1000 VA", "جهاز إمداد بالطاقة 1000 فولت أمبير", 950, 10, 24, [["pow", "1000 VA / 600 W"], ["aut", "≈ 20 min"]], 49),
];

export const SEED_SETTINGS = {
  company: "AMANPLANET",
  tagline: {
    fr: "Conseil • Installation • Suivi",
    ar: "معك من الاختيار إلى التركيب والمتابعة",
  },
  phone: "+212 6 61 24 18 05",
  whatsapp: "+212 6 61 24 18 05",
  email: "contact@amanplanet.ma",
  address: {
    fr: "14, rue Ibn Battouta — Quartier Belvédère, Casablanca",
    ar: "14، زنقة ابن بطوطة — حي بلفيدير، الدار البيضاء",
  },
  hours: {
    fr: "Lundi – vendredi : 9 h – 18 h 30 · Samedi : 9 h – 13 h",
    ar: "الاثنين – الجمعة: 9:00 – 18:30 · السبت: 9:00 – 13:00",
  },
  sla: 24,
  channels: { phone: true, wa: true, mail: true },
  fees: [
    ["Casablanca", 200],
    ["Mohammedia", 250],
    ["Bouskoura", 250],
    ["Rabat", 350],
    ["Marrakech", 500],
    ["Tanger", 600],
    ["Agadir", 700],
  ] as [string, number][],
  manager: "Karim Aman",
  team: [
    { id: "t1", name: "Karim Aman", role: "manager" as const, phone: "+212 6 61 24 18 05", active: true },
    { id: "t2", name: "Youssef Bennani", role: "tech" as const, phone: "06 61 55 20 14", active: true },
    { id: "t3", name: "Hamza Tazi", role: "tech" as const, phone: "06 62 18 74 03", active: true },
    { id: "t4", name: "Salma Rachidi", role: "tech" as const, phone: "06 70 41 09 88", active: true },
    { id: "t5", name: "Anas El Idrissi", role: "sales" as const, phone: "06 55 33 62 17", active: true },
  ],
};
