import { t as __exportAll } from "./rolldown-runtime_D7D4PA-g.mjs";
import { i as setOnSetGetEnv, n as getEnv$1, t as createInvalidVariablesError } from "./runtime_BZj8EWIJ.mjs";
//#region node_modules/astro/dist/env/validators.js
function getEnvFieldType(options) {
	const optional = options.optional ? options.default !== void 0 ? false : true : false;
	let type;
	if (options.type === "enum") type = options.values.map((v) => `'${v}'`).join(" | ");
	else type = options.type;
	return `${type}${optional ? " | undefined" : ""}`;
}
var stringValidator = ({ max, min, length, url, includes, startsWith, endsWith }) => (input) => {
	if (typeof input !== "string") return {
		ok: false,
		errors: ["type"]
	};
	const errors = [];
	if (max !== void 0 && !(input.length <= max)) errors.push("max");
	if (min !== void 0 && !(input.length >= min)) errors.push("min");
	if (length !== void 0 && !(input.length === length)) errors.push("length");
	if (url !== void 0 && !URL.canParse(input)) errors.push("url");
	if (includes !== void 0 && !input.includes(includes)) errors.push("includes");
	if (startsWith !== void 0 && !input.startsWith(startsWith)) errors.push("startsWith");
	if (endsWith !== void 0 && !input.endsWith(endsWith)) errors.push("endsWith");
	if (errors.length > 0) return {
		ok: false,
		errors
	};
	return {
		ok: true,
		value: input
	};
};
var numberValidator = ({ gt, min, lt, max, int }) => (input) => {
	const num = Number.parseFloat(input ?? "");
	if (isNaN(num)) return {
		ok: false,
		errors: ["type"]
	};
	const errors = [];
	if (gt !== void 0 && !(num > gt)) errors.push("gt");
	if (min !== void 0 && !(num >= min)) errors.push("min");
	if (lt !== void 0 && !(num < lt)) errors.push("lt");
	if (max !== void 0 && !(num <= max)) errors.push("max");
	if (int !== void 0) {
		const isInt = Number.isInteger(num);
		if (!(int ? isInt : !isInt)) errors.push("int");
	}
	if (errors.length > 0) return {
		ok: false,
		errors
	};
	return {
		ok: true,
		value: num
	};
};
var booleanValidator = (input) => {
	const bool = input === "true" ? true : input === "false" ? false : void 0;
	if (typeof bool !== "boolean") return {
		ok: false,
		errors: ["type"]
	};
	return {
		ok: true,
		value: bool
	};
};
var enumValidator = ({ values }) => (input) => {
	if (!(typeof input === "string" ? values.includes(input) : false)) return {
		ok: false,
		errors: ["type"]
	};
	return {
		ok: true,
		value: input
	};
};
function selectValidator(options) {
	switch (options.type) {
		case "string": return stringValidator(options);
		case "number": return numberValidator(options);
		case "boolean": return booleanValidator;
		case "enum": return enumValidator(options);
	}
}
function validateEnvVariable(value, options) {
	const isOptional = options.optional || options.default !== void 0;
	if (isOptional && value === void 0) return {
		ok: true,
		value: options.default
	};
	if (!isOptional && value === void 0) return {
		ok: false,
		errors: ["missing"]
	};
	return selectValidator(options)(value);
}
//#endregion
//#region \0virtual:astro:env/internal
var schema = {
	"GROQ_API_KEY": {
		"context": "server",
		"access": "secret",
		"optional": true,
		"type": "string"
	},
	"GROQ_MODEL": {
		"context": "server",
		"access": "secret",
		"optional": true,
		"type": "string"
	}
};
//#endregion
//#region \0astro:env/server
/** @returns {string} */
var getEnv = (key) => {
	return getEnv$1(key);
};
var _internalGetSecret = (key) => {
	const rawVariable = getEnv(key);
	const variable = rawVariable === "" ? void 0 : rawVariable;
	const options = schema[key];
	const result = validateEnvVariable(variable, options);
	if (result.ok) return result.value;
	const type = getEnvFieldType(options);
	throw createInvalidVariablesError(key, type, result);
};
setOnSetGetEnv(() => {
	GROQ_API_KEY = _internalGetSecret("GROQ_API_KEY");
	GROQ_MODEL = _internalGetSecret("GROQ_MODEL");
});
var GROQ_API_KEY = _internalGetSecret("GROQ_API_KEY");
var GROQ_MODEL = _internalGetSecret("GROQ_MODEL");
//#endregion
//#region src/data/about.ts
var bio = ["I'm Nour — a Computer Science graduate based in Sharjah, UAE. I started out coordinating web projects at a Dubai agency for F&B brands: shipping WordPress and WooCommerce sites, automating workflows with Make.com and fixing technical SEO.", "Now I build my own products and go deep on AI — turning language models into features real people actually enjoy using."];
var timeline = [
	{
		when: "2020 — 2024",
		title: "BSc Computer Science",
		where: "Lebanese International University"
	},
	{
		when: "[Start] — [End]",
		title: "Web Project Coordinator",
		where: "BrandXB · Dubai — web builds, QA, automation, SEO",
		tilt: true
	},
	{
		when: "Now",
		title: "Building & going deep on AI",
		where: "TakeMeWhere, MomentoSite and my Ask-my-AI bot",
		current: true
	}
];
var skillGroups = [
	{
		title: "AI",
		className: "bg-cobalt text-white",
		items: [
			"LLM APIs",
			"Prompt design",
			"Make.com automation",
			"RAG / embeddings ★"
		]
	},
	{
		title: "Front-end",
		className: "bg-sun",
		items: [
			"React",
			"TypeScript",
			"Next.js",
			"Tailwind CSS",
			"Vite",
			"Zustand"
		]
	},
	{
		title: "Backend & data",
		className: "bg-mint",
		items: [
			"Supabase",
			"Postgres & RLS",
			"Firebase",
			"Cloudinary"
		]
	},
	{
		title: "Tools & web",
		className: "bg-cream",
		items: [
			"Git & GitHub",
			"Figma",
			"Vercel",
			"WordPress · WooCommerce",
			"Technical SEO"
		]
	}
];
//#endregion
//#region src/data/projects.ts
var projects = [
	{
		slug: "takemewhere",
		title: "TakeMeWhere",
		featured: true,
		summary: "A UAE-wide place discovery platform for Gen-Z locals, expats and tourists — find where to go next, rated with a 3-gem system.",
		highlights: [
			"Full Supabase backend: 9 tables, row-level security, auth triggers",
			"Custom 3-gem rating system",
			"[Add one AI feature here — e.g. smart place recommendations]"
		],
		categories: ["web", "ai"],
		stack: [
			"React",
			"TypeScript",
			"Vite",
			"Tailwind v4",
			"Supabase",
			"Cloudinary",
			"Vercel"
		],
		url: "https://takemewhere.com",
		caseStudy: "#case-takemewhere",
		code: "#code-takemewhere",
		badge: {
			label: "Featured",
			className: "bg-coral -rotate-3"
		},
		media: {
			color: "bg-sky",
			placeholder: "[Screenshot or screen recording of TakeMeWhere]",
			domain: "takemewhere.com"
		}
	},
	{
		slug: "momentosite",
		title: "MomentoSite",
		summary: "A drag-and-drop builder for temporary event websites — weddings, launches, birthdays — live in minutes.",
		categories: ["web"],
		stack: [
			"React",
			"TypeScript",
			"Firebase",
			"Zustand"
		],
		caseStudy: "#case-momentosite",
		badge: {
			label: "In progress",
			className: "bg-sun rotate-4"
		},
		media: {
			color: "bg-blush",
			placeholder: "[MomentoSite editor screenshot]"
		}
	},
	{
		slug: "driving-quiz",
		title: "Driving Theory Quiz",
		summary: "Practice driving-theory questions with instant feedback and progress tracking. [Adjust to final features]",
		categories: ["web"],
		stack: ["JavaScript", "React"],
		caseStudy: "#case-quiz",
		badge: {
			label: "Building",
			className: "bg-white -rotate-4"
		},
		media: {
			color: "bg-mint",
			placeholder: "[Driving quiz screenshot]"
		}
	},
	{
		slug: "ask-my-ai",
		title: "Ask-my-AI Bot",
		dark: true,
		summary: "The chat on this site's homepage — an AI assistant that answers questions about my work, powered by an open-source LLM on Groq and grounded in my own project data.",
		categories: ["ai"],
		stack: [
			"Groq · Llama 3.1",
			"Astro",
			"React",
			"Vercel"
		],
		caseStudy: "#ask",
		badge: {
			label: "AI · Live",
			className: "bg-sun rotate-3"
		},
		media: {
			color: "bg-cobalt",
			placeholder: "“What has Nour built?”"
		}
	}
];
var clientWork = {
	label: "Client work · BrandXB, Dubai",
	title: "WordPress & WooCommerce sites, Make.com automations and technical SEO for F&B brands.",
	logos: [
		"[Client logo]",
		"[Client logo]",
		"[Client logo]"
	]
};
//#endregion
//#region src/data/site.ts
var site = {
	name: "Nour Saneh",
	shortName: "Nour",
	role: "Creative AI Software Engineer",
	tagline: "Front-end developer building AI-powered web products people enjoy using.",
	location: "Sharjah, UAE",
	email: "hello@noursaneh.com",
	links: {
		linkedin: "https://www.linkedin.com/in/noursaneh",
		github: "https://github.com/NourSaneh",
		book: "#contact",
		cv: "/cv.pdf"
	},
	nowBuilding: ["TakeMeWhere", "MomentoSite"]
};
var hobbies = [
	{
		label: "Shredding on electric guitar",
		short: "Guitar",
		color: "bg-sun",
		icon: "music"
	},
	{
		label: "Pokémon GO PvP — Master League",
		short: "Pokémon GO PvP",
		color: "bg-sky",
		icon: "gamepad"
	},
	{
		label: "Learning Russian — привет!",
		short: "Learning Russian",
		color: "bg-blush",
		icon: "chat"
	},
	{
		label: "Hunting hidden food spots in Dubai",
		short: "Food hunting",
		color: "bg-mint",
		icon: "food"
	}
];
var funFact = "Fun fact: [one surprising thing about you]";
//#endregion
//#region src/data/profile.ts
/** Placeholder text like "[Add one AI feature here]" shouldn't reach the AI. */
var clean = (s) => {
	const out = s.replace(/\s*\[[^\]]*\]\s*/g, " ").trim();
	return /[\p{L}\p{N}]/u.test(out) ? out : "";
};
var cleanList = (items) => items.map(clean).filter(Boolean).join(", ");
/** Compact plain-text profile sent to the LLM as context (~600 tokens). */
function buildProfile() {
	const lines = [
		`Name: ${site.name}. Role: ${site.role}. Based in ${site.location}. Email: ${site.email}.`,
		`Summary: ${site.tagline}`,
		`Bio: ${bio.join(" ")}`,
		`Availability: open to front-end and AI engineering roles in the UAE or remote, and to freelance builds.`,
		`Experience: ${timeline.map((t) => `${clean(t.title)} — ${clean(t.where)}${clean(t.when) ? ` (${clean(t.when)})` : ""}`).join("; ")}.`,
		`Projects:`,
		...projects.map((p) => `- ${p.title}${p.badge ? ` [${p.badge.label}]` : ""}: ${clean(p.summary)} Stack: ${cleanList(p.stack)}.` + (p.highlights ? ` Highlights: ${p.highlights.map(clean).filter(Boolean).join("; ")}.` : "") + (p.url ? ` Live: ${p.url}` : "")),
		`Client work: ${clientWork.title}`,
		`Skills: ${skillGroups.map((g) => `${g.title}: ${g.items.join(", ")}`).join(" | ")} (★ = currently learning).`,
		`Hobbies: ${hobbies.map((h) => h.label).join("; ")}.`
	];
	const fact = clean(funFact.replace(/^Fun fact:\s*/, ""));
	if (fact) lines.push(`Fun fact: ${fact}`);
	return lines.join("\n");
}
//#endregion
//#region src/pages/api/ask.ts
var ask_exports = /* @__PURE__ */ __exportAll({
	POST: () => POST,
	prerender: () => false
});
var MAX_QUESTION = 400;
var PER_IP_PER_HOUR = 15;
var SYSTEM_PROMPT = `You are the assistant on ${site.name}'s portfolio website. Visitors are mostly recruiters, clients and fellow developers.
Answer questions about ${site.shortName} using ONLY the profile below. Speak about ${site.shortName} in the third person.
Keep answers short: 1–3 sentences, plain text, no markdown, friendly and a little playful.
If the profile doesn't cover something, say you don't know that yet and suggest emailing ${site.email}. Never invent facts, numbers or employers.
If asked about something unrelated to ${site.shortName} (general coding help, homework, other topics), politely steer back to ${site.shortName}'s work.

PROFILE
${buildProfile()}`;
var hits = /* @__PURE__ */ new Map();
function rateLimited(ip) {
	const now = Date.now();
	const recent = (hits.get(ip) ?? []).filter((t) => now - t < 36e5);
	recent.push(now);
	hits.set(ip, recent);
	if (hits.size > 5e3) hits.clear();
	return recent.length > PER_IP_PER_HOUR;
}
function json(body, status = 200) {
	return new Response(JSON.stringify(body), {
		status,
		headers: {
			"Content-Type": "application/json",
			"Cache-Control": "no-store"
		}
	});
}
var POST = async ({ request, clientAddress }) => {
	if (!GROQ_API_KEY) return json({ error: "not_configured" }, 503);
	let payload;
	try {
		payload = await request.json();
	} catch {
		return json({ error: "bad_request" }, 400);
	}
	const question = typeof payload.question === "string" ? payload.question.trim().slice(0, MAX_QUESTION) : "";
	if (!question) return json({ error: "empty_question" }, 400);
	if (rateLimited(request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || clientAddress || "unknown")) return json({ error: "rate_limited" }, 429);
	const history = Array.isArray(payload.history) ? payload.history.filter((t) => !!t && (t.role === "user" || t.role === "assistant") && typeof t.content === "string").slice(-6).map((t) => ({
		role: t.role,
		content: t.content.slice(0, MAX_QUESTION)
	})) : [];
	try {
		const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
			method: "POST",
			headers: {
				Authorization: `Bearer ${GROQ_API_KEY}`,
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				model: GROQ_MODEL || "llama-3.1-8b-instant",
				temperature: .5,
				max_tokens: 220,
				messages: [
					{
						role: "system",
						content: SYSTEM_PROMPT
					},
					...history,
					{
						role: "user",
						content: question
					}
				]
			}),
			signal: AbortSignal.timeout(12e3)
		});
		if (!res.ok) {
			console.error("Groq error", res.status, await res.text().catch(() => ""));
			return json({ error: res.status === 429 ? "quota" : "upstream" }, 502);
		}
		const answer = (await res.json()).choices?.[0]?.message?.content?.trim();
		if (!answer) return json({ error: "empty_answer" }, 502);
		return json({ answer });
	} catch (err) {
		console.error("Groq request failed", err);
		return json({ error: "upstream" }, 502);
	}
};
//#endregion
//#region \0virtual:astro:page:src/pages/api/ask@_@ts
var page = () => ask_exports;
//#endregion
export { page };
