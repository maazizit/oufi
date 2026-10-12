"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Request } from "@/lib/types";
import { chanOf, fmtD, statusOf, typeOf } from "@/lib/utils";
import {
  listClientNotifs,
  listClientRequests,
  mergeRequests,
} from "@/lib/client/demo-client-store";
import { AdminContactChannel } from "@/components/admin/AdminContactChannel";
import { adminEntityLabels } from "@/lib/data/admin-i18n";
import { useAdminLang } from "./AdminLangProvider";

export function DemandesTable({ list }: { list: Request[] }) {
  const router = useRouter();
  const { lang, t } = useAdminLang();
  const labels = adminEntityLabels(lang);
  const [rows, setRows] = useState(list);

  useEffect(() => {
    const local = listClientRequests();
    setRows(mergeRequests(list, local));

    // Push browser-saved demandes into cookie/demo store so SSR refresh keeps them
    if (local.length) {
      void fetch("/api/admin/demo-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requests: local,
          notifs: listClientNotifs(),
        }),
      });
    }
  }, [list]);

  return (
    <div className="tw">
      <table className="demandes-table">
        <thead>
          <tr>
            <th>{t("adm_th_ref")}</th>
            <th>{t("adm_th_client")}</th>
            <th>{t("adm_th_type")}</th>
            <th>{t("adm_th_service")}</th>
            <th>{t("adm_th_city")}</th>
            <th>{t("adm_th_chan")}</th>
            <th>{t("adm_th_origin")}</th>
            <th>{t("adm_th_items")}</th>
            <th>{t("adm_th_received")}</th>
            <th>{t("adm_th_status")}</th>
          </tr>
        </thead>
        <tbody>
          {rows.length ? (
            rows.map((r) => {
              const href = `/admin/demandes/${encodeURIComponent(r.ref)}`;
              const itemCount = (r.items || []).reduce((a, l) => a + (l.q || 0), 0);
              return (
                <tr
                  key={r.ref}
                  onClick={() => router.push(href)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") router.push(href);
                  }}
                  tabIndex={0}
                >
                  <td className="mono">
                    <Link href={href} onClick={(e) => e.stopPropagation()}>
                      {r.ref}
                    </Link>
                  </td>
                  <td>
                    <b>{r.name}</b>
                    {r.company ? (
                      <>
                        <br />
                        <span className="xs muted">{r.company}</span>
                      </>
                    ) : null}
                  </td>
                  <td>
                    <span className="tag-soft">{labels[typeOf(r.type).k]}</span>
                  </td>
                  <td className="sm">{r.svc || "—"}</td>
                  <td>{r.city}</td>
                  <td>
                    <AdminContactChannel
                      chan={r.chan}
                      phone={r.phone}
                      label={labels[chanOf(r.chan).k]}
                      waMessage={
                        lang === "ar"
                          ? `مرحبا ${r.name}، بخصوص طلبكم ${r.ref} — AMANPLANET`
                          : `Bonjour ${r.name}, concernant votre demande ${r.ref} — AMANPLANET`
                      }
                    />
                  </td>
                  <td>
                    <span className="tag-soft">{labels[`src_${r.src}`] || r.src}</span>
                  </td>
                  <td className="num">{itemCount > 0 ? itemCount : "—"}</td>
                  <td className="num">{fmtD(r.created)}</td>
                  <td>
                    <span className={`pill ${statusOf(r.status).p}`}>
                      {labels[statusOf(r.status).k]}
                    </span>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={10} className="muted">
                {t("adm_demandes_empty")}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
