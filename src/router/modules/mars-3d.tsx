/*
 * @Author: yjl
 * @Date: 2024-07-15 15:28:33
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-16 11:48:41
 * @Description: 描述
 */
import { lazy } from "react";

const FirstPage = lazy(() => import("@/views/mars3D/first-page/index"));
const SecondPage = lazy(() => import("@/views/mars3D/second-page/index"));

const mars3D = {
  path: "/mars3D",
  name: "Mars3D",
  caseSensitive: true,
  order: 5,
  meta: {
    title: "Mars3D",
    noBread: true, //是否可以点击切换面包屑
  },
  children: [
    {
      path: "/mars3D/first",
      element: <FirstPage />,
      caseSensitive: true,
      meta: {
        title: "第一个页面",
        noBread: true, //是否可以点击切换面包屑
      },
    },
    {
      path: "/mars3D/second",
      element: <SecondPage />,
      caseSensitive: true,
      meta: {
        title: "第二个页面",
        noBread: true, //是否可以点击切换面包屑
      },
    },
  ],
};
export default mars3D;
