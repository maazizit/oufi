import { NextResponse } from "next/server";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server";

const DEMO_COOKIES = [
  "oufi-demo-admin",
  "oufi-demo-email",
  "oufi-demo-role",
  "oufi-demo-permissions",
];

export async function POST() {
  if (isSupabaseConfigured()) {
    const supabase = await createClient();
    if (supabase) await supabase.auth.signOut();
  }
  const res = NextResponse.json({ ok: true });
  for (const name of DEMO_COOKIES) {
    res.cookies.set(name, "", { httpOnly: true, path: "/", maxAge: 0 });
  }
  return res;
}
