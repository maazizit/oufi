import type { Lang, Localized } from "../types";

const A: Record<string, Localized> = {
  adm_lang_fr: { fr: "Français", ar: "الفرنسية" },
  adm_lang_ar: { fr: "العربية", ar: "العربية" },
  adm_lang_toggle: { fr: "Langue", ar: "اللغة" },

  adm_backoffice: { fr: "Back-office", ar: "لوحة التحكم" },
  adm_sign_out: { fr: "Déconnexion", ar: "تسجيل الخروج" },
  adm_role_super: { fr: "Super administrateur", ar: "مدير عام" },
  adm_role_manager: { fr: "Gestionnaire", ar: "مسؤول" },
  adm_administrator: { fr: "Administrateur", ar: "مسؤول النظام" },

  adm_nav_dashboard: { fr: "Tableau de bord", ar: "لوحة المعلومات" },
  adm_nav_demandes: { fr: "Demandes", ar: "الطلبات" },
  adm_nav_catalogue: { fr: "Catalogue", ar: "الكتالوج" },
  adm_nav_interventions: { fr: "Interventions", ar: "التدخلات" },
  adm_nav_reglages: { fr: "Réglages", ar: "الإعدادات" },
  adm_nav_users: { fr: "Utilisateurs & accès", ar: "المستخدمون والصلاحيات" },
  adm_nav_account: { fr: "Mon compte", ar: "حسابي" },

  adm_login_title: { fr: "Connexion back-office", ar: "تسجيل الدخول — لوحة التحكم" },
  adm_login_sub: {
    fr: "Réservé à l'équipe AMANPLANET",
    ar: "مخصص لفريق AMANPLANET",
  },
  adm_login_user: { fr: "Identifiant", ar: "اسم المستخدم" },
  adm_login_password: { fr: "Mot de passe", ar: "كلمة المرور" },
  adm_login_submit: { fr: "Se connecter", ar: "تسجيل الدخول" },
  adm_login_err: {
    fr: "Identifiant ou mot de passe incorrect.",
    ar: "اسم المستخدم أو كلمة المرور غير صحيحة.",
  },
  adm_access_denied: {
    fr: "Accès refusé. Contactez un super administrateur.",
    ar: "الوصول مرفوض. تواصل مع المدير العام.",
  },

  adm_dash_title: { fr: "Tableau de bord", ar: "لوحة المعلومات" },
  adm_kpi_new: { fr: "Nouvelles demandes", ar: "طلبات جديدة" },
  adm_kpi_new_d: { fr: "à traiter aujourd'hui", ar: "للمعالجة اليوم" },
  adm_kpi_sent: { fr: "Devis en attente", ar: "عروض أسعار قيد الانتظار" },
  adm_kpi_sent_d: { fr: "envoyés, sans réponse", ar: "مُرسلة بدون رد" },
  adm_kpi_interv: { fr: "Interventions du jour", ar: "تدخلات اليوم" },
  adm_kpi_interv_d: { fr: "planifiées", ar: "مجدولة" },
  adm_kpi_stock: { fr: "Stock bas", ar: "مخزون منخفض" },
  adm_kpi_stock_d: { fr: "articles à réapprovisionner", ar: "منتجات للتزويد" },
  adm_recent_req: { fr: "Demandes récentes", ar: "أحدث الطلبات" },
  adm_see_all: { fr: "Tout voir", ar: "عرض الكل" },
  adm_chart_7d: { fr: "Demandes des 7 derniers jours", ar: "الطلبات خلال 7 أيام" },
  adm_by_type: { fr: "Répartition par type", ar: "حسب النوع" },
  adm_plan_today: { fr: "Planning du jour", ar: "جدول اليوم" },
  adm_no_results: { fr: "Aucun résultat.", ar: "لا توجد نتائج." },

  adm_th_ref: { fr: "Réf.", ar: "المرجع" },
  adm_th_client: { fr: "Client", ar: "الزبون" },
  adm_th_type: { fr: "Type", ar: "النوع" },
  adm_th_chan: { fr: "Canal", ar: "القناة" },
  adm_th_status: { fr: "Statut", ar: "الحالة" },
  adm_th_date: { fr: "Date", ar: "التاريخ" },
  adm_th_city: { fr: "Ville", ar: "المدينة" },
  adm_th_service: { fr: "Service", ar: "الخدمة" },
  adm_th_origin: { fr: "Origine", ar: "المصدر" },
  adm_th_items: { fr: "Articles", ar: "المنتجات" },
  adm_th_received: { fr: "Reçue le", ar: "تاريخ الاستلام" },
  adm_demandes_empty: {
    fr: "Aucune demande pour le moment.",
    ar: "لا توجد طلبات حالياً.",
  },

  adm_ty_install: { fr: "Nouvelle installation", ar: "تركيب جديد" },
  adm_ty_install_short: { fr: "Installation", ar: "تركيب" },
  adm_ty_prod: { fr: "Devis matériel", ar: "عرض سعر معدات" },
  adm_ty_maint: { fr: "Maintenance", ar: "صيانة" },
  adm_ty_fix: { fr: "Dépannage", ar: "إصلاح عاجل" },

  adm_st_new: { fr: "Nouvelle", ar: "جديدة" },
  adm_st_contacted: { fr: "Contactée", ar: "تم الاتصال" },
  adm_st_visit: { fr: "Visite planifiée", ar: "زيارة مجدولة" },
  adm_st_sent: { fr: "Devis envoyé", ar: "عرض سعر مُرسل" },
  adm_st_won: { fr: "Acceptée", ar: "مقبولة" },
  adm_st_done: { fr: "Terminée", ar: "منتهية" },
  adm_st_lost: { fr: "Annulée", ar: "ملغاة" },

  adm_ch_phone: { fr: "Téléphone", ar: "هاتف" },
  adm_ch_wa: { fr: "WhatsApp", ar: "واتساب" },
  adm_ch_mail: { fr: "E-mail", ar: "بريد إلكتروني" },

  adm_src_form: { fr: "Formulaire", ar: "نموذج" },
  adm_src_cart: { fr: "Demande de devis", ar: "طلب عرض سعر" },
  adm_src_contact: { fr: "Contact", ar: "اتصال" },

  adm_i_sched: { fr: "Planifiée", ar: "مجدولة" },
  adm_i_prog: { fr: "En cours", ar: "قيد التنفيذ" },
  adm_i_done: { fr: "Terminée", ar: "منتهية" },

  adm_day_sun: { fr: "dim", ar: "أحد" },
  adm_day_mon: { fr: "lun", ar: "إثن" },
  adm_day_tue: { fr: "mar", ar: "ثلا" },
  adm_day_wed: { fr: "mer", ar: "أرب" },
  adm_day_thu: { fr: "jeu", ar: "خمي" },
  adm_day_fri: { fr: "ven", ar: "جمع" },
  adm_day_sat: { fr: "sam", ar: "سبت" },

  adm_notifs: { fr: "Notifications", ar: "الإشعارات" },
  adm_notifs_empty: { fr: "Aucune notification.", ar: "لا إشعارات." },
  adm_notifs_mark: { fr: "Tout marquer lu", ar: "تعليم الكل كمقروء" },
  adm_notifs_see: { fr: "Voir les demandes", ar: "عرض الطلبات" },

  adm_demandes_hint: {
    fr: "Cliquez une ligne pour ouvrir la fiche · Installation · Matériel · Maintenance · Dépannage",
    ar: "انقر على الصف لفتح الملف · تركيب · معدات · صيانة · إصلاح",
  },
  adm_page_demandes: { fr: "Demandes", ar: "الطلبات" },
  adm_page_catalogue: { fr: "Catalogue", ar: "الكتالوج" },
  adm_page_interventions: { fr: "Interventions", ar: "التدخلات" },
  adm_page_reglages: { fr: "Réglages", ar: "الإعدادات" },
  adm_page_compte: { fr: "Mon compte", ar: "حسابي" },
  adm_page_users: { fr: "Utilisateurs & accès", ar: "المستخدمون والصلاحيات" },

  adm_filter_all: { fr: "Toutes", ar: "الكل" },
  adm_filter_new: { fr: "Nouvelles", ar: "جديدة" },
  adm_search: { fr: "Rechercher…", ar: "بحث…" },
  adm_search_ph: {
    fr: "Réf., client, ville, téléphone…",
    ar: "مرجع، زبون، مدينة، هاتف…",
  },
  adm_filter_types_all: { fr: "Tous les types", ar: "كل الأنواع" },
  adm_src_all: { fr: "Origine — Toutes", ar: "المصدر — الكل" },
  adm_src_form_opt: { fr: "Formulaire devis", ar: "نموذج عرض السعر" },
  adm_src_cart_opt: { fr: "Demande de devis / articles", ar: "طلب عرض سعر / منتجات" },
  adm_src_contact_opt: { fr: "Contact", ar: "اتصال" },

  adm_interv_when: { fr: "Quand", ar: "الموعد" },
  adm_interv_subject: { fr: "Objet", ar: "الموضوع" },
  adm_interv_onsite: { fr: "Envoyé sur place", ar: "الفني في الميدان" },
  adm_interv_by: { fr: "Envoyé par", ar: "أُرسل بواسطة" },
  adm_interv_actions: { fr: "Actions", ar: "إجراءات" },
  adm_today: { fr: "Aujourd'hui", ar: "اليوم" },
};

