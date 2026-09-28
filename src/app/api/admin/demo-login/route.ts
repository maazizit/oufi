import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json({ error: "supabase_configured" }, { status: 400 });
  }
  const body = await req.json();
  const expected = process.env.ADMIN_DEMO_PASSWORD || "oufi-admin";
  if (String(body.password || "") !== expected) {
    return NextResponse.json({ error: "bad_password" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set("oufi-demo-admin", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  return res;
}
