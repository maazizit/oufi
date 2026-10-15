import { NextResponse } from "next/server";
import {
  adminPasswordForBootstrap,
  adminPasswordFromEnv,
  isAllowedAdminIdentifier,
  normalizeAdminLogin,
} from "@/lib/admin/credentials";
import {
  ensureSupabaseAdminUser,
  resetSupabaseAdminPassword,
} from "@/lib/admin/supabase-admin";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const rawUser = String(body.user || body.email || "");
  const password = String(body.password || "").trim();

  if (!isAllowedAdminIdentifier(rawUser) || !password) {
    return NextResponse.json({ error: "bad_credentials" }, { status: 401 });
  }

  if (!isSupabaseConfigured()) {
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ error: "supabase_required" }, { status: 503 });
    }
    const expected = adminPasswordFromEnv() || "oufi-admin";
    if (password !== expected) {
      return NextResponse.json({ error: "bad_credentials" }, { status: 401 });
    }
    const res = NextResponse.json({ ok: true, mode: "demo_local" });
    res.cookies.set("oufi-demo-admin", "1", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
    return res;
  }

  const email = normalizeAdminLogin(rawUser);
  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: "no_client" }, { status: 500 });
  }

  let { error } = await supabase.auth.signInWithPassword({ email, password });

  const allowLoginSync =
    process.env.NODE_ENV !== "production" ||
    process.env.ADMIN_ALLOW_LOGIN_SYNC === "1";
  const bootstrapPassword = allowLoginSync ? adminPasswordForBootstrap(password) : null;
  if (error && bootstrapPassword) {
    const synced =
      (await ensureSupabaseAdminUser(bootstrapPassword)) &&
      (await resetSupabaseAdminPassword(bootstrapPassword));
    if (synced) {
      ({ error } = await supabase.auth.signInWithPassword({
        email,
        password: bootstrapPassword,
      }));
    }
  }

  if (error) {
    console.error("[admin/login] signIn", error.message);
    return NextResponse.json({ error: "bad_credentials" }, { status: 401 });
  }

  return NextResponse.json({ ok: true, mode: "supabase" });
}
