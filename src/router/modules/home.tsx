/*
 * @Author: yjl
 * @Date: 2024-04-18 15:52:33
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-22 16:40:38
 * @Description: 描述
 */
import { lazy } from "react";
const Home = lazy(() => import("@/views/home/index"));
// import Home from "@/views/home/index";

const home: any[] = [
  {
    path: "/home",
    element: <Home />,
    name: "Home",
    order: 1,
    meta: {
      title: "首页",
      isShow: true, //是否显示
    },
  },
];

export default home;
