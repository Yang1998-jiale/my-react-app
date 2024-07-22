/*
 * @Author: yjl
 * @Date: 2024-04-18 15:52:15
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-22 16:40:52
 * @Description: 描述
 */
const modules = import.meta.glob("./modules/**/*.tsx", { eager: true });
import { useRoutes, Navigate } from "react-router-dom";
import NotPage from "@/components/Error/404";
import Login from "@/components/Login/index";

const routers: any = [];
const hide = ["Study", "DocumentManage"];
Object.keys(modules).forEach((key) => {
  const mod = (modules[key] as any).default || {};
  if (!hide.includes(mod.name)) {
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routers.push(...modList);
  }
});

function routerFlat(target, flat) {
  target.forEach((item) => {
    if (item.element) {
      flat.push(item);
    }
    if (Array.isArray(item.children) && item.children.length > 0) {
      routerFlat(item.children, flat);
    }
  });
  return flat;
}

export const routerFlatList = routerFlat(routers, []);

export const routerList = routers;

export function CreateLoginRouter() {
  const routes = useRoutes([
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/404",
      element: <NotPage />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
  return routes;
}

export default function Routers() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Navigate to={'/battle/editor'} />,
    },
    ...routers,
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/404",
      element: <NotPage />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
  return routes;
}