export function adminT(lang: Lang, key: string, vars?: Record<string, string | number>) {
  let s = (A[key] && A[key][lang]) || A[key]?.fr || key;
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      s = s.split(`{${k}}`).join(String(v));
    }
  }
  return s;
}

/** Labels statut / type / canal (clés utils typeOf().k etc.). */
export function adminEntityLabels(lang: Lang): Record<string, string> {
  return {
    ty_install: adminT(lang, "adm_ty_install"),
    ty_prod: adminT(lang, "adm_ty_prod"),
    ty_maint: adminT(lang, "adm_ty_maint"),
    ty_fix: adminT(lang, "adm_ty_fix"),
    st_new: adminT(lang, "adm_st_new"),
    st_contacted: adminT(lang, "adm_st_contacted"),
    st_visit: adminT(lang, "adm_st_visit"),
    st_sent: adminT(lang, "adm_st_sent"),
    st_won: adminT(lang, "adm_st_won"),
    st_done: adminT(lang, "adm_st_done"),
    st_lost: adminT(lang, "adm_st_lost"),
    ch_phone: adminT(lang, "adm_ch_phone"),
    ch_wa: adminT(lang, "adm_ch_wa"),
    ch_mail: adminT(lang, "adm_ch_mail"),
    src_form: adminT(lang, "adm_src_form"),
    src_cart: adminT(lang, "adm_src_cart"),
    src_contact: adminT(lang, "adm_src_contact"),
    i_sched: adminT(lang, "adm_i_sched"),
    i_prog: adminT(lang, "adm_i_prog"),
    i_done: adminT(lang, "adm_i_done"),
  };
}

export function adminWeekdayShort(lang: Lang): string[] {
  return [
    adminT(lang, "adm_day_sun"),
    adminT(lang, "adm_day_mon"),
    adminT(lang, "adm_day_tue"),
    adminT(lang, "adm_day_wed"),
    adminT(lang, "adm_day_thu"),
    adminT(lang, "adm_day_fri"),
    adminT(lang, "adm_day_sat"),
  ];
}

export const ADMIN_NAV_KEYS: Record<string, string> = {
  dashboard: "adm_nav_dashboard",
  demandes: "adm_nav_demandes",
  catalogue: "adm_nav_catalogue",
  interventions: "adm_nav_interventions",
  reglages: "adm_nav_reglages",
};
