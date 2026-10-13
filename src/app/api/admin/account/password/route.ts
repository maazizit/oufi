import { NextResponse } from "next/server";
import { adminApiGuard } from "@/lib/admin/api";
import { validateAdminPassword } from "@/lib/admin/password-policy";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const guard = await adminApiGuard("any");
  if (!guard.ok) return guard.response;

  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "demo_mode" }, { status: 503 });
  }

  const body = await req.json().catch(() => ({}));
  const password = String(body.password || "").trim();
  const validation = validateAdminPassword(password);
  if (!validation.ok) {
    return NextResponse.json(
      { error: "weak_password", rules: validation.errors },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  if (!supabase) {
    return NextResponse.json({ error: "no_client" }, { status: 500 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    console.error("[admin/account/password]", error.message);
    return NextResponse.json({ error: "update_failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
