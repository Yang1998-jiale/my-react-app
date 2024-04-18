/*
 * @Author: yjl
 * @Date: 2024-04-18 15:52:15
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-18 18:11:20
 * @Description: 描述
 */
const modules = import.meta.glob("./modules/**/*.tsx",{eager:true});
import { useRoutes, Navigate } from "react-router-dom";

const routers: any = [];
Object.keys(modules).forEach((key) => {
  const mod = (modules[key] as any).default || {};
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  routers.push(...modList);
});

export default function Routers() {
  const routes = useRoutes([
    {
      path: "/",
      element: <Navigate to={routers[0].path} />,
    },
    ...routers,
  ]);
  return routes;
}
