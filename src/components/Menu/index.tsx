/*
 * @Author: yjl
 * @Date: 2024-04-18 16:16:19
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-05 17:50:30
 * @Description: 描述
 */
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { routerList, routerFlatList } from "@/router/index";
import React, { useState, useEffect } from "react";

function generateMenu(routers: any) {
  return routers
    .sort((a, b) => a.order - b.order)
    .map((router) => {
      if (router.children) {
        return router.meta?.isSub ? (
          <Menu.Item key={router.path}>
            <Link to={router.path}>
              <span>{router.icon}</span>
              <span className="text-truncate">{router.meta.title}</span>
            </Link>
          </Menu.Item>
        ) : (
          <Menu.SubMenu key={router.path} title={router.meta.title}>
            {generateMenu(router.children)}
          </Menu.SubMenu>
        );
      }
      return router.meta?.isShow ? (
        <></>
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

function findRouter(target) {
  return routerFlatList.find((item) => item.path === target);
}

function MenuComponent() {
  const location = useLocation();
  const [selectedKeys, setSelectKeys] = useState([
    location.pathname || routerList[0].path || "/home",
  ]);

  const [openKeys, setOpenKeys] = useState([
    "/" + selectedKeys[0].split("/")[1],
  ]);
  useEffect(() => {
    const findRoute = findRouter(location.pathname);
    if (findRoute?.meta?.currentActive) {
      setSelectKeys([findRoute.meta.currentActive]);
      setOpenKeys(["/" + findRoute.meta.currentActive.split("/")[1]]);
      return;
    }
    setSelectKeys([location.pathname]);
    setOpenKeys(["/" + location.pathname.split("/")[1]]);
  }, [location.pathname]);

  function menuSelect({ key }) {
    setSelectKeys([key]);
  }
  return (
    <Menu
      mode="inline"
      theme="dark"
      onSelect={menuSelect}
      openKeys={openKeys}
      onOpenChange={(Keys) => setOpenKeys(Keys)}
      defaultOpenKeys={openKeys}
      selectedKeys={selectedKeys}
    >
      {generateMenu(routerList)}
    </Menu>
  );
}
export default React.memo(MenuComponent);
