export type ServicePage = {
  slug: string;
  title: { fr: string; ar: string };
  metaTitle: { fr: string; ar: string };
  metaDesc: { fr: string; ar: string };
  h1: { fr: string; ar: string };
  intro: { fr: string; ar: string };
  body: { fr: string[]; ar: string[] };
  priceFrom: number;
  steps: { fr: string; ar: string }[];
  faq: { q: { fr: string; ar: string }; a: { fr: string; ar: string } }[];
  keywords: string[];
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "installation-camera-surveillance",
    title: {
      fr: "Installation caméra de surveillance",
      ar: "تركيب كاميرات المراقبة",
    },
    metaTitle: {
      fr: "Installation caméra surveillance Marrakech & Maroc",
      ar: "تركيب كاميرا مراقبة مراكش والمغرب",
    },
    metaDesc: {
      fr: "Pose caméras IP Hikvision/Dahua à Marrakech et partout au Maroc. Étude, câblage, NVR, app mobile. Devis sous 48 h après visite.",
      ar: "تركيب كاميرات IP في مراكش وكل المغرب. دراسة، كابلات، NVR وتطبيق. عرض سعر خلال 48 ساعة بعد المعاينة.",
    },
    h1: {
      fr: "Installation de caméras de surveillance au Maroc",
      ar: "تركيب كاميرات المراقبة في المغرب",
    },
    intro: {
      fr: "AMANPLANET (C.I.S.) installe des systèmes de vidéosurveillance pour magasins, riads, villas, hôtels et dépôts — siège à Marrakech, interventions dans tout le Maroc. Mot-clés naturels : installation camera, achat camera, camera surveillance Marrakech, camera WIFI, NVR.",
      ar: "AMANPLANET تركّب أنظمة المراقبة بالفيديو للمحلات والرياضات والفيلات والفنادق — مقر بمراكش وتدخل في كل المغرب.",
    },
    body: {
      fr: [
        "Une bonne installation commence par le plan de couverture : angles morts, hauteur de pose, éclairage, besoin de vision nocturne et enregistrement local ou cloud. Nous posons des caméras dôme, bullet, PTZ et Wi-Fi selon le site.",
        "Le câblage Cat6 / PoE et le NVR sont dimensionnés pour votre nombre de canaux. À la mise en service, vous consultez vos caméras depuis le téléphone (Android / iOS) et nous formons votre équipe.",
        "Que vous soyez à Marrakech (Gueliz, Médina, Route de Casablanca) ou dans une autre ville, le parcours reste le même : visite → devis détaillé → pose → garantie 12 mois.",
      ],
      ar: [
        "تبدأ التركيبة الجيدة بخطة تغطية: الزوايا الميتة، ارتفاع التركيب، الإضاءة، والرؤية الليلية. نركّب كاميرات قبة وبوليت وPTZ وواي فاي حسب الموقع.",
        "نضبط الكابلات وPoE وNVR حسب عدد القنوات، ونشغّل التطبيق على الهاتف مع تكوين فريقكم.",
        "سواء كنتم بمراكش أو مدينة أخرى: معاينة ثم عرض سعر ثم تركيب وضمان 12 شهراً.",
      ],
    },
    priceFrom: 2400,
    steps: [
      { fr: "Brief besoin + photos éventuelles", ar: "وصف الحاجة وصور إن وُجدت" },
      { fr: "État des lieux sur site", ar: "معاينة ميدانية" },
      { fr: "Devis matériel + pose", ar: "عرض المعدات والتركيب" },
      { fr: "Installation et formation app", ar: "التركيب وتكوين التطبيق" },
    ],
    faq: [
      {
        q: { fr: "Combien de caméras pour un magasin ?", ar: "كم كاميرا لمحل تجاري؟" },
        a: {
          fr: "Souvent 3 à 6 pour 80–150 m² (caisse, entrée, réserve). Nous validons sur plan lors de la visite.",
          ar: "غالباً 3 إلى 6 لـ 80–150 م². نؤكد العدد أثناء المعاينة.",
        },
      },
      {
        q: { fr: "IP ou analogique ?", ar: "IP أم تناظري؟" },
        a: {
          fr: "L’IP (PoE) est le standard actuel pour netteté et évolutivité. L’analogique reste pertinent en rénovation de câblage existant.",
          ar: "IP عبر PoE هو المعيار الحالي. التناظري مناسب عند إعادة استخدام كابلات قائمة.",
        },
      },
    ],
    keywords: [
      "installation camera",
      "camera surveillance marrakech",
      "achat camera maroc",
      "nvr hikvision",
    ],
  },
  {
    slug: "installation-domotique",
    title: { fr: "Installation domotique", ar: "تركيب المنزل الذكي" },
    metaTitle: {
      fr: "Domotique Marrakech — éclairage, volets, scénarios",
      ar: "منزل ذكي مراكش — إضاءة وسيناريوهات",
    },
    metaDesc: {
      fr: "Domotique résidentielle et petite tertiaire : éclairage, volets, prises connectées, scénarios. Installation AMANPLANET au Maroc.",
      ar: "منزل ذكي: إضاءة، ستائر، مقابس وسيناريوهات. تركيب AMANPLANET في المغرب.",
    },
    h1: {
      fr: "Installation domotique à Marrakech et au Maroc",
      ar: "تركيب أنظمة المنزل الذكي في مراكش والمغرب",
    },
    intro: {
      fr: "La domotique relie éclairage, volets, prises et alarmes pour un quotidien plus simple — riads, villas et petits hôtels. AMANPLANET conçoit des scénarios sobres, sans usine à gaz.",
      ar: "المنزل الذكي يربط الإضاءة والستائر والمقابس والإنذار — للرياضات والفيلات. نصمم سيناريوهات بسيطة وفعّالة.",
    },
    body: {
      fr: [
        "Nous partons de vos usages : « tout éteint en partant », éclairage d’allée à la tombée du jour, ouverture des volets le matin. Matériel compatible Wi-Fi / hub selon la portée et la fiabilité souhaitées.",
        "L’installation intègre souvent caméras et contrôle d’accès pour un seul tableau de bord. Formation sur place et documentation des codes remis au client.",
      ],
      ar: [
        "نبدأ من عاداتكم اليومية: إطفاء شامل عند المغادرة، إضاءة الممر ليلاً، فتح الستائر صباحاً.",
        "غالباً ندمج الكاميرات والتحكم بالوصول في لوحة واحدة مع تسليم الرموز والتكوين.",
      ],
    },
    priceFrom: 3200,
    steps: [
      { fr: "Cartographie des pièces et scénarios", ar: "جرد الغرف والسيناريوهات" },
      { fr: "Choix hub / protocoles", ar: "اختيار المحور والبروتوكولات" },
      { fr: "Pose et tests", ar: "التركيب والاختبار" },
      { fr: "Formation utilisateur", ar: "تكوين المستخدم" },
    ],
    faq: [
      {
        q: { fr: "Faut-il tout câbler ?", ar: "هل يلزم سحب كابلات؟" },
        a: {
          fr: "Pas toujours : solutions radio ou Wi-Fi pour rénovation. Le filaire reste plus stable en neuf.",
          ar: "ليس دائماً: حلول لاسلكية للتجديد. السلكي أكثر ثباتاً في البناء الجديد.",
        },
      },
    ],
    keywords: ["domotique marrakech", "maison intelligente maroc", "eclairage connecte"],
  },
  {
    slug: "installation-alarme",
    title: { fr: "Installation alarme", ar: "تركيب أنظمة الإنذار" },
    metaTitle: {
      fr: "Alarme intrusion Marrakech & Maroc — pose pro",
      ar: "إنذار اقتحام مراكش والمغرب",
    },
    metaDesc: {
      fr: "Alarme intrusion, détecteurs, sirène, liaison téléphone/app. Installation AMANPLANET pour commerces et habitations.",
      ar: "إنذار اقتحام وكواشف وصفارة وتطبيق. تركيب للمحلات والمنازل.",
    },
    h1: {
      fr: "Installation d’alarme intrusion au Maroc",
      ar: "تركيب إنذار الاقتحام في المغرب",
    },
    intro: {
      fr: "Une alarme utile est discrète, fiable et testée. Nous dimensionnons détecteurs d’ouverture, volumétriques et sirène selon le risque (magasin, dépôt, villa).",
      ar: "إنذار فعّال يكون موثوقاً ومُختبَراً: كواشف فتح وحركة وصفارة حسب نوع الموقع.",
    },
    body: {
      fr: [
        "Le central communique souvent avec votre téléphone. Nous paramétrons les zones, les codes utilisateurs et les notifications.",
        "Couplage possible avec vidéosurveillance pour vérifier une alerte avant de se déplacer.",
      ],
      ar: [
        "المركزي يتصل بهاتفكم مع ضبط المناطق والرموز والإشعارات.",
        "يمكن ربطه بالكاميرات للتحقق قبل التنقل.",
      ],
    },
    priceFrom: 2800,
    steps: [
      { fr: "Analyse des points d’entrée", ar: "تحليل نقاط الدخول" },
      { fr: "Plan de zones", ar: "خطة المناطق" },
      { fr: "Pose et paramétrage", ar: "التركيب والضبط" },
      { fr: "Tests intrusion simulés", ar: "اختبارات محاكاة" },
    ],
    faq: [
      {
        q: { fr: "Alarme filaire ou sans fil ?", ar: "سلكي أم لاسلكي؟" },
        a: {
          fr: "Sans fil pour rénovation rapide ; filaire pour sites neufs ou haute criticité.",
          ar: "لاسلكي للتجديد السريع؛ سلكي للمواقع الجديدة أو الحساسة.",
        },
      },
    ],
    keywords: ["alarme marrakech", "systeme alarme maroc", "intrusion"],
  },
  {
    slug: "reseau-informatique",
    title: { fr: "Réseau informatique", ar: "الشبكات المعلوماتية" },
    metaTitle: {
      fr: "Réseau & Wi-Fi pro Marrakech — câblage, routeurs",
      ar: "شبكات وواي فاي احترافي مراكش",
    },
    metaDesc: {
      fr: "Câblage Cat6, switch PoE, Wi-Fi multi-AP, routeurs MikroTik/Ubiquiti/TP-Link. Déploiement AMANPLANET au Maroc.",
      ar: "كابلات Cat6 وسويتش PoE وواي فاي متعدد النقاط. نشر AMANPLANET في المغرب.",
    },
    h1: {
      fr: "Installation réseau informatique et Wi-Fi pro",
      ar: "تركيب الشبكات والواي فاي الاحترافي",
    },
    intro: {
      fr: "Un réseau stable porte vos caméras PoE, vos caisses et votre Wi-Fi clients. Nous concevons baies, VLANs invités et couverture radio.",
      ar: "شبكة مستقرة تحمل الكاميرات والصناديق وواي فاي الزبائن. نصمم الخزائن وتغطية الراديو.",
    },
    body: {
      fr: [
        "Audit débit, points d’accès et chemins de câbles. Pose goulottes / chemins de câbles soignés pour les commerces et riads.",
        "Documentation des mots de passe et schéma remis — pas de verrouillage constructeur.",
      ],
      ar: [
        "نراجع الصبيب ونقاط الوصول ومسارات الكابلات بتشطيب نظيف.",
        "نسلّم كلمات المرور والمخطط — دون قفل من المورّد.",
      ],
    },
    priceFrom: 1800,
    steps: [
      { fr: "Mesure couverture & débit", ar: "قياس التغطية والصبيب" },
      { fr: "Schéma baie / AP", ar: "مخطط الخزانة ونقاط الوصول" },
      { fr: "Tirage et brassage", ar: "السحب والتجميع" },
      { fr: "Tests et formation", ar: "الاختبار والتكوين" },
    ],
    faq: [
      {
        q: { fr: "Wi-Fi 6 utile pour un café ?", ar: "هل Wi-Fi 6 مفيد لمقهى؟" },
        a: {
          fr: "Oui si beaucoup de clients simultanés. Sinon un Wi-Fi 5 bien placé suffit souvent.",
          ar: "نعم عند كثرة الزبائن. وإلا فـ Wi-Fi 5 بموضع جيد يكفي غالباً.",
        },
      },
    ],
    keywords: ["reseau informatique marrakech", "wifi pro maroc", "cablage cat6"],
  },
  {
    slug: "maintenance-informatique",
    title: { fr: "Maintenance informatique", ar: "صيانة المعلوماتيات" },
    metaTitle: {
      fr: "Maintenance informatique Maroc — contrats & dépannage",
      ar: "صيانة معلوماتية المغرب — عقود وإصلاح",
    },
    metaDesc: {
      fr: "Contrats de maintenance PC, réseau, sauvegarde et dépannage rapide. Support AMANPLANET depuis Marrakech, tout le Maroc.",
      ar: "عقود صيانة حواسيب وشبكات ونسخ احتياطي. دعم من مراكش لكل المغرب.",
    },
    h1: {
      fr: "Maintenance informatique et support",
      ar: "الصيانة المعلوماتية والدعم",
    },
    intro: {
      fr: "Après la pose, nous restons : contrats mensuels ou interventions à la demande pour PC, imprimantes, réseau et sauvegardes.",
      ar: "بعد التركيب نبقى: عقود شهرية أو تدخلات عند الطلب للحواسيب والطابعات والشبكات.",
    },
    body: {
      fr: [
        "Tickets WhatsApp / téléphone, priorisation des pannes bloquantes (caisse, internet, NVR).",
        "Mises à jour, antivirus, sauvegarde et inventaire matériel pour les petites structures.",
      ],
      ar: [
        "تذاكر عبر واتساب/هاتف مع أولوية الأعطال الحرجة.",
        "تحديثات وحماية ونسخ احتياطي وجرد للمعدات.",
      ],
    },
    priceFrom: 600,
    steps: [
      { fr: "Diagnostic à distance si possible", ar: "تشخيص عن بُعد إن أمكن" },
      { fr: "Intervention sur site", ar: "تدخل ميداني" },
      { fr: "Compte-rendu", ar: "تقرير التدخل" },
      { fr: "Proposition contrat si récurrent", ar: "اقتراح عقد إن تكرر" },
    ],
    faq: [
      {
        q: { fr: "Délai d’intervention ?", ar: "أجل التدخل؟" },
        a: {
          fr: "Objectif : rappel sous 24 h ouvrées ; urgence selon charge et ville.",
          ar: "هدفنا اتصال خلال 24 ساعة عمل؛ الطارئ حسب الحمولة والمدينة.",
        },
      },
    ],
    keywords: ["maintenance informatique maroc", "depannage pc marrakech"],
  },
  {
    slug: "controle-acces-pointeuse-biometrique",
    title: {
      fr: "Contrôle d’accès & pointeuse biométrique",
      ar: "التحكم بالوصول وأجهزة البصمة",
    },
    metaTitle: {
      fr: "Pointeuse biométrique & contrôle d’accès Maroc",
      ar: "جهاز بصمة وتحكم بالوصول المغرب",
    },
    metaDesc: {
      fr: "Pointeuses ZKTeco, badges, interphones vidéo, gâches. Installation et paramétrage AMANPLANET.",
      ar: "أجهزة ZKTeco وبطاقات وإنتركوم. تركيب وضبط AMANPLANET.",
    },
    h1: {
      fr: "Contrôle d’accès et pointeuse biométrique",
      ar: "التحكم بالوصول وأجهزة الحضور بالبصمة",
    },
    intro: {
      fr: "Gérez entrées, horaires et visiteurs : pointeuses empreinte/badge, interphones IP, portails. Idéal PME, écoles, cliniques.",
      ar: "إدارة المداخل والحضور والزوار: بصمة وبطاقة وإنتركوم — للشركات والمدارس والعيادات.",
    },
    body: {
      fr: [
        "Paramétrage utilisateurs, exports de pointage, intégration éventuelle au réseau local.",
        "Couplage caméra sur les accès sensibles pour un audit visuel.",
      ],
      ar: [
        "ضبط المستخدمين وتصدير الحضور وربطه بالشبكة المحلية.",
        "ربط كاميرا عند المداخل الحساسة للمراجعة البصرية.",
      ],
    },
    priceFrom: 2100,
    steps: [
      { fr: "Choix lecteur / capacité", ar: "اختيار الجهاز والسعة" },
      { fr: "Pose mécanique + réseau", ar: "التركيب الميكانيكي والشبكي" },
      { fr: "Enrollement utilisateurs", ar: "تسجيل المستخدمين" },
      { fr: "Formation RH / gardien", ar: "تكوين الموارد/الحارس" },
    ],
    faq: [
      {
        q: { fr: "Empreinte ou badge ?", ar: "بصمة أم بطاقة؟" },
        a: {
          fr: "Souvent les deux : empreinte pour le personnel, badge visiteurs.",
          ar: "غالباً الاثنان: بصمة للموظفين وبطاقة للزوار.",
        },
      },
    ],
    keywords: ["pointeuse biometrique maroc", "controle acces marrakech", "zkteco"],
  },
];

export function getService(slug: string) {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}
