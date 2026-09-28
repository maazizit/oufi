import Link from "next/link";
import { getRequests } from "@/lib/data/repository";
import { chanOf, fmtD, statusOf, typeOf } from "@/lib/utils";
import { DemandesFilters } from "@/components/admin/DemandesFilters";
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
  src_form: "Formulaire",
  src_cart: "Panier",
  src_contact: "Contact",
};

export default async function DemandesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; src?: string; q?: string }>;
}) {
  const sp = await searchParams;
  let list = await getRequests();
  if (sp.status) list = list.filter((r) => r.status === sp.status);
  if (sp.src) list = list.filter((r) => r.src === sp.src);
  if (sp.q) {
    const q = sp.q.toLowerCase();
    list = list.filter((r) =>
      (r.ref + " " + r.name + " " + (r.company || "") + " " + r.city + " " + (r.phone || "") + " " + (r.email || ""))
        .toLowerCase()
        .includes(q),
    );
  }
  const all = await getRequests();

  return (
    <>
      <div className="topbar">
        <h2>Demandes</h2>
      </div>
      <div className="content">
        <DemandesFilters
          status={sp.status || ""}
          src={sp.src || ""}
          q={sp.q || ""}
          counts={Object.fromEntries(
            ["", "new", "contacted", "visit", "sent", "won", "done", "lost"].map((s) => [
              s,
              s ? all.filter((r) => r.status === s).length : all.length,
            ]),
          )}
        />
        <div className="tw">
          <table>
            <thead>
              <tr>
                <th>Réf.</th>
                <th>Client</th>
                <th>Type</th>
                <th>Ville</th>
                <th>Canal</th>
                <th>Origine</th>
                <th>Reçue le</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {list.length ? (
                list.map((r) => (
                  <tr key={r.ref}>
                    <td className="mono">
                      <Link href={`/admin/demandes/${r.ref}`}>{r.ref}</Link>
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
                    <td>{labels[typeOf(r.type).k]}</td>
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
                    <td className="num">{fmtD(r.created)}</td>
                    <td>
                      <span className={`pill ${statusOf(r.status).p}`}>{labels[statusOf(r.status).k]}</span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="muted">
                    Aucun résultat.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
