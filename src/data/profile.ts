import { bio, skillGroups, timeline } from "./about";
import { clientWork, projects } from "./projects";
import { funFact, hobbies, site } from "./site";
import notes from "./ai-notes.md?raw";

/** Placeholder text like "[Add one AI feature here]" shouldn't reach the AI. */
const clean = (s: string) => {
  const out = s.replace(/\s*\[[^\]]*\]\s*/g, " ").trim();
  return /[\p{L}\p{N}]/u.test(out) ? out : "";
};
const cleanList = (items: string[]) => items.map(clean).filter(Boolean).join(", ");

/** Compact plain-text profile sent to the LLM as context (~600 tokens). */
export function buildProfile(): string {
  const lines = [
    `Name: ${site.name}. Role: ${site.role}. Based in ${site.location}. Email: ${site.email}.`,
    `Summary: ${site.tagline}`,
    `Bio: ${bio.join(" ")}`,
    `Availability: open to front-end and AI engineering roles in the UAE or remote, and to freelance builds.`,
    `Experience: ${timeline.map((t) => `${clean(t.title)} — ${clean(t.where)}${clean(t.when) ? ` (${clean(t.when)})` : ""}`).join("; ")}.`,
    `Projects:`,
    ...projects.map(
      (p) =>
        `- ${p.title}${p.badge ? ` [${p.badge.label}]` : ""}: ${clean(p.summary)} Stack: ${cleanList(p.stack)}.` +
        (p.highlights ? ` Highlights: ${p.highlights.map(clean).filter(Boolean).join("; ")}.` : "") +
        (p.url ? ` Live: ${p.url}` : ""),
    ),
    `Client work: ${clientWork.title}`,
    `Skills: ${skillGroups.map((g) => `${g.title}: ${g.items.join(", ")}`).join(" | ")} (★ = currently learning).`,
    `Hobbies: ${hobbies.map((h) => h.label).join("; ")}.`,
  ];
  const fact = clean(funFact.replace(/^Fun fact:\s*/, ""));
  if (fact) lines.push(`Fun fact: ${fact}`);

  // Free-form notes from ai-notes.md (comments and [placeholder] lines removed).
  const extra = notes
    .replace(/<!--[\s\S]*?-->/g, "")
    .split("\n")
    .map((l) => l.trimEnd())
    .filter((l) => l.trim() && !/\[[^\]]*\]/.test(l))
    .join("\n")
    .trim();
  // Skip if only headings are left (all examples still unfilled).
  if (extra.split("\n").some((l) => !l.startsWith("#"))) lines.push(`Extra notes from ${site.shortName}:\n${extra}`);

  return lines.join("\n");
}
