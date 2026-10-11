"use client";

import type { ReactNode } from "react";

export function SectionHeader({
  eyebrow,
  title,
  lead,
  action,
}: {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className={`sec-h${action ? " sec-h-row" : ""}`}>
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {lead ? <p className="ink2">{lead}</p> : null}
      </div>
      {action}
    </div>
  );
}
