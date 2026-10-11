"use client";

export function SectionHeader({
  eyebrow,
  title,
  lead,
  action,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
  action?: React.ReactNode;
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
