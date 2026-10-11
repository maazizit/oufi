import type { ReactNode } from "react";

/**
 * Isolates Western digits / Latin tokens in RTL so punctuation stays correct.
 * Morocco: keep digits 0–9 (not Eastern Arabic-Indic).
 */
export function Num({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <bdi dir="ltr" className={className}>
      {children}
    </bdi>
  );
}

/** Latin / digit runs that need isolation inside Arabic copy. */
const BIDI_TOKEN =
  /(?:C\.I\.S\.|AMANPLANET|AMP-\d{4}-\d+|NVR\/DVR|Wi-Fi|PoE\+?|Cat\d(?:\s+UTP)?|UniFi(?:\s+U\d\s+\w+)?|Supabase|Français|PTZ|XVR|SSD|TCP\/IP|USB|IP|hEX\s+RB[\w]+|AX\d+|RB[\w]+|i\d|\+212[\d\s\-]+|\d[\d\s.\-×xX/+%]*(?:MP|Go|To|Gb\/s|Mb\/s|GHz|mm|W|VA)?)/g;

/**
 * Wraps Latin / digit tokens in Arabic (or mixed) strings with &lt;Num&gt;.
 * French strings are returned unchanged.
 */
export function BidiText({
  text,
  lang,
}: {
  text: string;
  lang: "fr" | "ar";
}) {
  if (lang !== "ar" || !text) return <>{text}</>;
  const parts: ReactNode[] = [];
  let last = 0;
  let m: RegExpExecArray | null;
  const re = new RegExp(BIDI_TOKEN.source, "g");
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(<Num key={`${m.index}-${m[0]}`}>{m[0]}</Num>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  if (parts.length === 0) return <>{text}</>;
  return <>{parts}</>;
}
