const ADMIN_EMAIL = "admin@amanplanet.local";

export function normalizeAdminLogin(raw: string): string {
  const user = raw.trim().toLowerCase();
  if (!user) return "";
  if (user.includes("@")) return user;
  return `${user}@amanplanet.local`;
}

export function isAllowedAdminIdentifier(raw: string): boolean {
  const user = raw.trim().toLowerCase();
  const expectedUser = (process.env.ADMIN_USER || process.env.ADMIN_DEMO_USER || "admin").toLowerCase();
  return (
    user === expectedUser ||
    user === "admin" ||
    user === ADMIN_EMAIL ||
    normalizeAdminLogin(user) === ADMIN_EMAIL
  );
}

/** Mot de passe initial stocké côté Vercel (bootstrap), pas vérifié au login. */
export function adminPasswordFromEnv(): string | null {
  const pw = process.env.ADMIN_PASSWORD || process.env.ADMIN_DEMO_PASSWORD;
  if (!pw) return null;
  const trimmed = pw.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export { ADMIN_EMAIL };
