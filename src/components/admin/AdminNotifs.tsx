"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { Notif } from "@/lib/types";
import { Icon } from "@/components/ui/Icon";
import { fmtDT } from "@/lib/utils";

export function AdminNotifs({
  initial,
}: {
  initial: Notif[];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [notifs, setNotifs] = useState(initial);
  const root = useRef<HTMLDivElement>(null);

  const unread = notifs.filter((n) => !n.read).length;

  useEffect(() => {
    setNotifs(initial);
  }, [initial]);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  async function markAllRead() {
    const res = await fetch("/api/admin/notifications", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });
    if (res.ok) {
      const data = await res.json();
      setNotifs(data.notifs || []);
      router.refresh();
    }
  }

  return (
    <div className="admin-notifs" ref={root}>
      <button
        type="button"
        className="admin-notifs-btn"
        aria-expanded={open}
        aria-label="Notifications"
        onClick={() => setOpen((v) => !v)}
      >
        <Icon name="bell" size={18} />
        {unread > 0 ? <span className="admin-notifs-b num">{unread}</span> : null}
      </button>
      {open ? (
        <div className="admin-notifs-panel card">
          <div className="admin-notifs-hd">
            <b>Notifications</b>
            {unread > 0 ? (
              <button type="button" className="btn btn-sm btn-out" onClick={markAllRead}>
                Tout marquer lu
              </button>
            ) : null}
          </div>
          {notifs.length === 0 ? (
            <p className="sm muted" style={{ padding: "12px 14px" }}>
              Aucune notification.
            </p>
          ) : (
            <ul className="admin-notifs-list">
              {notifs.slice(0, 12).map((n) => (
                <li key={n.id} data-unread={n.read ? "0" : "1"}>
                  <Link
                    href={n.ref ? `/admin/demandes/${encodeURIComponent(n.ref)}` : "/admin/demandes"}
                    onClick={() => setOpen(false)}
                  >
                    <span className="sm">{n.txt.fr}</span>
                    <span className="xs muted mono">
                      {n.ref ? `${n.ref} · ` : ""}
                      {fmtDT(n.at)}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className="admin-notifs-ft">
            <Link href="/admin/demandes" onClick={() => setOpen(false)}>
              Voir les demandes
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
