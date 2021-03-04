import React, { useState, useEffect, useContext } from "react";
import { Layout, Menu, Breadcrumb, Badge } from "antd";
import { LogoutOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { style } from "./style";
import { useHistory } from "react-router";
import { product_group_find_all } from "../../constant";
import { functionGet } from "../../services/employee";
import EmployeePage from "../../pages/EmployeePage";

const { Content } = Layout;
const { SubMenu } = Menu;
const menuContext = React.createContext();
const EmployeeLayout = ({ children, ...props }) => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [group, setGroup] = useState();

  useEffect(() => {
    if (props.match.params.group != null) {
      setGroup(props.match.params.group);
    }
  }, [props.match.params.group]);

  useEffect(() => {
    if (localStorage.getItem("userData") == null) {
      history.replace("/");
    }
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

  const handleClick = (e) => {
    history.push(`/employee/${e.key}`);
  };

  const updateShopingCart = (e) => {
    setValue(e);
  };

  return (
    <Layout>
      <Header>
        <div style={style.logoStyle} />
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
          <Menu.Item key="logout" style={{ float: "right" }}>
            <LogoutOutlined style={{ fontSize: "28px", color: "white" }} />
          </Menu.Item>
          <Menu.Item key="cart" style={{ float: "right" }}>
            <Badge count={value}>
              <ShoppingCartOutlined
                style={{ fontSize: "28px", color: "white" }}
              />
            </Badge>
          </Menu.Item>
        </Menu>
      </Header>
      <Content style={style.siteLayoutStyle}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Employee</Breadcrumb.Item>
        </Breadcrumb>
        <menuContext.Provider value={{ updateShopingCart }}>
          <div style={style.siteLayoutBackgroundStyle}>
            <EmployeePage group={group} menuContext={menuContext} />
          </div>
        </menuContext.Provider>
      </Content>
      <Footer description={<h3>Shoping Card ©2021 Created by BALL ERTH</h3>} />
    </Layout>
  );
};

export default EmployeeLayout;
