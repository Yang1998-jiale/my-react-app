/*
 * @Author: yjl
 * @Date: 2024-04-19 11:49:19
 * @LastEditors: yjl
 * @LastEditTime: 2024-05-13 11:32:40
 * @Description: 描述
 */
import { useState } from "react";
import Menu from "@/components/Menu/index";
import { Layout, Avatar, theme } from "antd";
import headerImg from "@/assets/images/header.jpg";
import Breadcrumb from "@/components/Breadcrumb/index";
import Routers from "@/router/index";
import { useNavigate, Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import Logo from "@/assets/logo.png";

const { Header, Sider, Content } = Layout;

const title = import.meta.env.VITE_APP_TITLE;

export default function Index() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const navigate = useNavigate();

  return (
    <>
      <Layout className="w-100% !h-100%">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div
            className="flex items-center m-16px cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={Logo} className="w-36px h-36px b-rd-50%" alt="" />
            <div className="c-#fff m-l-8px text-18px font-600 text-truncate">
              {title}
            </div>
          </div>
          <Menu />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="flex !items-center justify-between"
            style={{ padding: 0, background: colorBgContainer }}
          >
            <div
              onClick={() => setCollapsed(!collapsed)}
              className="cursor-pointer"
            >
              {collapsed ? (
                <MenuUnfoldOutlined className="text-20px m-l-16px" />
              ) : (
                <MenuFoldOutlined className="text-20px m-l-16px" />
              )}
            </div>
            <Avatar className="m-r-24px" src={headerImg} />
          </Header>
          <Breadcrumb />
          <Content
            className=" m-y-24px m-t-0px m-x-16px min-h-280px overflow-hidden"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className="w-100% h-100% ">
              <Routers />
              <Outlet />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
