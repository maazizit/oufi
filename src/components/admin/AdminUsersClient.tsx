"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ADMIN_PAGE_KEYS,
  ADMIN_PAGE_LABELS,
  defaultManagerPermissions,
  type AdminPermissions,
} from "@/lib/admin/permissions";
import type { AdminUserRecord } from "@/lib/admin/users";
import { useAdminLang } from "./AdminLangProvider";

const PAGE_SIZE = 10;

export function AdminUsersClient({ initial }: { initial: AdminUserRecord[] }) {
  const router = useRouter();
  const { t } = useAdminLang();
  const [users, setUsers] = useState(initial);
  const [q, setQ] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "super_admin" | "manager">("all");
  const [page, setPage] = useState(1);
  const [openId, setOpenId] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const filtered = useMemo(() => {
    let rows = [...users];
    if (roleFilter !== "all") rows = rows.filter((u) => u.role === roleFilter);
    if (q) {
      const qq = q.toLowerCase();
      rows = rows.filter((u) => u.email.toLowerCase().includes(qq));
    }
    return rows.sort((a, b) => a.email.localeCompare(b.email));
  }, [users, q, roleFilter]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const pageRows = useMemo(() => {
    const start = (Math.min(page, pageCount) - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page, pageCount]);

  useEffect(() => {
    setPage(1);
  }, [q, roleFilter]);

  const openUser = users.find((u) => u.id === openId) || null;

  async function saveUser(user: AdminUserRecord, pw?: string) {
    setBusy(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: user.id,
          email: user.email,
          active: user.active,
          permissions: user.permissions,
          ...(pw ? { password: pw } : {}),
        }),
      });
      if (!res.ok) throw new Error("save_failed");
      const data = await res.json();
      if (data.user) {
        setUsers((list) => list.map((u) => (u.id === user.id ? data.user : u)));
      }
      setPassword("");
      setMsg(t("adm_users_saved"));
      router.refresh();
    } catch {
      setMsg(t("adm_users_err"));
    } finally {
      setBusy(false);
    }
  }

  function togglePerm(user: AdminUserRecord, key: keyof AdminPermissions) {
    const next = {
      ...user,
      permissions: { ...user.permissions, [key]: !user.permissions[key] },
    };
    setUsers((list) => list.map((u) => (u.id === user.id ? next : u)));
  }

  async function addManager() {
    const e = newEmail.trim().toLowerCase();
    if (!e) return;
    setBusy(true);
    setMsg("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: e,
          role: "manager",
          permissions: defaultManagerPermissions(),
          ...(newPassword.trim() ? { password: newPassword.trim() } : {}),
        }),
      });
      if (!res.ok) throw new Error("create_failed");
      const data = await res.json();
      setUsers((list) => [...list, data.user as AdminUserRecord]);
      setNewEmail("");
      setNewPassword("");
      setMsg(t("adm_users_saved"));
      router.refresh();
    } catch {
      setMsg(t("adm_users_err"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <p className="sm ink2" style={{ maxWidth: "72ch" }}>{t("adm_users_intro")}</p>

      <div className="toolbar" style={{ flexWrap: "wrap", gap: 8 }}>
        <input
          className="input search"
          style={{ flex: "1 1 200px" }}
          placeholder={t("adm_users_search")}
          value={q}
          onChange={(ev) => setQ(ev.target.value)}
        />
        <select
          className="select"
          style={{ width: "auto" }}
          value={roleFilter}
          onChange={(ev) => setRoleFilter(ev.target.value as "all" | "super_admin" | "manager")}
        >
          <option value="all">{t("adm_users_role_all")}</option>
          <option value="super_admin">{t("adm_role_super")}</option>
          <option value="manager">{t("adm_role_manager")}</option>
        </select>
      </div>

      <div className="card pad" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          className="input"
          style={{ flex: "1 1 200px" }}
          placeholder="email@exemple.com"
          value={newEmail}
          onChange={(ev) => setNewEmail(ev.target.value)}
        />
        <input
          className="input"
          style={{ flex: "1 1 160px" }}
          type="password"
          placeholder={t("adm_users_password")}
          value={newPassword}
          onChange={(ev) => setNewPassword(ev.target.value)}
        />
        <button type="button" className="btn btn-pri" disabled={busy} onClick={addManager}>
          {t("adm_users_add")}
        </button>
      </div>

      {msg ? <p className="sm muted">{msg}</p> : null}

      <div className="tw admin-users-table">
        <table>
          <thead>
            <tr>
              <th>{t("adm_users_col_email")}</th>
              <th>{t("adm_users_col_role")}</th>
              <th>{t("adm_users_col_status")}</th>
              <th>{t("adm_col_actions")}</th>
            </tr>
          </thead>
          <tbody>
            {pageRows.length === 0 ? (
              <tr>
                <td colSpan={4} className="muted">{t("adm_users_none")}</td>
              </tr>
            ) : (
              pageRows.map((user) => (
                <tr key={user.id} data-open={openId === user.id ? "1" : "0"}>
                  <td className="mono sm">{user.email}</td>
                  <td>
                    <span className={`pill ${user.role === "super_admin" ? "pill-ok" : "pill-new"}`}>
                      {user.role === "super_admin" ? t("adm_role_super") : t("adm_role_manager")}
                    </span>
                  </td>
                  <td>{user.active ? t("adm_yes") : t("adm_no")}</td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-sm btn-out"
                      onClick={() => {
                        setOpenId(openId === user.id ? null : user.id);
                        setPassword("");
                      }}
                    >
                      {openId === user.id ? t("adm_users_collapse") : t("adm_users_expand")}
                    </button>
                  </td>
                </tr>
              ))
            )}
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

      {openUser && openUser.role === "manager" ? (
        <div className="card pad">
          <h3 className="sm" style={{ marginBottom: 12 }}>{openUser.email}</h3>
          <label className="sm" style={{ display: "inline-flex", gap: 8, alignItems: "center", marginBottom: 12 }}>
            <input
              type="checkbox"
              checked={openUser.active}
              onChange={(ev) => {
                const next = { ...openUser, active: ev.target.checked };
                setUsers((list) => list.map((u) => (u.id === openUser.id ? next : u)));
              }}
            />
            {t("adm_users_active")}
          </label>
          <div className="admin-perm-grid">
            {ADMIN_PAGE_KEYS.map((key) => (
              <label key={key} className="admin-perm-item">
                <input
                  type="checkbox"
                  checked={openUser.permissions[key]}
                  onChange={() => togglePerm(openUser, key)}
                />
                <span>{ADMIN_PAGE_LABELS[key]}</span>
              </label>
            ))}
          </div>
          <div className="field" style={{ marginTop: 14 }}>
            <label>{t("adm_users_password")}</label>
            <input
              className="input"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <p className="xs muted">{t("adm_users_password_hint")}</p>
          </div>
          <button
            type="button"
            className="btn btn-pri"
            disabled={busy}
            onClick={() =>
              saveUser(users.find((u) => u.id === openUser.id) || openUser, password || undefined)
            }
          >
            {t("adm_users_save")}
          </button>
        </div>
      ) : null}

      {openUser && openUser.role === "super_admin" ? (
        <div className="card pad">
          <h3 className="sm" style={{ marginBottom: 12 }}>{openUser.email}</h3>
          <p className="sm muted" style={{ marginBottom: 12 }}>
            {t("adm_role_super")} — accès complet.
          </p>
          <div className="field">
            <label>{t("adm_users_password")}</label>
            <input
              className="input"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
            <p className="xs muted">{t("adm_users_password_hint")}</p>
          </div>
          <button
            type="button"
            className="btn btn-pri"
            disabled={busy || !password}
            onClick={() => saveUser(openUser, password)}
          >
            {t("adm_users_save")}
          </button>
        </div>
      ) : null}
    </div>
  );
}
