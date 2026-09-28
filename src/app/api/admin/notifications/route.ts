import { NextResponse } from "next/server";
import { getNotifs, markNotifsRead } from "@/lib/data/repository";

export async function GET() {
  const notifs = await getNotifs();
  return NextResponse.json({
    notifs,
    unread: notifs.filter((n) => !n.read).length,
  });
}

export async function PATCH(req: Request) {
  const body = await req.json().catch(() => ({}));
  const ids = Array.isArray(body.ids) ? body.ids.map(String) : undefined;
  await markNotifsRead(ids);
  const notifs = await getNotifs();
  return NextResponse.json({
    ok: true,
    notifs,
    unread: notifs.filter((n) => !n.read).length,
  });
}
