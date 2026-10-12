"use client";

import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";
import { CartProvider } from "./CartProvider";
import { LangProvider } from "./LangProvider";
import { ToastProvider } from "./ToastProvider";
import { WhatsAppFab } from "./WhatsAppFab";
import { SiteChatbot } from "./SiteChatbot";
import { RevealObserver } from "@/components/motion/RevealObserver";
import type { Settings } from "@/lib/types";

function ShellInner({
  settings,
  children,
}: {
  settings: Settings;
  children: React.ReactNode;
}) {
  return (
    <div className="site">
      <SiteHeader company={settings.company} />
      <main id="contenu">{children}</main>
      <SiteFooter settings={settings} />
      <SiteChatbot />
      <WhatsAppFab />
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
        <ToastProvider>
          <ShellInner settings={settings}>{children}</ShellInner>
        </ToastProvider>
      </CartProvider>
    </LangProvider>
  );
}
