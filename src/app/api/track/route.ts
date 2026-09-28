import { NextResponse } from "next/server";
import { trackRequest } from "@/lib/data/repository";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  if (!q.trim()) {
    return NextResponse.json({ request: null });
  }
  const request = await trackRequest(q.trim());
  if (!request) return NextResponse.json({ request: null });

  // Public tracking: strip internal notes
  const publicReq = {
    ...request,
    notes: [],
    phone: request.phone ? request.phone.replace(/.(?=.{2})/g, "•") : "",
    email: request.email ? request.email.replace(/.(?=@)/g, "•") : "",
    addr: "",
  };
  return NextResponse.json({ request: publicReq });
}
