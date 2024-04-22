/*
 * @Author: yjl
 * @Date: 2024-04-19 09:52:45
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-22 10:35:32
 * @Description: 描述
 */
import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";

export default function Index() {
  const [state, setState] = useState({
    message: "index",
    count: 1,
  });
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/study/index" ? (
        <Outlet />
      ) : (
        <div
          className="w-100% h-100% cursor-pointer"
          onClick={() => setState({ ...state, count: state.count + 1 })}
        >
          {state.message + state.count}
        </div>
      )}
    </>
  );
}
