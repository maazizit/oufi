const ADMIN_EMAIL = "admin@amanplanet.local";

export function normalizeAdminLogin(raw: string): string {
  const user = raw.trim().toLowerCase();
  if (!user) return "";
  if (user.includes("@")) return user;
  return `${user}@amanplanet.local`;
}

export function isAllowedAdminIdentifier(raw: string): boolean {
  const user = raw.trim().toLowerCase();
  const expectedUser = (process.env.ADMIN_DEMO_USER || "admin").toLowerCase();
  return (
    user === expectedUser ||
    user === "admin" ||
    user === ADMIN_EMAIL ||
    normalizeAdminLogin(user) === ADMIN_EMAIL
  );
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_DEMO_PASSWORD || "oufi-admin";
  return password === expected;
}

export { ADMIN_EMAIL };
