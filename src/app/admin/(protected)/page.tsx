import Link from "next/link";
import {
  getInterventions,
  getProducts,
  getRequests,
  getSettings,
} from "@/lib/data/repository";
import { TYPES } from "@/lib/data/constants";
import { chanOf, fmtD, fmtT, isToday, statusOf, typeOf } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

export default async function AdminDashboardPage() {
  const [requests, interv, products, settings] = await Promise.all([
    getRequests(),
    getInterventions(),
    getProducts(false),
    getSettings(),
  ]);

  const nw = requests.filter((r) => r.status === "new").length;
  const sent = requests.filter((r) => r.status === "sent").length;
  const today = interv.filter((i) => isToday(i.when) && i.state !== "done").length;
  const low = products.filter((p) => p.active && p.stock <= 5).length;
  const recent = requests.slice(0, 6);
  const planning = interv.filter((i) => isToday(i.when)).sort((a, b) => a.when.localeCompare(b.when));

  const days: Date[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    days.push(d);
  }
  const counts = days.map((d) => {
    const k = d.toISOString().slice(0, 10);
    return requests.filter((r) => String(r.created).slice(0, 10) === k).length;
  });
  const mx = Math.max(1, ...counts);
  const dn = ["dim", "lun", "mar", "mer", "jeu", "ven", "sam"];
  const byType = TYPES.map((ty) => ({
    k: ty.k,
    n: requests.filter((r) => r.type === ty.id).length,
  }));
  const mxT = Math.max(1, ...byType.map((x) => x.n));

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
    i_sched: "Planifiée",
    i_prog: "En cours",
    i_done: "Terminée",
  };

  return (
    <>
      <div className="topbar">
        <h2>Tableau de bord</h2>
        <span className="sp" />
        <div className="who">
          <span className="av">IO</span>
          <span>
            <b>{settings.manager}</b>
            <br />
            <span className="xs muted">Administrateur</span>
          </span>
        </div>
      </div>
      <div className="content">
        <div className="kpis">
          <div className="kpi k-dan">
            <span className="l">Nouvelles demandes</span>
            <span className="v">{nw}</span>
            <span className="d">à traiter aujourd&apos;hui</span>
          </div>
          <div className="kpi">
            <span className="l">Devis en attente</span>
            <span className="v">{sent}</span>
            <span className="d">envoyés, sans réponse</span>
          </div>
          <div className="kpi k-ok">
            <span className="l">Interventions du jour</span>
            <span className="v">{today}</span>
            <span className="d">planifiées</span>
          </div>
          <div className="kpi k-warn">
            <span className="l">Stock bas</span>
            <span className="v">{low}</span>
            <span className="d">articles à réapprovisionner</span>
          </div>
        </div>
        <div className="panes">
          <section className="pane">
            <header>
              <h3>Demandes récentes</h3>
              <Link href="/admin/demandes" className="btn btn-sm btn-out">
                Tout voir
              </Link>
            </header>
            <div className="tw" style={{ border: 0, borderRadius: 0 }}>
              <table>
                <thead>
                  <tr>
                    <th>Réf.</th>
                    <th>Client</th>
                    <th>Type</th>
                    <th>Canal</th>
                    <th>Statut</th>
                  </tr>
                </thead>
                <tbody>
                  {recent.map((r) => (
                    <tr key={r.ref} data-click>
                      <td className="mono">
                        <Link href={`/admin/demandes/${r.ref}`}>{r.ref}</Link>
                      </td>
                      <td>
                        <b>{r.name}</b>
                        <br />
                        <span className="xs muted">
                          {r.city} · {fmtD(r.created)}
                        </span>
                      </td>
                      <td>{labels[typeOf(r.type).k]}</td>
                      <td>
                        <span style={{ display: "inline-flex", gap: 5, alignItems: "center" }}>
                          <Icon name={chanOf(r.chan).ic} size={15} />
                          {labels[chanOf(r.chan).k]}
                        </span>
                      </td>
                      <td>
                        <span className={`pill ${statusOf(r.status).p}`}>
                          {labels[statusOf(r.status).k]}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <section className="pane">
              <header>
                <h3>Demandes des 7 derniers jours</h3>
              </header>
              <div className="bd">
                <div className="bars">
                  {counts.map((c, i) => (
                    <span key={i} className="b">
                      <b className="num">{c}</b>
                      <i style={{ height: Math.round(6 + (c / mx) * 94) }} />
                      <em>{dn[days[i].getDay()]}</em>
                    </span>
                  ))}
                </div>
              </div>
            </section>
            <section className="pane">
              <header>
                <h3>Répartition par type</h3>
              </header>
              <div className="bd" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {byType.map((x) => (
                  <div key={x.k}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
                      <span>{labels[x.k]}</span>
                      <b className="num">{x.n}</b>
                    </div>
                    <div style={{ height: 8, background: "var(--surface-2)", borderRadius: 4, overflow: "hidden" }}>
                      <i
                        style={{
                          display: "block",
                          height: "100%",
                          width: `${Math.round((x.n / mxT) * 100)}%`,
                          background: "var(--navy)",
                          borderRadius: 4,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>
            <section className="pane">
              <header>
                <h3>Planning du jour</h3>
              </header>
              <div className="bd" style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {planning.length ? (
                  planning.map((i) => (
                    <div key={i.id} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <b className="mono sm" style={{ color: "var(--blue-ink)", minWidth: 44 }}>
                        {fmtT(i.when)}
                      </b>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="sm" style={{ fontWeight: 600 }}>
                          {i.obj.fr}
                        </div>
                        <div className="xs muted">{i.client}</div>
                      </div>
                      <span className={`pill ${i.state === "done" ? "pill-ok" : i.state === "prog" ? "pill-warn" : "pill-new"}`}>
                        {labels[`i_${i.state}`]}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="muted sm">Aucun résultat.</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
