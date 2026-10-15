/** Contact pour réinitialisation mot de passe back-office (pas d’auto-reset public). */
export const ADMIN_PASSWORD_SUPPORT_EMAIL = "zahra.maaziz03@gmail.com";

export type PasswordRuleId =
  | "min_length"
  | "lowercase"
  | "uppercase"
  | "digit"
  | "symbol"
  | "not_common";

const COMMON_FRAGMENTS = [
  "password",
  "motdepasse",
  "admin",
  "oufi",
  "amanplanet",
  "123456",
  "qwerty",
  "azerty",
];

export function passwordRuleStatus(password: string): Record<PasswordRuleId, boolean> {
  const p = password;
  const lower = p.toLowerCase();
  const notCommon =
    p.length > 0 &&
    !COMMON_FRAGMENTS.some((frag) => lower.includes(frag)) &&
    !/^(.)\1{5,}/.test(p);

  return {
    min_length: p.length >= 10,
    lowercase: /[a-z]/.test(p),
    uppercase: /[A-Z]/.test(p),
    digit: /[0-9]/.test(p),
    symbol: /[^A-Za-z0-9]/.test(p),
    not_common: notCommon,
  };
}

export function validateAdminPassword(password: string): {
  ok: boolean;
  errors: PasswordRuleId[];
} {
  const status = passwordRuleStatus(password);
  const errors = (Object.keys(status) as PasswordRuleId[]).filter((k) => !status[k]);
  return { ok: errors.length === 0, errors };
}

export function forgotPasswordMailtoHref(lang: "fr" | "ar" = "fr"): string {
  const subject =
    lang === "ar"
      ? "إعادة تعيين كلمة مرور لوحة التحكم"
      : "Réinitialisation mot de passe back-office OUFI";
  const body =
    lang === "ar"
      ? "مرحباً،\n\nنسيت كلمة مرور لوحة التحكم. يرجى إعادة التعيين لحسابي:\n\nالبريد المرتبط بالحساب: \n\nشكراً."
      : "Bonjour,\n\nJ'ai oublié mon mot de passe du back-office. Merci de le réinitialiser pour mon compte :\n\nE-mail du compte : \n\nMerci.";
  return `mailto:${ADMIN_PASSWORD_SUPPORT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
