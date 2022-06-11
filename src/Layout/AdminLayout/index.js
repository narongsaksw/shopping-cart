import React from "react";
import { isLogin } from "../../middleware/auth";
import { Link, Redirect, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import styled from "styled-components";

const { Footer, Sider, Content } = Layout;

const WrapIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  padding: 10px;
`;

const AdminLayout = ({ children }) => {
  const location = useLocation();
  // if (!isLogin()) {
  //   return <Redirect to='/' />;
  // }
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider theme="dark" style={{ boxShadow: "0px 3px 10px #00000029" }}>
        <WrapIcon />
        <Menu
          theme="dark"
          defaultSelectedKeys={["/history"]}
          selectedKeys={[location.pathname]}
          mode="inline"
        >
          <Menu.Item key="/history">
            <Link to="/history">รายงานการขายสินค้า</Link>
          </Menu.Item>
          <Menu.Item key="/stockHistory">
            <Link to="/stockHistory">รายงานการนำเข้าสินค้า</Link>
          </Menu.Item>
          <Menu.Item key="/stock">
            <Link to="/stock">รายการคลังสินค้า</Link>
          </Menu.Item>
          <Menu.Item key="/employeeList">
            <Link to="/employeeList">รายชื่อพนักงาน</Link>
          </Menu.Item>
          <Menu.Item key="/companyList">
            <Link to="/companyList">รายชื่อบริษัทคู่ค้า</Link>
          </Menu.Item>
          <Menu.Item key="/promotion">
            <Link to="/promotion">จัดการโปรโมชั่น</Link>
          </Menu.Item>
          <Menu.Item key="/logout">
            <Link to="/logout">ออกจากระบบ</Link>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Content style={{ backgroundColor: "white" }}>{children}</Content>
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
