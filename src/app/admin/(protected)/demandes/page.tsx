import { getRequests } from "@/lib/data/repository";
import { DemandesFilters } from "@/components/admin/DemandesFilters";
import { DemandesTable } from "@/components/admin/DemandesTable";

export default async function DemandesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; src?: string; type?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const all = await getRequests();
  let list = all;
  if (sp.status) list = list.filter((r) => r.status === sp.status);
  if (sp.src) list = list.filter((r) => r.src === sp.src);
  if (sp.type) list = list.filter((r) => r.type === sp.type);
  if (sp.q) {
    const q = sp.q.toLowerCase();
    list = list.filter((r) =>
      (r.ref + " " + r.name + " " + (r.company || "") + " " + r.city + " " + (r.phone || "") + " " + (r.email || "") + " " + r.type + " " + r.svc)
        .toLowerCase()
        .includes(q),
    );
  }

  return (
    <>
      <div className="topbar">
        <h2>Demandes</h2>
        <span className="sp" />
        <span className="xs muted">
          Cliquez une ligne pour ouvrir la fiche · Installation · Matériel · Maintenance · Dépannage
        </span>
      </div>
      <div className="content">
        <DemandesFilters
          status={sp.status || ""}
          src={sp.src || ""}
          type={sp.type || ""}
          q={sp.q || ""}
          counts={Object.fromEntries(
            ["", "new", "contacted", "visit", "sent", "won", "done", "lost"].map((s) => [
              s,
              s ? all.filter((r) => r.status === s).length : all.length,
            ]),
          )}
          typeCounts={{
            all: all.length,
            install: all.filter((r) => r.type === "install").length,
            prod: all.filter((r) => r.type === "prod").length,
            maint: all.filter((r) => r.type === "maint").length,
            fix: all.filter((r) => r.type === "fix").length,
          }}
        />
        <DemandesTable list={list} />
      </div>
    </>
  );
}
