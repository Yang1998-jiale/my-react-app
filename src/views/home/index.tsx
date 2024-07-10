/*
 * @Author: yjl
 * @Date: 2024-04-18 16:01:12
 * @LastEditors: yjl
 * @LastEditTime: 2024-07-10 17:11:59
 * @Description: 描述
 */
import { Typography } from "antd";
import "./style/index.less";
import { getUserInfo } from "@/api/login/index";

const { Title, Paragraph } = Typography;

export default function Home() {
  getUserInfo({}).then((res) => {
    console.log(res);
  });
  return (
    <div className="w-100% h-100% overflow-y-auto p-x-24px  relative">
      <Typography>
        <Title>
          <span className="text">Welcome to then applicantion</span>
        </Title>
        <Paragraph>
          使用React+Vite+TS搭建项目,构建项目组成,配置型路由,Mockjs模拟接口请求,使用Redux+reduxjs/toolkit做状态管理
        </Paragraph>
      </Typography>
    </div>
  );
}
