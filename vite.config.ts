/*
 * @Author: yjl
 * @Date: 2024-04-18 15:32:24
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-18 16:10:20
 * @Description: 描述
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { presetTypography, presetUno } from "unocss";
import UnoCSS from "unocss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnoCSS({
      presets: [presetUno(), presetTypography()],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 7777,
    host: "0.0.0.0",
  },
});
