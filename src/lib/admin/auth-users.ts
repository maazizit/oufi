import { validateAdminPassword } from "@/lib/admin/password-policy";
import { createServiceClient } from "@/lib/supabase/server";

async function findAuthUserIdByEmail(
  service: NonNullable<ReturnType<typeof createServiceClient>>,
  email: string,
): Promise<string | null> {
  const target = email.trim().toLowerCase();
  let page = 1;
  const perPage = 200;
  for (;;) {
    const { data, error } = await service.auth.admin.listUsers({ page, perPage });
    if (error) {
      console.error("[admin/auth-users] listUsers", error.message);
      return null;
    }
    const found = data.users.find((u) => u.email?.toLowerCase() === target);
    if (found) return found.id;
    if (data.users.length < perPage) break;
    page += 1;
  }
  return null;
}

/** Crée ou met à jour le mot de passe Supabase Auth pour un e-mail admin. */
export async function setAdminAuthPassword(email: string, password: string): Promise<boolean> {
  const service = createServiceClient();
  if (!service) return false;
  const normalized = email.trim().toLowerCase();
  if (!normalized.includes("@") || !validateAdminPassword(password).ok) return false;

  const existingId = await findAuthUserIdByEmail(service, normalized);
  if (existingId) {
    const { error } = await service.auth.admin.updateUserById(existingId, {
      password,
      email_confirm: true,
    });
    if (error) {
      console.error("[admin/auth-users] updateUser", error.message);
      return false;
    }
    return true;
  }

  const { data, error } = await service.auth.admin.createUser({
    email: normalized,
    password,
    email_confirm: true,
  });
  if (error) {
    console.error("[admin/auth-users] createUser", error.message);
    return false;
  }
  if (data.user?.id) {
    await service
      .from("admin_users")
      .update({ user_id: data.user.id, updated_at: new Date().toISOString() })
      .eq("email", normalized);
  }
  return true;
}

export async function linkAdminUserId(email: string): Promise<string | null> {
  const service = createServiceClient();
  if (!service) return null;
  const id = await findAuthUserIdByEmail(service, email.trim().toLowerCase());
  if (!id) return null;
  await service
    .from("admin_users")
    .update({ user_id: id, updated_at: new Date().toISOString() })
    .eq("email", email.trim().toLowerCase());
  return id;
}
