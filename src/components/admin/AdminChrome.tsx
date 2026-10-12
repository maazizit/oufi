"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Notif } from "@/lib/types";
import type { AdminSession } from "@/lib/admin/permissions";
import { ADMIN_NAV_KEYS } from "@/lib/data/admin-i18n";
import { ADMIN_NAV, canAccessPage } from "@/lib/admin/permissions";
import { Icon } from "@/components/ui/Icon";
import { AdminSignOut } from "./AdminSignOut";
import { AdminNotifs } from "./AdminNotifs";
import { AdminLangToggle } from "./AdminLangToggle";
import { useAdminLang } from "./AdminLangProvider";

type Props = {
  session: AdminSession;
  company: string;
  newCount: number;
  unreadNotifs: number;
  notifs: Notif[];
  children: React.ReactNode;
};

export function AdminChrome({
  session,
  company,
  newCount,
  unreadNotifs,
  notifs,
  children,
}: Props) {
  const pathname = usePathname() || "/admin";
  const { t } = useAdminLang();
  const nav = ADMIN_NAV.filter((n) => canAccessPage(session, n.page));
  const roleLabel =
    session.role === "super_admin" ? t("adm_role_super") : t("adm_role_manager");

  return (
    <div className="admin">
      <aside className="side">
        <div className="bd">
          <span className="mk">
            <Icon name="shield" size={18} />
          </span>
          <span>
            <span className="nm">{company}</span>
            <br />
            <span className="sl">{t("adm_backoffice")}</span>
          </span>
          {canAccessPage(session, "demandes") ? (
            <div className="side-notifs">
              <AdminNotifs initial={notifs} />
            </div>
          ) : null}
        </div>
        <nav>
          {nav.map((n) => {
            const active =
              n.href === "/admin"
                ? pathname === "/admin" || pathname === "/admin/"
                : pathname.startsWith(n.href);
            const labelKey = ADMIN_NAV_KEYS[n.page];
            return (
              <Link key={n.href} href={n.href} aria-current={active ? "page" : undefined}>
                <Icon name={n.icon} size={18} />
                <span>{t(labelKey)}</span>
                {n.href === "/admin/demandes" && (newCount > 0 || unreadNotifs > 0) ? (
                  <span className="b num">{Math.max(newCount, unreadNotifs)}</span>
                ) : null}
              </Link>
            );
          })}
          {session.role === "super_admin" ? (
            <Link
              href="/admin/utilisateurs"
              aria-current={pathname.startsWith("/admin/utilisateurs") ? "page" : undefined}
            >
              <Icon name="users" size={18} />
              <span>{t("adm_nav_users")}</span>
            </Link>
          ) : null}
          <Link
            href="/admin/compte"
            aria-current={pathname.startsWith("/admin/compte") ? "page" : undefined}
          >
            <Icon name="user" size={18} />
            <span>{t("adm_nav_account")}</span>
          </Link>
        </nav>
        <div className="ft">
          <AdminLangToggle compact />
          <div style={{ marginTop: 10 }}>
            <span className="mono xs">{session.email}</span>
            <br />
            <span className="xs muted">{roleLabel}</span>
          </div>
          <div style={{ marginTop: 8 }}>
            <AdminSignOut />
          </div>
        </div>
      </aside>
      <div className="main">{children}</div>
    </div>
  );
}
