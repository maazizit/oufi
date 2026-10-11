export type BlogPost = {
  slug: string;
  title: { fr: string; ar: string };
  metaDesc: { fr: string; ar: string };
  date: string;
  excerpt: { fr: string; ar: string };
  body: { fr: string[]; ar: string[] };
};

/** 10 sujets proposés ; 3 rédigés en FR + AR */
export const BLOG_TOPICS_PROPOSED = [
  "Prix installation caméras Maroc 2026",
  "Caméra IP vs analogique : que choisir ?",
  "Combien de caméras pour une villa / riad à Marrakech ?",
  "Wi-Fi multi-points pour café et restaurant",
  "Pointeuse biométrique : conformité et bonnes pratiques",
  "Alarme intrusion + vidéosurveillance : le duo utile",
  "Domotique légère pour riad : par où commencer",
  "NVR : combien de To de stockage prévoir ?",
  "Maintenance préventive réseau pour PME",
  "Checklist sécurité magasin avant ouverture",
] as const;

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "prix-installation-camera-maroc-2026",
    title: {
      fr: "Prix d’une installation de caméras au Maroc en 2026",
      ar: "أسعار تركيب كاميرات المراقبة في المغرب 2026",
    },
    metaDesc: {
      fr: "Fourchettes indicatives 2026 : matériel, pose, NVR, déplacement. AMANPLANET explique ce qui fait varier le devis.",
      ar: "مجالات أسعار استرشادية 2026: معدات وتركيب وNVR. ما الذي يغيّر عرض السعر؟",
    },
    date: "2026-10-01",
    excerpt: {
      fr: "Pas de prix magique au téléphone : voici les postes qui composent un devis réel.",
      ar: "لا سعر سحري عبر الهاتف: هذه بنود العرض الحقيقي.",
    },
    body: {
      fr: [
        "En 2026, un kit entrée de gamme (3–4 caméras IP 4 MP + NVR + pose simple) se situe souvent dans une fourchette indicative de quelques milliers de dirhams, hors contraintes de hauteur, tranchée ou fibre. Les PTZ, le grand stockage et les sites multi-bâtiments font grimper le total.",
        "Le devis AMANPLANET sépare toujours matériel, main-d’œuvre, câblage et frais de visite. Ces frais de déplacement (grille selon ville — validation prix en cours) sont déduits si vous confirmez les travaux.",
        "Méfiez-vous des « forfaits » sans visite : un angle mal choisi coûte plus cher qu’une étude sur site. Demandez un devis après état des lieux à Marrakech ou dans votre ville.",
      ],
      ar: [
        "في 2026 غالباً تتراوح حزمة دخول (3–4 كاميرات IP مع NVR وتركيب بسيط) ضمن آلاف الدراهم، دون قيود الارتفاع أو الحفر. كاميرات PTZ والتخزين الكبير ترفع التكلفة.",
        "يفصل عرض AMANPLANET المعدات واليد العاملة والكابلات ورسوم المعاينة التي تُخصم عند اعتماد الأشغال.",
        "احذروا العروض دون زيارة ميدانية. اطلبوا عرضاً بعد المعاينة في مراكش أو مدينتكم.",
      ],
    },
  },
  {
    slug: "camera-ip-vs-analogique",
    title: {
      fr: "Caméra IP ou analogique : que choisir ?",
      ar: "كاميرا IP أم تناظرية: ماذا تختارون؟",
    },
    metaDesc: {
      fr: "Différences IP vs analogique : image, câblage PoE, évolutivité. Conseil AMANPLANET pour commerces et maisons.",
      ar: "الفروق بين IP والتناظري: الصورة وكابلات PoE والتوسعة.",
    },
    date: "2026-10-02",
    excerpt: {
      fr: "L’IP domine les projets neufs ; l’analogique a encore sa place en rénovation.",
      ar: "IP يهيمن على المشاريع الجديدة؛ التناظري يبقى مفيداً في التجديد.",
    },
    body: {
      fr: [
        "Les caméras IP (souvent en PoE) offrent une meilleure définition, des analytics légers et une montée en charge plus simple. Un seul câble réseau alimente et transporte l’image vers le NVR.",
        "L’analogique / HD-TVI reste pertinent si vous réutilisez un câblage coaxial existant. La qualité a progressé, mais l’évolutivité et la flexibilité réseau restent du côté IP.",
        "Pour un magasin ou un riad à Marrakech, nous recommandons en général l’IP sauf contrainte de câbles déjà en place. Un audit rapide tranche le sujet.",
      ],
      ar: [
        "كاميرات IP عبر PoE تعطي دقة أفضل ومرونة أعلى. كابل شبكة واحد يغذّي وينقل الصورة إلى NVR.",
        "التناظري مناسب عند إعادة استخدام كابلات محورية قائمة.",
        "لمحل أو رياض بمراكش نفضّل غالباً IP إلا إذا وُجدت كابلات جاهزة.",
      ],
    },
  },
  {
    slug: "combien-cameras-villa-riad-marrakech",
    title: {
      fr: "Combien de caméras pour une villa ou un riad à Marrakech ?",
      ar: "كم كاميرا لفيلا أو رياض بمراكش؟",
    },
    metaDesc: {
      fr: "Guide de dimensionnement : rue, patio, terrasse, garage. Spécificités riads médina vs villas périphérie Marrakech.",
      ar: "دليل عدد الكاميرات: الشارع والفناء والتراس. خصوصية رياضات المدينة العتيقة.",
    },
    date: "2026-10-03",
    excerpt: {
      fr: "De 4 à 12 caméras selon la surface et les angles critiques — toujours validé sur place.",
      ar: "من 4 إلى 12 حسب المساحة والزوايا الحرجة — مع تأكيد ميداني.",
    },
    body: {
      fr: [
        "Un riad en médina : souvent 4–8 caméras (porte d’entrée, patio, couloirs, terrasse) avec pose discrète et respect du bâti. Le Wi-Fi seul est rarement fiable ; préférer le filaire PoE dès que possible.",
        "Une villa (Targa, Route d’Ourika, Amelkis…) : 6–12 caméras selon le jardin, le parking et les angles rue. Les bullet IP67 gèrent l’extérieur ; les dômes conviennent aux espaces couverts.",
        "Ajoutez un NVR dimensionné (jours de rétention) et un onduleur si les coupures sont fréquentes. AMANPLANET valide le nombre exact lors de la visite — pas de devis sérieux sans plan.",
      ],
      ar: [
        "رياض بالمدينة العتيقة: غالباً 4–8 كاميرات بتركيب متكتّم. الواي فاي وحده نادراً ما يكفي؛ فضّلوا PoE.",
        "فيلا: 6–12 حسب الحديقة والموقف وزاوية الشارع.",
        "أضيفوا NVR مناسب ت وUPS عند انقطاع الكهرباء. نؤكد العدد أثناء المعاينة.",
      ],
    },
  },
];

export function getPost(slug: string) {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
