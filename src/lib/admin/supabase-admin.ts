import { ADMIN_EMAIL } from "@/lib/admin/credentials";
import { mustChangePasswordUserMetadata } from "@/lib/admin/password-metadata";
import { createServiceClient } from "@/lib/supabase/server";

/** Crée l'utilisateur admin Supabase Auth s'il n'existe pas encore. */
export async function ensureSupabaseAdminUser(password: string): Promise<boolean> {
  const service = createServiceClient();
  if (!service) return false;

  const existing = await findAdminUser(service);
  if (existing) return true;

  const { data: created, error: createErr } = await service.auth.admin.createUser({
    email: ADMIN_EMAIL,
    password,
    email_confirm: true,
    user_metadata: mustChangePasswordUserMetadata(true),
  });
  if (!createErr && created.user) return true;

  const msg = createErr?.message?.toLowerCase() ?? "";
  if (
    createErr?.status === 422 ||
    msg.includes("already") ||
    msg.includes("registered") ||
    msg.includes("exists")
  ) {
    return Boolean(await findAdminUser(service));
  }

  console.error("[admin/supabase] createUser", createErr?.message);
  return false;
}

/** Met à jour le mot de passe admin (opération sensible, bootstrap uniquement). */
export async function resetSupabaseAdminPassword(password: string): Promise<boolean> {
  const service = createServiceClient();
  if (!service) return false;

  const user = await findAdminUser(service);
  if (!user) {
    return ensureSupabaseAdminUser(password);
  }

  const { error } = await service.auth.admin.updateUserById(user.id, {
    password,
    email_confirm: true,
    user_metadata: mustChangePasswordUserMetadata(true),
  });
  if (error) {
    console.error("[admin/supabase] updateUser", error.message);
    return false;
  }
  return true;
}

async function findAdminUser(
  service: NonNullable<ReturnType<typeof createServiceClient>>,
) {
  let page = 1;
  const perPage = 200;
  for (;;) {
    const { data, error } = await service.auth.admin.listUsers({ page, perPage });
    if (error) {
      console.error("[admin/supabase] listUsers", error.message);
      return null;
    }
    const found = data.users.find((u) => u.email?.toLowerCase() === ADMIN_EMAIL);
    if (found) return found;
    if (data.users.length < perPage) break;
    page += 1;
  }
  return null;
}
