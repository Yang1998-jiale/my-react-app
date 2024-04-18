/*
 * @Author: yjl
 * @Date: 2024-04-18 15:52:33
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-18 18:09:45
 * @Description: 描述
 */
import { RouteObject } from "react-router-dom";
// import { lazy } from "react";
// const Home = lazy(() => import("@/views/home/index"));
import Home from "@/views/home/index";


const home: RouteObject[] = [
  {
    path: "/home",
    element: <Home />,
    // meta: {
    //   title: "首页",
    // },
  },
];

export default home;
