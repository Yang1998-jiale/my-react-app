/*
 * @Author: yjl
 * @Date: 2024-04-24 14:45:00
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-24 15:12:45
 * @Description: 描述
 */
import { Navigate } from "react-router-dom";

import { useAuth } from "./Auth";

export default function ProtectedRoute({ children }) {
  const { user }: any = useAuth();
  console.log(user);
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}
