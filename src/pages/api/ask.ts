import type { APIRoute } from "astro";
import { GROQ_API_KEY, GROQ_MODEL } from "astro:env/server";
import { buildProfile } from "@/data/profile";
import { site } from "@/data/site";

// Runs on demand as a serverless function; everything else is static.
export const prerender = false;

const MAX_QUESTION = 400;
const MAX_HISTORY = 6;
const PER_IP_PER_HOUR = 15;
// Free-tier models, tried in order. Check https://console.groq.com/docs/models if these get retired.
const DEFAULT_MODELS = ["openai/gpt-oss-20b", "openai/gpt-oss-120b"];

const SYSTEM_PROMPT = `You are the assistant on ${site.name}'s portfolio website. Visitors are mostly recruiters, clients and fellow developers.
Answer questions about ${site.shortName} using ONLY the profile below. Speak about ${site.shortName} in the third person.
Keep answers short: 1–3 sentences, plain text, no markdown, friendly and a little playful.
If the profile doesn't cover something, say you don't know that yet and suggest emailing ${site.email}. Never invent facts, numbers or employers.
If asked about something unrelated to ${site.shortName} (general coding help, homework, other topics), politely steer back to ${site.shortName}'s work.

PROFILE
${buildProfile()}`;

// Best-effort per-IP limit. Serverless instances don't share memory, so this
// just stops one visitor from burning the free daily quota in a loop.
const hits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 3_600_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > PER_IP_PER_HOUR;
}

// Token saver: reuse answers to repeat questions (only fresh questions, not follow-ups).
// Lives in the function's memory, so it's best-effort and clears on each redeploy.
const CACHE_TTL = 12 * 3_600_000;
const cache = new Map<string, { answer: string; at: number }>();
const cacheKey = (q: string) =>
  q.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, "").replace(/\s+/g, " ").trim();

type Turn = { role: "user" | "assistant"; content: string };

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });
}

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!GROQ_API_KEY) return json({ error: "not_configured" }, 503);

  let payload: { question?: unknown; history?: unknown };
  try {
    payload = await request.json();
  } catch {
    return json({ error: "bad_request" }, 400);
  }

  const question = typeof payload.question === "string" ? payload.question.trim().slice(0, MAX_QUESTION) : "";
  if (!question) return json({ error: "empty_question" }, 400);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || clientAddress || "unknown";
  if (rateLimited(ip)) return json({ error: "rate_limited" }, 429);

  const history: Turn[] = Array.isArray(payload.history)
    ? payload.history
        .filter(
          (t): t is Turn =>
            !!t && (t.role === "user" || t.role === "assistant") && typeof t.content === "string",
        )
        .slice(-MAX_HISTORY)
        .map((t) => ({ role: t.role, content: t.content.slice(0, MAX_QUESTION) }))
    : [];

  const key = history.length === 0 ? cacheKey(question) : "";
  const cached = key ? cache.get(key) : undefined;
  if (cached && Date.now() - cached.at < CACHE_TTL) return json({ answer: cached.answer });

  const messages = [{ role: "system", content: SYSTEM_PROMPT }, ...history, { role: "user", content: question }];
  // Groq retires models from time to time; if one is gone, try the next.
  const models = [...new Set([GROQ_MODEL, ...DEFAULT_MODELS].filter((m): m is string => !!m))];

  for (const model of models) {
    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${GROQ_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          temperature: 0.5,
          // Reasoning models count their thinking against this budget, so keep it roomy.
          max_completion_tokens: 700,
          ...(model.startsWith("openai/gpt-oss") && { reasoning_effort: "low" }),
          messages,
        }),
        signal: AbortSignal.timeout(12_000),
      });

      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        console.error(`Groq error ${res.status} (${model})`, detail);
        if (res.status === 404 || detail.includes("model_not_found") || detail.includes("decommissioned")) continue;
        // 429 here means the free daily quota is used up; the widget falls back to offline answers.
        return json({ error: res.status === 429 ? "quota" : "upstream" }, 502);
      }

      const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
      const answer = data.choices?.[0]?.message?.content?.trim();
      if (!answer) {
        console.error(`Groq returned an empty answer (${model})`);
        continue;
      }
      if (key) {
        if (cache.size > 500) cache.clear();
        cache.set(key, { answer, at: Date.now() });
      }
      return json({ answer });
    } catch (err) {
      console.error(`Groq request failed (${model})`, err);
      return json({ error: "upstream" }, 502);
    }
  }
  return json({ error: "upstream" }, 502);
};
