/*
 * @Author: yjl
 * @Date: 2024-04-18 15:32:24
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-05 17:50:09
 * @Description: 描述
 */
import "./App.css";

import Layout from "@/components/Layout/index";
import { useLocation } from "react-router-dom";
import { CreateLoginRouter } from "@/router/index";
import ProtectedRoute from "@/components/AuthRouter/ProtectedRoute";
import AuthRouter from "@/components/AuthRouter/Auth.tsx";

function App() {
  const location = useLocation();
  const routerWhite = ["/login", "/404"];

  return (
    <>
      {/* {} */}
      <AuthRouter>
        {routerWhite.includes(location.pathname) ? <CreateLoginRouter /> : null}
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      </AuthRouter>
    </>
  );
}

export default App;
