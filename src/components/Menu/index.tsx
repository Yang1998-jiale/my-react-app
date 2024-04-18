/*
 * @Author: yjl
 * @Date: 2024-04-18 16:16:19
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-18 18:04:30
 * @Description: 描述
 */
import { Menu } from "antd";
import { Link } from "react-router-dom";

const routers = [
  {
    path: "/home",
    name: "Home",
    meta: {
      title: "首页",
    },
  },
];

function generateMenu(routers: any) {
  return routers.map((router) => {
    if (router.children) {
      return (
        <Menu.SubMenu key={router.path} title={router.meta.title}>
          {generateMenu(router.children)}
        </Menu.SubMenu>
      );
    }
    return (
      <Menu.Item key={router.path}>
        <Link to={router.path}>
          <span>{router.icon}</span>
          <span>{router.meta.title}</span>
        </Link>
      </Menu.Item>
    );
  });
}

export default function MenuComponent() {
  return <Menu mode="inline">{generateMenu(routers)}</Menu>;
}
