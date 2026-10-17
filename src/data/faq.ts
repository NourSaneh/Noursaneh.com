/**
 * "Quick answers" section + FAQPage schema.
 * Keep answers factual (from the CV / site) and ~40–60 words: that's the length
 * Google snippets and AI answer engines quote most easily.
 */
export interface FaqItem {
  q: string;
  a: string;
  link?: { label: string; href: string };
}

export const faq: FaqItem[] = [
  {
    q: "Who is Nour Saneh?",
    a: "Nour Saneh is a Creative AI Software Engineer based in Sharjah, UAE. Nour builds responsive web apps with React, TypeScript and Astro, and adds AI features with LLM APIs such as Claude and Groq. Nour holds a BSc in Computer Science from Lebanese International University (2020–2024).",
  },
  {
    q: "Where is Nour Saneh based?",
    a: "Nour is based in Sharjah, United Arab Emirates, is a UAE resident and holds a valid UAE driving licence. Nour is open to on-site roles anywhere in the UAE, including Dubai and Sharjah, as well as fully remote work.",
  },
  {
    q: "Is Nour available for hire?",
    a: "Yes. Nour is open to front-end and AI engineering roles in the UAE or remote, and to freelance builds. The fastest way to get in touch is the email in the Contact section below, or download the CV for full details.",
    link: { label: "Download CV", href: "/Nour-Saneh-CV.pdf" },
  },
  {
    q: "What has Nour built?",
    a: "Nour built TakeMeWhere, a UAE place-discovery platform with a custom 3-gem rating system and a 9-table Supabase backend; Baitna Cafe, a website concept for a rooftop café in Sharjah; and the Ask-my-AI chatbot on this site. At BrandXB in Dubai, Nour delivered 6+ live client websites for F&B brands.",
  },
  {
    q: "What is Nour's tech stack?",
    a: "Front-end: React, TypeScript, Next.js, Astro, Tailwind CSS and Vite. Back-end and data: Supabase (PostgreSQL with row-level security), Firebase and Cloudinary. AI: the Claude API, Groq, prompt design, RAG and the Model Context Protocol (MCP). Tools: Git, GitHub, Figma, Vercel and technical SEO.",
  },
  {
    q: "What AI experience does Nour have?",
    a: "Nour completed Anthropic Academy's Build with Claude program (10 courses covering the Claude API, tool use, RAG, MCP and agents) and built this site's AI chatbot, which answers questions about Nour's work using an open-source model on Groq. Nour is currently going deeper on RAG, embeddings and Python.",
  },
];
