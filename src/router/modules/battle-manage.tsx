/*
 * @Author: yjl
 * @Date: 2024-04-24 16:20:11
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-15 15:34:16
 * @Description: 描述
 */
import { lazy } from "react";
const Battle = lazy(() => import("@/views/docunment-manage/md-list/index"));
const Editor = lazy(() => import("@/views/battle-manage/editor/index"));

const battleManage = {
  path: "/battle",
  name: "Battle",
  caseSensitive: true,
  order: 4,
  meta: {
    title: "阵容管理",
    noBread: true, //是否可以点击切换面包屑
  },
  children: [
    {
      path: "/battle/list",
      element: <Battle />,
      caseSensitive: true,
      meta: {
        title: "阵容列表",
        noBread: true, //是否可以点击切换面包屑
      },
    },
    {
      path: "/battle/editor",
      element: <Editor />,
      caseSensitive: true,
      meta: {
        title: "阵容编辑器",
        noBread: true, //是否可以点击切换面包屑
      },
    },
  ],
};

export default battleManage;
