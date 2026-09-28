import { jsPDF } from "jspdf";
import type { Product, Request, Settings } from "@/lib/types";

export type DevisLine = {
  name: string;
  q: number;
  price: number;
  inst: boolean;
};

function money(n: number) {
  return (
    new Intl.NumberFormat("fr-MA", {
      style: "currency",
      currency: "MAD",
      maximumFractionDigits: 0,
    }).format(n) + " TTC"
  );
}

async function loadLogoDataUrl(): Promise<string | null> {
  try {
    const res = await fetch("/brand/amanplanet-logo.png");
    if (!res.ok) return null;
    const blob = await res.blob();
    return await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || "") || null);
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(blob);
    });
  } catch {
    return null;
  }
}

export async function buildDevisPdf(opts: {
  request: Request;
  settings: Settings;
  lines: DevisLine[];
  products?: Product[];
}): Promise<Blob> {
  const { request, settings, lines } = opts;
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 16;
  let y = 16;

  const logo = await loadLogoDataUrl();
  if (logo) {
    try {
      doc.addImage(logo, "PNG", margin, y - 2, 18, 18);
    } catch {
      /* ignore logo failures */
    }
  }

  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(10, 37, 64);
  doc.text(settings.company || "AMANPLANET", margin + (logo ? 22 : 0), y + 4);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(80, 90, 100);
  doc.text("C.I.S. — Conseil • Installation • Suivi", margin + (logo ? 22 : 0), y + 10);
  doc.text(settings.phone || "", pageW - margin, y + 4, { align: "right" });
  doc.text(settings.email || "", pageW - margin, y + 9, { align: "right" });
  y += 24;

  doc.setDrawColor(0, 120, 180);
  doc.setLineWidth(0.6);
  doc.line(margin, y, pageW - margin, y);
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(10, 37, 64);
  doc.text("DEVIS", margin, y);
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 70, 80);
  doc.text(`Réf. demande : ${request.ref}`, pageW - margin, y, { align: "right" });
  y += 7;
  doc.text(
    `Date : ${new Date().toLocaleDateString("fr-MA")}`,
    pageW - margin,
    y,
    { align: "right" },
  );
  y += 10;

  doc.setFont("helvetica", "bold");
  doc.setTextColor(10, 37, 64);
  doc.text("Client", margin, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setTextColor(40, 50, 60);
  const clientLines = [
    request.name,
    request.company,
    [request.addr, request.city].filter(Boolean).join(" — "),
    request.phone,
    request.email,
  ].filter(Boolean);
  for (const line of clientLines) {
    doc.text(String(line), margin, y);
    y += 5;
  }
  y += 4;

  if (request.desc) {
    doc.setFont("helvetica", "bold");
    doc.text("Objet", margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    const split = doc.splitTextToSize(request.desc, pageW - margin * 2);
    doc.text(split, margin, y);
    y += split.length * 5 + 4;
  }

  const tableTop = y;
  doc.setFillColor(10, 37, 64);
  doc.rect(margin, tableTop, pageW - margin * 2, 8, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.text("Désignation", margin + 2, tableTop + 5.5);
  doc.text("Qté", pageW - margin - 55, tableTop + 5.5);
  doc.text("P.U.", pageW - margin - 35, tableTop + 5.5);
  doc.text("Total", pageW - margin - 2, tableTop + 5.5, { align: "right" });
  y = tableTop + 12;

  doc.setFont("helvetica", "normal");
  doc.setTextColor(30, 40, 50);
  let total = 0;

  const rows =
    lines.length > 0
      ? lines
      : [
          {
            name: request.svc
              ? `Prestation — ${request.svc}`
              : "Étude / installation (détail après visite)",
            q: 1,
            price: 0,
            inst: false,
          },
        ];

  for (const row of rows) {
    if (y > 260) {
      doc.addPage();
      y = 20;
    }
    const lineTotal = row.price * row.q;
    total += lineTotal;
    const label = row.inst ? `${row.name} (+ pose)` : row.name;
    const nameLines = doc.splitTextToSize(label, pageW - margin * 2 - 70);
    doc.text(nameLines, margin + 2, y);
    doc.text(String(row.q), pageW - margin - 55, y);
    doc.text(row.price ? money(row.price) : "—", pageW - margin - 35, y);
    doc.text(row.price ? money(lineTotal) : "Sur devis", pageW - margin - 2, y, {
      align: "right",
    });
    y += Math.max(7, nameLines.length * 5);
  }

  if (request.fee != null && request.fee > 0) {
    y += 2;
    doc.text("Frais d'état des lieux (déductibles si travaux confirmés)", margin + 2, y);
    doc.text(money(request.fee), pageW - margin - 2, y, { align: "right" });
    total += request.fee;
    y += 7;
  }

  y += 4;
  doc.setDrawColor(200, 210, 220);
  doc.line(margin, y, pageW - margin, y);
  y += 8;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(10, 37, 64);
  doc.text("Total indicatif", margin, y);
  doc.text(total > 0 ? money(total) : "Sur devis après visite", pageW - margin, y, {
    align: "right",
  });
  y += 10;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(100, 110, 120);
  const notes = [
    "Devis indicatif — prix hors installation sauf mention contraire. Aucun paiement en ligne.",
    "Validité : 15 jours. Confirmation après état des lieux sur site.",
    "C.I.S. = Conseil • Installation • Suivi.",
  ];
  for (const n of notes) {
    doc.text(n, margin, y);
    y += 4;
  }

  return doc.output("blob");
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
