"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAdminLang } from "./AdminLangProvider";

export function AdminPasswordChangeGate({
  mustChangePassword,
}: {
  mustChangePassword: boolean;
}) {
  const pathname = usePathname() || "";
  const router = useRouter();
  const { t } = useAdminLang();
  const onCompte = pathname.startsWith("/admin/compte");

  useEffect(() => {
    if (mustChangePassword && !onCompte) {
      router.replace("/admin/compte?change=1");
    }
  }, [mustChangePassword, onCompte, router]);

  if (!mustChangePassword) return null;

  return (
    <div className="admin-pw-banner" role="alert">
      <p className="sm" style={{ margin: 0, flex: 1 }}>
        {t("adm_pw_banner_text")}
      </p>
      {!onCompte ? (
        <Link href="/admin/compte?change=1" className="btn btn-sm btn-pri">
          {t("adm_pw_banner_cta")}
        </Link>
      ) : null}
    </div>
  );
}
