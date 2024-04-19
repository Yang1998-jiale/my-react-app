/*
 * @Author: yjl
 * @Date: 2024-04-18 16:16:19
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-19 17:25:23
 * @Description: 描述
 */
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { routerList } from "@/router/index";
import { useState } from "react";

function generateMenu(routers: any) {
  return routers.map((router) => {
    if (router.children) {
      return router.meta?.isSub ? (
        <Menu.Item key={router.path}>
          <Link to={router.path}>
            <span>{router.icon}</span>
            <span>{router.meta.title}</span>
          </Link>
        </Menu.Item>
      ) : (
        <Menu.SubMenu key={router.path} title={router.meta.title}>
          {generateMenu(router.children)}
        </Menu.SubMenu>
      );
    }
    return router.meta?.isShow ? (
      1
    ) : (
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
  const location = useLocation();
  const [selectedKeys, setSelectKeys] = useState([
    location.pathname || routerList[0].path || "/home",
  ]);
  const openKeys = ["/" + selectedKeys[0].split("/")[1]];
  console.log(openKeys);

  function menuSelect({ key }) {
    setSelectKeys([key]);
  }
  return (
    <Menu
      mode="inline"
      theme="dark"
      onSelect={menuSelect}
      defaultOpenKeys={openKeys}
      selectedKeys={selectedKeys}
    >
      {generateMenu(routerList)}
    </Menu>
  );
}
