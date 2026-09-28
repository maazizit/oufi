"use client";

import { useRouter } from "next/navigation";

export function AdminSignOut() {
  const router = useRouter();
  return (
    <button
      type="button"
      className="btn btn-sm btn-out"
      style={{ color: "inherit", borderColor: "var(--navy-line)" }}
      onClick={async () => {
        await fetch("/api/admin/logout", { method: "POST" });
        router.push("/admin/login");
        router.refresh();
      }}
    >
      Déconnexion
    </button>
  );
}
