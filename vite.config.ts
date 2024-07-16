/*
 * @Author: yjl
 * @Date: 2024-04-18 15:32:24
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-15 15:43:04
 * @Description: 描述
 */
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { presetTypography, presetUno } from "unocss";
import UnoCSS from "unocss/vite";
import { viteMockServe } from "vite-plugin-mock";
import { mars3dPlugin } from "vite-plugin-mars3d";
import { visualizer } from "rollup-plugin-visualizer";

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
      watchFiles: true,
      localEnabled: false,
      prodEnabled: true,
      injectCode: `
      import { setupProdMockServer } from '../mock/_createProductionServer';
      
      setupProdMockServer();
      `,
    }),
    visualizer({
      open: true, // 注意这里要设置为true，否则无效，如果存在本地服务端口，将在打包后自动展示
      gzipSize: true,
      brotliSize: true,
    }),
    mars3dPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssTarget: "chrome80",
    rollupOptions: {
      output: {
        chunkFileNames: "static/js/[name]-[hash].js",
        entryFileNames: "static/js/[name]-[hash].js",
        assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        manualChunks: {
          vendor: ["react", "react-dom"],
          antd: ["antd", "@ant-design/icons"],
        },
      },
    },
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
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
      "/base": {
        target: "http://127.0.0.1:7001", // 目标服务器地址
        changeOrigin: true, // 改变源到目标服务器
        ws: true,
        rewrite: (path) => path.replace(new RegExp(`^/base`), ""),
      },
    },
  },
});
