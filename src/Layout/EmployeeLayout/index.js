import React from "react";
import { Layout, Menu, Breadcrumb } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { style } from "./style";
import { useHistory } from "react-router";

const { Content } = Layout;

const EmployeeLayout = ({ children }) => {
  const history = useHistory();

  const logout = () => {
    history.replace("/");
    localStorage.removeItem("userData");
  };
  return (
    <Layout>
      <Header>
        <div style={style.logoStyle} />
        <LogoutOutlined style={{ ...style.logoLogoutStyle }} onClick={logout} />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Content style={style.siteLayoutStyle}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Employee</Breadcrumb.Item>
        </Breadcrumb>
        <div style={style.siteLayoutBackgroundStyle}>{children}</div>
      </Content>
      <Footer description={<h3>Shoping Card ©2021 Created by BALL ERTH</h3>} />
    </Layout>
  );
};

export default EmployeeLayout;
