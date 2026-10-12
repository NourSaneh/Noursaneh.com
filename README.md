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
| Colours, fonts, shadows (design tokens) | `src/styles/global.css` |
| Avatar | `public/avatar.webp` |

Interactive parts are React islands: `AskAI.tsx` (chat), `Projects.tsx` (filter), `CopyEmail.tsx`.
Everything else is static Astro, so it ships zero JS.

## Ask-my-AI

The widget works offline with keyword answers from `src/data/assistant.ts`.
To use a real LLM, set `PUBLIC_ASK_ENDPOINT` to a URL that accepts
`POST { "question": string }` and returns `{ "answer": string }`.
If the endpoint fails, the widget falls back to the offline answers.

## TODO before launch

- Replace the `[placeholders]` (fun fact, BrandXB dates, project screenshots, client logos).
- Set the real email, LinkedIn, booking link in `src/data/site.ts`.
- Add `public/cv.pdf`.
- Add screenshots via `media.image` in `src/data/projects.ts`.
