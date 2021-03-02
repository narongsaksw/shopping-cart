import React, { useState, useEffect } from "react";
import { Layout, Menu, Breadcrumb, Badge } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { style } from "./style";
import { useHistory } from "react-router";
import { product_group_find_all } from "../../constant";
import { functionGet } from "../../services/employee";
import { ShoppingCartOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { SubMenu } = Menu;

const EmployeeLayout = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    functionGet(product_group_find_all, (e) => {
      let val = [];
      if (e.lenght !== 0) {
        e.forEach((elememt) => {
          val.push(
            <Menu.Item key={`${elememt.uuid}`}>{elememt.name}</Menu.Item>
          );
        });
        setData(val);
      }
    });
  }, []);

  const history = useHistory();

  const logout = () => {
    history.replace("/");
    localStorage.removeItem("userData");
  };

  const handleClick = (e) => {
    history.replace(`/employee/${e.key}`);
  };

  return (
    <Layout>
      <Header>
        <div style={style.logoStyle} />
        <LogoutOutlined style={{ ...style.logoLogoutStyle }} onClick={logout} />
        <div style={style.logoStyle}>
          <ShoppingCartOutlined></ShoppingCartOutlined>
        </div>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["0"]}
          onClick={handleClick}
        >
          <SubMenu key="group" title="Group">
            <Menu.Item key="All Product">All Product</Menu.Item>
            {data}
          </SubMenu>
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
