import { catalogForPrompt, sanitizeLinks } from "./catalog";
import { normalizeDraft } from "./devis";
import type { ChatAssistantPayload, ChatTurn } from "./types";
import type { Lang } from "@/lib/types";

const DEFAULT_MODEL = "llama-3.1-8b-instant";
const ALLOWED_MODELS = new Set([
  DEFAULT_MODEL,
  "llama-3.3-70b-versatile",
  "llama-3.1-70b-versatile",
  "mixtral-8x7b-32768",
]);

function normalizeGroqKey(raw: string | undefined): string {
  if (!raw) return "";
  let k = raw.trim();
  if (k.toLowerCase().startsWith("bearer ")) k = k.slice(7).trim();
  if (
    (k.startsWith('"') && k.endsWith('"')) ||
    (k.startsWith("'") && k.endsWith("'"))
  ) {
    k = k.slice(1, -1).trim();
  }
  return k;
}

function resolveModel(): string {
  const fromEnv = process.env.GROQ_MODEL?.trim();
  if (fromEnv && ALLOWED_MODELS.has(fromEnv)) return fromEnv;
  return DEFAULT_MODEL;
}

function modelsToTry(): string[] {
  const preferred = resolveModel();
  return [...new Set([DEFAULT_MODEL, preferred])];
}

function systemPrompt(lang: Lang): string {
  const langLine =
    lang === "ar"
      ? "Réponds UNIQUEMENT en arabe clair (arabe standard, ton professionnel marocain léger si naturel)."
      : "Réponds UNIQUEMENT en français (ton professionnel, AMANPLANET / sécurité & réseau au Maroc).";

  return `Tu es l'assistant du site AMANPLANET (vidéosurveillance, réseau, alarme, domotique — Maroc).
${langLine}

Règles strictes:
- Ne jamais annoncer un prix ferme ni confirmer un rendez-vous à une date/heure précise.
- Orienter vers devis, visite sur site, ou contact humain pour les engagements.
- Réponses courtes (max ~120 mots).
- Proposer 0 à 3 pages du site (href EXACT depuis la liste).
- Remplir "draft" avec les infos client déjà mentionnées (ville, type install, nb caméras, etc.).

Pages autorisées:
${catalogForPrompt()}

Réponds en JSON uniquement, schéma:
{
  "reply": "texte",
  "links": [{"href":"/devis","titleFr":"...","titleAr":"..."}],
  "draft": {"type":"install|prod|maint|fix","svc":"cam|net|it|acc|other","city":"","desc":"","cams":"","local":"shop|cafe|office|depot|villa|other","name":"","company":"","addr":"","phone":""}
}`;
}

function extractJsonObject(text: string): Record<string, unknown> | null {
  const t = text.trim();
  try {
    return JSON.parse(t) as Record<string, unknown>;
  } catch {
    /* continue */
  }
  const fenced = t.match(/```(?:json)?\s*([\s\S]*?)```/i);
  if (fenced?.[1]) {
    try {
      return JSON.parse(fenced[1].trim()) as Record<string, unknown>;
    } catch {
      /* continue */
    }
  }
  const start = t.indexOf("{");
  const end = t.lastIndexOf("}");
  if (start >= 0 && end > start) {
    try {
      return JSON.parse(t.slice(start, end + 1)) as Record<string, unknown>;
    } catch {
      return null;
    }
  }
  return null;
}

function groqAuthOrConfigError(status: number, errText: string): boolean {
  if (status === 401 || status === 403) return true;
  const lower = errText.toLowerCase();
  return (
    lower.includes("invalid_api_key") ||
    lower.includes("invalid api key") ||
    lower.includes("incorrect api key") ||
    lower.includes("permission denied")
  );
}

