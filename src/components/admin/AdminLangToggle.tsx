"use client";

import { useAdminLang } from "./AdminLangProvider";

export function AdminLangToggle({ compact }: { compact?: boolean }) {
  const { lang, setLang, t } = useAdminLang();
  return (
    <div
      className="admin-lang-toggle"
      role="group"
      aria-label={t("adm_lang_toggle")}
      style={{ display: "flex", gap: 4, alignItems: "center" }}
    >
      {!compact ? <span className="xs muted">{t("adm_lang_toggle")}</span> : null}
      <button
        type="button"
        className={`btn btn-sm ${lang === "fr" ? "btn-pri" : "btn-out"}`}
        style={{ minWidth: 44, padding: "4px 8px" }}
        onClick={() => setLang("fr")}
        aria-pressed={lang === "fr"}
      >
        FR
      </button>
      <button
        type="button"
        className={`btn btn-sm ${lang === "ar" ? "btn-pri" : "btn-out"}`}
        style={{ minWidth: 44, padding: "4px 8px" }}
        onClick={() => setLang("ar")}
        aria-pressed={lang === "ar"}
      >
        ع
      </button>
    </div>
  );
}
