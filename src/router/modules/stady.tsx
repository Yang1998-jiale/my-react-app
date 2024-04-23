/*
 * @Author: yjl
 * @Date: 2024-04-19 09:32:49
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-23 10:39:14
 * @Description: 描述
 */
import { lazy } from "react";
const Study = lazy(() => import("@/views/study/index"));
const StudyIndex = lazy(() => import("@/views/home/index"));

const study: any[] = [
  {
    path: "/study",
    caseSensitive: true,
    meta: {
      title: "学习",
      noBread: true, //是否可以点击切换面包屑
    },
    children: [
      {
        path: "/study/index",
        element: <Study />,
        caseSensitive: true,

        meta: {
          title: "路由学习",
          isSub: true, //是否显示子路由
        },
        children: [
          {
            path: "/study/index/home",
            caseSensitive: true,

            index: true,
            element: <StudyIndex />,
            meta: {
              isShow: true, //当前路由是否显示
              title: "详情",
              currentActive: "/study/index",
            },
          },
        ],
      },
    ],
  },
];

export default study;
