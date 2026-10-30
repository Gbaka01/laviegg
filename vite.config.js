import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://192.168.0.23:3000",
        changeOrigin: true,
        // pas de "rewrite" : vos routes Express commencent déjà par /api
      },
    },
  },
});
