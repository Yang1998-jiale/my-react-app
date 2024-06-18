/*
 * @Author: yjl
 * @Date: 2024-04-18 15:32:24
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-17 14:53:37
 * @Description: 描述
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { presetTypography, presetUno } from "unocss";
import UnoCSS from "unocss/vite";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnoCSS({
      presets: [presetUno(), presetTypography()],
    }),
    viteMockServe({
      ignore: /^_/,
      mockPath: "mock",
      injectCode: `
      import { setupProdMockServer } from '../mock/_createProductionServer';

      setupProdMockServer();
      `,
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
    proxy: {
      "/api": {
        target: "https://game.gtimg.cn/images/lol/act/img/tft/", // 目标服务器地址
        changeOrigin: true, // 改变源到目标服务器
        ws: true,
        rewrite: (path) => path.replace(new RegExp(`^/api`), ""),
        // 其他可选配置...
      },
      "/baidu": {
        target: "https://aip.baidubce.com/", // 目标服务器地址
        changeOrigin: true, // 改变源到目标服务器
        ws: true,
        rewrite: (path) => path.replace(new RegExp(`^/baidu`), ""),
      },
    },
  },
});
