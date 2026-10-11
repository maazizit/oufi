"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dark = mounted && resolvedTheme === "dark";
  const label = dark ? "Passer en mode clair" : "Passer en mode sombre";

  return (
    <button
      type="button"
      className={`hdr-icon-btn theme-toggle ${className}`.trim()}
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={label}
      title={label}
    >
      <Icon name={mounted ? (dark ? "sun" : "moon") : "moon"} size={18} />
    </button>
  );
}
