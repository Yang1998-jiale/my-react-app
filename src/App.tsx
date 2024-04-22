/*
 * @Author: yjl
 * @Date: 2024-04-18 15:32:24
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-22 16:12:18
 * @Description: 描述
 */
import "./App.css";

import Layout from "@/components/Layout/index";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Spin } from "antd";
import Routers from "@/router/index";

function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const routerWhite = ["/login", "/404"];
  useEffect(() => {
    // console.log(location);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [location]);
  return (
    <>
      <Spin fullscreen spinning={loading} />
      {routerWhite.includes(location.pathname) ? <Routers /> : <Layout />}
      {/* <Layout /> */}
    </>
  );
}

export default App;
