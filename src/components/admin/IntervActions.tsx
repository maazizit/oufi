"use client";

import { useRouter } from "next/navigation";

export function IntervActions({ id }: { id: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      className="btn btn-sm btn-out"
      onClick={async () => {
        await fetch("/api/admin/interventions", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        router.refresh();
      }}
    >
      Marquer terminée
    </button>
  );
}
