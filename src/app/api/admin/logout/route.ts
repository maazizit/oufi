import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

export async function POST() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    if (supabase) await supabase.auth.signOut();
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set("oufi-demo-admin", "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
