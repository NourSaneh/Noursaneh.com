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
  /** Mystery "coming soon" card: details hidden, not sent to the AI. */
  teaser?: boolean;
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
    // Teaser card: a "coming soon" placeholder with no details or links.
    // When the project is ready, replace this entry with a normal one (delete `teaser: true`).
    slug: "next-project",
    title: "Next project",
    teaser: true,
    summary: "Something new is cooking. Ask my AI if you're curious — or check back soon.",
    categories: ["web", "ai"],
    stack: [],
    badge: { label: "Coming soon", className: "bg-sun rotate-4" },
    media: { color: "bg-blush", placeholder: "" },
  },
  {
    slug: "baitna-cafe",
    title: "Baitna Cafe",
    summary:
      "A fast, mobile-first website concept for a rooftop café in Sharjah — book a table, order delivery, see events and the menu in one place, with a no-code editor so staff can update it themselves.",
    categories: ["web"],
    stack: ["Astro", "Tailwind v4", "Keystatic", "Vercel"],
    url: "https://baitna-cafe-pied.vercel.app",
    code: "https://github.com/NourSaneh/BaitnaCafe",
    badge: { label: "Concept", className: "bg-white -rotate-4" },
    media: { color: "bg-mint", placeholder: "Baitna Cafe homepage", image: "/projects/baitna-cafe.webp" },
  },
  {
    slug: "ask-my-ai",
    title: "Ask-my-AI Bot",
    dark: true,
    summary:
      "The chat on this site's homepage — an AI assistant that answers questions about my work, powered by an open-source LLM on Groq and grounded in my own project data.",
    categories: ["ai"],
    stack: ["Groq · GPT-OSS", "Astro", "React", "Vercel"],
    caseStudy: "#ask",
    badge: { label: "AI · Live", className: "bg-sun rotate-3" },
    media: { color: "bg-cobalt", placeholder: "“What has Nour built?”" },
  },
];

export const clientWork = {
  label: "Client work · BrandXB, Dubai",
  title: "WordPress & WooCommerce sites, Make.com automations and technical SEO for F&B brands.",
  // `src` is optional — clients without a logo file show their name instead.
  logos: [
    { name: "Carrot Sun", url: "https://www.carrotsunoil.com/", src: "/logos/carrot-sun.jpg" },
    { name: "Maamouly", url: "https://maamouly.com/", src: "/logos/maamouly.png" },
    { name: "Artisanal Pi", url: "https://artisanalpi.com/", src: "/logos/artisanal-pi.webp" },
  ] as { name: string; url: string; src?: string }[],
};
