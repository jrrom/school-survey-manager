import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3030/api",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
      "/surver": {
        target: "http://localhost:3030/surver",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/surver/, "") 
      },
      "/static": {
        target: "http://localhost:3030/static",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/static/, "") 
      },
    },
  },
});
