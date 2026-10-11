import Link from "next/link";
import { getNotifs, getRequests, getSettings } from "@/lib/data/repository";
import { Icon } from "@/components/ui/Icon";
import { AdminSignOut } from "@/components/admin/AdminSignOut";
import { AdminNotifs } from "@/components/admin/AdminNotifs";
import { ADMIN_NAV, canAccessPage } from "@/lib/admin/permissions";
import { getAdminSession } from "@/lib/admin/session";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) {
    if (isSupabaseConfigured()) {
      const supabase = await createClient();
      const {
        data: { user },
      } = await supabase ? await supabase.auth.getUser() : { data: { user: null } };
      if (user) {
        await supabase?.auth.signOut();
        redirect("/admin/login?err=access");
      }
    }
    redirect("/admin/login");
  }

  const [settings, requests, notifs] = await Promise.all([
    getSettings(),
    getRequests(),
    getNotifs(),
  ]);
  const newCount = requests.filter((r) => r.status === "new").length;
  const unreadNotifs = notifs.filter((n) => !n.read).length;

  const nav = ADMIN_NAV.filter((n) => canAccessPage(session, n.page));
  const roleLabel =
    session.role === "super_admin" ? "Super administrateur" : "Gestionnaire";

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
          {canAccessPage(session, "demandes") ? (
            <div className="side-notifs">
              <AdminNotifs initial={notifs} />
            </div>
          ) : null}
        </div>
        <nav>
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>
              <Icon name={n.icon} size={18} />
              <span>{n.label}</span>
              {n.href === "/admin/demandes" && (newCount > 0 || unreadNotifs > 0) ? (
                <span className="b num">{Math.max(newCount, unreadNotifs)}</span>
              ) : null}
            </Link>
          ))}
          {session.role === "super_admin" ? (
            <Link href="/admin/utilisateurs">
              <Icon name="users" size={18} />
              <span>Utilisateurs &amp; accès</span>
            </Link>
          ) : null}
          <Link href="/admin/compte">
            <Icon name="user" size={18} />
            <span>Mon compte</span>
          </Link>
        </nav>
        <div className="ft">
          <span className="mono xs">{session.email}</span>
          <br />
          <span className="xs muted">{roleLabel}</span>
          <div style={{ marginTop: 8 }}>
            <AdminSignOut />
          </div>
        </div>
      </aside>
      <div className="main">{children}</div>
    </div>
  );
}
