/*
 * @Author: yjl
 * @Date: 2024-04-18 15:52:15
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-24 16:25:51
 * @Description: 描述
 */
const modules = import.meta.glob("./modules/**/*.tsx", { eager: true });
import { useRoutes, Navigate } from "react-router-dom";
import NotPage from "@/components/Error/404";
import Login from "@/components/Login/index";

const routers: any = [];
Object.keys(modules).forEach((key) => {
  const mod = (modules[key] as any).default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routers.push(...modList);
});
console.log(routers);

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
console.log(routerFlat(routers, []));

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
      element: <Navigate to={routers[0].path} />,
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
