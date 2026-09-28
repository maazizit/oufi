"use client";

import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { CartProvider } from "./CartProvider";
import { LangProvider, useLang } from "./LangProvider";
import { RevealObserver } from "@/components/motion/RevealObserver";
import type { Settings } from "@/lib/types";

function ShellInner({
  settings,
  children,
}: {
  settings: Settings;
  children: React.ReactNode;
}) {
  const { L } = useLang();
  return (
    <div className="site">
      <SiteHeader company={settings.company} tagline={L(settings.tagline)} />
      <main>{children}</main>
      <SiteFooter settings={settings} />
      <RevealObserver />
    </div>
  );
}

export function SiteShell({
  settings,
  children,
}: {
  settings: Settings;
  children: React.ReactNode;
}) {
  return (
    <LangProvider>
      <CartProvider>
        <ShellInner settings={settings}>{children}</ShellInner>
      </CartProvider>
    </LangProvider>
  );
}
