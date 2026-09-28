import { getInterventions, getSettings } from "@/lib/data/repository";
import { fmtD, fmtT, isToday } from "@/lib/utils";
import { IntervActions } from "@/components/admin/IntervActions";

export default async function InterventionsPage() {
  const [list, settings] = await Promise.all([getInterventions(), getSettings()]);
  const techName = (id: string) => settings.team.find((t) => t.id === id)?.name || id || "—";

  return (
    <>
      <div className="topbar">
        <h2>Interventions</h2>
      </div>
      <div className="content">
        <div className="tw">
          <table>
            <thead>
              <tr>
                <th>Réf.</th>
                <th>Quand</th>
                <th>Objet</th>
                <th>Client</th>
                <th>Envoyé sur place</th>
                <th>Envoyé par</th>
                <th>Statut</th>
                <th>Actions</th>
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
                    <b>{isToday(i.when) ? "Aujourd'hui" : fmtD(i.when)}</b>
                    <br />
                    {fmtT(i.when)}
                  </td>
                  <td>{i.obj.fr}</td>
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
                      {i.state === "done" ? "Terminée" : i.state === "prog" ? "En cours" : "Planifiée"}
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