function unavailablePayload(lang: Lang, kind: "missing" | "auth" | "rate" | "generic"): ChatAssistantPayload {
  const links = sanitizeLinks([{ href: "/devis" }, { href: "/contact" }]);
  if (kind === "missing" || kind === "auth") {
    return {
      reply:
        lang === "ar"
          ? "المساعد غير مُهيأ بعد. استخدموا نموذج العرض أو اتصلوا بنا."
          : "L’assistant n’est pas encore configuré. Utilisez le devis ou contactez-nous.",
      links,
    };
  }
  if (kind === "rate") {
    return {
      reply:
        lang === "ar"
          ? "الطلبات كثيرة حالياً. جرّبوا بعد قليل أو اطلبوا عرض سعر."
          : "Trop de demandes pour l’instant. Réessayez dans un moment ou demandez un devis.",
      links,
    };
  }
  return {
    reply:
      lang === "ar"
        ? "حدث خطأ. جرّبوا لاحقاً أو اطلبوا عرض سعر مباشرة."
        : "Une erreur est survenue. Réessayez plus tard ou demandez un devis directement.",
    links,
  };
}

function payloadFromGroqContent(
  lang: Lang,
  raw: string,
): ChatAssistantPayload {
  const parsed = extractJsonObject(raw);
  if (parsed && typeof parsed.reply === "string") {
    return {
      reply: String(parsed.reply).slice(0, 1200),
      links: sanitizeLinks(
        Array.isArray(parsed.links)
          ? (parsed.links as { href: string; titleFr?: string; titleAr?: string }[])
          : [],
      ),
      draft: normalizeDraft(parsed.draft),
    };
  }
  if (parsed) {
    return {
      reply:
        lang === "ar" ? "كيف يمكنني مساعدتكم؟" : "Comment puis-je vous aider ?",
      links: [],
      draft: normalizeDraft(parsed.draft),
    };
  }
  return {
    reply: raw.slice(0, 1200),
    links: [],
  };
}

/** Minimal Groq ping for ops (does not expose secrets). */
export async function pingGroq(): Promise<{
  configured: boolean;
  status: number;
  detail?: string;
}> {
  const key = normalizeGroqKey(process.env.GROQ_API_KEY);
  if (!key || !key.startsWith("gsk_")) {
    return { configured: false, status: 0 };
  }
  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: DEFAULT_MODEL,
      max_tokens: 8,
      messages: [{ role: "user", content: "ping" }],
    }),
  });
  const detail = res.ok ? undefined : (await res.text()).slice(0, 280);
  return { configured: true, status: res.status, detail };
}

export async function chatWithGroq(
  lang: Lang,
  messages: ChatTurn[],
): Promise<ChatAssistantPayload> {
  const key = normalizeGroqKey(process.env.GROQ_API_KEY);
  const models = modelsToTry();

  if (!key) {
    return unavailablePayload(lang, "missing");
  }
  if (!key.startsWith("gsk_")) {
    console.error("[chat/groq] GROQ_API_KEY format invalid (expected gsk_…)", key.length);
    return unavailablePayload(lang, "auth");
  }

  const groqMessages = [
    { role: "system", content: systemPrompt(lang) },
    ...messages.slice(-12).map((m) => ({ role: m.role, content: m.content })),
  ];

  async function callGroq(modelName: string, jsonMode: boolean) {
    const body: Record<string, unknown> = {
      model: modelName,
      temperature: 0.4,
      max_tokens: 600,
      messages: groqMessages,
    };
    if (jsonMode) body.response_format = { type: "json_object" };
    return fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  }

  const attempts: { model: string; jsonMode: boolean }[] = [];
  for (const m of models) {
    attempts.push({ model: m, jsonMode: false });
    attempts.push({ model: m, jsonMode: true });
  }

  let lastStatus = 0;
  let lastErr = "";

  for (const { model: m, jsonMode } of attempts) {
    const res = await callGroq(m, jsonMode);
    if (res.ok) {
      const data = await res.json();
      const raw = String(data.choices?.[0]?.message?.content || "");
      return payloadFromGroqContent(lang, raw);
    }
    lastStatus = res.status;
    lastErr = await res.text().catch(() => "");
    if (groqAuthOrConfigError(res.status, lastErr)) {
      console.error("[chat/groq]", res.status, lastErr.slice(0, 240));
      return unavailablePayload(lang, "auth");
    }
    if (res.status === 429) {
      return unavailablePayload(lang, "rate");
    }
  }

  console.error("[chat/groq]", lastStatus, lastErr.slice(0, 240));
  return unavailablePayload(lang, "generic");
}
