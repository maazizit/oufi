import Link from "next/link";
import { getNotifs, getRequests, getSettings } from "@/lib/data/repository";
import { Icon } from "@/components/ui/Icon";
import { AdminSignOut } from "@/components/admin/AdminSignOut";
import { AdminNotifs } from "@/components/admin/AdminNotifs";

const NAV = [
  { href: "/admin", label: "Tableau de bord", icon: "grid" as const },
  { href: "/admin/demandes", label: "Demandes", icon: "doc" as const },
  { href: "/admin/catalogue", label: "Catalogue", icon: "box" as const },
  { href: "/admin/interventions", label: "Interventions", icon: "cal" as const },
  { href: "/admin/reglages", label: "Réglages", icon: "gear" as const },
];

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const [settings, requests, notifs] = await Promise.all([
    getSettings(),
    getRequests(),
    getNotifs(),
  ]);
  const newCount = requests.filter((r) => r.status === "new").length;
  const unreadNotifs = notifs.filter((n) => !n.read).length;

  return (
    <div className="admin">
      <aside className="side">
        <div className="bd">
          <span className="mk">
            <Icon name="shield" size={18} />
          </span>
          <span>
            <span className="nm">{settings.company}</span>
            <br />
            <span className="sl">Back-office</span>
          </span>
          <div className="side-notifs">
            <AdminNotifs initial={notifs} />
          </div>
        </div>
        <nav>
          {NAV.map((n) => (
            <Link key={n.href} href={n.href}>
              <Icon name={n.icon} size={18} />
              <span>{n.label}</span>
              {n.href === "/admin/demandes" && (newCount > 0 || unreadNotifs > 0) ? (
                <span className="b num">{Math.max(newCount, unreadNotifs)}</span>
              ) : null}
            </Link>
          ))}
        </nav>
        <div className="ft">
          {settings.manager} · Administrateur
          <div style={{ marginTop: 8 }}>
            <AdminSignOut />
          </div>
        </div>
      </aside>
      <div className="main">{children}</div>
    </div>
  );
}
