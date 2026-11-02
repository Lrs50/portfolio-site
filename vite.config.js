import { defineConfig } from "vite";

// Served from the domain root (Cloudflare Pages). Static images live in public/imgs and are referenced as /imgs/...
export default defineConfig({
  base: "/",
});
