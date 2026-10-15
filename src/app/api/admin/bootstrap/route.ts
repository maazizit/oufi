import { NextResponse } from "next/server";
import {
  ADMIN_EMAIL,
  DEFAULT_ADMIN_PASSWORD,
  adminPasswordFromEnv,
} from "@/lib/admin/credentials";
import {
  ensureSupabaseAdminUser,
  resetSupabaseAdminPassword,
} from "@/lib/admin/supabase-admin";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

/**
 * Crée (ou réinitialise avec ?reset=1) le compte admin Supabase Auth.
 * En production : ADMIN_BOOTSTRAP_SECRET obligatoire (Bearer ou x-admin-bootstrap-secret).
 */
function bootstrapAuthToken(req: Request): string | null {
  const header =
    req.headers.get("authorization")?.replace(/^Bearer\s+/i, "").trim() ||
    req.headers.get("x-admin-bootstrap-secret")?.trim();
  return header || null;
}

function bootstrapSecret(): string | null {
  const explicit = process.env.ADMIN_BOOTSTRAP_SECRET?.trim();
  if (explicit) return explicit;
  if (process.env.NODE_ENV === "production") return null;
  return adminPasswordFromEnv() || DEFAULT_ADMIN_PASSWORD;
}

export async function POST(req: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ error: "supabase_required" }, { status: 503 });
  }

  const secret = bootstrapSecret();
  const auth = bootstrapAuthToken(req);
  if (!secret || !auth || auth !== secret) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const body = await req.json().catch(() => ({}));
  const envPassword = adminPasswordFromEnv();
  const requested =
    typeof body.password === "string" ? body.password.trim() : null;

  let password = envPassword || DEFAULT_ADMIN_PASSWORD;
  if (requested && requested.length >= 8) {
    password = requested;
  }

  const url = new URL(req.url);
  const reset = url.searchParams.get("reset") === "1";

  const ok = reset
    ? await resetSupabaseAdminPassword(password)
    : await ensureSupabaseAdminUser(password);

  if (!ok) {
    return NextResponse.json({ error: "bootstrap_failed" }, { status: 500 });
  }

  const supabase = await createClient();
  let signInCheck: { ok: boolean; message?: string } = { ok: false };
  if (supabase) {
    const { error } = await supabase.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password,
    });
    signInCheck = error ? { ok: false, message: error.message } : { ok: true };
  }

  return NextResponse.json({
    ok: true,
    email: ADMIN_EMAIL,
    reset,
    signInCheck,
  });
}
