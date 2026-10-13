import { NextResponse } from "next/server";
import type { AdminPageKey } from "./permissions";
import { requireAdminSession } from "./session";

export type AdminApiGuardResult =
  | { ok: true; session: NonNullable<Awaited<ReturnType<typeof requireAdminSession>>> }
  | { ok: false; response: NextResponse };

export async function adminApiGuard(
  page: AdminPageKey | "utilisateurs" | "any",
): Promise<AdminApiGuardResult> {
  const session = await requireAdminSession(page);
  if (!session) {
    return {
      ok: false,
      response: NextResponse.json({ error: "forbidden" }, { status: 403 }),
    };
  }
  if (session.mustChangePassword) {
    return {
      ok: false,
      response: NextResponse.json({ error: "password_change_required" }, { status: 403 }),
    };
  }
  return { ok: true, session };
}
