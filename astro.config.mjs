// @ts-check
import { defineConfig, envField } from "astro/config";
import react from "@astrojs/react";
import vercel from "@astrojs/vercel";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Primary domain (noursaneh.com redirects here in Vercel). Keep in sync with public/robots.txt and sitemap.xml.
  site: "https://www.noursaneh.com",
  // Pages stay static; only /api/ask runs as a serverless function on Vercel.
  adapter: vercel(),
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
