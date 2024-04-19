/*
 * @Author: yjl
 * @Date: 2024-04-18 15:32:24
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-19 17:54:19
 * @Description: 描述
 */
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import "uno.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HashRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    </HashRouter>
  </React.StrictMode>
);
