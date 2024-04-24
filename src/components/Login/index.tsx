// import { useState } from "react";
import { userLogin } from "@/api/login/index";
import { setItem, getItem } from "@/utils/cookie";
import { Button, Spin, Form, Input } from "antd";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "@/components/AuthRouter/Auth";
import { useState } from "react";
import BgImage from "@/assets/bgc2.jpg";
import Logo from "@/assets/logo.png";
// type FieldType = {
//   username?: string;
//   password?: string;
//   remember?: string;
// };

export default function Index() {
  const { login: setToken } = useAuth();
  const [spining, setSpin] = useState(false);

  const token = getItem("Authorization");
  const navigate = useNavigate();
  if (token) {
    return <Navigate to="/" />;
  }
  function login(data) {
    setSpin(true);
    userLogin(data)
      .then((res: any) => {
        if (res.token) {
          setToken(res.token);
          setItem("Authorization", res.token);
          navigate("/");
        }
      })
      .finally(() => {
        setSpin(false);
      });
  }

  function onFinish(values) {
    login(values);
  }
  function onFinishFailed(err) {
    console.log(err);
  }
  return (
    <>
      <div
        className="w-100% h-100%  flex flex-col justify-center items-center bg-auto bg-no-repeat "
        style={{
          background: `url(${BgImage})`,
          backgroundSize: "100% 100%",
        }}
      >
        <Spin spinning={spining} fullscreen />

        <div className="w-300px  b-rd-8px p-24px bg-#fff  items-center flex flex-col justify-start  translate-y--10%">
          <img
            src={Logo}
            alt=""
            className=" b-rd-50% w-140px h-130px p-b-24px b-1px b-#ccc b-solid"
          />
          <h2 className="!m-16px">欢迎登录阿猹的React</h2>
          <Form
            name="basic"
            autoComplete="off"
            initialValues={{ userName: "yjl", password: "molimicha12138" }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="userName"
              rules={[{ required: true, message: "请输入用户名/手机号" }]}
            >
              <Input
                className="w-240px h-40px  b-rd-4px
                "
                placeholder="请输入用户名/手机号"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <Input.Password
                className="w-240px h-40px b-rd-4px 
              "
                placeholder="请输入密码"
              />
            </Form.Item>
            <Form.Item>
              <Button
                className="w-240px b-rd-4px h-40px m-t-8px"
                type="primary"
                htmlType="submit"
              >
                登录
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
