export type AdminRole = "super_admin" | "manager";

export type AdminPageKey =
  | "dashboard"
  | "demandes"
  | "catalogue"
  | "interventions"
  | "reglages";

export type AdminPermissions = Record<AdminPageKey, boolean>;

export const ADMIN_PAGE_KEYS: AdminPageKey[] = [
  "dashboard",
  "demandes",
  "catalogue",
  "interventions",
  "reglages",
];

export const ADMIN_PAGE_LABELS: Record<AdminPageKey, string> = {
  dashboard: "Tableau de bord",
  demandes: "Demandes",
  catalogue: "Catalogue",
  interventions: "Interventions",
  reglages: "Réglages",
};

export function defaultManagerPermissions(): AdminPermissions {
  return {
    dashboard: true,
    demandes: true,
    catalogue: true,
    interventions: false,
    reglages: false,
  };
}

export function allPagePermissions(): AdminPermissions {
  return {
    dashboard: true,
    demandes: true,
    catalogue: true,
    interventions: true,
    reglages: true,
  };
}

export function normalizePermissions(
  partial?: Partial<AdminPermissions> | null,
): AdminPermissions {
  const base = defaultManagerPermissions();
  if (!partial) return base;
  for (const k of ADMIN_PAGE_KEYS) {
    if (typeof partial[k] === "boolean") base[k] = partial[k]!;
  }
  return base;
}

export type AdminSession = {
  userId: string;
  email: string;
  role: AdminRole;
  permissions: AdminPermissions;
};

export function canAccessPage(session: AdminSession, page: AdminPageKey): boolean {
  if (session.role === "super_admin") return true;
  return Boolean(session.permissions[page]);
}

export function adminPageFromPath(pathname: string): AdminPageKey | null {
  if (pathname === "/admin" || pathname === "/admin/") return "dashboard";
  if (pathname.startsWith("/admin/demandes")) return "demandes";
  if (pathname.startsWith("/admin/catalogue")) return "catalogue";
  if (pathname.startsWith("/admin/interventions")) return "interventions";
  if (pathname.startsWith("/admin/reglages")) return "reglages";
  return null;
}

export const ADMIN_NAV = [
  { href: "/admin", page: "dashboard" as const, label: "Tableau de bord", icon: "grid" as const },
  { href: "/admin/demandes", page: "demandes" as const, label: "Demandes", icon: "doc" as const },
  { href: "/admin/catalogue", page: "catalogue" as const, label: "Catalogue", icon: "box" as const },
  {
    href: "/admin/interventions",
    page: "interventions" as const,
    label: "Interventions",
    icon: "cal" as const,
  },
  { href: "/admin/reglages", page: "reglages" as const, label: "Réglages", icon: "gear" as const },
];
