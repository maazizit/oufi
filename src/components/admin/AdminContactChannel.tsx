"use client";

import { chanOf, whatsAppHref } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

type Props = {
  chan: string;
  phone?: string | null;
  label: string;
  /** Message prérempli WhatsApp (optionnel) */
  waMessage?: string;
  /** Afficher le numéro à côté du libellé */
  showPhone?: boolean;
};

export function AdminContactChannel({
  chan,
  phone,
  label,
  waMessage,
  showPhone = false,
}: Props) {
  const ch = chanOf(chan);
  const inner = (
    <span style={{ display: "inline-flex", gap: 5, alignItems: "center" }}>
      <Icon name={ch.ic} size={15} />
      <span>{label}</span>
      {showPhone && phone ? <span className="mono xs muted">{phone}</span> : null}
    </span>
  );

  if (chan === "wa" && phone) {
    const href = whatsAppHref(phone, waMessage);
    if (href) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="admin-contact-wa"
          title={phone}
          onClick={(e) => e.stopPropagation()}
        >
          {inner}
        </a>
      );
    }
  }

  if (chan === "phone" && phone) {
    const tel = phone.replace(/[^\d+]/g, "");
    return (
      <a
        href={`tel:${tel}`}
        className="admin-contact-tel"
        onClick={(e) => e.stopPropagation()}
      >
        {inner}
      </a>
    );
  }

  return inner;
}
