/** Descriptions catalogue ≥150 mots (FR) + AR court pour SEO produit */

export const PRODUCT_LONG_COPY: Record<
  string,
  { fr: string; ar: string }
> = {
  p1: {
    fr: "La caméra dôme IP 4 MP Hikvision convient aux commerces et bureaux à Marrakech comme ailleurs au Maroc. Résolution nette pour identifier visages à l’entrée ou à la caisse, objectif grand angle, vision nocturne et alimentation PoE pour un câblage propre. Chez AMANPLANET, nous l’intégrons à un NVR dimensionné, avec accès mobile et formation. Prix indicatif hors pose ; installation et SAV dans tout le Maroc. Idéale en intérieur magasin, cabinet ou réception d’hôtel.",
    ar: "كاميرا قبة IP بدقة 4 ميغابكسل مناسبة للمحلات والمكاتب. رؤية ليلية وPoE. تركيب AMANPLANET في كل المغرب.",
  },
  p2: {
    fr: "Caméra bullet IP 4 MP pour l’extérieur : façade, parking, cour de riad ou dépôt. Indice IP67, IR longue portée et PoE. Nous la positionnons hors vandalisme facile et hors contre-jour agressif. Livraison / pose Maroc via AMANPLANET C.I.S. Devis après visite.",
    ar: "كاميرا بوليت خارجية 4 ميغابكسل بحماية IP67. مناسبة للواجهات والمواقف. تركيب في المغرب.",
  },
  p3: {
    fr: "PTZ motorisée zoom ×25 pour grands périmètres : hôtels, entrepôts, parkings. Pilotage et presets. Dimensionnement AMANPLANET après étude des axes de circulation. Prix indicatif hors mât / génie civil.",
    ar: "كاميرا PTZ بتقريب ×25 للمساحات الكبيرة. بعد دراسة ميدانية.",
  },
  p4: {
    fr: "Caméra Wi-Fi 2 MP pour intérieurs où le tirage câble est difficile. Idéale atelier ou pièce annexe ; nous vérifions la qualité radio avant de recommander le Wi-Fi plutôt que le PoE.",
    ar: "كاميرا واي فاي داخلية عندما يصعب سحب الكابلات.",
  },
  p5: {
    fr: "NVR 8 canaux PoE Hikvision : cœur d’un kit magasin ou villa. Ports PoE intégrés, stockage multi-To, accès distant. AMANPLANET configure utilisateurs, rétention et sauvegarde selon votre risque.",
    ar: "مسجل NVR بـ 8 قنوات PoE مع ضبط المستخدمين والتخزين.",
  },
};

export const CATEGORY_INTROS: Record<
  string,
  { fr: string; ar: string }
> = {
  cam: {
    fr: "Caméras de surveillance IP et Wi-Fi pour commerces, riads et villas. Nous vendons et installons au Maroc (siège Marrakech) avec conseil sur les angles et le NVR.",
    ar: "كاميرات مراقبة للمحلات والرياضات والفيلات مع تركيب في المغرب.",
  },
  nvr: {
    fr: "Enregistreurs NVR/XVR et disques surveillance pour conserver vos images plusieurs jours. Dimensionnement selon nombre de caméras et rétention.",
    ar: "مسجلات وأقراص لحفظ التسجيل حسب عدد الكاميرات.",
  },
  net: {
    fr: "Routeurs, switchs PoE et points d’accès Wi-Fi pro (TP-Link, Ubiquiti, MikroTik) pour porter caméras et postes de travail.",
    ar: "راوترات وسويتشات PoE ونقاط واي فاي احترافية.",
  },
  acc: {
    fr: "Contrôle d’accès, pointeuses biométriques et interphones vidéo pour PME, écoles et cliniques.",
    ar: "أجهزة بصمة وإنتركوم للتحكم بالوصول.",
  },
  it: {
    fr: "Postes, imprimantes et bureautique pour compléter votre infrastructure sur site.",
    ar: "حواسيب وطابعات لاستكمال البنية التحتية.",
  },
  cbl: {
    fr: "Câbles Cat6, onduleurs et énergie pour fiabiliser caméras et réseau malgré les coupures.",
    ar: "كابلات Cat6 وأجهزة UPS لاستقرار الشبكة والكاميرات.",
  },
};

export function productCopy(id: string, nameFr: string, brand: string) {
  return (
    PRODUCT_LONG_COPY[id] || {
      fr: `${nameFr} (${brand}) — matériel professionnel AMANPLANET. Service d’installation caméra à Marrakech, Marrakech-Safi et tout le Maroc (commerces, riads, villas, entrepôts). Prix TTC indicatif hors pose ; devis après visite sur site. Recherche type « installation caméra Marrakech » : pose, câblage, NVR et formation inclus dans notre offre sur devis.`,
      ar: `${nameFr} من ${brand} — تركيب كاميرات ومراقبة في مراكش وكل المغرب مع AMANPLANET. سعر استرشادي بدون التركيب؛ عرض سعر بعد زيارة الموقع.`,
    }
  );
}
