import { NextResponse } from "next/server";
import { defaultManagerPermissions, normalizePermissions } from "@/lib/admin/permissions";
import { demoGetAdminUserByEmail } from "@/lib/data/demo-store";

function setDemoCookies(
  res: NextResponse,
  opts: { email: string; role: "super_admin" | "manager"; permissions?: string },
) {
  res.cookies.set("oufi-demo-admin", "1", {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  res.cookies.set("oufi-demo-email", opts.email, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  res.cookies.set("oufi-demo-role", opts.role, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
  if (opts.permissions) {
    res.cookies.set("oufi-demo-permissions", opts.permissions, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12,
    });
  } else {
    res.cookies.set("oufi-demo-permissions", "", { httpOnly: true, path: "/", maxAge: 0 });
  }
}

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
  const mgrUser = (process.env.ADMIN_DEMO_MANAGER_USER || "gestionnaire").toLowerCase();
  const mgrPass = process.env.ADMIN_DEMO_MANAGER_PASSWORD || "gestionnaire";

  const userOk =
    user === expectedUser ||
    user === "admin" ||
    user === "admin@amanplanet.local";
  if (userOk && password === expectedPass) {
    const res = NextResponse.json({ ok: true, role: "super_admin" });
    setDemoCookies(res, {
      email: user.includes("@") ? user : "admin@amanplanet.local",
      role: "super_admin",
    });
    return res;
  }

  const mgrOk =
    user === mgrUser ||
    user === "gestionnaire" ||
    user === "gestionnaire@amanplanet.local";
  if (mgrOk && password === mgrPass) {
    const email = user.includes("@") ? user : "gestionnaire@amanplanet.local";
    const stored = demoGetAdminUserByEmail(email);
    const permissions = JSON.stringify(
      normalizePermissions(stored?.permissions ?? defaultManagerPermissions()),
    );
    const res = NextResponse.json({ ok: true, role: "manager" });
    setDemoCookies(res, { email, role: "manager", permissions });
    return res;
  }

  return NextResponse.json({ error: "bad_credentials" }, { status: 401 });
}
