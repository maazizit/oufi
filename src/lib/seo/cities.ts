export type CityPage = {
  slug: string;
  name: { fr: string; ar: string };
  priority: 1 | 2 | 3;
  metaTitle: { fr: string; ar: string };
  metaDesc: { fr: string; ar: string };
  h1: { fr: string; ar: string };
  lead: { fr: string; ar: string };
  paragraphs: { fr: string[]; ar: string[] };
  localAngles: { fr: string[]; ar: string[] };
  faq: { q: { fr: string; ar: string }; a: { fr: string; ar: string } }[];
};

export const CITY_PAGES: CityPage[] = [
  {
    slug: "marrakech",
    name: { fr: "Marrakech", ar: "مراكش" },
    priority: 1,
    metaTitle: { fr: "Caméras & réseau à Marrakech — AMANPLANET", ar: "كاميرات وشبكات في مراكش — AMANPLANET" },
    metaDesc: { fr: "Installation caméras, Wi-Fi et alarme à Marrakech. AMANPLANET C.I.S. — devis après visite. Tout le Maroc.", ar: "تركيب كاميرات وواي فاي وإنذار في مراكش. عرض سعر بعد المعاينة." },
    h1: { fr: "Installation caméras et réseau à Marrakech", ar: "تركيب الكاميرات والشبكات في مراكش" },
    lead: { fr: "Interventions à Marrakech depuis notre siège Marrakech — page siège, plus complète.", ar: "تدخلات في مراكش انطلاقاً من مقر مراكش." },
    paragraphs: {
      fr: ["AMANPLANET intervient à Marrakech pour l’installation de caméras de surveillance, réseaux, alarmes, domotique et contrôle d’accès. Siège AMANPLANET. Médina, Gueliz, Hivernage, Route de Casablanca, Tamansourt — riads, hôtels, villas et commerces.", "Notre méthode C.I.S. (Conseil • Installation • Suivi) reste identique : écoute du besoin, visite technique, devis détaillé sous 48 h après la visite, puis pose et formation. Depuis Marrakech, nous organisons les tournées vers Marrakech pour mutualiser les déplacements.", "Que vous gériez un magasin, un café, un cabinet, un dépôt, une école privée, un syndic, une villa, un riad ou un hôtel à Marrakech, nous adaptons le matériel (Hikvision, Dahua, Ezviz, TP-Link, Ubiquiti, MikroTik, ZKTeco…) à la réalité du site — poussière, chaleur, visiteurs, Wi-Fi saturé.", "Demandez un devis en ligne ou via WhatsApp. Les frais de déplacement pour l’état des lieux varient selon la ville (grille indicative — validation prix en cours) et sont déduits si les travaux sont confirmés.", "À Marrakech, les riads de la médina demandent souvent un câblage discret et des caméras discrètes façade/patio, tandis que Gueliz et les zones touristiques privilégient le multi-AP Wi-Fi et le NVR 8–16 canaux pour les commerces.", "Nous connaissons les contraintes d’alimentation électrique irrégulière : onduleurs et disques surveillance font partie des devis quand le risque de coupure est élevé.", "Pour une villa ou un riad, le dimensionnement type (combien de caméras, angles rue vs patio) est détaillé dans notre article blog dédié — et toujours validé sur place."],
      ar: ["تتدخل AMANPLANET في مراكش لتركيب كاميرات المراقبة والشبكات والإنذار والمنزل الذكي والتحكم بالوصول. Siège AMANPLANET. Médina, Gueliz, Hivernage, Route de Casablanca, Tamansourt — riads, hôtels, villas et commerces.", "منهج C.I.S. ثابت: استماع، معاينة، عرض سعر خلال 48 ساعة بعد الزيارة، ثم تركيب وتكوين. من مراكش ننسّق الجولات نحو مراكش.", "سواء كان محلًا أو مقهى أو عيادة أو مستودعًا أو فيلا أو رياضًا في مراكش، نلائم المعدات لظروف الموقع.", "اطلبوا عرض سعر عبر الموقع أو واتساب. رسوم المعاينة تختلف حسب المدينة وتُخصم عند اعتماد الأشغال.", "في مراكش نراعي خصوصية الرياضات بالمدينة العتيقة ومحلات جليز مع واي فاي متعدد النقاط وNVR مناسب."],
    },
    localAngles: {
      fr: ["Contexte local Marrakech : Siège AMANPLANET. Médina, Gueliz, Hivernage, Route de Casablanca, Tamansourt — riads, hôtels, villas et commerces.", "Délais : planification selon tournée (page siège, plus complète).", "Support après pose par téléphone / WhatsApp, intervention sur site si besoin."],
      ar: ["السياق المحلي في مراكش.", "الآجال حسب جدول الجولات (page siège, plus complète).", "دعم بعد التركيب عبر الهاتف/واتساب."],
    },
    faq: [
      {
        q: { fr: "Intervenez-vous vraiment à Marrakech ?", ar: "هل تتدخلون فعلاً في مراكش؟" },
        a: { fr: "Oui. Le siège est à Marrakech ; les interventions à Marrakech sont planifiées. Contactez-nous pour le prochain créneau.", ar: "نعم. المقر بمراكش ونخطّط التدخلات في مراكش." },
      },
      {
        q: { fr: "Quel délai pour un devis à Marrakech ?", ar: "ما أجل عرض السعر في مراكش؟" },
        a: { fr: "Rappel sous 24 h ouvrées ; devis détaillé sous 48 h après la visite sur site.", ar: "اتصال خلال 24 ساعة عمل؛ عرض مفصل خلال 48 ساعة بعد المعاينة." },
      },
    ],
  },
  {
    slug: "casablanca",
    name: { fr: "Casablanca", ar: "الدار البيضاء" },
    priority: 2,
    metaTitle: { fr: "Caméras & réseau à Casablanca — AMANPLANET", ar: "كاميرات وشبكات في الدار البيضاء — AMANPLANET" },
    metaDesc: { fr: "Installation caméras, Wi-Fi et alarme à Casablanca. AMANPLANET C.I.S. — devis après visite. Tout le Maroc.", ar: "تركيب كاميرات وواي فاي وإنذار في الدار البيضاء. عرض سعر بعد المعاينة." },
    h1: { fr: "Installation caméras et réseau à Casablanca", ar: "تركيب الكاميرات والشبكات في الدار البيضاء" },
    lead: { fr: "Interventions à Casablanca depuis notre siège Marrakech — couverture régulière.", ar: "تدخلات في الدار البيضاء انطلاقاً من مقر مراكش." },
    paragraphs: {
      fr: ["AMANPLANET intervient à Casablanca pour l’installation de caméras de surveillance, réseaux, alarmes, domotique et contrôle d’accès. Plus grande métropole : magasins Maarif, dépôts Ain Sebaa, bureaux Anfa.", "Notre méthode C.I.S. (Conseil • Installation • Suivi) reste identique : écoute du besoin, visite technique, devis détaillé sous 48 h après la visite, puis pose et formation. Depuis Marrakech, nous organisons les tournées vers Casablanca pour mutualiser les déplacements.", "Que vous gériez un magasin, un café, un cabinet, un dépôt, une école privée, un syndic, une villa, un riad ou un hôtel à Casablanca, nous adaptons le matériel (Hikvision, Dahua, Ezviz, TP-Link, Ubiquiti, MikroTik, ZKTeco…) à la réalité du site — poussière, chaleur, visiteurs, Wi-Fi saturé.", "Demandez un devis en ligne ou via WhatsApp. Les frais de déplacement pour l’état des lieux varient selon la ville (grille indicative — validation prix en cours) et sont déduits si les travaux sont confirmés."],
      ar: ["تتدخل AMANPLANET في الدار البيضاء لتركيب كاميرات المراقبة والشبكات والإنذار والمنزل الذكي والتحكم بالوصول. Plus grande métropole : magasins Maarif, dépôts Ain Sebaa, bureaux Anfa.", "منهج C.I.S. ثابت: استماع، معاينة، عرض سعر خلال 48 ساعة بعد الزيارة، ثم تركيب وتكوين. من مراكش ننسّق الجولات نحو الدار البيضاء.", "سواء كان محلًا أو مقهى أو عيادة أو مستودعًا أو فيلا أو رياضًا في الدار البيضاء، نلائم المعدات لظروف الموقع.", "اطلبوا عرض سعر عبر الموقع أو واتساب. رسوم المعاينة تختلف حسب المدينة وتُخصم عند اعتماد الأشغال."],
    },
    localAngles: {
      fr: ["Contexte local Casablanca : Plus grande métropole : magasins Maarif, dépôts Ain Sebaa, bureaux Anfa.", "Délais : planification selon tournée (couverture régulière).", "Support après pose par téléphone / WhatsApp, intervention sur site si besoin."],
      ar: ["السياق المحلي في الدار البيضاء.", "الآجال حسب جدول الجولات (couverture régulière).", "دعم بعد التركيب عبر الهاتف/واتساب."],
    },
    faq: [
      {
        q: { fr: "Intervenez-vous vraiment à Casablanca ?", ar: "هل تتدخلون فعلاً في الدار البيضاء؟" },
        a: { fr: "Oui. Le siège est à Marrakech ; les interventions à Casablanca sont planifiées. Contactez-nous pour le prochain créneau.", ar: "نعم. المقر بمراكش ونخطّط التدخلات في الدار البيضاء." },
      },
      {
        q: { fr: "Quel délai pour un devis à Casablanca ?", ar: "ما أجل عرض السعر في الدار البيضاء؟" },
        a: { fr: "Rappel sous 24 h ouvrées ; devis détaillé sous 48 h après la visite sur site.", ar: "اتصال خلال 24 ساعة عمل؛ عرض مفصل خلال 48 ساعة بعد المعاينة." },
      },
    ],
  },
  {
    slug: "rabat",
    name: { fr: "Rabat", ar: "الرباط" },
    priority: 2,
    metaTitle: { fr: "Caméras & réseau à Rabat — AMANPLANET", ar: "كاميرات وشبكات في الرباط — AMANPLANET" },
    metaDesc: { fr: "Installation caméras, Wi-Fi et alarme à Rabat. AMANPLANET C.I.S. — devis après visite. Tout le Maroc.", ar: "تركيب كاميرات وواي فاي وإنذار في الرباط. عرض سعر بعد المعاينة." },
    h1: { fr: "Installation caméras et réseau à Rabat", ar: "تركيب الكاميرات والشبكات في الرباط" },
    lead: { fr: "Interventions à Rabat depuis notre siège Marrakech — couverture régulière.", ar: "تدخلات في الرباط انطلاقاً من مقر مراكش." },
    paragraphs: {
      fr: ["AMANPLANET intervient à Rabat pour l’installation de caméras de surveillance, réseaux, alarmes, domotique et contrôle d’accès. Capitale administrative : cabinets, administrations et résidences Agdal/Hassan.", "Notre méthode C.I.S. (Conseil • Installation • Suivi) reste identique : écoute du besoin, visite technique, devis détaillé sous 48 h après la visite, puis pose et formation. Depuis Marrakech, nous organisons les tournées vers Rabat pour mutualiser les déplacements.", "Que vous gériez un magasin, un café, un cabinet, un dépôt, une école privée, un syndic, une villa, un riad ou un hôtel à Rabat, nous adaptons le matériel (Hikvision, Dahua, Ezviz, TP-Link, Ubiquiti, MikroTik, ZKTeco…) à la réalité du site — poussière, chaleur, visiteurs, Wi-Fi saturé.", "Demandez un devis en ligne ou via WhatsApp. Les frais de déplacement pour l’état des lieux varient selon la ville (grille indicative — validation prix en cours) et sont déduits si les travaux sont confirmés."],
      ar: ["تتدخل AMANPLANET في الرباط لتركيب كاميرات المراقبة والشبكات والإنذار والمنزل الذكي والتحكم بالوصول. Capitale administrative : cabinets, administrations et résidences Agdal/Hassan.", "منهج C.I.S. ثابت: استماع، معاينة، عرض سعر خلال 48 ساعة بعد الزيارة، ثم تركيب وتكوين. من مراكش ننسّق الجولات نحو الرباط.", "سواء كان محلًا أو مقهى أو عيادة أو مستودعًا أو فيلا أو رياضًا في الرباط، نلائم المعدات لظروف الموقع.", "اطلبوا عرض سعر عبر الموقع أو واتساب. رسوم المعاينة تختلف حسب المدينة وتُخصم عند اعتماد الأشغال."],
    },
    localAngles: {
      fr: ["Contexte local Rabat : Capitale administrative : cabinets, administrations et résidences Agdal/Hassan.", "Délais : planification selon tournée (couverture régulière).", "Support après pose par téléphone / WhatsApp, intervention sur site si besoin."],
      ar: ["السياق المحلي في الرباط.", "الآجال حسب جدول الجولات (couverture régulière).", "دعم بعد التركيب عبر الهاتف/واتساب."],
    },
    faq: [
      {
        q: { fr: "Intervenez-vous vraiment à Rabat ?", ar: "هل تتدخلون فعلاً في الرباط؟" },
        a: { fr: "Oui. Le siège est à Marrakech ; les interventions à Rabat sont planifiées. Contactez-nous pour le prochain créneau.", ar: "نعم. المقر بمراكش ونخطّط التدخلات في الرباط." },
      },
      {
        q: { fr: "Quel délai pour un devis à Rabat ?", ar: "ما أجل عرض السعر في الرباط؟" },
        a: { fr: "Rappel sous 24 h ouvrées ; devis détaillé sous 48 h après la visite sur site.", ar: "اتصال خلال 24 ساعة عمل؛ عرض مفصل خلال 48 ساعة بعد المعاينة." },
      },
    ],
  },
  {
    slug: "tanger",
    name: { fr: "Tanger", ar: "طنجة" },
    priority: 2,
    metaTitle: { fr: "Caméras & réseau à Tanger — AMANPLANET", ar: "كاميرات وشبكات في طنجة — AMANPLANET" },
    metaDesc: { fr: "Installation caméras, Wi-Fi et alarme à Tanger. AMANPLANET C.I.S. — devis après visite. Tout le Maroc.", ar: "تركيب كاميرات وواي فاي وإنذار في طنجة. عرض سعر بعد المعاينة." },
    h1: { fr: "Installation caméras et réseau à Tanger", ar: "تركيب الكاميرات والشبكات في طنجة" },
    lead: { fr: "Interventions à Tanger depuis notre siège Marrakech — couverture régulière.", ar: "تدخلات في طنجة انطلاقاً من مقر مراكش." },
    paragraphs: {
      fr: ["AMANPLANET intervient à Tanger pour l’installation de caméras de surveillance, réseaux, alarmes, domotique et contrôle d’accès. Pôle Nord et portuaire : entrepôts, showrooms et villas Malabata.", "Notre méthode C.I.S. (Conseil • Installation • Suivi) reste identique : écoute du besoin, visite technique, devis détaillé sous 48 h après la visite, puis pose et formation. Depuis Marrakech, nous organisons les tournées vers Tanger pour mutualiser les déplacements.", "Que vous gériez un magasin, un café, un cabinet, un dépôt, une école privée, un syndic, une villa, un riad ou un hôtel à Tanger, nous adaptons le matériel (Hikvision, Dahua, Ezviz, TP-Link, Ubiquiti, MikroTik, ZKTeco…) à la réalité du site — poussière, chaleur, visiteurs, Wi-Fi saturé.", "Demandez un devis en ligne ou via WhatsApp. Les frais de déplacement pour l’état des lieux varient selon la ville (grille indicative — validation prix en cours) et sont déduits si les travaux sont confirmés."],
      ar: ["تتدخل AMANPLANET في طنجة لتركيب كاميرات المراقبة والشبكات والإنذار والمنزل الذكي والتحكم بالوصول. Pôle Nord et portuaire : entrepôts, showrooms et villas Malabata.", "منهج C.I.S. ثابت: استماع، معاينة، عرض سعر خلال 48 ساعة بعد الزيارة، ثم تركيب وتكوين. من مراكش ننسّق الجولات نحو طنجة.", "سواء كان محلًا أو مقهى أو عيادة أو مستودعًا أو فيلا أو رياضًا في طنجة، نلائم المعدات لظروف الموقع.", "اطلبوا عرض سعر عبر الموقع أو واتساب. رسوم المعاينة تختلف حسب المدينة وتُخصم عند اعتماد الأشغال."],
    },
    localAngles: {
      fr: ["Contexte local Tanger : Pôle Nord et portuaire : entrepôts, showrooms et villas Malabata.", "Délais : planification selon tournée (couverture régulière).", "Support après pose par téléphone / WhatsApp, intervention sur site si besoin."],
      ar: ["السياق المحلي في طنجة.", "الآجال حسب جدول الجولات (couverture régulière).", "دعم بعد التركيب عبر الهاتف/واتساب."],
    },
    faq: [
      {
        q: { fr: "Intervenez-vous vraiment à Tanger ?", ar: "هل تتدخلون فعلاً في طنجة؟" },
        a: { fr: "Oui. Le siège est à Marrakech ; les interventions à Tanger sont planifiées. Contactez-nous pour le prochain créneau.", ar: "نعم. المقر بمراكش ونخطّط التدخلات في طنجة." },
      },
      {
        q: { fr: "Quel délai pour un devis à Tanger ?", ar: "ما أجل عرض السعر في طنجة؟" },
        a: { fr: "Rappel sous 24 h ouvrées ; devis détaillé sous 48 h après la visite sur site.", ar: "اتصال خلال 24 ساعة عمل؛ عرض مفصل خلال 48 ساعة بعد المعاينة." },
      },
    ],
  },
  {
    slug: "agadir",
    name: { fr: "Agadir", ar: "أكادير" },
    priority: 2,
    metaTitle: { fr: "Caméras & réseau à Agadir — AMANPLANET", ar: "كاميرات وشبكات في أكادير — AMANPLANET" },
    metaDesc: { fr: "Installation caméras, Wi-Fi et alarme à Agadir. AMANPLANET C.I.S. — devis après visite. Tout le Maroc.", ar: "تركيب كاميرات وواي فاي وإنذار في أكادير. عرض سعر بعد المعاينة." },
    h1: { fr: "Installation caméras et réseau à Agadir", ar: "تركيب الكاميرات والشبكات في أكادير" },
    lead: { fr: "Interventions à Agadir depuis notre siège Marrakech — couverture régulière.", ar: "تدخلات في أكادير انطلاقاً من مقر مراكش." },
    paragraphs: {
      fr: ["AMANPLANET intervient à Agadir pour l’installation de caméras de surveillance, réseaux, alarmes, domotique et contrôle d’accès. Littoral Souss : hôtels, riads modernes et commerces Talborjt.", "Notre méthode C.I.S. (Conseil • Installation • Suivi) reste identique : écoute du besoin, visite technique, devis détaillé sous 48 h après la visite, puis pose et formation. Depuis Marrakech, nous organisons les tournées vers Agadir pour mutualiser les déplacements.", "Que vous gériez un magasin, un café, un cabinet, un dépôt, une école privée, un syndic, une villa, un riad ou un hôtel à Agadir, nous adaptons le matériel (Hikvision, Dahua, Ezviz, TP-Link, Ubiquiti, MikroTik, ZKTeco…) à la réalité du site — poussière, chaleur, visiteurs, Wi-Fi saturé.", "Demandez un devis en ligne ou via WhatsApp. Les frais de déplacement pour l’état des lieux varient selon la ville (grille indicative — validation prix en cours) et sont déduits si les travaux sont confirmés."],
      ar: ["تتدخل AMANPLANET في أكادير لتركيب كاميرات المراقبة والشبكات والإنذار والمنزل الذكي والتحكم بالوصول. Littoral Souss : hôtels, riads modernes et commerces Talborjt.", "منهج C.I.S. ثابت: استماع، معاينة، عرض سعر خلال 48 ساعة بعد الزيارة، ثم تركيب وتكوين. من مراكش ننسّق الجولات نحو أكادير.", "سواء كان محلًا أو مقهى أو عيادة أو مستودعًا أو فيلا أو رياضًا في أكادير، نلائم المعدات لظروف الموقع.", "اطلبوا عرض سعر عبر الموقع أو واتساب. رسوم المعاينة تختلف حسب المدينة وتُخصم عند اعتماد الأشغال."],
    },
    localAngles: {
      fr: ["Contexte local Agadir : Littoral Souss : hôtels, riads modernes et commerces Talborjt.", "Délais : planification selon tournée (couverture régulière).", "Support après pose par téléphone / WhatsApp, intervention sur site si besoin."],
      ar: ["السياق المحلي في أكادير.", "الآجال حسب جدول الجولات (couverture régulière).", "دعم بعد التركيب عبر الهاتف/واتساب."],
    },
    faq: [
      {
        q: { fr: "Intervenez-vous vraiment à Agadir ?", ar: "هل تتدخلون فعلاً في أكادير؟" },
        a: { fr: "Oui. Le siège est à Marrakech ; les interventions à Agadir sont planifiées. Contactez-nous pour le prochain créneau.", ar: "نعم. المقر بمراكش ونخطّط التدخلات في أكادير." },
      },
      {
        q: { fr: "Quel délai pour un devis à Agadir ?", ar: "ما أجل عرض السعر في أكادير؟" },
        a: { fr: "Rappel sous 24 h ouvrées ; devis détaillé sous 48 h après la visite sur site.", ar: "اتصال خلال 24 ساعة عمل؛ عرض مفصل خلال 48 ساعة بعد المعاينة." },
      },
    ],
  },
  {
    slug: "fes",
    name: { fr: "Fès", ar: "فاس" },
    priority: 2,
    metaTitle: { fr: "Caméras & réseau à Fès — AMANPLANET", ar: "كاميرات وشبكات في فاس — AMANPLANET" },
    metaDesc: { fr: "Installation caméras, Wi-Fi et alarme à Fès. AMANPLANET C.I.S. — devis après visite. Tout le Maroc.", ar: "تركيب كاميرات وواي فاي وإنذار في فاس. عرض سعر بعد المعاينة." },
    h1: { fr: "Installation caméras et réseau à Fès", ar: "تركيب الكاميرات والشبكات في فاس" },
    lead: { fr: "Interventions à Fès depuis notre siège Marrakech — couverture régulière.", ar: "تدخلات في فاس انطلاقاً من مقر مراكش." },
    paragraphs: {
      fr: ["AMANPLANET intervient à Fès pour l’installation de caméras de surveillance, réseaux, alarmes, domotique et contrôle d’accès. Médina dense et Ville Nouvelle : commerces, ateliers et maisons traditionnelles.", "Notre méthode C.I.S. (Conseil • Installation • Suivi) reste identique : écoute du besoin, visite technique, devis détaillé sous 48 h après la visite, puis pose et formation. Depuis Marrakech, nous organisons les tournées vers Fès pour mutualiser les déplacements.", "Que vous gériez un magasin, un café, un cabinet, un dépôt, une école privée, un syndic, une villa, un riad ou un hôtel à Fès, nous adaptons le matériel (Hikvision, Dahua, Ezviz, TP-Link, Ubiquiti, MikroTik, ZKTeco…) à la réalité du site — poussière, chaleur, visiteurs, Wi-Fi saturé.", "Demandez un devis en ligne ou via WhatsApp. Les frais de déplacement pour l’état des lieux varient selon la ville (grille indicative — validation prix en cours) et sont déduits si les travaux sont confirmés."],
      ar: ["تتدخل AMANPLANET في فاس لتركيب كاميرات المراقبة والشبكات والإنذار والمنزل الذكي والتحكم بالوصول. Médina dense et Ville Nouvelle : commerces, ateliers et maisons traditionnelles.", "منهج C.I.S. ثابت: استماع، معاينة، عرض سعر خلال 48 ساعة بعد الزيارة، ثم تركيب وتكوين. من مراكش ننسّق الجولات نحو فاس.", "سواء كان محلًا أو مقهى أو عيادة أو مستودعًا أو فيلا أو رياضًا في فاس، نلائم المعدات لظروف الموقع.", "اطلبوا عرض سعر عبر الموقع أو واتساب. رسوم المعاينة تختلف حسب المدينة وتُخصم عند اعتماد الأشغال."],
    },
    localAngles: {
      fr: ["Contexte local Fès : Médina dense et Ville Nouvelle : commerces, ateliers et maisons traditionnelles.", "Délais : planification selon tournée (couverture régulière).", "Support après pose par téléphone / WhatsApp, intervention sur site si besoin."],
      ar: ["السياق المحلي في فاس.", "الآجال حسب جدول الجولات (couverture régulière).", "دعم بعد التركيب عبر الهاتف/واتساب."],
    },
    faq: [
      {
        q: { fr: "Intervenez-vous vraiment à Fès ?", ar: "هل تتدخلون فعلاً في فاس؟" },
        a: { fr: "Oui. Le siège est à Marrakech ; les interventions à Fès sont planifiées. Contactez-nous pour le prochain créneau.", ar: "نعم. المقر بمراكش ونخطّط التدخلات في فاس." },
      },
      {
        q: { fr: "Quel délai pour un devis à Fès ?", ar: "ما أجل عرض السعر في فاس؟" },
        a: { fr: "Rappel sous 24 h ouvrées ; devis détaillé sous 48 h après la visite sur site.", ar: "اتصال خلال 24 ساعة عمل؛ عرض مفصل خلال 48 ساعة بعد المعاينة." },
      },
    ],
  },
  {
    slug: "meknes",
    name: { fr: "Meknès", ar: "مكناس" },
    priority: 3,
    metaTitle: { fr: "Caméras & réseau à Meknès — AMANPLANET", ar: "كاميرات وشبكات في مكناس — AMANPLANET" },
    metaDesc: { fr: "Installation caméras, Wi-Fi et alarme à Meknès. AMANPLANET C.I.S. — devis après visite. Tout le Maroc.", ar: "تركيب كاميرات وواي فاي وإنذار في مكناس. عرض سعر بعد المعاينة." },
    h1: { fr: "Installation caméras et réseau à Meknès", ar: "تركيب الكاميرات والشبكات في مكناس" },
    lead: { fr: "Interventions à Meknès depuis notre siège Marrakech — interventions planifiées.", ar: "تدخلات في مكناس انطلاقاً من مقر مراكش." },
    paragraphs: {
      fr: ["AMANPLANET intervient à Meknès pour l’installation de caméras de surveillance, réseaux, alarmes, domotique et contrôle d’accès. Ville impériale : commerces centre et zones industrielles périphériques.", "Notre méthode C.I.S. (Conseil • Installation • Suivi) reste identique : écoute du besoin, visite technique, devis détaillé sous 48 h après la visite, puis pose et formation. Depuis Marrakech, nous organisons les tournées vers Meknès pour mutualiser les déplacements.", "Que vous gériez un magasin, un café, un cabinet, un dépôt, une école privée, un syndic, une villa, un riad ou un hôtel à Meknès, nous adaptons le matériel (Hikvision, Dahua, Ezviz, TP-Link, Ubiquiti, MikroTik, ZKTeco…) à la réalité du site — poussière, chaleur, visiteurs, Wi-Fi saturé.", "Demandez un devis en ligne ou via WhatsApp. Les frais de déplacement pour l’état des lieux varient selon la ville (grille indicative — validation prix en cours) et sont déduits si les travaux sont confirmés."],
      ar: ["تتدخل AMANPLANET في مكناس لتركيب كاميرات المراقبة والشبكات والإنذار والمنزل الذكي والتحكم بالوصول. Ville impériale : commerces centre et zones industrielles périphériques.", "منهج C.I.S. ثابت: استماع، معاينة، عرض سعر خلال 48 ساعة بعد الزيارة، ثم تركيب وتكوين. من مراكش ننسّق الجولات نحو مكناس.", "سواء كان محلًا أو مقهى أو عيادة أو مستودعًا أو فيلا أو رياضًا في مكناس، نلائم المعدات لظروف الموقع.", "اطلبوا عرض سعر عبر الموقع أو واتساب. رسوم المعاينة تختلف حسب المدينة وتُخصم عند اعتماد الأشغال."],
    },
    localAngles: {
      fr: ["Contexte local Meknès : Ville impériale : commerces centre et zones industrielles périphériques.", "Délais : planification selon tournée (interventions planifiées).", "Support après pose par téléphone / WhatsApp, intervention sur site si besoin."],
      ar: ["السياق المحلي في مكناس.", "الآجال حسب جدول الجولات (interventions planifiées).", "دعم بعد التركيب عبر الهاتف/واتساب."],
    },
    faq: [
      {
        q: { fr: "Intervenez-vous vraiment à Meknès ?", ar: "هل تتدخلون فعلاً في مكناس؟" },
        a: { fr: "Oui. Le siège est à Marrakech ; les interventions à Meknès sont planifiées. Contactez-nous pour le prochain créneau.", ar: "نعم. المقر بمراكش ونخطّط التدخلات في مكناس." },
      },
      {
        q: { fr: "Quel délai pour un devis à Meknès ?", ar: "ما أجل عرض السعر في مكناس؟" },
        a: { fr: "Rappel sous 24 h ouvrées ; devis détaillé sous 48 h après la visite sur site.", ar: "اتصال خلال 24 ساعة عمل؛ عرض مفصل خلال 48 ساعة بعد المعاينة." },
      },
    ],
  },
  {
    slug: "oujda",
    name: { fr: "Oujda", ar: "وجدة" },
    priority: 3,
    metaTitle: { fr: "Caméras & réseau à Oujda — AMANPLANET", ar: "كاميرات وشبكات في وجدة — AMANPLANET" },
    metaDesc: { fr: "Installation caméras, Wi-Fi et alarme à Oujda. AMANPLANET C.I.S. — devis après visite. Tout le Maroc.", ar: "تركيب كاميرات وواي فاي وإنذار في وجدة. عرض سعر بعد المعاينة." },
    h1: { fr: "Installation caméras et réseau à Oujda", ar: "تركيب الكاميرات والشبكات في وجدة" },
    lead: { fr: "Interventions à Oujda depuis notre siège Marrakech — interventions planifiées.", ar: "تدخلات في وجدة انطلاقاً من مقر مراكش." },
    paragraphs: {
      fr: ["AMANPLANET intervient à Oujda pour l’installation de caméras de surveillance, réseaux, alarmes, domotique et contrôle d’accès. Est du Maroc : commerces et dépôts desservis sur planification.", "Notre méthode C.I.S. (Conseil • Installation • Suivi) reste identique : écoute du besoin, visite technique, devis détaillé sous 48 h après la visite, puis pose et formation. Depuis Marrakech, nous organisons les tournées vers Oujda pour mutualiser les déplacements.", "Que vous gériez un magasin, un café, un cabinet, un dépôt, une école privée, un syndic, une villa, un riad ou un hôtel à Oujda, nous adaptons le matériel (Hikvision, Dahua, Ezviz, TP-Link, Ubiquiti, MikroTik, ZKTeco…) à la réalité du site — poussière, chaleur, visiteurs, Wi-Fi saturé.", "Demandez un devis en ligne ou via WhatsApp. Les frais de déplacement pour l’état des lieux varient selon la ville (grille indicative — validation prix en cours) et sont déduits si les travaux sont confirmés."],
      ar: ["تتدخل AMANPLANET في وجدة لتركيب كاميرات المراقبة والشبكات والإنذار والمنزل الذكي والتحكم بالوصول. Est du Maroc : commerces et dépôts desservis sur planification.", "منهج C.I.S. ثابت: استماع، معاينة، عرض سعر خلال 48 ساعة بعد الزيارة، ثم تركيب وتكوين. من مراكش ننسّق الجولات نحو وجدة.", "سواء كان محلًا أو مقهى أو عيادة أو مستودعًا أو فيلا أو رياضًا في وجدة، نلائم المعدات لظروف الموقع.", "اطلبوا عرض سعر عبر الموقع أو واتساب. رسوم المعاينة تختلف حسب المدينة وتُخصم عند اعتماد الأشغال."],
    },
    localAngles: {
      fr: ["Contexte local Oujda : Est du Maroc : commerces et dépôts desservis sur planification.", "Délais : planification selon tournée (interventions planifiées).", "Support après pose par téléphone / WhatsApp, intervention sur site si besoin."],
      ar: ["السياق المحلي في وجدة.", "الآجال حسب جدول الجولات (interventions planifiées).", "دعم بعد التركيب عبر الهاتف/واتساب."],
    },
    faq: [
      {
        q: { fr: "Intervenez-vous vraiment à Oujda ?", ar: "هل تتدخلون فعلاً في وجدة؟" },
        a: { fr: "Oui. Le siège est à Marrakech ; les interventions à Oujda sont planifiées. Contactez-nous pour le prochain créneau.", ar: "نعم. المقر بمراكش ونخطّط التدخلات في وجدة." },
      },
      {
        q: { fr: "Quel délai pour un devis à Oujda ?", ar: "ما أجل عرض السعر في وجدة؟" },
        a: { fr: "Rappel sous 24 h ouvrées ; devis détaillé sous 48 h après la visite sur site.", ar: "اتصال خلال 24 ساعة عمل؛ عرض مفصل خلال 48 ساعة بعد المعاينة." },
      },
    ],
  },
  {
    slug: "kenitra",
    name: { fr: "Kénitra", ar: "القنيطرة" },
    priority: 3,
    metaTitle: { fr: "Caméras & réseau à Kénitra — AMANPLANET", ar: "كاميرات وشبكات في القنيطرة — AMANPLANET" },
    metaDesc: { fr: "Installation caméras, Wi-Fi et alarme à Kénitra. AMANPLANET C.I.S. — devis après visite. Tout le Maroc.", ar: "تركيب كاميرات وواي فاي وإنذار في القنيطرة. عرض سعر بعد المعاينة." },
    h1: { fr: "Installation caméras et réseau à Kénitra", ar: "تركيب الكاميرات والشبكات في القنيطرة" },
    lead: { fr: "Interventions à Kénitra depuis notre siège Marrakech — interventions planifiées.", ar: "تدخلات في القنيطرة انطلاقاً من مقر مراكش." },
    paragraphs: {
      fr: ["AMANPLANET intervient à Kénitra pour l’installation de caméras de surveillance, réseaux, alarmes, domotique et contrôle d’accès. Axe Atlantique : PME, entrepôts et lotissements récents.", "Notre méthode C.I.S. (Conseil • Installation • Suivi) reste identique : écoute du besoin, visite technique, devis détaillé sous 48 h après la visite, puis pose et formation. Depuis Marrakech, nous organisons les tournées vers Kénitra pour mutualiser les déplacements.", "Que vous gériez un magasin, un café, un cabinet, un dépôt, une école privée, un syndic, une villa, un riad ou un hôtel à Kénitra, nous adaptons le matériel (Hikvision, Dahua, Ezviz, TP-Link, Ubiquiti, MikroTik, ZKTeco…) à la réalité du site — poussière, chaleur, visiteurs, Wi-Fi saturé.", "Demandez un devis en ligne ou via WhatsApp. Les frais de déplacement pour l’état des lieux varient selon la ville (grille indicative — validation prix en cours) et sont déduits si les travaux sont confirmés."],
      ar: ["تتدخل AMANPLANET في القنيطرة لتركيب كاميرات المراقبة والشبكات والإنذار والمنزل الذكي والتحكم بالوصول. Axe Atlantique : PME, entrepôts et lotissements récents.", "منهج C.I.S. ثابت: استماع، معاينة، عرض سعر خلال 48 ساعة بعد الزيارة، ثم تركيب وتكوين. من مراكش ننسّق الجولات نحو القنيطرة.", "سواء كان محلًا أو مقهى أو عيادة أو مستودعًا أو فيلا أو رياضًا في القنيطرة، نلائم المعدات لظروف الموقع.", "اطلبوا عرض سعر عبر الموقع أو واتساب. رسوم المعاينة تختلف حسب المدينة وتُخصم عند اعتماد الأشغال."],
    },
    localAngles: {
      fr: ["Contexte local Kénitra : Axe Atlantique : PME, entrepôts et lotissements récents.", "Délais : planification selon tournée (interventions planifiées).", "Support après pose par téléphone / WhatsApp, intervention sur site si besoin."],
      ar: ["السياق المحلي في القنيطرة.", "الآجال حسب جدول الجولات (interventions planifiées).", "دعم بعد التركيب عبر الهاتف/واتساب."],
    },
    faq: [
      {
        q: { fr: "Intervenez-vous vraiment à Kénitra ?", ar: "هل تتدخلون فعلاً في القنيطرة؟" },
        a: { fr: "Oui. Le siège est à Marrakech ; les interventions à Kénitra sont planifiées. Contactez-nous pour le prochain créneau.", ar: "نعم. المقر بمراكش ونخطّط التدخلات في القنيطرة." },
      },
      {
        q: { fr: "Quel délai pour un devis à Kénitra ?", ar: "ما أجل عرض السعر في القنيطرة؟" },
        a: { fr: "Rappel sous 24 h ouvrées ; devis détaillé sous 48 h après la visite sur site.", ar: "اتصال خلال 24 ساعة عمل؛ عرض مفصل خلال 48 ساعة بعد المعاينة." },
      },
    ],
  },
  {
    slug: "tetouan",
    name: { fr: "Tétouan", ar: "تطوان" },
    priority: 3,
    metaTitle: { fr: "Caméras & réseau à Tétouan — AMANPLANET", ar: "كاميرات وشبكات في تطوان — AMANPLANET" },
    metaDesc: { fr: "Installation caméras, Wi-Fi et alarme à Tétouan. AMANPLANET C.I.S. — devis après visite. Tout le Maroc.", ar: "تركيب كاميرات وواي فاي وإنذار في تطوان. عرض سعر بعد المعاينة." },
    h1: { fr: "Installation caméras et réseau à Tétouan", ar: "تركيب الكاميرات والشبكات في تطوان" },
    lead: { fr: "Interventions à Tétouan depuis notre siège Marrakech — interventions planifiées.", ar: "تدخلات في تطوان انطلاقاً من مقر مراكش." },
    paragraphs: {
      fr: ["AMANPLANET intervient à Tétouan pour l’installation de caméras de surveillance, réseaux, alarmes, domotique et contrôle d’accès. Nord : médina et extensions — besoins Wi-Fi/caméras pour commerces.", "Notre méthode C.I.S. (Conseil • Installation • Suivi) reste identique : écoute du besoin, visite technique, devis détaillé sous 48 h après la visite, puis pose et formation. Depuis Marrakech, nous organisons les tournées vers Tétouan pour mutualiser les déplacements.", "Que vous gériez un magasin, un café, un cabinet, un dépôt, une école privée, un syndic, une villa, un riad ou un hôtel à Tétouan, nous adaptons le matériel (Hikvision, Dahua, Ezviz, TP-Link, Ubiquiti, MikroTik, ZKTeco…) à la réalité du site — poussière, chaleur, visiteurs, Wi-Fi saturé.", "Demandez un devis en ligne ou via WhatsApp. Les frais de déplacement pour l’état des lieux varient selon la ville (grille indicative — validation prix en cours) et sont déduits si les travaux sont confirmés."],
      ar: ["تتدخل AMANPLANET في تطوان لتركيب كاميرات المراقبة والشبكات والإنذار والمنزل الذكي والتحكم بالوصول. Nord : médina et extensions — besoins Wi-Fi/caméras pour commerces.", "منهج C.I.S. ثابت: استماع، معاينة، عرض سعر خلال 48 ساعة بعد الزيارة، ثم تركيب وتكوين. من مراكش ننسّق الجولات نحو تطوان.", "سواء كان محلًا أو مقهى أو عيادة أو مستودعًا أو فيلا أو رياضًا في تطوان، نلائم المعدات لظروف الموقع.", "اطلبوا عرض سعر عبر الموقع أو واتساب. رسوم المعاينة تختلف حسب المدينة وتُخصم عند اعتماد الأشغال."],
    },
    localAngles: {
      fr: ["Contexte local Tétouan : Nord : médina et extensions — besoins Wi-Fi/caméras pour commerces.", "Délais : planification selon tournée (interventions planifiées).", "Support après pose par téléphone / WhatsApp, intervention sur site si besoin."],
      ar: ["السياق المحلي في تطوان.", "الآجال حسب جدول الجولات (interventions planifiées).", "دعم بعد التركيب عبر الهاتف/واتساب."],
    },
    faq: [
      {
        q: { fr: "Intervenez-vous vraiment à Tétouan ?", ar: "هل تتدخلون فعلاً في تطوان؟" },
        a: { fr: "Oui. Le siège est à Marrakech ; les interventions à Tétouan sont planifiées. Contactez-nous pour le prochain créneau.", ar: "نعم. المقر بمراكش ونخطّط التدخلات في تطوان." },
      },
      {
        q: { fr: "Quel délai pour un devis à Tétouan ?", ar: "ما أجل عرض السعر في تطوان؟" },
        a: { fr: "Rappel sous 24 h ouvrées ; devis détaillé sous 48 h après la visite sur site.", ar: "اتصال خلال 24 ساعة عمل؛ عرض مفصل خلال 48 ساعة بعد المعاينة." },
      },
    ],
  },
  {
    slug: "sale",
    name: { fr: "Salé", ar: "سلا" },
    priority: 3,
    metaTitle: { fr: "Caméras & réseau à Salé — AMANPLANET", ar: "كاميرات وشبكات في سلا — AMANPLANET" },
    metaDesc: { fr: "Installation caméras, Wi-Fi et alarme à Salé. AMANPLANET C.I.S. — devis après visite. Tout le Maroc.", ar: "تركيب كاميرات وواي فاي وإنذار في سلا. عرض سعر بعد المعاينة." },
    h1: { fr: "Installation caméras et réseau à Salé", ar: "تركيب الكاميرات والشبكات في سلا" },
    lead: { fr: "Interventions à Salé depuis notre siège Marrakech — interventions planifiées.", ar: "تدخلات في سلا انطلاقاً من مقر مراكش." },
    paragraphs: {
      fr: ["AMANPLANET intervient à Salé pour l’installation de caméras de surveillance, réseaux, alarmes, domotique et contrôle d’accès. Agglomération Rabat-Salé : résidences et commerces de proximité.", "Notre méthode C.I.S. (Conseil • Installation • Suivi) reste identique : écoute du besoin, visite technique, devis détaillé sous 48 h après la visite, puis pose et formation. Depuis Marrakech, nous organisons les tournées vers Salé pour mutualiser les déplacements.", "Que vous gériez un magasin, un café, un cabinet, un dépôt, une école privée, un syndic, une villa, un riad ou un hôtel à Salé, nous adaptons le matériel (Hikvision, Dahua, Ezviz, TP-Link, Ubiquiti, MikroTik, ZKTeco…) à la réalité du site — poussière, chaleur, visiteurs, Wi-Fi saturé.", "Demandez un devis en ligne ou via WhatsApp. Les frais de déplacement pour l’état des lieux varient selon la ville (grille indicative — validation prix en cours) et sont déduits si les travaux sont confirmés."],
      ar: ["تتدخل AMANPLANET في سلا لتركيب كاميرات المراقبة والشبكات والإنذار والمنزل الذكي والتحكم بالوصول. Agglomération Rabat-Salé : résidences et commerces de proximité.", "منهج C.I.S. ثابت: استماع، معاينة، عرض سعر خلال 48 ساعة بعد الزيارة، ثم تركيب وتكوين. من مراكش ننسّق الجولات نحو سلا.", "سواء كان محلًا أو مقهى أو عيادة أو مستودعًا أو فيلا أو رياضًا في سلا، نلائم المعدات لظروف الموقع.", "اطلبوا عرض سعر عبر الموقع أو واتساب. رسوم المعاينة تختلف حسب المدينة وتُخصم عند اعتماد الأشغال."],
    },
    localAngles: {
      fr: ["Contexte local Salé : Agglomération Rabat-Salé : résidences et commerces de proximité.", "Délais : planification selon tournée (interventions planifiées).", "Support après pose par téléphone / WhatsApp, intervention sur site si besoin."],
      ar: ["السياق المحلي في سلا.", "الآجال حسب جدول الجولات (interventions planifiées).", "دعم بعد التركيب عبر الهاتف/واتساب."],
    },
    faq: [
      {
        q: { fr: "Intervenez-vous vraiment à Salé ?", ar: "هل تتدخلون فعلاً في سلا؟" },
        a: { fr: "Oui. Le siège est à Marrakech ; les interventions à Salé sont planifiées. Contactez-nous pour le prochain créneau.", ar: "نعم. المقر بمراكش ونخطّط التدخلات في سلا." },
      },
      {
        q: { fr: "Quel délai pour un devis à Salé ?", ar: "ما أجل عرض السعر في سلا؟" },
        a: { fr: "Rappel sous 24 h ouvrées ; devis détaillé sous 48 h après la visite sur site.", ar: "اتصال خلال 24 ساعة عمل؛ عرض مفصل خلال 48 ساعة بعد المعاينة." },
      },
    ],
  },
  {
    slug: "mohammedia",
    name: { fr: "Mohammedia", ar: "المحمدية" },
    priority: 3,
    metaTitle: { fr: "Caméras & réseau à Mohammedia — AMANPLANET", ar: "كاميرات وشبكات في المحمدية — AMANPLANET" },
    metaDesc: { fr: "Installation caméras, Wi-Fi et alarme à Mohammedia. AMANPLANET C.I.S. — devis après visite. Tout le Maroc.", ar: "تركيب كاميرات وواي فاي وإنذار في المحمدية. عرض سعر بعد المعاينة." },
    h1: { fr: "Installation caméras et réseau à Mohammedia", ar: "تركيب الكاميرات والشبكات في المحمدية" },
    lead: { fr: "Interventions à Mohammedia depuis notre siège Marrakech — interventions planifiées.", ar: "تدخلات في المحمدية انطلاقاً من مقر مراكش." },
    paragraphs: {
      fr: ["AMANPLANET intervient à Mohammedia pour l’installation de caméras de surveillance, réseaux, alarmes, domotique et contrôle d’accès. Côte Casa : cafés, villas et sites industriels légers.", "Notre méthode C.I.S. (Conseil • Installation • Suivi) reste identique : écoute du besoin, visite technique, devis détaillé sous 48 h après la visite, puis pose et formation. Depuis Marrakech, nous organisons les tournées vers Mohammedia pour mutualiser les déplacements.", "Que vous gériez un magasin, un café, un cabinet, un dépôt, une école privée, un syndic, une villa, un riad ou un hôtel à Mohammedia, nous adaptons le matériel (Hikvision, Dahua, Ezviz, TP-Link, Ubiquiti, MikroTik, ZKTeco…) à la réalité du site — poussière, chaleur, visiteurs, Wi-Fi saturé.", "Demandez un devis en ligne ou via WhatsApp. Les frais de déplacement pour l’état des lieux varient selon la ville (grille indicative — validation prix en cours) et sont déduits si les travaux sont confirmés."],
      ar: ["تتدخل AMANPLANET في المحمدية لتركيب كاميرات المراقبة والشبكات والإنذار والمنزل الذكي والتحكم بالوصول. Côte Casa : cafés, villas et sites industriels légers.", "منهج C.I.S. ثابت: استماع، معاينة، عرض سعر خلال 48 ساعة بعد الزيارة، ثم تركيب وتكوين. من مراكش ننسّق الجولات نحو المحمدية.", "سواء كان محلًا أو مقهى أو عيادة أو مستودعًا أو فيلا أو رياضًا في المحمدية، نلائم المعدات لظروف الموقع.", "اطلبوا عرض سعر عبر الموقع أو واتساب. رسوم المعاينة تختلف حسب المدينة وتُخصم عند اعتماد الأشغال."],
    },
    localAngles: {
      fr: ["Contexte local Mohammedia : Côte Casa : cafés, villas et sites industriels légers.", "Délais : planification selon tournée (interventions planifiées).", "Support après pose par téléphone / WhatsApp, intervention sur site si besoin."],
      ar: ["السياق المحلي في المحمدية.", "الآجال حسب جدول الجولات (interventions planifiées).", "دعم بعد التركيب عبر الهاتف/واتساب."],
    },
    faq: [
      {
        q: { fr: "Intervenez-vous vraiment à Mohammedia ?", ar: "هل تتدخلون فعلاً في المحمدية؟" },
        a: { fr: "Oui. Le siège est à Marrakech ; les interventions à Mohammedia sont planifiées. Contactez-nous pour le prochain créneau.", ar: "نعم. المقر بمراكش ونخطّط التدخلات في المحمدية." },
      },
      {
        q: { fr: "Quel délai pour un devis à Mohammedia ?", ar: "ما أجل عرض السعر في المحمدية؟" },
        a: { fr: "Rappel sous 24 h ouvrées ; devis détaillé sous 48 h après la visite sur site.", ar: "اتصال خلال 24 ساعة عمل؛ عرض مفصل خلال 48 ساعة بعد المعاينة." },
      },
    ],
  },
  {
    slug: "el-jadida",
    name: { fr: "El Jadida", ar: "الجديدة" },
    priority: 3,
    metaTitle: { fr: "Caméras & réseau à El Jadida — AMANPLANET", ar: "كاميرات وشبكات في الجديدة — AMANPLANET" },
    metaDesc: { fr: "Installation caméras, Wi-Fi et alarme à El Jadida. AMANPLANET C.I.S. — devis après visite. Tout le Maroc.", ar: "تركيب كاميرات وواي فاي وإنذار في الجديدة. عرض سعر بعد المعاينة." },
    h1: { fr: "Installation caméras et réseau à El Jadida", ar: "تركيب الكاميرات والشبكات في الجديدة" },
    lead: { fr: "Interventions à El Jadida depuis notre siège Marrakech — interventions planifiées.", ar: "تدخلات في الجديدة انطلاقاً من مقر مراكش." },
    paragraphs: {
      fr: ["AMANPLANET intervient à El Jadida pour l’installation de caméras de surveillance, réseaux, alarmes, domotique et contrôle d’accès. Atlantique : hôtellerie saisonnière et commerces.", "Notre méthode C.I.S. (Conseil • Installation • Suivi) reste identique : écoute du besoin, visite technique, devis détaillé sous 48 h après la visite, puis pose et formation. Depuis Marrakech, nous organisons les tournées vers El Jadida pour mutualiser les déplacements.", "Que vous gériez un magasin, un café, un cabinet, un dépôt, une école privée, un syndic, une villa, un riad ou un hôtel à El Jadida, nous adaptons le matériel (Hikvision, Dahua, Ezviz, TP-Link, Ubiquiti, MikroTik, ZKTeco…) à la réalité du site — poussière, chaleur, visiteurs, Wi-Fi saturé.", "Demandez un devis en ligne ou via WhatsApp. Les frais de déplacement pour l’état des lieux varient selon la ville (grille indicative — validation prix en cours) et sont déduits si les travaux sont confirmés."],
      ar: ["تتدخل AMANPLANET في الجديدة لتركيب كاميرات المراقبة والشبكات والإنذار والمنزل الذكي والتحكم بالوصول. Atlantique : hôtellerie saisonnière et commerces.", "منهج C.I.S. ثابت: استماع، معاينة، عرض سعر خلال 48 ساعة بعد الزيارة، ثم تركيب وتكوين. من مراكش ننسّق الجولات نحو الجديدة.", "سواء كان محلًا أو مقهى أو عيادة أو مستودعًا أو فيلا أو رياضًا في الجديدة، نلائم المعدات لظروف الموقع.", "اطلبوا عرض سعر عبر الموقع أو واتساب. رسوم المعاينة تختلف حسب المدينة وتُخصم عند اعتماد الأشغال."],
    },
    localAngles: {
      fr: ["Contexte local El Jadida : Atlantique : hôtellerie saisonnière et commerces.", "Délais : planification selon tournée (interventions planifiées).", "Support après pose par téléphone / WhatsApp, intervention sur site si besoin."],
      ar: ["السياق المحلي في الجديدة.", "الآجال حسب جدول الجولات (interventions planifiées).", "دعم بعد التركيب عبر الهاتف/واتساب."],
    },
    faq: [
      {
        q: { fr: "Intervenez-vous vraiment à El Jadida ?", ar: "هل تتدخلون فعلاً في الجديدة؟" },
        a: { fr: "Oui. Le siège est à Marrakech ; les interventions à El Jadida sont planifiées. Contactez-nous pour le prochain créneau.", ar: "نعم. المقر بمراكش ونخطّط التدخلات في الجديدة." },
      },
      {
        q: { fr: "Quel délai pour un devis à El Jadida ?", ar: "ما أجل عرض السعر في الجديدة؟" },
        a: { fr: "Rappel sous 24 h ouvrées ; devis détaillé sous 48 h après la visite sur site.", ar: "اتصال خلال 24 ساعة عمل؛ عرض مفصل خلال 48 ساعة بعد المعاينة." },
      },
    ],
  },
  {
    slug: "safi",
    name: { fr: "Safi", ar: "آسفي" },
    priority: 3,
    metaTitle: { fr: "Caméras & réseau à Safi — AMANPLANET", ar: "كاميرات وشبكات في آسفي — AMANPLANET" },
    metaDesc: { fr: "Installation caméras, Wi-Fi et alarme à Safi. AMANPLANET C.I.S. — devis après visite. Tout le Maroc.", ar: "تركيب كاميرات وواي فاي وإنذار في آسفي. عرض سعر بعد المعاينة." },
    h1: { fr: "Installation caméras et réseau à Safi", ar: "تركيب الكاميرات والشبكات في آسفي" },
    lead: { fr: "Interventions à Safi depuis notre siège Marrakech — interventions planifiées.", ar: "تدخلات في آسفي انطلاقاً من مقر مراكش." },
    paragraphs: {
      fr: ["AMANPLANET intervient à Safi pour l’installation de caméras de surveillance, réseaux, alarmes, domotique et contrôle d’accès. Port et industrie : dépôts et points de vente.", "Notre méthode C.I.S. (Conseil • Installation • Suivi) reste identique : écoute du besoin, visite technique, devis détaillé sous 48 h après la visite, puis pose et formation. Depuis Marrakech, nous organisons les tournées vers Safi pour mutualiser les déplacements.", "Que vous gériez un magasin, un café, un cabinet, un dépôt, une école privée, un syndic, une villa, un riad ou un hôtel à Safi, nous adaptons le matériel (Hikvision, Dahua, Ezviz, TP-Link, Ubiquiti, MikroTik, ZKTeco…) à la réalité du site — poussière, chaleur, visiteurs, Wi-Fi saturé.", "Demandez un devis en ligne ou via WhatsApp. Les frais de déplacement pour l’état des lieux varient selon la ville (grille indicative — validation prix en cours) et sont déduits si les travaux sont confirmés."],
      ar: ["تتدخل AMANPLANET في آسفي لتركيب كاميرات المراقبة والشبكات والإنذار والمنزل الذكي والتحكم بالوصول. Port et industrie : dépôts et points de vente.", "منهج C.I.S. ثابت: استماع، معاينة، عرض سعر خلال 48 ساعة بعد الزيارة، ثم تركيب وتكوين. من مراكش ننسّق الجولات نحو آسفي.", "سواء كان محلًا أو مقهى أو عيادة أو مستودعًا أو فيلا أو رياضًا في آسفي، نلائم المعدات لظروف الموقع.", "اطلبوا عرض سعر عبر الموقع أو واتساب. رسوم المعاينة تختلف حسب المدينة وتُخصم عند اعتماد الأشغال."],
    },
    localAngles: {
      fr: ["Contexte local Safi : Port et industrie : dépôts et points de vente.", "Délais : planification selon tournée (interventions planifiées).", "Support après pose par téléphone / WhatsApp, intervention sur site si besoin."],
      ar: ["السياق المحلي في آسفي.", "الآجال حسب جدول الجولات (interventions planifiées).", "دعم بعد التركيب عبر الهاتف/واتساب."],
    },
    faq: [
      {
        q: { fr: "Intervenez-vous vraiment à Safi ?", ar: "هل تتدخلون فعلاً في آسفي؟" },
        a: { fr: "Oui. Le siège est à Marrakech ; les interventions à Safi sont planifiées. Contactez-nous pour le prochain créneau.", ar: "نعم. المقر بمراكش ونخطّط التدخلات في آسفي." },
      },
      {
        q: { fr: "Quel délai pour un devis à Safi ?", ar: "ما أجل عرض السعر في آسفي؟" },
        a: { fr: "Rappel sous 24 h ouvrées ; devis détaillé sous 48 h après la visite sur site.", ar: "اتصال خلال 24 ساعة عمل؛ عرض مفصل خلال 48 ساعة بعد المعاينة." },
      },
    ],
  },
  {
    slug: "essaouira",
    name: { fr: "Essaouira", ar: "الصويرة" },
    priority: 3,
    metaTitle: { fr: "Caméras & réseau à Essaouira — AMANPLANET", ar: "كاميرات وشبكات في الصويرة — AMANPLANET" },
    metaDesc: { fr: "Installation caméras, Wi-Fi et alarme à Essaouira. AMANPLANET C.I.S. — devis après visite. Tout le Maroc.", ar: "تركيب كاميرات وواي فاي وإنذار في الصويرة. عرض سعر بعد المعاينة." },
    h1: { fr: "Installation caméras et réseau à Essaouira", ar: "تركيب الكاميرات والشبكات في الصويرة" },
    lead: { fr: "Interventions à Essaouira depuis notre siège Marrakech — interventions planifiées.", ar: "تدخلات في الصويرة انطلاقاً من مقر مراكش." },
    paragraphs: {
      fr: ["AMANPLANET intervient à Essaouira pour l’installation de caméras de surveillance, réseaux, alarmes, domotique et contrôle d’accès. Médina touristique : riads, galeries et Wi-Fi invité.", "Notre méthode C.I.S. (Conseil • Installation • Suivi) reste identique : écoute du besoin, visite technique, devis détaillé sous 48 h après la visite, puis pose et formation. Depuis Marrakech, nous organisons les tournées vers Essaouira pour mutualiser les déplacements.", "Que vous gériez un magasin, un café, un cabinet, un dépôt, une école privée, un syndic, une villa, un riad ou un hôtel à Essaouira, nous adaptons le matériel (Hikvision, Dahua, Ezviz, TP-Link, Ubiquiti, MikroTik, ZKTeco…) à la réalité du site — poussière, chaleur, visiteurs, Wi-Fi saturé.", "Demandez un devis en ligne ou via WhatsApp. Les frais de déplacement pour l’état des lieux varient selon la ville (grille indicative — validation prix en cours) et sont déduits si les travaux sont confirmés."],
      ar: ["تتدخل AMANPLANET في الصويرة لتركيب كاميرات المراقبة والشبكات والإنذار والمنزل الذكي والتحكم بالوصول. Médina touristique : riads, galeries et Wi-Fi invité.", "منهج C.I.S. ثابت: استماع، معاينة، عرض سعر خلال 48 ساعة بعد الزيارة، ثم تركيب وتكوين. من مراكش ننسّق الجولات نحو الصويرة.", "سواء كان محلًا أو مقهى أو عيادة أو مستودعًا أو فيلا أو رياضًا في الصويرة، نلائم المعدات لظروف الموقع.", "اطلبوا عرض سعر عبر الموقع أو واتساب. رسوم المعاينة تختلف حسب المدينة وتُخصم عند اعتماد الأشغال."],
    },
    localAngles: {
      fr: ["Contexte local Essaouira : Médina touristique : riads, galeries et Wi-Fi invité.", "Délais : planification selon tournée (interventions planifiées).", "Support après pose par téléphone / WhatsApp, intervention sur site si besoin."],
      ar: ["السياق المحلي في الصويرة.", "الآجال حسب جدول الجولات (interventions planifiées).", "دعم بعد التركيب عبر الهاتف/واتساب."],
    },
    faq: [
      {
        q: { fr: "Intervenez-vous vraiment à Essaouira ?", ar: "هل تتدخلون فعلاً في الصويرة؟" },
        a: { fr: "Oui. Le siège est à Marrakech ; les interventions à Essaouira sont planifiées. Contactez-nous pour le prochain créneau.", ar: "نعم. المقر بمراكش ونخطّط التدخلات في الصويرة." },
      },
      {
        q: { fr: "Quel délai pour un devis à Essaouira ?", ar: "ما أجل عرض السعر في الصويرة؟" },
        a: { fr: "Rappel sous 24 h ouvrées ; devis détaillé sous 48 h après la visite sur site.", ar: "اتصال خلال 24 ساعة عمل؛ عرض مفصل خلال 48 ساعة بعد المعاينة." },
      },
    ],
  },
  {
    slug: "beni-mellal",
    name: { fr: "Béni Mellal", ar: "بني ملال" },
    priority: 3,
    metaTitle: { fr: "Caméras & réseau à Béni Mellal — AMANPLANET", ar: "كاميرات وشبكات في بني ملال — AMANPLANET" },
    metaDesc: { fr: "Installation caméras, Wi-Fi et alarme à Béni Mellal. AMANPLANET C.I.S. — devis après visite. Tout le Maroc.", ar: "تركيب كاميرات وواي فاي وإنذار في بني ملال. عرض سعر بعد المعاينة." },
    h1: { fr: "Installation caméras et réseau à Béni Mellal", ar: "تركيب الكاميرات والشبكات في بني ملال" },
    lead: { fr: "Interventions à Béni Mellal depuis notre siège Marrakech — interventions planifiées.", ar: "تدخلات في بني ملال انطلاقاً من مقر مراكش." },
    paragraphs: {
      fr: ["AMANPLANET intervient à Béni Mellal pour l’installation de caméras de surveillance, réseaux, alarmes, domotique et contrôle d’accès. Centre : commerces et exploitations agricoles périphériques.", "Notre méthode C.I.S. (Conseil • Installation • Suivi) reste identique : écoute du besoin, visite technique, devis détaillé sous 48 h après la visite, puis pose et formation. Depuis Marrakech, nous organisons les tournées vers Béni Mellal pour mutualiser les déplacements.", "Que vous gériez un magasin, un café, un cabinet, un dépôt, une école privée, un syndic, une villa, un riad ou un hôtel à Béni Mellal, nous adaptons le matériel (Hikvision, Dahua, Ezviz, TP-Link, Ubiquiti, MikroTik, ZKTeco…) à la réalité du site — poussière, chaleur, visiteurs, Wi-Fi saturé.", "Demandez un devis en ligne ou via WhatsApp. Les frais de déplacement pour l’état des lieux varient selon la ville (grille indicative — validation prix en cours) et sont déduits si les travaux sont confirmés."],
      ar: ["تتدخل AMANPLANET في بني ملال لتركيب كاميرات المراقبة والشبكات والإنذار والمنزل الذكي والتحكم بالوصول. Centre : commerces et exploitations agricoles périphériques.", "منهج C.I.S. ثابت: استماع، معاينة، عرض سعر خلال 48 ساعة بعد الزيارة، ثم تركيب وتكوين. من مراكش ننسّق الجولات نحو بني ملال.", "سواء كان محلًا أو مقهى أو عيادة أو مستودعًا أو فيلا أو رياضًا في بني ملال، نلائم المعدات لظروف الموقع.", "اطلبوا عرض سعر عبر الموقع أو واتساب. رسوم المعاينة تختلف حسب المدينة وتُخصم عند اعتماد الأشغال."],
    },
    localAngles: {
      fr: ["Contexte local Béni Mellal : Centre : commerces et exploitations agricoles périphériques.", "Délais : planification selon tournée (interventions planifiées).", "Support après pose par téléphone / WhatsApp, intervention sur site si besoin."],
      ar: ["السياق المحلي في بني ملال.", "الآجال حسب جدول الجولات (interventions planifiées).", "دعم بعد التركيب عبر الهاتف/واتساب."],
    },
    faq: [
      {
        q: { fr: "Intervenez-vous vraiment à Béni Mellal ?", ar: "هل تتدخلون فعلاً في بني ملال؟" },
        a: { fr: "Oui. Le siège est à Marrakech ; les interventions à Béni Mellal sont planifiées. Contactez-nous pour le prochain créneau.", ar: "نعم. المقر بمراكش ونخطّط التدخلات في بني ملال." },
      },
      {
        q: { fr: "Quel délai pour un devis à Béni Mellal ?", ar: "ما أجل عرض السعر في بني ملال؟" },
        a: { fr: "Rappel sous 24 h ouvrées ; devis détaillé sous 48 h après la visite sur site.", ar: "اتصال خلال 24 ساعة عمل؛ عرض مفصل خلال 48 ساعة بعد المعاينة." },
      },
    ],
  },
  {
    slug: "nador",
    name: { fr: "Nador", ar: "الناظور" },
    priority: 3,
    metaTitle: { fr: "Caméras & réseau à Nador — AMANPLANET", ar: "كاميرات وشبكات في الناظور — AMANPLANET" },
    metaDesc: { fr: "Installation caméras, Wi-Fi et alarme à Nador. AMANPLANET C.I.S. — devis après visite. Tout le Maroc.", ar: "تركيب كاميرات وواي فاي وإنذار في الناظور. عرض سعر بعد المعاينة." },
    h1: { fr: "Installation caméras et réseau à Nador", ar: "تركيب الكاميرات والشبكات في الناظور" },
    lead: { fr: "Interventions à Nador depuis notre siège Marrakech — interventions planifiées.", ar: "تدخلات في الناظور انطلاقاً من مقر مراكش." },
    paragraphs: {
      fr: ["AMANPLANET intervient à Nador pour l’installation de caméras de surveillance, réseaux, alarmes, domotique et contrôle d’accès. Nord-Est : commerces et entrepôts régionaux.", "Notre méthode C.I.S. (Conseil • Installation • Suivi) reste identique : écoute du besoin, visite technique, devis détaillé sous 48 h après la visite, puis pose et formation. Depuis Marrakech, nous organisons les tournées vers Nador pour mutualiser les déplacements.", "Que vous gériez un magasin, un café, un cabinet, un dépôt, une école privée, un syndic, une villa, un riad ou un hôtel à Nador, nous adaptons le matériel (Hikvision, Dahua, Ezviz, TP-Link, Ubiquiti, MikroTik, ZKTeco…) à la réalité du site — poussière, chaleur, visiteurs, Wi-Fi saturé.", "Demandez un devis en ligne ou via WhatsApp. Les frais de déplacement pour l’état des lieux varient selon la ville (grille indicative — validation prix en cours) et sont déduits si les travaux sont confirmés."],
      ar: ["تتدخل AMANPLANET في الناظور لتركيب كاميرات المراقبة والشبكات والإنذار والمنزل الذكي والتحكم بالوصول. Nord-Est : commerces et entrepôts régionaux.", "منهج C.I.S. ثابت: استماع، معاينة، عرض سعر خلال 48 ساعة بعد الزيارة، ثم تركيب وتكوين. من مراكش ننسّق الجولات نحو الناظور.", "سواء كان محلًا أو مقهى أو عيادة أو مستودعًا أو فيلا أو رياضًا في الناظور، نلائم المعدات لظروف الموقع.", "اطلبوا عرض سعر عبر الموقع أو واتساب. رسوم المعاينة تختلف حسب المدينة وتُخصم عند اعتماد الأشغال."],
    },
    localAngles: {
      fr: ["Contexte local Nador : Nord-Est : commerces et entrepôts régionaux.", "Délais : planification selon tournée (interventions planifiées).", "Support après pose par téléphone / WhatsApp, intervention sur site si besoin."],
      ar: ["السياق المحلي في الناظور.", "الآجال حسب جدول الجولات (interventions planifiées).", "دعم بعد التركيب عبر الهاتف/واتساب."],
    },
    faq: [
      {
        q: { fr: "Intervenez-vous vraiment à Nador ?", ar: "هل تتدخلون فعلاً في الناظور؟" },
        a: { fr: "Oui. Le siège est à Marrakech ; les interventions à Nador sont planifiées. Contactez-nous pour le prochain créneau.", ar: "نعم. المقر بمراكش ونخطّط التدخلات في الناظور." },
      },
      {
        q: { fr: "Quel délai pour un devis à Nador ?", ar: "ما أجل عرض السعر في الناظور؟" },
        a: { fr: "Rappel sous 24 h ouvrées ; devis détaillé sous 48 h après la visite sur site.", ar: "اتصال خلال 24 ساعة عمل؛ عرض مفصل خلال 48 ساعة بعد المعاينة." },
      },
    ],
  },
  {
    slug: "laayoune",
    name: { fr: "Laâyoune", ar: "العيون" },
    priority: 3,
    metaTitle: { fr: "Caméras & réseau à Laâyoune — AMANPLANET", ar: "كاميرات وشبكات في العيون — AMANPLANET" },
    metaDesc: { fr: "Installation caméras, Wi-Fi et alarme à Laâyoune. AMANPLANET C.I.S. — devis après visite. Tout le Maroc.", ar: "تركيب كاميرات وواي فاي وإنذار في العيون. عرض سعر بعد المعاينة." },
    h1: { fr: "Installation caméras et réseau à Laâyoune", ar: "تركيب الكاميرات والشبكات في العيون" },
    lead: { fr: "Interventions à Laâyoune depuis notre siège Marrakech — interventions planifiées.", ar: "تدخلات في العيون انطلاقاً من مقر مراكش." },
    paragraphs: {
      fr: ["AMANPLANET intervient à Laâyoune pour l’installation de caméras de surveillance, réseaux, alarmes, domotique et contrôle d’accès. Sud : sites tertiaires et résidentiels sur tournée planifiée.", "Notre méthode C.I.S. (Conseil • Installation • Suivi) reste identique : écoute du besoin, visite technique, devis détaillé sous 48 h après la visite, puis pose et formation. Depuis Marrakech, nous organisons les tournées vers Laâyoune pour mutualiser les déplacements.", "Que vous gériez un magasin, un café, un cabinet, un dépôt, une école privée, un syndic, une villa, un riad ou un hôtel à Laâyoune, nous adaptons le matériel (Hikvision, Dahua, Ezviz, TP-Link, Ubiquiti, MikroTik, ZKTeco…) à la réalité du site — poussière, chaleur, visiteurs, Wi-Fi saturé.", "Demandez un devis en ligne ou via WhatsApp. Les frais de déplacement pour l’état des lieux varient selon la ville (grille indicative — validation prix en cours) et sont déduits si les travaux sont confirmés."],
      ar: ["تتدخل AMANPLANET في العيون لتركيب كاميرات المراقبة والشبكات والإنذار والمنزل الذكي والتحكم بالوصول. Sud : sites tertiaires et résidentiels sur tournée planifiée.", "منهج C.I.S. ثابت: استماع، معاينة، عرض سعر خلال 48 ساعة بعد الزيارة، ثم تركيب وتكوين. من مراكش ننسّق الجولات نحو العيون.", "سواء كان محلًا أو مقهى أو عيادة أو مستودعًا أو فيلا أو رياضًا في العيون، نلائم المعدات لظروف الموقع.", "اطلبوا عرض سعر عبر الموقع أو واتساب. رسوم المعاينة تختلف حسب المدينة وتُخصم عند اعتماد الأشغال."],
    },
    localAngles: {
      fr: ["Contexte local Laâyoune : Sud : sites tertiaires et résidentiels sur tournée planifiée.", "Délais : planification selon tournée (interventions planifiées).", "Support après pose par téléphone / WhatsApp, intervention sur site si besoin."],
      ar: ["السياق المحلي في العيون.", "الآجال حسب جدول الجولات (interventions planifiées).", "دعم بعد التركيب عبر الهاتف/واتساب."],
    },
    faq: [
      {
        q: { fr: "Intervenez-vous vraiment à Laâyoune ?", ar: "هل تتدخلون فعلاً في العيون؟" },
        a: { fr: "Oui. Le siège est à Marrakech ; les interventions à Laâyoune sont planifiées. Contactez-nous pour le prochain créneau.", ar: "نعم. المقر بمراكش ونخطّط التدخلات في العيون." },
      },
      {
        q: { fr: "Quel délai pour un devis à Laâyoune ?", ar: "ما أجل عرض السعر في العيون؟" },
        a: { fr: "Rappel sous 24 h ouvrées ; devis détaillé sous 48 h après la visite sur site.", ar: "اتصال خلال 24 ساعة عمل؛ عرض مفصل خلال 48 ساعة بعد المعاينة." },
      },
    ],
  },
];

export function getCity(slug: string) {
  return CITY_PAGES.find((c) => c.slug === slug);
}

