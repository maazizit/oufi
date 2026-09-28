import { NextResponse } from "next/server";

export async function POST(req: Request) {
  if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json({ error: "supabase_configured" }, { status: 400 });
  }
  const body = await req.json();
  const user = String(body.user || body.email || "")
    .trim()
    .toLowerCase();
  const password = String(body.password || "");
  const expectedUser = (process.env.ADMIN_DEMO_USER || "admin").toLowerCase();
  const expectedPass = process.env.ADMIN_DEMO_PASSWORD || "oufi-admin";

  const userOk =
    user === expectedUser ||
    user === "admin" ||
    user === "admin@amanplanet.local";
  if (!userOk || password !== expectedPass) {
    return NextResponse.json({ error: "bad_credentials" }, { status: 401 });
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
