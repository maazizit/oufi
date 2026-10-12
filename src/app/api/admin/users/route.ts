import { NextResponse } from "next/server";
import { setAdminAuthPassword, linkAdminUserId } from "@/lib/admin/auth-users";
import { adminApiGuard } from "@/lib/admin/api";
import { isSupabaseConfigured } from "@/lib/supabase/server";
import {
  defaultManagerPermissions,
  normalizePermissions,
  type AdminPermissions,
} from "@/lib/admin/permissions";
import { listAdminUsersForSuper, upsertAdminUserRecord } from "@/lib/admin/session";
import { isBootstrapSuperAdmin, managerFromInput, type AdminUserRecord } from "@/lib/admin/users";

export async function GET() {
  const guard = await adminApiGuard("utilisateurs");
  if (!guard.ok) return guard.response;
  const users = await listAdminUsersForSuper();
  return NextResponse.json({ users });
}

export async function POST(req: Request) {
  const guard = await adminApiGuard("utilisateurs");
  if (!guard.ok) return guard.response;
  const body = await req.json();
  const email = String(body.email || "").trim().toLowerCase();
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  const role = body.role === "super_admin" ? "super_admin" : "manager";
  const permissions = normalizePermissions(
    (body.permissions as Partial<AdminPermissions>) ||
      (role === "manager" ? defaultManagerPermissions() : undefined),
  );
  const rec: AdminUserRecord =
    role === "super_admin"
      ? {
          id: body.id || `sa-${Date.now()}`,
          email,
          role: "super_admin",
          permissions,
          active: body.active !== false,
          userId: null,
        }
      : managerFromInput({ email, role: "manager", permissions, active: body.active !== false }, body.id);

  const password = typeof body.password === "string" ? body.password.trim() : "";
  if (password) {
    if (password.length < 8) {
      return NextResponse.json({ error: "password_short" }, { status: 400 });
    }
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: "supabase_required" }, { status: 503 });
    }
    const ok = await setAdminAuthPassword(email, password);
    if (!ok) return NextResponse.json({ error: "auth_password_failed" }, { status: 500 });
    const userId = await linkAdminUserId(email);
    if (userId) rec.userId = userId;
  }

  await upsertAdminUserRecord(rec);
  return NextResponse.json({ ok: true, user: rec });
}

export async function PATCH(req: Request) {
  const guard = await adminApiGuard("utilisateurs");
  if (!guard.ok) return guard.response;
  const body = await req.json();
  const email = String(body.email || "").trim().toLowerCase();
  if (!email) return NextResponse.json({ error: "invalid_email" }, { status: 400 });

  const users = await listAdminUsersForSuper();
  const existing = users.find((u) => u.email === email || u.id === body.id);
  if (!existing) return NextResponse.json({ error: "not_found" }, { status: 404 });

  if (existing.role === "super_admin" && isBootstrapSuperAdmin(existing.email) && body.role === "manager") {
    return NextResponse.json({ error: "cannot_demote_bootstrap_super" }, { status: 400 });
  }

  const password = typeof body.password === "string" ? body.password.trim() : "";
  if (password) {
    if (password.length < 8) {
      return NextResponse.json({ error: "password_short" }, { status: 400 });
    }
    if (!isSupabaseConfigured()) {
      return NextResponse.json({ error: "supabase_required" }, { status: 503 });
    }
    const ok = await setAdminAuthPassword(email, password);
    if (!ok) return NextResponse.json({ error: "auth_password_failed" }, { status: 500 });
    const userId = await linkAdminUserId(email);
    if (userId) existing.userId = userId;
  }

  const next: AdminUserRecord = {
    ...existing,
    active: body.active != null ? Boolean(body.active) : existing.active,
    permissions: body.permissions
      ? normalizePermissions(body.permissions as Partial<AdminPermissions>)
      : existing.permissions,
    role: existing.role,
    userId: existing.userId,
  };
  if (existing.role !== "super_admin" && body.role === "manager") {
    next.role = "manager";
  }

  if (next.role !== "super_admin" || !isBootstrapSuperAdmin(next.email)) {
    await upsertAdminUserRecord(next);
  }

  return NextResponse.json({ ok: true, user: next });
}
