export const SERVICE_DETAILS = [
  {
    id: "cam",
    anchor: "videosurveillance",
    ic: "cam" as const,
    k: "s_cam_t",
    from: 2400,
    included: ["s_cam_1", "s_cam_2", "s_cam_3"],
    examples: {
      fr: [
        "Épicerie 90 m² — 6 caméras IP + NVR 8 canaux, accès téléphone",
        "Villa Ain Diab — 4 bullets extérieures + vision nocturne",
        "Dépôt Bouskoura — couverture allées + quai de chargement",
      ],
      ar: [
        "بقالة 90 م² — 6 كاميرات IP + مسجل 8 قنوات، ولوج عبر الهاتف",
        "فيلا عين الذئاب — 4 كاميرات خارجية ورؤية ليلية",
        "مستودع بوسكورة — تغطية الممرات ورصيف التحميل",
      ],
    },
    faq: [
      {
        q: { fr: "Faut-il internet pour les caméras ?", ar: "هل يلزم الإنترنت للكاميرات؟" },
        a: {
          fr: "L’enregistrement local fonctionne sans internet. L’accès à distance sur téléphone nécessite une connexion stable.",
          ar: "التسجيل المحلي يعمل بدون إنترنت. الولوج عن بعد عبر الهاتف يحتاج اتصالا مستقرا.",
        },
      },
      {
        q: { fr: "Combien de caméras pour un magasin ?", ar: "كم كاميرا للمحل؟" },
        a: {
          fr: "Cela dépend des angles morts. L’état des lieux fixe le nombre exact — d’où le devis après visite.",
          ar: "يعتمد على الزوايا الميتة. المعاينة تحدد العدد الدقيق — لذلك عرض السعر بعد الزيارة.",
        },
      },
    ],
  },
  {
    id: "net",
    anchor: "reseau",
    ic: "router" as const,
    k: "s_net_t",
    from: 1800,
    included: ["s_net_1", "s_net_2", "s_net_3"],
    examples: {
      fr: [
        "Café Mohammedia — Wi-Fi clients + VLAN caisse séparé",
        "Cabinet médical — câblage Cat6 + point d’accès salle d’attente",
      ],
      ar: [
        "مقهى المحمدية — واي فاي للزبناء وشبكة منفصلة للصندوق",
        "عيادة — كابلاج Cat6 ونقطة ولوج لقاعة الانتظار",
      ],
    },
    faq: [
      {
        q: { fr: "Installez-vous aussi la fibre ?", ar: "هل تركّبون الألياف؟" },
        a: {
          fr: "Nous préparons le réseau interne (baie, switch, Wi-Fi). L’abonnement opérateur reste de votre côté.",
          ar: "نجهّز الشبكة الداخلية (خزانة، سويتش، واي فاي). الاشتراك مع المشغّل يبقى عليكم.",
        },
      },
    ],
  },
  {
    id: "it",
    anchor: "informatique",
    ic: "pc" as const,
    k: "s_it_t",
    from: 600,
    included: ["s_it_1", "s_it_2", "s_it_3"],
    examples: {
      fr: [
        "Commerce — postes caisse + sauvegarde hebdomadaire",
        "Bureau — messagerie pro + antivirus centralisé",
      ],
      ar: [
        "محل — حواسيب الصندوق ونسخ احتياطي أسبوعي",
        "مكتب — بريد مهني ومضاد فيروسات مركزي",
      ],
    },
    faq: [
      {
        q: { fr: "Proposez-vous un contrat mensuel ?", ar: "هل لديكم عقد شهري؟" },
        a: {
          fr: "Oui : maintenance préventive ou interventions à la demande. Détails dans le devis maintenance.",
          ar: "نعم: صيانة وقائية أو تدخلات عند الطلب. التفاصيل في عرض سعر الصيانة.",
        },
      },
    ],
  },
  {
    id: "acc",
    anchor: "controle-acces",
    ic: "badge" as const,
    k: "s_acc_t",
    from: 2100,
    included: ["s_acc_1", "s_acc_2", "s_acc_3"],
    examples: {
      fr: [
        "Immeuble — interphone vidéo + gâche électrique",
        "Entreprise — pointeuse biométrique + badges visiteurs",
        "Villa — alarme intrusion + détecteurs couplés caméras",
      ],
      ar: [
        "عمارة — إنتركوم فيديو وقفل كهربائي",
        "شركة — جهاز بصمة وبطاقات للزوار",
        "فيلا — إنذار اقتحام وكواشف مرتبطة بالكاميرات",
      ],
    },
    faq: [
      {
        q: { fr: "Couvrez-vous alarmes et domotique ?", ar: "هل تغطون الإنذارات والمنزل الذكي؟" },
        a: {
          fr: "Oui : alarmes intrusion, scénarios d’éclairage/ volets et intégration avec la vidéosurveillance selon le besoin.",
          ar: "نعم: إنذارات اقتحام، سيناريوهات إضاءة/ستائر ودمج مع المراقبة حسب الحاجة.",
        },
      },
    ],
  },
] as const;
