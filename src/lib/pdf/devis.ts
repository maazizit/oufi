import { jsPDF } from "jspdf";
import type { Product, Request, Settings } from "@/lib/types";

export type DevisLine = {
  name: string;
  q: number;
  price: number;
  inst: boolean;
};

/** Compact amount for table cells (avoids overlap). */
function moneyShort(n: number) {
  return (
    new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 0,
    }).format(n) + " DH"
  );
}

function moneyTotal(n: number) {
  return (
    new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 0,
    }).format(n) + " DH TTC"
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

function clientPlace(request: Request): string {
  const addr = (request.addr || "").trim();
  const city = (request.city || "").trim();
  if (addr && city) {
    // Avoid "Maarif — Casablanca" noise when quartier already implies the city
    if (addr.toLowerCase().includes(city.toLowerCase())) return addr;
    return addr;
  }
  return addr || city;
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
  const margin = 14;
  const contentW = pageW - margin * 2;

  // Column layout (mm from left margin)
  const colName = margin;
  const colQty = margin + contentW - 78; // qty center zone
  const colPu = margin + contentW - 52; // PU right edge
  const colTotal = margin + contentW; // total right edge
  const nameWidth = contentW - 82;

  let y = 14;

  const logo = await loadLogoDataUrl();
  if (logo) {
    try {
      doc.addImage(logo, "PNG", margin, y - 2, 16, 16);
    } catch {
      /* ignore logo failures */
    }
  }

  const leftX = margin + (logo ? 20 : 0);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(10, 37, 64);
  doc.text(settings.company || "AMANPLANET", leftX, y + 4);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8.5);
  doc.setTextColor(80, 90, 100);
  doc.text("C.I.S. — Conseil • Installation • Suivi", leftX, y + 9);
  doc.text(settings.phone || "", pageW - margin, y + 3, { align: "right" });
  doc.text(settings.email || "", pageW - margin, y + 8, { align: "right" });
  y += 20;

  doc.setDrawColor(0, 120, 180);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageW - margin, y);
  y += 9;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(10, 37, 64);
  doc.text("DEVIS", margin, y);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 70, 80);
  doc.text(`Réf. : ${request.ref}`, pageW - margin, y, { align: "right" });
  y += 5;
  doc.text(`Date : ${new Date().toLocaleDateString("fr-MA")}`, pageW - margin, y, {
    align: "right",
  });
  y += 9;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(10, 37, 64);
  doc.text("Client", margin, y);
  y += 5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9.5);
  doc.setTextColor(40, 50, 60);
  const clientLines = [
    request.name,
    request.company,
    clientPlace(request),
    request.phone,
    request.email,
  ].filter(Boolean);
  for (const line of clientLines) {
    doc.text(String(line), margin, y);
    y += 4.5;
  }
  y += 3;

  if (request.desc) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(10, 37, 64);
    doc.text("Objet", margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(40, 50, 60);
    const split = doc.splitTextToSize(request.desc, contentW);
    doc.text(split, margin, y);
    y += split.length * 4.5 + 4;
  }

  const rowH = 8;
  const tableTop = y;
  doc.setFillColor(10, 37, 64);
  doc.rect(margin, tableTop, contentW, rowH, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.text("Désignation", colName + 2, tableTop + 5.2);
  doc.text("Qté", colQty + 8, tableTop + 5.2, { align: "center" });
  doc.text("P.U.", colPu, tableTop + 5.2, { align: "right" });
  doc.text("Total", colTotal, tableTop + 5.2, { align: "right" });
  y = tableTop + rowH + 4;

  doc.setFont("helvetica", "normal");
  doc.setTextColor(30, 40, 50);
  doc.setFontSize(8.5);
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
    if (y > 255) {
      doc.addPage();
      y = 20;
    }
    const lineTotal = row.price * row.q;
    total += lineTotal;
    const label = row.inst ? `${row.name} (+ pose)` : row.name;
    const nameLines = doc.splitTextToSize(label, nameWidth);
    const blockH = Math.max(6, nameLines.length * 4);

    doc.text(nameLines, colName + 2, y);
    doc.text(String(row.q), colQty + 8, y, { align: "center" });
    doc.text(row.price ? moneyShort(row.price) : "—", colPu, y, { align: "right" });
    doc.text(row.price ? moneyShort(lineTotal) : "Sur devis", colTotal, y, {
      align: "right",
    });
    y += blockH + 2;
  }

  if (request.fee != null && request.fee > 0) {
    if (y > 255) {
      doc.addPage();
      y = 20;
    }
    y += 1;
    const feeLabel = doc.splitTextToSize(
      "Frais d'état des lieux (déductibles si travaux confirmés)",
      nameWidth,
    );
    doc.text(feeLabel, colName + 2, y);
    doc.text(moneyShort(request.fee), colTotal, y, { align: "right" });
    total += request.fee;
    y += Math.max(6, feeLabel.length * 4) + 2;
  }

  y += 3;
  doc.setDrawColor(200, 210, 220);
  doc.line(margin, y, pageW - margin, y);
  y += 7;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.setTextColor(10, 37, 64);
  doc.text("Total indicatif", margin, y);
  doc.text(total > 0 ? moneyTotal(total) : "Sur devis après visite", pageW - margin, y, {
    align: "right",
  });
  y += 9;

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 110, 120);
  const notes = [
    "Devis indicatif — prix hors installation sauf mention « + pose ». Aucun paiement en ligne.",
    "Validité : 15 jours. Confirmation après état des lieux sur site.",
    "C.I.S. = Conseil • Installation • Suivi.",
  ];
  for (const n of notes) {
    const linesN = doc.splitTextToSize(n, contentW);
    doc.text(linesN, margin, y);
    y += linesN.length * 3.6 + 1;
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
