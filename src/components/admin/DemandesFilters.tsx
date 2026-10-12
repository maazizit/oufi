"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAdminLang } from "./AdminLangProvider";

export function DemandesFilters({
  status,
  src,
  type,
  q,
  counts,
  typeCounts,
}: {
  status: string;
  src: string;
  type: string;
  q: string;
  counts: Record<string, number>;
  typeCounts: Record<string, number>;
}) {
  const router = useRouter();
  const { t } = useAdminLang();
  const [query, setQuery] = useState(q);

  const STATUSES = [
    { id: "", label: t("adm_filter_all") },
    { id: "new", label: t("adm_st_new") },
    { id: "contacted", label: t("adm_st_contacted") },
    { id: "visit", label: t("adm_st_visit") },
    { id: "sent", label: t("adm_st_sent") },
    { id: "won", label: t("adm_st_won") },
    { id: "done", label: t("adm_st_done") },
    { id: "lost", label: t("adm_st_lost") },
  ];

  const TYPES = [
    { id: "", label: t("adm_filter_types_all") },
    { id: "install", label: t("adm_ty_install_short") },
    { id: "prod", label: t("adm_ty_prod") },
    { id: "maint", label: t("adm_ty_maint") },
    { id: "fix", label: t("adm_ty_fix") },
  ];

  function push(next: { status?: string; src?: string; type?: string; q?: string }) {
    const p = new URLSearchParams();
    const s = next.status ?? status;
    const sr = next.src ?? src;
    const ty = next.type ?? type;
    const qq = next.q ?? query;
    if (s) p.set("status", s);
    if (sr) p.set("src", sr);
    if (ty) p.set("type", ty);
    if (qq) p.set("q", qq);
    router.push(`/admin/demandes?${p.toString()}`);
  }

  return (
    <>
      <div className="toolbar">
        <input
          className="input search"
          placeholder={t("adm_search_ph")}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && push({ q: query })}
        />
        <select
          className="select"
          style={{ width: "auto" }}
          value={src}
          onChange={(e) => push({ src: e.target.value })}
        >
          <option value="">{t("adm_src_all")}</option>
          <option value="form">{t("adm_src_form_opt")}</option>
          <option value="cart">{t("adm_src_cart_opt")}</option>
          <option value="contact">{t("adm_src_contact_opt")}</option>
        </select>
      </div>
      <div className="admin-type-filters">
        {TYPES.map((ty) => (
          <button
            key={ty.id || "all"}
            type="button"
            className={`btn btn-sm ${type === ty.id ? "btn-pri" : "btn-out"}`}
            onClick={() => push({ type: ty.id })}
          >
            {ty.label}
            <span className="num" style={{ marginInlineStart: 6 }}>
              {ty.id ? typeCounts[ty.id] ?? 0 : typeCounts.all}
            </span>
          </button>
        ))}
      </div>
      <div className="tabs">
        {STATUSES.map((s) => (
          <button
            key={s.id || "all"}
            type="button"
            className={status === s.id ? "on" : ""}
            onClick={() => push({ status: s.id })}
          >
            {s.label}
            <span className="num">{counts[s.id] ?? 0}</span>
          </button>
        ))}
      </div>
    </>
  );
}
