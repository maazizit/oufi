import { NextResponse } from "next/server";
import {
  ADMIN_EMAIL,
  isAllowedAdminIdentifier,
  normalizeAdminLogin,
  verifyAdminPassword,
} from "@/lib/admin/credentials";
import { createClient, createServiceClient, isSupabaseConfigured } from "@/lib/supabase/server";

async function ensureSupabaseAdminUser(password: string) {
  const service = createServiceClient();
  if (!service) return false;

  const { data: created, error: createErr } = await service.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password,
    email_confirm: true,
  });
  if (!createErr && created.user) return true;

  const msg = createErr?.message?.toLowerCase() ?? "";
  const exists =
    createErr?.status === 422 ||
    msg.includes("already") ||
    msg.includes("registered") ||
    msg.includes("exists");

  if (!exists) {
    console.error("[admin/login] createUser", createErr?.message);
    return false;
  }

  let page = 1;
  const perPage = 200;
  for (;;) {
    const { data, error } = await service.auth.admin.listUsers({ page, perPage });
    if (error) {
      console.error("[admin/login] listUsers", error.message);
      return false;
    }
    const found = data.users.find((u) => u.email?.toLowerCase() === ADMIN_EMAIL);
    if (found) {
      const { error: updErr } = await service.auth.admin.updateUserById(found.id, {
        password,
        email_confirm: true,
      });
      if (updErr) {
        console.error("[admin/login] updateUser", updErr.message);
        return false;
      }
      return true;
    }
    if (data.users.length < perPage) break;
    page += 1;
  }
  return false;
}

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const rawUser = String(body.user || body.email || "");
  const password = String(body.password || "");

  if (!isAllowedAdminIdentifier(rawUser) || !verifyAdminPassword(password)) {
    return NextResponse.json({ error: "bad_credentials" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    const res = NextResponse.json({ ok: true, mode: "demo" });
    res.cookies.set("oufi-demo-admin", "1", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12,
      secure: process.env.NODE_ENV === "production",
    });
    return res;
  }

  const email = normalizeAdminLogin(rawUser);
  const ready = await ensureSupabaseAdminUser(password);
  if (!ready) {
    return NextResponse.json({ error: "bootstrap_failed" }, { status: 503 });
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: "no_client" }, { status: 500 });
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error("[admin/login] signIn", error.message);
    return NextResponse.json({ error: "bad_credentials" }, { status: 401 });
  }

  return NextResponse.json({ ok: true, mode: "supabase" });
}
