/*
 * @Author: yjl
 * @Date: 2024-04-24 16:20:11
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-13 11:18:36
 * @Description: 描述
 */
import { lazy } from "react";
const MDList = lazy(() => import("@/views/docunment-manage/md-list/index"));

const documentManage = {
  path: "/document",
  name:'DocumentManage',
  caseSensitive: true,
  order: 3,
  meta: {
    title: "文档中心",
    noBread: true, //是否可以点击切换面包屑
  },
  children: [
    {
      path: "/document/md-list",
      element: <MDList />,
      caseSensitive: true,
      meta: {
        title: "MarkDown列表",
        noBread: true, //是否可以点击切换面包屑
      },
    },
  ],
};

export default documentManage;
