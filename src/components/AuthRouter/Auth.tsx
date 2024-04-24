/*
 * @Author: yjl
 * @Date: 2024-04-24 13:43:13
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-24 15:50:20
 * @Description: 描述
 */
import { createContext, useContext, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getItem, setItem } from "@/utils/cookie/index";
const token = getItem("Authorization") || undefined;
const AuthContext = createContext<any>(null);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState<any>(token);

  const navigate = useNavigate();
  function login(data) {
    setUser(data);
    setItem("Authorization", data);
    navigate("/", { replace: true });
  }

  function logout() {
    setUser(null);
    setItem("Authorization", null);
  }
  const value = useMemo(
    () => ({
      user,
      login,
      logout,
    }),
    [user]
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  return useContext(AuthContext);
};
