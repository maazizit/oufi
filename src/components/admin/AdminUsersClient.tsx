"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ADMIN_PAGE_KEYS,
  ADMIN_PAGE_LABELS,
  defaultManagerPermissions,
  type AdminPermissions,
} from "@/lib/admin/permissions";
import type { AdminUserRecord } from "@/lib/admin/users";

export function AdminUsersClient({ initial }: { initial: AdminUserRecord[] }) {
  const router = useRouter();
  const [users, setUsers] = useState(initial);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const managers = useMemo(
    () => users.filter((u) => u.role === "manager"),
    [users],
  );

  async function saveUser(user: AdminUserRecord) {
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
        }),
      });
      if (!res.ok) throw new Error("save_failed");
      router.refresh();
      setMsg("Accès enregistrés.");
    } catch {
      setMsg("Erreur lors de l'enregistrement.");
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
    const e = email.trim().toLowerCase();
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
        }),
      });
      if (!res.ok) throw new Error("create_failed");
      const data = await res.json();
      setUsers((list) => [...list, data.user as AdminUserRecord]);
      setEmail("");
      setMsg("Gestionnaire ajouté. Il doit se connecter avec ce compte Supabase.");
      router.refresh();
    } catch {
      setMsg("Impossible d'ajouter ce compte.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <p className="sm ink2" style={{ maxWidth: "62ch" }}>
        Cochez les pages accessibles pour chaque gestionnaire. Le compte doit déjà exister dans
        Supabase Auth (même e-mail). Les super admins ont toujours accès à tout.
      </p>

      <div className="card pad" style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <input
          className="input"
          style={{ flex: "1 1 220px" }}
          placeholder="email@exemple.com"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
        />
        <button type="button" className="btn btn-pri" disabled={busy} onClick={addManager}>
          Ajouter un gestionnaire
        </button>
      </div>

      {msg ? <p className="sm muted">{msg}</p> : null}

      {managers.length === 0 ? (
        <p className="muted">Aucun gestionnaire configuré (mode démo : gestionnaire@amanplanet.local).</p>
      ) : (
        managers.map((user) => (
          <div key={user.id} className="card pad">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                flexWrap: "wrap",
                marginBottom: 12,
              }}
            >
              <div>
                <b>{user.email}</b>
                <p className="xs muted">Gestionnaire</p>
              </div>
              <label className="sm" style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                <input
                  type="checkbox"
                  checked={user.active}
                  onChange={(ev) => {
                    const next = { ...user, active: ev.target.checked };
                    setUsers((list) => list.map((u) => (u.id === user.id ? next : u)));
                  }}
                />
                Compte actif
              </label>
            </div>
            <div className="admin-perm-grid">
              {ADMIN_PAGE_KEYS.map((key) => (
                <label key={key} className="admin-perm-item">
                  <input
                    type="checkbox"
                    checked={user.permissions[key]}
                    onChange={() => togglePerm(user, key)}
                  />
                  <span>{ADMIN_PAGE_LABELS[key]}</span>
                </label>
              ))}
            </div>
            <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
              <button
                type="button"
                className="btn btn-pri btn-sm"
                disabled={busy}
                onClick={() => saveUser(users.find((u) => u.id === user.id) || user)}
              >
                Enregistrer les accès
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
