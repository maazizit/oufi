"use client";

import { passwordRuleStatus, type PasswordRuleId } from "@/lib/admin/password-policy";
import { useAdminLang } from "./AdminLangProvider";

const RULE_KEYS: PasswordRuleId[] = [
  "min_length",
  "lowercase",
  "uppercase",
  "digit",
  "symbol",
  "not_common",
];

const I18N: Record<PasswordRuleId, string> = {
  min_length: "adm_pw_rule_min",
  lowercase: "adm_pw_rule_lower",
  uppercase: "adm_pw_rule_upper",
  digit: "adm_pw_rule_digit",
  symbol: "adm_pw_rule_symbol",
  not_common: "adm_pw_rule_common",
};

export function AdminPasswordRules({ password }: { password: string }) {
  const { t } = useAdminLang();
  const status = passwordRuleStatus(password);

  return (
    <ul className="admin-pw-rules" aria-live="polite">
      {RULE_KEYS.map((id) => {
        const met = status[id];
        return (
          <li key={id} className={met ? "ok" : ""}>
            <span className="admin-pw-rules-mark" aria-hidden>{met ? "✓" : "○"}</span>
            {t(I18N[id])}
          </li>
        );
      })}
    </ul>
  );
}
