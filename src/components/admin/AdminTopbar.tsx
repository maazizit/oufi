"use client";

import { useAdminLang } from "./AdminLangProvider";

export function AdminTopbar({
  titleKey,
  hintKey,
  children,
}: {
  titleKey: string;
  hintKey?: string;
  children?: React.ReactNode;
}) {
  const { t } = useAdminLang();
  return (
    <div className="topbar">
      <h2>{t(titleKey)}</h2>
      <span className="sp" />
      {hintKey ? <span className="xs muted">{t(hintKey)}</span> : null}
      {children}
    </div>
  );
}
