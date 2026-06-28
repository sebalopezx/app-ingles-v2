import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { VitePWA } from "vite-plugin-pwa";

// Relative base so the build works on static hosts (GitHub Pages, Netlify, Vercel).
export default defineConfig({
  base: "./",
  plugins: [
    vue(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icon.svg"],
      manifest: {
        name: "English App — Past Simple Verbs",
        short_name: "English App",
        description: "Learn and memorize English past simple verbs fast.",
        theme_color: "#0a0e17",
        background_color: "#0a0e17",
        display: "standalone",
        start_url: "./",
        icons: [
          {
            src: "icon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any maskable",
          },
        ],
      },
    }),
  ],
});
