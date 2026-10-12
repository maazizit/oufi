import { NextResponse } from "next/server";
import {
  adminPasswordFromEnv,
  isAllowedAdminIdentifier,
  normalizeAdminLogin,
} from "@/lib/admin/credentials";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const rawUser = String(body.user || body.email || "");
  const password = String(body.password || "");

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

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    console.error("[admin/login] signIn", error.message);
    return NextResponse.json({ error: "bad_credentials" }, { status: 401 });
  }

  return NextResponse.json({ ok: true, mode: "supabase" });
}
