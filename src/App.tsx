/*
 * @Author: yjl
 * @Date: 2024-04-18 15:32:24
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-23 11:57:58
 * @Description: 描述
 */
import "./App.css";

import Layout from "@/components/Layout/index";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Routers from "@/router/index";

function App() {
  const location = useLocation();
  const routerWhite = ["/login", "/404"];
  useEffect(() => {
    console.log(location);
  });

  return (
    <>{routerWhite.includes(location.pathname) ? <Routers /> : <Layout />}</>
  );
}

export default App;
