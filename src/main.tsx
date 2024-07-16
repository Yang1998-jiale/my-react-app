/*
 * @Author: yjl
 * @Date: 2024-04-18 15:32:24
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-16 13:51:17
 * @Description: 描述
 */
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";
import { Spin } from "antd";
import "uno.css";
import store from "./store/index.ts";
import { Provider } from "react-redux";
import { setupProdMockServer } from "../mock/_createProductionServer";
import "mars3d-cesium/Build/Cesium/Widgets/widgets.css";
import "mars3d-cesium";
import "mars3d-heatmap";
import "mars3d/dist/mars3d.css";

setupProdMockServer();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Spin fullscreen />}>
          <App />
        </Suspense>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
