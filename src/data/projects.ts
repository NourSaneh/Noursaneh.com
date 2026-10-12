export type Category = "ai" | "web" | "client";

export interface Project {
  slug: string;
  title: string;
  summary: string;
  categories: Category[];
  stack: string[];
  highlights?: string[];
  url?: string;
  caseStudy?: string;
  code?: string;
  badge?: { label: string; className: string };
  media: { color: string; placeholder: string; domain?: string; image?: string };
  featured?: boolean;
  dark?: boolean;
}

export const filters: { id: "all" | Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "ai", label: "AI" },
  { id: "web", label: "Web apps" },
  { id: "client", label: "Client work" },
];

export const projects: Project[] = [
  {
    slug: "takemewhere",
    title: "TakeMeWhere",
    featured: true,
    summary:
      "A UAE-wide place discovery platform for Gen-Z locals, expats and tourists — find where to go next, rated with a 3-gem system.",
    highlights: [
      "Full Supabase backend: 9 tables, row-level security, auth triggers",
      "Custom 3-gem rating system",
      "[Add one AI feature here — e.g. smart place recommendations]",
    ],
    categories: ["web", "ai"],
    stack: ["React", "TypeScript", "Vite", "Tailwind v4", "Supabase", "Cloudinary", "Vercel"],
    url: "https://takemewhere.com",
    caseStudy: "#case-takemewhere",
    code: "#code-takemewhere",
    badge: { label: "Featured", className: "bg-coral -rotate-3" },
    media: { color: "bg-sky", placeholder: "[Screenshot or screen recording of TakeMeWhere]", domain: "takemewhere.com" },
  },
  {
    slug: "momentosite",
    title: "MomentoSite",
    summary: "A drag-and-drop builder for temporary event websites — weddings, launches, birthdays — live in minutes.",
    categories: ["web"],
    stack: ["React", "TypeScript", "Firebase", "Zustand"],
    caseStudy: "#case-momentosite",
    badge: { label: "In progress", className: "bg-sun rotate-4" },
    media: { color: "bg-blush", placeholder: "[MomentoSite editor screenshot]" },
  },
  {
    slug: "driving-quiz",
    title: "Driving Theory Quiz",
    summary: "Practice driving-theory questions with instant feedback and progress tracking. [Adjust to final features]",
    categories: ["web"],
    stack: ["JavaScript", "React"],
    caseStudy: "#case-quiz",
    badge: { label: "Building", className: "bg-white -rotate-4" },
    media: { color: "bg-mint", placeholder: "[Driving quiz screenshot]" },
  },
  {
    slug: "ask-my-ai",
    title: "Ask-my-AI Bot",
    dark: true,
    summary:
      "The chat on this site's homepage — an AI assistant that answers questions about my work, powered by an open-source LLM on Groq and grounded in my own project data.",
    categories: ["ai"],
    stack: ["Groq · Llama 3.1", "Astro", "React", "Vercel"],
    caseStudy: "#ask",
    badge: { label: "AI · Live", className: "bg-sun rotate-3" },
    media: { color: "bg-cobalt", placeholder: "“What has Nour built?”" },
  },
];

export const clientWork = {
  label: "Client work · BrandXB, Dubai",
  title: "WordPress & WooCommerce sites, Make.com automations and technical SEO for F&B brands.",
  logos: ["[Client logo]", "[Client logo]", "[Client logo]"],
};
