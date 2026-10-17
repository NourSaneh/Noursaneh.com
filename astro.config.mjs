// @ts-check
import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import node from "@astrojs/node";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Primary domain. Keep in sync with public/robots.txt and sitemap.xml.
  site: "https://www.noursaneh.com",
  // Pages are pre-rendered; only /api/ask runs on the server.
  // Built as a standalone Node server for Coolify: `node dist/server/entry.mjs`.
  adapter: node({ mode: "standalone" }),
  integrations: [react()],
  env: {
    schema: {
      GROQ_API_KEY: envField.string({ context: "server", access: "secret", optional: true }),
      GROQ_MODEL: envField.string({ context: "server", access: "secret", optional: true }),
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
