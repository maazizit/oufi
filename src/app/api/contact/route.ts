import { NextResponse } from "next/server";
import { createRequest } from "@/lib/data/repository";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name || !body.contact || !body.msg) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }
    const isMail = String(body.contact).includes("@");
    await createRequest({
      src: "contact",
      type: "fix",
      svc: "other",
      name: String(body.name),
      city: "Casablanca",
      chan: isMail ? "mail" : "phone",
      phone: isMail ? "" : String(body.contact),
      email: isMail ? String(body.contact) : "",
      desc: String(body.msg),
      svcother: "Message rapide contact",
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}
