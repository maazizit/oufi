import { NextResponse } from "next/server";
import {
  createRequest,
  exportDemoOverlayIfNeeded,
  getSettings,
} from "@/lib/data/repository";
import { overlaySetCookieHeader } from "@/lib/data/demo-sync";
import { feeFor } from "@/lib/utils";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const settings = await getSettings();
    const city = String(body.city || "");
    const fee =
      body.fee != null ? Number(body.fee) : city ? feeFor(settings, city) : null;

    if (!body.name || !body.chan || !city) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }

    const created = await createRequest({
      src: body.src === "cart" ? "cart" : body.src === "contact" ? "contact" : "form",
      type: body.type || (body.src === "cart" ? "prod" : "install"),
      svc: body.svc || "",
      svcother: body.svcother || "",
      name: String(body.name),
      company: body.company || "",
      city,
      addr: body.addr || "",
      local: body.local || "",
      surface: body.surface || "",
      rooms: body.rooms || "",
      cams: body.cams || "",
      place: body.place || "",
      net: body.net || "",
      exist: body.exist || "",
      delay: body.delay || "",
      budget: body.budget || "",
      chan: body.chan,
      phone: body.phone || "",
      email: body.email || "",
      slot: body.slot || "any",
      fee,
      desc: body.desc || "",
      items: Array.isArray(body.items) ? body.items : [],
    });

    const res = NextResponse.json({ ref: created.ref, request: created });
    const overlay = await exportDemoOverlayIfNeeded();
    if (overlay) {
      const c = overlaySetCookieHeader(overlay);
      res.cookies.set(c.name, c.value, c.options);
    }
    return res;
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
