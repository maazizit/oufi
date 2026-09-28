"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { Request } from "@/lib/types";
import { chanOf, fmtD, statusOf, typeOf } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

const labels: Record<string, string> = {
  ty_install: "Installation",
  ty_prod: "Devis matériel",
  ty_maint: "Maintenance",
  ty_fix: "Dépannage",
  st_new: "Nouvelle",
  st_contacted: "Contactée",
  st_visit: "Visite planifiée",
  st_sent: "Devis envoyé",
  st_won: "Acceptée",
  st_done: "Terminée",
  st_lost: "Annulée",
  ch_phone: "Téléphone",
  ch_wa: "WhatsApp",
  ch_mail: "E-mail",
  src_form: "Formulaire",
  src_cart: "Panier",
  src_contact: "Contact",
};

export function DemandesTable({ list }: { list: Request[] }) {
  const router = useRouter();

  return (
    <div className="tw">
      <table className="demandes-table">
        <thead>
          <tr>
            <th>Réf.</th>
            <th>Client</th>
            <th>Type</th>
            <th>Service</th>
            <th>Ville</th>
            <th>Canal</th>
            <th>Origine</th>
            <th>Articles</th>
            <th>Reçue le</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {list.length ? (
            list.map((r) => {
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
                    <span style={{ display: "inline-flex", gap: 5, alignItems: "center" }}>
                      <Icon name={chanOf(r.chan).ic} size={15} />
                      {labels[chanOf(r.chan).k]}
                    </span>
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
                Aucune demande. Les nouvelles arrivent depuis le formulaire devis, le panier
                catalogue ou le contact.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
