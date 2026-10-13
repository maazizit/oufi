import { cookies } from "next/headers";
import { createClient, createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";
import type { AdminSession } from "./permissions";
import {
  allPagePermissions,
  defaultManagerPermissions,
  normalizePermissions,
  type AdminPermissions,
  type AdminRole,
} from "./permissions";
import {
  demoGetAdminUserByEmail,
  demoGetAdminUsers,
  demoSaveAdminUser,
} from "@/lib/data/demo-store";
import type { AdminUserRecord } from "./users";
import { mustChangePasswordFromMetadata } from "./password-metadata";
import { isBootstrapSuperAdmin, parseSuperAdminEmails, superAdminFromEmail } from "./users";

function recordToSession(
  rec: AdminUserRecord,
  userId: string,
  mustChangePassword = false,
): AdminSession {
  return {
    userId,
    email: rec.email,
    role: rec.role,
    permissions:
      rec.role === "super_admin" ? allPagePermissions() : rec.permissions,
    mustChangePassword,
  };
}

async function getDemoSession(): Promise<AdminSession | null> {
  const jar = await cookies();
  if (jar.get("oufi-demo-admin")?.value !== "1") return null;
  const email = (jar.get("oufi-demo-email")?.value || "admin@amanplanet.local").toLowerCase();
  const role = (jar.get("oufi-demo-role")?.value || "super_admin") as AdminRole;

  if (role === "super_admin" || isBootstrapSuperAdmin(email)) {
    return {
      userId: "demo-super",
      email,
      role: "super_admin",
      permissions: allPagePermissions(),
      mustChangePassword: false,
    };
  }

  const stored = demoGetAdminUserByEmail(email);
  if (stored && stored.active) {
    return recordToSession(stored, "demo-manager");
  }

  let permissions: AdminPermissions = defaultManagerPermissions();
  const permCookie = jar.get("oufi-demo-permissions")?.value;
  if (permCookie) {
    try {
      permissions = normalizePermissions(JSON.parse(permCookie) as Partial<AdminPermissions>);
    } catch {
      /* ignore */
    }
  }

  return {
    userId: "demo-manager",
    email,
    role: "manager",
    permissions,
    mustChangePassword: false,
  };
}

async function loadSupabaseAdminUser(
  userId: string,
  email: string,
): Promise<AdminUserRecord | null> {
  if (isBootstrapSuperAdmin(email)) {
    return superAdminFromEmail(email);
  }

  const service = createServiceClient();
  const client = service || (await createClient());
  if (!client) return null;

  const { data: byId } = await client
    .from("admin_users")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (byId?.active) {
    return mapRow(byId);
  }

  const { data: byEmail } = await client
    .from("admin_users")
    .select("*")
    .eq("email", email.toLowerCase())
    .maybeSingle();

  if (byEmail?.active) {
    if (!byEmail.user_id && service) {
      await service
        .from("admin_users")
        .update({ user_id: userId, updated_at: new Date().toISOString() })
        .eq("id", byEmail.id);
    }
    return mapRow(byEmail);
  }

  if (isBootstrapSuperAdmin(email) && service) {
    const row = {
      email: email.toLowerCase(),
      role: "super_admin",
      permissions: allPagePermissions(),
      active: true,
      user_id: userId,
      updated_at: new Date().toISOString(),
    };
    await service.from("admin_users").upsert(row, { onConflict: "email" });
    return superAdminFromEmail(email);
  }

  return null;
}

function mapRow(row: {
  id: number;
  email: string;
  role: string;
  permissions: AdminPermissions | null;
  active: boolean;
  user_id: string | null;
}): AdminUserRecord {
  return {
    id: String(row.id),
    email: row.email,
    role: row.role as AdminRole,
    permissions: normalizePermissions(row.permissions),
    active: row.active,
    userId: row.user_id,
  };
}

export async function getAdminSession(): Promise<AdminSession | null> {
  if (!isSupabaseConfigured()) {
    return getDemoSession();
  }

  const supabase = await createClient();
  if (!supabase) return null;
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) return null;

  const rec = await loadSupabaseAdminUser(user.id, user.email);
  if (!rec) return null;
  const mustChangePassword = mustChangePasswordFromMetadata(
    user.user_metadata as Record<string, unknown>,
  );
  return recordToSession(rec, user.id, mustChangePassword);
}

export async function requireAdminSession(
  page?: keyof import("./permissions").AdminPermissions | "utilisateurs" | "any",
): Promise<AdminSession | null> {
  const session = await getAdminSession();
  if (!session) return null;
  if (!page || page === "any") return session;
  if (page === "utilisateurs") {
    return session.role === "super_admin" ? session : null;
  }
  if (session.role === "super_admin") return session;
  if (!session.permissions[page]) return null;
  return session;
}

export async function listAdminUsersForSuper(): Promise<AdminUserRecord[]> {
  if (!isSupabaseConfigured()) {
    return demoGetAdminUsers();
  }
  const service = createServiceClient();
  if (!service) {
    return parseSuperAdminEmails().map((email) => superAdminFromEmail(email));
  }
  const { data } = await service.from("admin_users").select("*").order("email");
  const rows = (data || []).map(mapRow);
  const seen = new Set(rows.map((r) => r.email.toLowerCase()));
  for (const email of parseSuperAdminEmails()) {
    if (!seen.has(email)) {
      rows.push(superAdminFromEmail(email));
      seen.add(email);
    }
  }
  return rows.sort((a, b) => a.email.localeCompare(b.email));
}

export async function upsertAdminUserRecord(
  input: AdminUserRecord,
): Promise<void> {
  if (!isSupabaseConfigured()) {
    demoSaveAdminUser(input);
    return;
  }
  const service = createServiceClient();
  if (!service) throw new Error("no_service");
  await service.from("admin_users").upsert(
    {
      email: input.email.toLowerCase(),
      role: input.role,
      permissions: input.permissions,
      active: input.active,
      user_id: input.userId || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "email" },
  );
}
