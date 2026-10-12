import { NextResponse } from "next/server";
import { chatWithGroq, pingGroq } from "@/lib/chat/groq";
import { checkRateLimit, rateLimitKey } from "@/lib/chat/rate-limit";
import type { ChatTurn } from "@/lib/chat/types";
import type { Lang } from "@/lib/types";

export const runtime = "nodejs";

/** Diagnostic: vérifie la clé Groq côté serveur (sans exposer la clé). */
export async function GET() {
  const { configured, status, detail, model, modelCount } = await pingGroq();
  return NextResponse.json({
    groqConfigured: configured,
    groqHttpStatus: status,
    groqModel: model,
    groqModelCount: modelCount,
    ok: configured && status === 200,
    ...(detail ? { groqError: detail } : {}),
  });
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip");
  const key = rateLimitKey(ip);
  if (!checkRateLimit(key)) {
    return NextResponse.json({ error: "rate_limit" }, { status: 429 });
  }

  const body = await req.json().catch(() => ({}));
  const lang: Lang = body.lang === "ar" ? "ar" : "fr";
  const messages = Array.isArray(body.messages) ? (body.messages as ChatTurn[]) : [];
  const clean: ChatTurn[] = messages
    .filter((m) => m && (m.role === "user" || m.role === "assistant"))
    .map((m) => ({
      role: m.role,
      content: String(m.content || "").slice(0, 2000),
    }))
    .slice(-16);

  if (!clean.length || clean[clean.length - 1]?.role !== "user") {
    return NextResponse.json({ error: "invalid_messages" }, { status: 400 });
  }

  const payload = await chatWithGroq(lang, clean);
  return NextResponse.json(payload);
}
