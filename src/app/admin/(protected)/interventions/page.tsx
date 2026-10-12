import { ensureAdminPage } from "@/lib/admin/guard";
import { getAdminLang } from "@/lib/admin/lang";
import { adminEntityLabels, adminT } from "@/lib/data/admin-i18n";
import { getInterventions, getSettings } from "@/lib/data/repository";
import { fmtD, fmtT, isToday } from "@/lib/utils";
import { IntervActions } from "@/components/admin/IntervActions";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

export default async function InterventionsPage() {
  await ensureAdminPage("interventions");
  const lang = await getAdminLang();
  const labels = adminEntityLabels(lang);
  const [list, settings] = await Promise.all([getInterventions(), getSettings()]);
  const techName = (id: string) => settings.team.find((t) => t.id === id)?.name || id || "—";

  return (
    <>
      <AdminTopbar titleKey="adm_page_interventions" />
      <div className="content">
        <div className="tw">
          <table>
            <thead>
              <tr>
                <th>{adminT(lang, "adm_th_ref")}</th>
                <th>{adminT(lang, "adm_interv_when")}</th>
                <th>{adminT(lang, "adm_interv_subject")}</th>
                <th>{adminT(lang, "adm_th_client")}</th>
                <th>{adminT(lang, "adm_interv_onsite")}</th>
                <th>{adminT(lang, "adm_interv_by")}</th>
                <th>{adminT(lang, "adm_th_status")}</th>
                <th>{adminT(lang, "adm_interv_actions")}</th>
              </tr>
            </thead>
            <tbody>
              {list.map((i) => (
                <tr key={i.id}>
                  <td className="mono">
                    {i.id}
                    <br />
                    <span className="xs muted">{i.ref}</span>
                  </td>
                  <td className="num">
                    <b>{isToday(i.when) ? adminT(lang, "adm_today") : fmtD(i.when)}</b>
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
                  <td className="sm">{techName(i.by) || settings.manager}</td>
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
                    {i.state !== "done" ? <IntervActions id={i.id} /> : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
