import { catalogForPrompt, sanitizeLinks } from "./catalog";
import { normalizeDraft } from "./devis";
import type { ChatAssistantPayload, ChatTurn } from "./types";
import type { Lang } from "@/lib/types";

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

export async function chatWithGroq(
  lang: Lang,
  messages: ChatTurn[],
): Promise<ChatAssistantPayload> {
  const key = process.env.GROQ_API_KEY;
  const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";
  if (!key) {
    return {
      reply:
        lang === "ar"
          ? "المساعد غير متاح حالياً. يمكنكم طلب عرض سعر أو التواصل معنا."
          : "L’assistant est indisponible pour le moment. Utilisez le formulaire de devis ou contactez-nous.",
      links: sanitizeLinks([{ href: "/devis" }, { href: "/contact" }]),
    };
  }

  const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0.4,
      max_tokens: 600,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: systemPrompt(lang) },
        ...messages.slice(-12).map((m) => ({ role: m.role, content: m.content })),
      ],
    }),
  });

  if (!res.ok) {
    return {
      reply:
        lang === "ar"
          ? "حدث خطأ. جرّبوا لاحقاً أو اطلبوا عرض سعر مباشرة."
          : "Une erreur est survenue. Réessayez plus tard ou demandez un devis directement.",
      links: sanitizeLinks([{ href: "/devis" }]),
    };
  }

  const data = await res.json();
  const raw = data.choices?.[0]?.message?.content;
  try {
    const parsed = JSON.parse(String(raw || "{}")) as {
      reply?: string;
      links?: { href: string; titleFr?: string; titleAr?: string }[];
      draft?: unknown;
    };
    const reply = String(parsed.reply || "").slice(0, 1200);
    return {
      reply: reply || (lang === "ar" ? "كيف يمكنني مساعدتكم؟" : "Comment puis-je vous aider ?"),
      links: sanitizeLinks(Array.isArray(parsed.links) ? parsed.links : []),
      draft: normalizeDraft(parsed.draft),
    };
  } catch {
    return {
      reply: String(raw || "").slice(0, 1200),
      links: [],
    };
  }
}
