import { projects } from "./projects";
import { site } from "./site";
import { skillGroups } from "./about";

/**
 * Tiny offline "brain" for the Ask-my-AI widget.
 * It matches keywords against what's on this site so the widget works
 * with zero backend. Set PUBLIC_ASK_ENDPOINT to route questions to a
 * real LLM endpoint instead (see AskAI.tsx).
 */

const list = (items: string[]) =>
  items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items.at(-1)}`;

const allSkills = skillGroups.flatMap((g) => g.items.map((i) => i.replace(" ★", "")));

interface Intent {
  keywords: string[];
  answer: () => string;
}

const intents: Intent[] = [
  {
    keywords: ["built", "build", "projects", "project", "work", "portfolio", "made", "shipped"],
    answer: () =>
      `Nour has built ${list(projects.map((p) => p.title))}. The flagship is TakeMeWhere — ${projects[0].summary.charAt(0).toLowerCase()}${projects[0].summary.slice(1)}`,
  },
  {
    keywords: ["stack", "tech", "tools", "skills", "languages", "framework"],
    answer: () => `Day to day: ${list(allSkills.slice(0, 9))}. Currently levelling up on RAG and embeddings.`,
  },
  {
    keywords: ["takemewhere", "take me where", "places", "gem"],
    answer: () =>
      `TakeMeWhere is a UAE-wide place discovery platform with a custom 3-gem rating system, built on React, TypeScript and a Supabase backend with 9 tables and row-level security.`,
  },
  {
    keywords: ["momento", "momentosite", "event", "wedding"],
    answer: () =>
      `MomentoSite is a drag-and-drop builder for temporary event websites — weddings, launches, birthdays. It's built with React, TypeScript, Firebase and Zustand, and it's in progress.`,
  },
  {
    keywords: ["ai", "llm", "rag", "gpt", "claude", "prompt", "machine"],
    answer: () =>
      `Nour works with LLM APIs, prompt design and Make.com automation, and is learning RAG / embeddings right now. This chat is one of those experiments!`,
  },
  {
    keywords: ["available", "availability", "hire", "hiring", "job", "role", "freelance"],
    answer: () =>
      `Nour is open to front-end and AI engineering roles in the UAE or remote, plus fun freelance builds. Drop a line at ${site.email}.`,
  },
  {
    keywords: ["contact", "email", "reach", "linkedin", "call", "talk"],
    answer: () => `Best way is email: ${site.email}. You can also find Nour on LinkedIn and GitHub — links are at the bottom of the page.`,
  },
  {
    keywords: ["where", "location", "based", "live", "uae", "dubai", "sharjah"],
    answer: () => `Nour is based in ${site.location}, and happy to work remotely.`,
  },
  {
    keywords: ["education", "study", "degree", "university", "cs", "graduate"],
    answer: () => `Nour has a BSc in Computer Science from Lebanese International University (2020 — 2024).`,
  },
  {
    keywords: ["hobby", "hobbies", "fun", "free", "guitar", "pokemon", "pokémon", "russian", "food"],
    answer: () =>
      `Off the clock: shredding on electric guitar, Pokémon GO PvP in Master League, learning Russian and hunting hidden food spots in Dubai.`,
  },
  {
    keywords: ["experience", "agency", "brandxb", "wordpress", "woocommerce", "seo", "client"],
    answer: () =>
      `Nour coordinated web projects at BrandXB, a Dubai agency, for F&B brands — WordPress & WooCommerce builds, Make.com automations, QA and technical SEO.`,
  },
  {
    keywords: ["hi", "hello", "hey", "salam", "привет"],
    answer: () => `Hey! 👋 Ask me about Nour's projects, stack or availability.`,
  },
];

const fallback =
  "Good question — I don't have that one yet. Try asking about projects, the stack, or availability, or email Nour directly.";

function score(question: string) {
  const q = question.toLowerCase();
  const words = new Set(q.split(/[^\p{L}\p{N}]+/u).filter(Boolean));
  return intents
    .map((intent) => ({
      intent,
      score: intent.keywords.filter((k) => (k.includes(" ") ? q.includes(k) : words.has(k))).length,
    }))
    .sort((a, b) => b.score - a.score);
}

/** Best offline answer, or a polite fallback. Used when the live AI is unavailable. */
export function localAnswer(question: string): string {
  const [best] = score(question);
  return best.score > 0 ? best.intent.answer() : fallback;
}

/**
 * Token saver: answers short, clear-cut questions ("Your stack?", "Where are you based?")
 * offline so they never reach the AI. Returns null when the AI should handle it:
 * longer or detailed questions, no keyword match, or two topics matching equally.
 */
export function quickAnswer(question: string): string | null {
  const wordCount = question.trim().split(/\s+/).length;
  if (wordCount > 6) return null;
  const [best, runnerUp] = score(question);
  if (best.score === 0 || runnerUp?.score === best.score) return null;
  return best.intent.answer();
}
