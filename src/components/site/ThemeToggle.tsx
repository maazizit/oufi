"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useLang } from "./LangProvider";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const { t } = useLang();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const dark = mounted && resolvedTheme === "dark";

  return (
    <button
      type="button"
      className={`hdr-icon-btn theme-toggle ${className}`.trim()}
      onClick={() => setTheme(dark ? "light" : "dark")}
      aria-label={dark ? t("theme_light") : t("theme_dark")}
      title={dark ? t("theme_light") : t("theme_dark")}
    >
      {mounted ? (
        <Icon name={dark ? "sun" : "moon"} size={18} />
      ) : (
        <Icon name="moon" size={18} />
      )}
    </button>
  );
}
