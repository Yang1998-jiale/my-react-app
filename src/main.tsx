/*
 * @Author: yjl
 * @Date: 2024-04-18 15:32:24
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-22 16:12:36
 * @Description: 描述
 */
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Spin } from "antd";
import "uno.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Suspense fallback={<Spin fullscreen />}>
        <App />
      </Suspense>
    </HashRouter>
  </React.StrictMode>
);
