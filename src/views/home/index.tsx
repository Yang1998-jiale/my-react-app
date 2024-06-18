/*
 * @Author: yjl
 * @Date: 2024-04-18 16:01:12
 * @LastEditors: yjl
 * @LastEditTime: 2024-06-17 16:17:11
 * @Description: 描述
 */
import { Typography } from "antd";
import "./style/index.less";
// import { queyrBaidu } from "@/api/battle-manage";

const { Title, Paragraph } = Typography;

export default function Home() {
  //app-c79ezjBk7gMj6pxedA9B1KZO
  // const API_KEY = "AFpYCQmReLHkgy6GpBD8VthX";
  // const SECRET_KEY = "a8WfLNi5AHQmOiIHroON2y6suO6Ns3HS";
  // const message = {
  //   messages: [{ role: "user", content: "介绍一下北京" }],
  // };

  // queyrBaidu(
  //   `/oauth/2.0/token?grant_type=client_credentials&client_id=${API_KEY}&client_secret=${SECRET_KEY}`,
  //   {},
  //   "get"
  // ).then((res: any) => {
  //   console.log(res);
  //   queyrBaidu(
  //     `/rpc/2.0/ai_custom/v1/wenxinworkshop/chat/yi_34b_chat?access_token=${res.access_token}`,
  //     message,
  //     "post"
  //   ).then((info) => {
  //     console.log(info);
  //   });
  // });
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
