"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Intervention, TeamMember } from "@/lib/types";
import { fmtD, fmtT, isToday } from "@/lib/utils";
import { adminEntityLabels } from "@/lib/data/admin-i18n";
import { useAdminLang } from "./AdminLangProvider";

function toDatetimeLocal(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromDatetimeLocal(v: string) {
  if (!v) return new Date().toISOString();
  return new Date(v).toISOString();
}

export function AdminInterventionsClient({
  interventions,
  team,
  managerName,
}: {
  interventions: Intervention[];
  team: TeamMember[];
  managerName: string;
}) {
  const router = useRouter();
  const { t, lang } = useAdminLang();
  const labels = adminEntityLabels(lang);
  const [q, setQ] = useState("");
  const [stateFilter, setStateFilter] = useState<"all" | "sched" | "prog" | "done">("all");
  const [page, setPage] = useState(1);
  const [edit, setEdit] = useState<Intervention | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const pageSize = 12;

  const [form, setForm] = useState({
    when: "",
    client: "",
    city: "",
    obj_fr: "",
    obj_ar: "",
    tech: "",
    by: "",
    state: "sched" as Intervention["state"],
  });

  const techName = (id: string) => team.find((x) => x.id === id)?.name || id || "—";

  const filtered = useMemo(() => {
    let rows = [...interventions];
    if (stateFilter !== "all") rows = rows.filter((i) => i.state === stateFilter);
    if (q) {
      const qq = q.toLowerCase();
      rows = rows.filter(
        (i) =>
          i.id.toLowerCase().includes(qq) ||
          i.ref.toLowerCase().includes(qq) ||
          i.client.toLowerCase().includes(qq) ||
          i.city.toLowerCase().includes(qq) ||
          i.obj.fr.toLowerCase().includes(qq),
      );
    }
    return rows.sort((a, b) => b.when.localeCompare(a.when));
  }, [interventions, q, stateFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const rows = useMemo(() => {
    const start = (Math.min(page, pageCount) - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, page, pageCount]);

  useEffect(() => {
    setPage(1);
  }, [q, stateFilter]);

  function openEdit(i: Intervention) {
    setEdit(i);
    setForm({
      when: toDatetimeLocal(i.when),
      client: i.client,
      city: i.city,
      obj_fr: i.obj.fr,
      obj_ar: i.obj.ar,
      tech: i.tech,
      by: i.by,
      state: i.state,
    });
    setMsg("");
  }

  async function saveEdit() {
    if (!edit) return;
    setBusy(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/interventions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: edit.id,
          when: fromDatetimeLocal(form.when),
          client: form.client,
          city: form.city,
          obj_fr: form.obj_fr,
          obj_ar: form.obj_ar,
          tech: form.tech,
          by: form.by,
          state: form.state,
        }),
      });
      if (!res.ok) throw new Error("fail");
      setEdit(null);
      setMsg(t("adm_interv_saved"));
      router.refresh();
    } catch {
      setMsg(t("adm_interv_err"));
    } finally {
      setBusy(false);
    }
  }

  async function markDone(id: string) {
    setBusy(true);
    try {
      await fetch("/api/admin/interventions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, state: "done" }),
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    if (!confirm(t("adm_interv_delete_confirm"))) return;
    setBusy(true);
    try {
      const res = await fetch("/api/admin/interventions", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error("fail");
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <div className="toolbar" style={{ flexWrap: "wrap", gap: 8 }}>
        <input
          className="input search"
          style={{ flex: "1 1 200px" }}
          placeholder={t("adm_search_ph")}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
        <select
          className="select"
          style={{ width: "auto" }}
          value={stateFilter}
          onChange={(e) => setStateFilter(e.target.value as typeof stateFilter)}
        >
          <option value="all">{t("adm_interv_state_all")}</option>
          <option value="sched">{labels.i_sched}</option>
          <option value="prog">{labels.i_prog}</option>
          <option value="done">{labels.i_done}</option>
        </select>
      </div>
      <p className="xs muted" style={{ margin: "0 0 8px" }}>
        {t("adm_results", { n: filtered.length })}
      </p>
      {msg ? <p className="sm muted">{msg}</p> : null}

      <div className="tw">
        <table>
          <thead>
            <tr>
              <th>{t("adm_th_ref")}</th>
              <th>{t("adm_interv_when")}</th>
              <th>{t("adm_interv_subject")}</th>
              <th>{t("adm_th_client")}</th>
              <th>{t("adm_interv_onsite")}</th>
              <th>{t("adm_interv_by")}</th>
              <th>{t("adm_th_status")}</th>
              <th>{t("adm_interv_actions")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((i) => (
              <tr key={i.id}>
                <td className="mono">
                  {i.id}
                  <br />
                  <span className="xs muted">{i.ref}</span>
                </td>
                <td className="num">
                  <b>{isToday(i.when) ? t("adm_today") : fmtD(i.when)}</b>
                  <br />
                  {fmtT(i.when)}
                </td>
                <td>{lang === "ar" ? i.obj.ar || i.obj.fr : i.obj.fr}</td>
                <td>
                  {i.client}
                  <br />
                  <span className="xs muted">{i.city}</span>
                </td>
                <td>
                  <b>{techName(i.tech)}</b>
                </td>
                <td className="sm">{techName(i.by) || managerName}</td>
                <td>
                  <span
                    className={`pill ${
                      i.state === "done" ? "pill-ok" : i.state === "prog" ? "pill-warn" : "pill-new"
                    }`}
                  >
                    {labels[`i_${i.state}`]}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    <button
                      type="button"
                      className="btn btn-sm btn-out"
                      disabled={busy}
                      onClick={() => openEdit(i)}
                    >
                      {t("adm_interv_edit")}
                    </button>
                    {i.state !== "done" ? (
                      <button
                        type="button"
                        className="btn btn-sm btn-pri"
                        disabled={busy}
                        onClick={() => markDone(i.id)}
                      >
                        {t("adm_interv_mark_done")}
                      </button>
                    ) : null}
                    <button
                      type="button"
                      className="btn btn-sm btn-dan"
                      disabled={busy}
                      onClick={() => remove(i.id)}
                    >
                      {t("adm_interv_delete")}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {pageCount > 1 ? (
        <div className="admin-pager">
          <button
            type="button"
            className="btn btn-sm btn-out"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            ←
          </button>
          <span className="sm muted">
            {t("adm_pager", { page: Math.min(page, pageCount), total: pageCount })}
          </span>
          <button
            type="button"
            className="btn btn-sm btn-out"
            disabled={page >= pageCount}
            onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
          >
            →
          </button>
        </div>
      ) : null}

      {edit ? (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(8, 20, 35, 0.45)",
            zIndex: 60,
            display: "grid",
            placeItems: "center",
            padding: 16,
          }}
          onClick={() => setEdit(null)}
        >
          <div
            className="card"
            style={{ width: "100%", maxWidth: 520, maxHeight: "90vh", overflow: "auto" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--line)" }}>
              <h3>{t("adm_interv_edit_title")} — {edit.id}</h3>
              <p className="xs muted">{t("adm_interv_request_ref")}: {edit.ref}</p>
            </div>
            <div style={{ padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              <div className="field">
                <label>{t("adm_interv_when")}</label>
                <input
                  className="input"
                  type="datetime-local"
                  value={form.when}
                  onChange={(e) => setForm({ ...form, when: e.target.value })}
                />
              </div>
              <div className="grid2">
                <div className="field">
                  <label>{t("adm_th_client")}</label>
                  <input
                    className="input"
                    value={form.client}
                    onChange={(e) => setForm({ ...form, client: e.target.value })}
                  />
                </div>
                <div className="field">
                  <label>{t("adm_th_city")}</label>
                  <input
                    className="input"
                    value={form.city}
                    onChange={(e) => setForm({ ...form, city: e.target.value })}
                  />
                </div>
              </div>
              <div className="field">
                <label>{t("adm_interv_obj_fr")}</label>
                <input
                  className="input"
                  value={form.obj_fr}
                  onChange={(e) => setForm({ ...form, obj_fr: e.target.value })}
                />
              </div>
              <div className="field">
                <label>{t("adm_interv_obj_ar")}</label>
                <input
                  className="input"
                  value={form.obj_ar}
                  onChange={(e) => setForm({ ...form, obj_ar: e.target.value })}
                />
              </div>
              <div className="grid2">
                <div className="field">
                  <label>{t("adm_interv_onsite")}</label>
                  <select
                    className="select"
                    value={form.tech}
                    onChange={(e) => setForm({ ...form, tech: e.target.value })}
                  >
                    {team.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
                <div className="field">
                  <label>{t("adm_interv_by")}</label>
                  <select
                    className="select"
                    value={form.by}
                    onChange={(e) => setForm({ ...form, by: e.target.value })}
                  >
                    {team.map((m) => (
                      <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="field">
                <label>{t("adm_interv_state")}</label>
                <select
                  className="select"
                  value={form.state}
                  onChange={(e) =>
                    setForm({ ...form, state: e.target.value as Intervention["state"] })
                  }
                >
                  <option value="sched">{labels.i_sched}</option>
                  <option value="prog">{labels.i_prog}</option>
                  <option value="done">{labels.i_done}</option>
                </select>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button type="button" className="btn btn-out" onClick={() => setEdit(null)}>
                  {t("adm_users_collapse")}
                </button>
                <button
                  type="button"
                  className="btn btn-pri"
                  style={{ flex: 1 }}
                  disabled={busy}
                  onClick={saveEdit}
                >
                  {t("adm_users_save")}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
