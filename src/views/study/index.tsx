/*
 * @Author: yjl
 * @Date: 2024-04-19 09:52:45
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-23 10:40:19
 * @Description: 描述
 */
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button } from "antd";
import { useEffect } from "react";
import { queryStudyList } from "@/api/study-manage/index";

function queryData(params) {
  queryStudyList(params).then((res) => {
    console.log(res);
  });
}
export default function Index() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    queryData({});
  });
  return (
    <>
      {location.pathname !== "/study/index" ? (
        <Outlet />
      ) : (
        <div className="w-100% h-100% cursor-pointer">
          我是study/index页面
          <Button onClick={() => navigate("/study/index/home")}>
            查看详情
          </Button>
        </div>
      )}
    </>
  );
}
