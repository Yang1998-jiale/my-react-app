/*
 * @Author: yjl
 * @Date: 2024-04-18 15:52:33
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-22 11:41:34
 * @Description: 描述
 */
import { lazy } from "react";
const Home = lazy(() => import("@/views/home/index"));
// import Home from "@/views/home/index";



const home: any[] = [
  {
    path: "/home",
    element: <Home />,
    meta: {
      title: "首页",
    },
  },
];

export default home;
