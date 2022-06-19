import React, { useState, useEffect, useRef } from "react";
import { Layout, Menu, Breadcrumb, Badge } from "antd";
import { LogoutOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { style } from "./style";
import { useHistory } from "react-router";
import { product_group_find_all, getQuoteById } from "../../constant";
import { functionGet } from "../../services/employee";
import EmployeePage from "../../pages/EmployeePage";
import { order_item } from "../../form/employee";
import { PageHeader } from "../../pages/style";
import { Empty } from "antd";

const { Content } = Layout;
const { SubMenu } = Menu;
const menuContext = React.createContext();
const EmployeeLayout = ({ children, ...props }) => {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [group, setGroup] = useState();
  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState([]);

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
      initialCart();
      let val = [];
      if (e.dataValues.lenght !== 0) {
        e.dataValues.forEach((elememt) => {
          val.push(
            <Menu.Item key={`${elememt.uuid}`} onClick={() => handleClick({ key: `${elememt.uuid}` })}>
              {elememt.name}
            </Menu.Item>,
          );
        });
        setData(val);
      }
    });
  }, []);

  const initialCart = async () => {
    functionGet(`${getQuoteById}${JSON.parse(localStorage.getItem("userData"))["quote"]}`, async (e) => {
      const result = await e.dataValues.quoteItems.map((item) => {
        let order_item_form = {
          id: item.item_id,
          dataValues: {
            value: item.value,
            price: item.price,
            old_value: 0,
          },
        };
        setValue(order_item_form.lenght);
        return order_item_form;
      });
      setOrder(result);
    });
  };

  const handleClick = (e) => {
    if (e.key === "cart") {
      if (value > 0) setVisible(true);
    } else if (e.key === "logout") {
      logout();
    } else {
      history.push(`/employee/${e.key}`);
    }
  };

  const logout = () => {
    history.replace("/");
    localStorage.removeItem("userData");
  };

  const updateShopingCart = (e) => {
    setValue(e);
  };

  return (
    <Layout>
      <Header>
        <div style={style.logoStyle}>
          <PageHeader to="/">Shopping Cart</PageHeader>
        </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["0"]}>
          <SubMenu key="group" title="กรุ๊ป">
            <Menu.Item key="All Product" onClick={() => handleClick({ key: "All Product" })}>
              All Product
            </Menu.Item>
            {data}
          </SubMenu>
          <Menu.Item key="logout" style={{ float: "right" }} onClick={() => handleClick({ key: "logout" })}>
            <LogoutOutlined style={{ fontSize: "28px", color: "white", margin: "0 auto" }} />
          </Menu.Item>
          <SubMenu
            key="cart"
            icon={
              <Badge count={value} style={{ background: "red" }}>
                <ShoppingCartOutlined style={{ fontSize: "28px", color: "white", margin: "0 auto" }} />
              </Badge>
            }
            style={{ float: "right" }}
            onClick={() => handleClick({ key: "cart" })}
          >
            {/*  */}
            <>
              {value > 0 ? (
                <></>
              ) : (
                <Menu.Item disabled={true} key="No data" style={{ height: "150px" }}>
                  <Empty />
                </Menu.Item>
              )}
            </>
          </SubMenu>
        </Menu>
      </Header>
      <Content style={style.siteLayoutStyle}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Employee</Breadcrumb.Item>
        </Breadcrumb>
        <menuContext.Provider value={{ updateShopingCart }}>
          <div style={style.siteLayoutBackgroundStyle}>
            <EmployeePage
              group={group}
              menuContext={menuContext}
              visible={visible}
              setVisibles={(e) => setVisible(e)}
              order={order}
            />
          </div>
        </menuContext.Provider>
      </Content>
      <Footer description={"Shopping Cart"} style={{ background: "#7f96ad" }}></Footer>
    </Layout>
  );
};

export default EmployeeLayout;
