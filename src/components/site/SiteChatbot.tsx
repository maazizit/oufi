"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { buildDevisUrl } from "@/lib/chat/devis";
import type { ChatDevisDraft, ChatLink } from "@/lib/chat/types";
import { useLang } from "./LangProvider";

type UiMessage = {
  role: "user" | "assistant";
  content: string;
  links?: ChatLink[];
  draft?: ChatDevisDraft;
};

const QUICK = [
  { id: "devis", href: "/devis", fr: "Demande de devis", ar: "طلب عرض سعر" },
  { id: "cam", qFr: "Installation caméras", qAr: "تركيب كاميرات" },
  { id: "suivi", href: "/suivi", fr: "Suivi demande", ar: "تتبع الطلب" },
  { id: "alarm", qFr: "Alarme / sécurité", qAr: "إنذار و أمان" },
] as const;

type SiteChatbotProps = {
  onOpenChange?: (open: boolean) => void;
};

export function SiteChatbot({ onOpenChange }: SiteChatbotProps) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);

  function setChatOpen(next: boolean) {
    setOpen(next);
    onOpenChange?.(next);
  }
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [lastDraft, setLastDraft] = useState<ChatDevisDraft | undefined>();
  const listRef = useRef<HTMLDivElement>(null);

  const welcome: UiMessage = {
    role: "assistant",
    content:
      lang === "ar"
        ? "مرحباً بكم في AMANPLANET. اسألونا عن التركيب، الكتالوج أو عرض السعر — بدون التزام بسعر نهائي."
        : "Bonjour, je suis l’assistant AMANPLANET. Posez vos questions sur l’installation, le catalogue ou un devis — sans engagement de prix ferme.",
  };

  const scrollEnd = useCallback(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
    });
  }, []);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setInput("");
    const userMsg: UiMessage = { role: "user", content: trimmed };
    const next = [...(messages.length ? messages : [welcome]), userMsg];
    setMessages(next);
    setBusy(true);
    scrollEnd();
    try {
      const apiMessages = next
        .filter((m) => m.role === "user" || m.role === "assistant")
        .map((m) => ({ role: m.role, content: m.content }));
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lang, messages: apiMessages }),
      });
      if (!res.ok) throw new Error("chat_failed");
      const data = await res.json();
      const assistant: UiMessage = {
        role: "assistant",
        content: String(data.reply || ""),
        links: data.links,
        draft: data.draft,
      };
      if (data.draft) setLastDraft(data.draft);
      setMessages((m) => [...(m.length ? m : [welcome]), userMsg, assistant]);
    } catch {
      setMessages((m) => [
        ...(m.length ? m : [welcome]),
        userMsg,
        {
          role: "assistant",
          content:
            lang === "ar"
              ? "تعذر الاتصال. استخدموا نموذج عرض السعر."
              : "Connexion impossible. Utilisez le formulaire de devis.",
          links: [{ href: "/devis", titleFr: "Devis", titleAr: "عرض سعر" }],
        },
      ]);
    } finally {
      setBusy(false);
      scrollEnd();
    }
  }

  const devisHref = buildDevisUrl(lastDraft);

  const labelOpen = lang === "ar" ? "مساعد AMANPLANET" : "Assistant AMANPLANET";
  const labelClose = lang === "ar" ? "إغلاق" : "Fermer";
  const placeholder = lang === "ar" ? "اكتبوا رسالتكم…" : "Votre message…";
  const sendLabel = lang === "ar" ? "إرسال" : "Envoyer";
  const devisLabel = lang === "ar" ? "متابعة بعرض سعر" : "Continuer avec un devis";

  const display = messages.length ? messages : [welcome];

  return (
    <>
      <button
        type="button"
        className="chat-fab"
        aria-expanded={open}
        aria-controls="site-chat-panel"
        onClick={() => setChatOpen(!open)}
      >
        <Icon name="doc" size={22} />
        <span className="sr-only">{open ? labelClose : labelOpen}</span>
      </button>

      {open ? (
        <div id="site-chat-panel" className="chat-panel card" role="dialog" aria-label={labelOpen}>
          <header className="chat-head">
            <strong>{labelOpen}</strong>
            <button type="button" className="chat-x" onClick={() => setChatOpen(false)} aria-label={labelClose}>
              ×
            </button>
          </header>

          <div className="chat-quick">
            {QUICK.map((q) => {
              if ("href" in q && q.href) {
                return (
                  <Link key={q.id} href={q.href} className="chat-chip" onClick={() => setChatOpen(false)}>
                    {lang === "ar" ? q.ar : q.fr}
                  </Link>
                );
              }
              const text = lang === "ar" ? q.qAr! : q.qFr!;
              return (
                <button key={q.id} type="button" className="chat-chip" onClick={() => send(text)}>
                  {text}
                </button>
              );
            })}
          </div>

          <div className="chat-msgs" ref={listRef}>
            {display.map((m, i) => (
              <div key={i} className={`chat-bubble chat-${m.role}`}>
                <p>{m.content}</p>
                {m.links?.length ? (
                  <ul className="chat-links">
                    {m.links.map((l) => (
                      <li key={l.href}>
                        <Link href={l.href} onClick={() => setChatOpen(false)}>
                          {lang === "ar" ? l.titleAr : l.titleFr}
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}
            {busy ? <p className="chat-typing muted xs">…</p> : null}
          </div>

          <footer className="chat-foot">
            <Link href={devisHref} className="btn btn-pri btn-sm chat-devis" onClick={() => setChatOpen(false)}>
              {devisLabel}
            </Link>
            <form
              className="chat-form"
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
            >
              <input
                className="input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={placeholder}
                maxLength={500}
                disabled={busy}
              />
              <button type="submit" className="btn btn-sec btn-sm" disabled={busy || !input.trim()}>
                {sendLabel}
              </button>
            </form>
          </footer>
        </div>
      ) : null}
    </>
  );
}
