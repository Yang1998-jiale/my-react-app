/*
 * @Author: yjl
 * @Date: 2024-04-19 11:49:19
 * @LastEditors: yjl
 * @LastEditTime: 2024-04-19 12:09:43
 * @Description: 描述
 */
import { useState } from "react";
import Menu from "@/components/Menu/index";
import { Layout, Avatar, theme } from "antd";
import headerImg from "@/assets/images/header.jpg";

import Routers from "@/router/index";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;

export default function Index() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Layout className="w-100% !h-100%">
        <Sider trigger={null} collapsible collapsed={collapsed}>
            <div className=" h-32px bg-[rgba(255,255,255,.2)] b-rd-6px m-16px"></div>
          <Menu />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="flex !items-center justify-between"
            style={{ padding: 0, background: colorBgContainer }}
          >
            <div onClick={() => setCollapsed(!collapsed)} className="cursor-pointer">
              {collapsed ? (
                <MenuUnfoldOutlined className="text-20px m-l-16px" />
              ) : (
                <MenuFoldOutlined className="text-20px m-l-16px" />
              )}
            </div>
            <Avatar className="m-r-24px" src={headerImg} />
          </Header>
          <Content
            className="p-24px m-y-24px m-x-16px min-h-280px"
            style={{
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className="w-100% h-100% ">
              <Routers />
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
}
