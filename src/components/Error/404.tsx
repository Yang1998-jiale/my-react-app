/*
 * @Author: yjl
 * @Date: 2024-04-22 15:43:49
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-22 15:54:04
 * @Description: 描述
 */
import Logo from "@/assets/logo.png";
import { Empty } from "antd";

export default function Index() {
  return (
    <>
      <div className="w-100% h-100% flex justify-center items-center ">
        <Empty
          image={Logo}
          imageStyle={{ height: 200, width: 200 }}
          description={
            <span className="text-16px">
              页面丢失了,请返回
              <a href="/" className="font-600">
                首页
              </a>
            </span>
          }
        />
      </div>
    </>
  );
}
