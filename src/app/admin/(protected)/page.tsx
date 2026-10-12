import Link from "next/link";
import { ensureAdminPage } from "@/lib/admin/guard";
import { getAdminLang } from "@/lib/admin/lang";
import {
  adminEntityLabels,
  adminT,
  adminWeekdayShort,
} from "@/lib/data/admin-i18n";
import {
  getInterventions,
  getProducts,
  getRequests,
  getSettings,
} from "@/lib/data/repository";
import { TYPES } from "@/lib/data/constants";
import { chanOf, fmtD, fmtT, isToday, statusOf, typeOf } from "@/lib/utils";
import { AdminTopbar } from "@/components/admin/AdminTopbar";
import { AdminContactChannel } from "@/components/admin/AdminContactChannel";

export default async function AdminDashboardPage() {
  await ensureAdminPage("dashboard");
  const lang = await getAdminLang();
  const labels = adminEntityLabels(lang);
  const dn = adminWeekdayShort(lang);

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
  const byType = TYPES.map((ty) => ({
    k: ty.k,
    n: requests.filter((r) => r.type === ty.id).length,
  }));
  const mxT = Math.max(1, ...byType.map((x) => x.n));

  return (
    <>
      <AdminTopbar titleKey="adm_dash_title">
        <div className="who">
          <span className="av">IO</span>
          <span>
            <b>{settings.manager}</b>
            <br />
            <span className="xs muted">{adminT(lang, "adm_administrator")}</span>
          </span>
        </div>
      </AdminTopbar>
      <div className="content">
        <div className="kpis">
          <div className="kpi k-dan">
            <span className="l">{adminT(lang, "adm_kpi_new")}</span>
            <span className="v">{nw}</span>
            <span className="d">{adminT(lang, "adm_kpi_new_d")}</span>
          </div>
          <div className="kpi">
            <span className="l">{adminT(lang, "adm_kpi_sent")}</span>
            <span className="v">{sent}</span>
            <span className="d">{adminT(lang, "adm_kpi_sent_d")}</span>
          </div>
          <div className="kpi k-ok">
            <span className="l">{adminT(lang, "adm_kpi_interv")}</span>
            <span className="v">{today}</span>
            <span className="d">{adminT(lang, "adm_kpi_interv_d")}</span>
          </div>
          <div className="kpi k-warn">
            <span className="l">{adminT(lang, "adm_kpi_stock")}</span>
            <span className="v">{low}</span>
            <span className="d">{adminT(lang, "adm_kpi_stock_d")}</span>
          </div>
        </div>
        <div className="panes">
          <section className="pane">
            <header>
              <h3>{adminT(lang, "adm_recent_req")}</h3>
              <Link href="/admin/demandes" className="btn btn-sm btn-out">
                {adminT(lang, "adm_see_all")}
              </Link>
            </header>
            <div className="tw" style={{ border: 0, borderRadius: 0 }}>
              <table>
                <thead>
                  <tr>
                    <th>{adminT(lang, "adm_th_ref")}</th>
                    <th>{adminT(lang, "adm_th_client")}</th>
                    <th>{adminT(lang, "adm_th_type")}</th>
                    <th>{adminT(lang, "adm_th_chan")}</th>
                    <th>{adminT(lang, "adm_th_status")}</th>
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
                        <AdminContactChannel
                          chan={r.chan}
                          phone={r.phone}
                          label={labels[chanOf(r.chan).k]}
                          waMessage={
                            lang === "ar"
                              ? `مرحبا ${r.name}، بخصوص طلبكم ${r.ref} — AMANPLANET`
                              : `Bonjour ${r.name}, concernant votre demande ${r.ref} — AMANPLANET`
                          }
                          showPhone
                        />
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
                <h3>{adminT(lang, "adm_chart_7d")}</h3>
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
                <h3>{adminT(lang, "adm_by_type")}</h3>
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
                <h3>{adminT(lang, "adm_plan_today")}</h3>
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
                          {lang === "ar" ? i.obj.ar || i.obj.fr : i.obj.fr}
                        </div>
                        <div className="xs muted">{i.client}</div>
                      </div>
                      <span className={`pill ${i.state === "done" ? "pill-ok" : i.state === "prog" ? "pill-warn" : "pill-new"}`}>
                        {labels[`i_${i.state}`]}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="muted sm">{adminT(lang, "adm_no_results")}</p>
                )}
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
