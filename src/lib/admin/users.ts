import type { AdminPermissions, AdminRole } from "./permissions";
import { allPagePermissions, defaultManagerPermissions, normalizePermissions } from "./permissions";

export type AdminUserRecord = {
  id: string;
  email: string;
  role: AdminRole;
  permissions: AdminPermissions;
  active: boolean;
  userId?: string | null;
};

export type AdminUserInput = {
  email: string;
  role: AdminRole;
  permissions?: Partial<AdminPermissions>;
  active?: boolean;
};

export function superAdminFromEmail(email: string): AdminUserRecord {
  return {
    id: "bootstrap",
    email: email.toLowerCase(),
    role: "super_admin",
    permissions: allPagePermissions(),
    active: true,
    userId: null,
  };
}

export function managerFromInput(input: AdminUserInput, id?: string): AdminUserRecord {
  return {
    id: id || `mgr-${Date.now()}`,
    email: input.email.trim().toLowerCase(),
    role: "manager",
    permissions: normalizePermissions(
      input.permissions ?? defaultManagerPermissions(),
    ),
    active: input.active ?? true,
    userId: null,
  };
}

export function parseSuperAdminEmails(): string[] {
  const raw =
    process.env.ADMIN_SUPER_EMAILS ||
    process.env.ADMIN_SUPER_EMAIL ||
    "admin@amanplanet.local";
  return raw
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

export function isBootstrapSuperAdmin(email: string): boolean {
  const e = email.trim().toLowerCase();
  const list = parseSuperAdminEmails();
  if (list.includes(e)) return true;
  const bare = e.split("@")[0];
  return list.some((x) => x.split("@")[0] === bare);
}
