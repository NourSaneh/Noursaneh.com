# noursaneh.com

Personal portfolio of Nour Saneh, built with **Astro**, **Tailwind CSS v4** and **React** islands.

## Run it

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # type-checks, then builds static files into dist/
npm run preview
```

## Where things live

| What | File |
| --- | --- |
| Name, email, links, hobbies, hero tags | `src/data/site.ts` |
| Projects + client work | `src/data/projects.ts` |
| Bio, timeline, skills | `src/data/about.ts` |
| Ask-my-AI offline answers | `src/data/assistant.ts` |
| Extra things the AI should know | `src/data/ai-notes.md` |
| Colours, fonts, shadows (design tokens) | `src/styles/global.css` |
| Avatar | `public/avatar.webp` |

Interactive parts are React islands: `AskAI.tsx` (chat), `Projects.tsx` (filter), `CopyEmail.tsx`.
Everything else is static Astro, so it ships zero JS.

## Hosting (Coolify / Docker)

The site is built as a standalone Node server (`@astrojs/node`). Coolify builds it from the
`Dockerfile`: `npm ci` → `astro build` → `node dist/server/entry.mjs` on port **4321**.
Without Docker: `npm ci && npm run build && HOST=0.0.0.0 PORT=4321 npm start`.

## Ask-my-AI (free, via Groq)

The chat calls `/api/ask` (`src/pages/api/ask.ts`), a small server route that sends the
question plus a short profile built from `src/data/*` (`src/data/profile.ts`) to Groq's free
`openai/gpt-oss-20b` model (falls back to `openai/gpt-oss-120b`). Edit your data files and the AI learns it automatically. For anything else (FAQs, working style,
languages…), write it in `src/data/ai-notes.md`.

Setup (free, no credit card):

1. Create a key at https://console.groq.com/keys
2. In Coolify → your app → Environment Variables, add `GROQ_API_KEY`, then redeploy.

For local testing, copy `.env.example` to `.env` and paste the key.

Groq's free tier allows a few hundred questions a day with this setup. Each visitor is limited
to 15 questions an hour. If the key is missing, Groq is down, or the daily quota runs out, the widget
quietly falls back to the offline answers in `src/data/assistant.ts`.
Optional: set `GROQ_MODEL` to try another Groq model.

Token savers:
- Short, clear questions that match the site's info ("Your stack?", "Where are you based?") are
  answered instantly in the browser from `src/data/assistant.ts`, without calling the AI.
  Detailed or ambiguous questions, and follow-ups, still go to the AI.
- The server remembers answers to repeat questions for 12 hours and reuses them.

## TODO before launch

- Replace the `[placeholders]` (fun fact, BrandXB dates, project screenshots, client logos).
- Check the LinkedIn / GitHub links in `src/data/site.ts`.
- Add screenshots via `media.image` in `src/data/projects.ts`.
