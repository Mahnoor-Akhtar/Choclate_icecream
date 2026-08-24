import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";

export default defineConfig({
  cloudflare: process.env.VERCEL ? false : undefined,
  vite: {
    plugins: process.env.VERCEL ? [nitro()] : []
  }
});


