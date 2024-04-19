/*
 * @Author: yjl
 * @Date: 2024-04-19 09:32:49
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-19 11:35:31
 * @Description: 描述
 */
import Study from "@/views/study/index";

const study: any[] = [
  {
    path: "/study",
    meta: {
      title: "学习",
    },
    children: [
      {
        path: "/study/index",
        element: <Study />,
        meta: {
          title: "路由学习",
        },
      },
    ],
  },
];

export default study;
