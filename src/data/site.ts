// Anti-spam: the email is stored as two reversed pieces and only joined at runtime,
// so bots scanning the page source never see a plain address.
// To change it, reverse each half: "name@example.com" → ["eman", "moc.elpmaxe"].
const emailParts = ["43henasruon", "moc.liamg"];
const reverse = (s: string) => [...s].reverse().join("");
export const getEmail = () => `${reverse(emailParts[0])}@${reverse(emailParts[1])}`;

export const site = {
  name: "Nour Saneh",
  shortName: "Nour",
  role: "Creative AI Software Engineer",
  tagline: "Front-end developer building AI-powered web products people enjoy using.",
  location: "Sharjah, UAE",
  country: "United Arab Emirates",
  // TODO: replace placeholders with your real links
  get email() {
    return getEmail();
  },
  links: {
    linkedin: "https://www.linkedin.com/in/noursaneh",
    github: "https://github.com/NourSaneh",
    cv: "/Nour-Saneh-CV.pdf",
  },
  nowBuilding: ["TakeMeWhere", "something secret 🤫"],
  // Self-hosted Umami (Coolify). Paste the Website ID from Umami → Settings → Websites.
  // Tracking stays off while websiteId is empty.
  analytics: {
    umamiScript: "https://stats.noursaneh.com/script.js",
    websiteId: "",
  },
};

export const nav = [
  { label: "Home", href: "#top" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
];

export const hobbies = [
  { label: "Learning electric guitar, badly but loudly", short: "Guitar", color: "bg-sun", icon: "music" },
  { label: "Always Down to do Any type Of Sport!", short: "Sports", color: "bg-sky", icon: "ball" },
  { label: "Learning Russian  & Korean — привет!", short: "Learning Russian", color: "bg-blush", icon: "chat" },
  { label: "Hunting hidden food spots in Dubai", short: "Food hunting", color: "bg-mint", icon: "food" },
] as const;

export const funFact = "Fun fact: my notes app is 90% half-baked ideas I want to build.";

export const heroTags = [
  { label: "LLM APIs", className: "left-[12%] top-[6%] -rotate-8 bg-white" },
  { label: "Front-End", className: "left-[6%] top-[40%] rotate-5 bg-coral" },
  { label: "TypeScript", className: "left-0 top-[72%] -rotate-4 bg-white", far: true },
  { label: "React · Next.js", className: "right-[12%] top-[6%] rotate-7 bg-white" },
  { label: "Automation", className: "right-[5%] top-[40%] -rotate-6 bg-sun" },
  { label: "Supabase", className: "right-0 top-[72%] rotate-4 bg-white", far: true },
];
