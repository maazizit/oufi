"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Product, Request, Settings, TeamMember } from "@/lib/types";
import { LOCALS } from "@/lib/data/constants";
import { chanOf, fmtDT, statusOf, typeOf } from "@/lib/utils";
import { money as moneyI18n } from "@/lib/data/i18n";
import { getClientRequest, listClientNotifs, listClientRequests } from "@/lib/client/demo-client-store";
import { RequestActions } from "@/components/admin/RequestActions";
import { Icon } from "@/components/ui/Icon";

const labels: Record<string, string> = {
  ty_install: "Nouvelle installation",
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
  pl_in: "Intérieur",
  pl_out: "Extérieur",
  pl_both: "Les deux",
  yes: "Oui",
  no: "Non",
  dunno: "Je ne sais pas",
  dl_urgent: "Urgent (48 h)",
  dl_week: "Cette semaine",
  dl_month: "Ce mois-ci",
  dl_plan: "Je prépare un budget",
  sl_am: "Matin",
  sl_pm: "Après-midi",
  sl_any: "Peu importe",
  src_form: "Formulaire",
  src_cart: "Panier",
  src_contact: "Contact",
};

export function DemandeDetailClient({
  refId,
  initial,
  products,
  team,
  settings,
}: {
  refId: string;
  initial: Request | null;
  products: Product[];
  team: TeamMember[];
  settings: Settings;
}) {
  const [request, setRequest] = useState<Request | null>(initial);
  const [ready, setReady] = useState(Boolean(initial));

  useEffect(() => {
    if (initial) {
      setRequest(initial);
      setReady(true);
      return;
    }
    const local = getClientRequest(refId);
    if (local) {
      setRequest(local);
      void fetch("/api/admin/demo-import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          requests: listClientRequests(),
          notifs: listClientNotifs(),
        }),
      });
    }
    setReady(true);
  }, [initial, refId]);

  const items = useMemo(() => {
    if (!request) return [];
    return (request.items || [])
      .map((l) => {
        const p = products.find((x) => x.id === l.id);
        return p ? { ...l, name: p.name.fr, price: p.price } : null;
      })
      .filter(Boolean) as { id: string; q: number; inst: boolean; name: string; price: number }[];
  }, [request, products]);

  const total = items.reduce((a, l) => a + l.price * l.q, 0);
  const loc = LOCALS.find((l) => l.id === request?.local);

  if (!ready) {
    return (
      <div className="content">
        <p className="muted">Chargement…</p>
      </div>
    );
  }

  if (!request) {
    return (
      <>
        <div className="topbar">
          <h2>
            <Link href="/admin/demandes" className="muted" style={{ marginInlineEnd: 8 }}>
              ←
            </Link>
            Demande introuvable
          </h2>
        </div>
        <div className="content">
          <div className="card pad">
            <p>
              Aucune demande <b className="mono">{refId}</b> côté serveur.
            </p>
            <p className="sm muted" style={{ marginTop: 8 }}>
              En mode démo sans base de données, les demandes sont gardées dans ce navigateur.
              Rouvrez admin dans le même navigateur que celui où le devis a été envoyé.
            </p>
            <Link href="/admin/demandes" className="btn btn-out" style={{ marginTop: 12 }}>
              Retour aux demandes
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="topbar">
        <h2>
          <Link href="/admin/demandes" className="muted" style={{ marginInlineEnd: 8 }}>
            ←
          </Link>
          Demande {request.ref}
        </h2>
        <span className={`pill ${statusOf(request.status).p}`}>
          {labels[statusOf(request.status).k]}
        </span>
      </div>
      <div className="content">
        <div className="card pad" style={{ display: "flex", flexDirection: "column", gap: 12, borderColor: "var(--blue)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
            <div style={{ flex: 1, minWidth: 150 }}>
              <b style={{ fontSize: 16 }}>{request.name}</b>
              {request.company ? (
                <>
                  <br />
                  <span className="sm muted">{request.company}</span>
                </>
              ) : null}
            </div>
            <span className="pill pill-new">
              Contact préféré : {labels[chanOf(request.chan).k]}
            </span>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {request.phone ? (
              <span className="btn btn-sm btn-out" style={{ cursor: "default" }}>
                <Icon name="phone" size={15} /> {request.phone}
              </span>
            ) : null}
            {request.email ? (
              <span className="btn btn-sm btn-out" style={{ cursor: "default" }}>
                <Icon name="mail" size={15} /> {request.email}
              </span>
            ) : null}
            <span className="tag-soft" style={{ alignSelf: "center" }}>
              Créneau : {labels[`sl_${request.slot}`] || request.slot}
            </span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: 14 }}>
          <div className="card pad">
            <h4 className="lab" style={{ marginBottom: 9 }}>
              Le site
            </h4>
            <dl className="kv">
              <dt>Ville</dt>
              <dd>{request.city}</dd>
              <dt>Adresse</dt>
              <dd>{request.addr || "—"}</dd>
              <dt>Type de local</dt>
              <dd>{loc?.fr || "—"}</dd>
              {request.surface ? (
                <>
                  <dt>Surface</dt>
                  <dd>{request.surface} m²</dd>
                </>
              ) : null}
              {request.cams ? (
                <>
                  <dt>Caméras</dt>
                  <dd>{request.cams}</dd>
                </>
              ) : null}
              <dt>Frais déplacement</dt>
              <dd className="num">
                <b>{request.fee != null ? moneyI18n("fr", request.fee) : "Sur devis"}</b>
              </dd>
            </dl>
          </div>
          <div className="card pad">
            <h4 className="lab" style={{ marginBottom: 9 }}>
              Le besoin
            </h4>
            <dl className="kv">
              <dt>Type</dt>
              <dd>{labels[typeOf(request.type).k]}</dd>
              <dt>Service</dt>
              <dd>{request.svc || "—"}</dd>
              {request.svcother ? (
                <>
                  <dt>Précision</dt>
                  <dd>{request.svcother}</dd>
                </>
              ) : null}
              <dt>Origine</dt>
              <dd>{labels[`src_${request.src}`]}</dd>
            </dl>
            {request.desc ? (
              <p className="sm ink2" style={{ marginTop: 10, paddingTop: 10, borderTop: "1px dashed var(--line)" }}>
                « {request.desc} »
              </p>
            ) : null}
          </div>
        </div>

        {items.length ? (
          <div className="card pad">
            <h4 className="lab" style={{ marginBottom: 9 }}>
              Panier du client
            </h4>
            {items.map((l) => (
              <div key={l.id} style={{ display: "flex", gap: 9, alignItems: "center", fontSize: 13, marginBottom: 6 }}>
                <span className="mono muted">×{l.q}</span>
                <span style={{ flex: 1 }}>
                  {l.name}
                  {l.inst ? <span className="tag-soft"> Installation</span> : null}
                </span>
                <span className="num mono">{moneyI18n("fr", l.price * l.q)}</span>
              </div>
            ))}
            <hr className="rule" style={{ margin: "10px 0", border: 0, height: 1, background: "var(--line)" }} />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <b className="sm">Total indicatif</b>
              <b className="num">{moneyI18n("fr", total)}</b>
            </div>
          </div>
        ) : null}

        <RequestActions
          request={request}
          team={team}
          settings={settings}
          lines={items.map((l) => ({
            name: l.name,
            q: l.q,
            price: l.price,
            inst: l.inst,
          }))}
        />

        <div className="card pad">
          <h4 className="lab" style={{ marginBottom: 10 }}>
            Historique
          </h4>
          <ul className="tl">
            {(request.tl || [])
              .slice()
              .reverse()
              .map((e, i) => (
                <li key={i}>
                  <span className="dot" />
                  <span>
                    <span className="t">
                      {e.k === "created" ? "Nouvelle" : labels[statusOf(e.v || "new").k]}
                    </span>
                    <span className="m">{fmtDT(e.at)}</span>
                  </span>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
