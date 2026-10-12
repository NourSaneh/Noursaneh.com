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

## Ask-my-AI (free, via Groq)

The chat calls `/api/ask` (`src/pages/api/ask.ts`), a Vercel serverless function that sends the
question plus a short profile built from `src/data/*` (`src/data/profile.ts`) to Groq's free
`openai/gpt-oss-20b` model (falls back to `openai/gpt-oss-120b`). Edit your data files and the AI learns it automatically. For anything else (FAQs, working style,
languages…), write it in `src/data/ai-notes.md`.

Setup (free, no credit card):

1. Create a key at https://console.groq.com/keys
2. Import this repo into Vercel (Hobby plan is free).
3. Vercel → Project → Settings → Environment Variables → add `GROQ_API_KEY`, then redeploy.

For local testing, copy `.env.example` to `.env` and paste the key.

Groq's free tier allows a few hundred questions a day with this setup. Each visitor is limited
to 15 questions an hour. If the key is missing, Groq is down, or the daily quota runs out, the widget
quietly falls back to the offline answers in `src/data/assistant.ts`.
Optional: set `GROQ_MODEL` to try another Groq model.

## TODO before launch

- Replace the `[placeholders]` (fun fact, BrandXB dates, project screenshots, client logos).
- Set the real email, LinkedIn, booking link in `src/data/site.ts`.
- Add `public/cv.pdf`.
- Add screenshots via `media.image` in `src/data/projects.ts`.
