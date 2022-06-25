import React, { useState, useEffect, useRef, useMemo } from "react";
import { Layout, Menu, Breadcrumb, Badge, Modal } from "antd";
import { LogoutOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { style } from "./style";
import { useHistory } from "react-router";
import {
  product_group_find_all,
  getQuoteById,
  ip,
  cancleTransaction,
  createTransaction,
  createOrder,
  createItems,
  warehouse_find_all,
  warehouse_product_group,
  promotion_find_all,
} from "../../constant";
import { functionGet, functionPost } from "../../services/employee";
import EmployeePage from "../../pages/EmployeePage";
import { order_item } from "../../form/employee";
import { PageHeader } from "../../pages/style";
import { Empty } from "antd";
import AddButton from "../../components/Button/AddButton";
import CancleButton from "../../components/Button/CancleButton";
import CardProductComponent from "../../components/cardProduct";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Cart from "../../pages/cart";
import { HomeOutlined } from "@ant-design/icons";
import { tradingOrder, order_sell } from "../../form/employee";
import Printer from "../../pages/EmployeePage/Print";
import * as htmlToImage from "html-to-image";
import { toPng, toJpeg, toBlob, toPixelData, toSvg } from "html-to-image";

const { Content } = Layout;
const { SubMenu } = Menu;
const menuContext = React.createContext();
const EmployeeLayout = ({ children, ...props }) => {
  const group = useMemo(() => props.match.params.group, [props.match.params.group]);
  const history = useHistory();
  const [data, setData] = useState([]);
  const [value, setValue] = useState(0);
  const [visible, setVisible] = useState(false);
  const [order, setOrder] = useState([]);
  const [product, setProduct] = useState([]);
  const [promotion, setPromotion] = useState([]);
  var node = document.getElementById("my-node");

  useEffect(() => {
    initialCart();
  }, []);

  const initialCart = async () => {
    if (localStorage.getItem("userData") == null) {
      history.replace("/");
    }
    await getCart();
    await getProduct();
    await getPromotion();
    if (group === "All Product") {
      await functionGet(warehouse_find_all, async (res) => {
        setProduct(res.dataValues);
      });
    } else {
      await functionGet(`${warehouse_product_group}${group}`, async (res) => {
        setProduct(res.dataValues);
      });
    }
  };

  const getProduct = async () => {
    await functionGet(product_group_find_all, async (e) => {
      let val = [];
      if (e.dataValues.lenght !== 0) {
        await e.dataValues.forEach((elememt) => {
          val.push(
            <Menu.Item key={`${elememt.uuid}`} onClick={() => handleClick({ key: `${elememt.uuid}` })}>
              {elememt.name}
            </Menu.Item>,
          );
        });
        setData(val);
      }
    });
  };

  const getPromotion = async () => {
    await functionGet(promotion_find_all, async (res) => {
      if (res.dataValues.lenght !== 0) {
        setPromotion(res.dataValues);
      }
    });
  };

  const getCart = async () => {
    await functionGet(`${getQuoteById}${JSON.parse(localStorage.getItem("userData"))["quote"]}`, async (e) => {
      const result = await e.dataValues.quoteItems.map((item) => {
        let order_item_form = {
          id: item.item_id,
          dataValues: {
            value: item.value,
            price: item.price,
            old_value: 0,
            image: `${ip}/${item.image}`,
            name: item.name,
            type: item.description,
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
      if (order.length > 0) {
        setVisible(true);
        window.location.href = "/cart";
      }
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

  const updateOrder = async (e) => {
    await initialCart();
  };

  const CancleCart = async () => {
    if (order.length !== 0) {
      await functionPost(
        `${cancleTransaction}`,
        { quote_id: JSON.parse(localStorage.getItem("userData"))["quote"] },
        async (res) => {
          let userData = JSON.parse(localStorage.getItem("userData"));
          userData.quote = res.quote_id;
          localStorage.setItem("userData", JSON.stringify(userData));
          await initialCart();
          if (props.match.url.endsWith("/cart")) {
            history.replace("/employee/All%20Product");
          }
        },
      );
    }
  };

  const SubmitQuote = async () => {
    let form = tradingOrder;
    let formSell = order_sell;
    formSell.dataValues = order;
    form.dataValues.price = await order.reduce((pre, cur) => pre + cur.dataValues.price, 0);
    await functionPost(`${createOrder}SELL`, form, async (res) => {
      formSell.order_sale_id = res.dataValues.uuid;
      console.table(formSell);
      await functionPost(`${createItems}`, formSell, async (response) => {
        if (response.message === "OK") {
          const slip = <Printer orderId={res.dataValues.order_id} Allprice={form.dataValues.price} order={order} />;
          info(res.dataValues.order_id, slip);
        }
      });
    });
  };

  const CreateTransaction = async (slip, orderId) => {
    await functionPost(
      `${createTransaction}`,
      { quote_id: JSON.parse(localStorage.getItem("userData"))["quote"], slip: slip, orderId: orderId },
      async (res) => {
        let userData = JSON.parse(localStorage.getItem("userData"));
        userData.quote = res.quote_id;
        localStorage.setItem("userData", JSON.stringify(userData));
        await initialCart();
        history.goBack();
      },
    );
  };

  const info = async (orderId, slip) => {
    Modal.info({
      title: "รายละเอียดรายการสั่งซื้อ",
      content: slip,
      okText: "ยืนยันสั่งซื้อ",
      onOk() {
        CreateTransaction(JSON.stringify(slip), orderId);
      },
    });
  };

  return (
    <Layout>
      <Header>
        <div style={style.logoStyle}>
          <PageHeader to="/employee/All%20Product">Shopping Cart</PageHeader>
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
              <Badge count={order.length} style={{ background: "red" }}>
                <ShoppingCartOutlined style={{ fontSize: "28px", color: "white", margin: "0 auto" }} />
              </Badge>
            }
            style={{ float: "right" }}
            onClick={() => handleClick({ key: "cart" })}
          >
            {order.length > 0 ? (
              <>
                {order.map((item, index) => (
                  <Menu.Item disabled={true} key={index} style={{ width: 500, height: "100%", background: "black" }}>
                    <CardProductComponent
                      image={item.dataValues.image}
                      value={item.dataValues.value}
                      price={item.dataValues.price}
                      name={item.dataValues.name}
                      type={item.dataValues.type}
                      style={{ background: "black" }}
                      color="white"
                      height={20}
                    />
                  </Menu.Item>
                ))}
                <Menu.Item disabled={false} key="cart">
                  <AddButton title={"จัดการตระกร้า"} />
                </Menu.Item>
              </>
            ) : (
              <Menu.Item
                disabled={true}
                key="No data"
                style={{ width: 300, height: 140, margin: "0 auto", background: "black" }}
              >
                <Empty />
              </Menu.Item>
            )}
          </SubMenu>
        </Menu>
      </Header>
      <Content style={style.siteLayoutStyle}>
        <Breadcrumb style={{ margin: "16px 0" }}>
          <Breadcrumb.Item href="/employee/All%20Product">
            <HomeOutlined />
          </Breadcrumb.Item>
          {props.match.url.split("/").map((item, index) => (
            <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
          ))}
        </Breadcrumb>
        <menuContext.Provider value={{ updateShopingCart }}>
          <div style={style.siteLayoutBackgroundStyle}>
            <Router>
              <Switch>
                <Route path="/employee/:group">
                  <EmployeePage
                    group={group}
                    menuContext={menuContext}
                    visible={visible}
                    setVisibles={(e) => setVisible(e)}
                    order={order}
                    updateOrder={updateOrder}
                    CancleCart={CancleCart}
                    product={product}
                    promotion={promotion}
                  />
                </Route>
                <Route path="/cart">
                  <Cart
                    order={order}
                    SubmitQuote={SubmitQuote}
                    CancleCart={CancleCart}
                    updateOrder={updateOrder}
                    setVisibles={(e) => setVisible(e)}
                    product={product}
                    promotion={promotion}
                  />
                </Route>
              </Switch>
            </Router>
          </div>
        </menuContext.Provider>
      </Content>
      <Footer description={"Shopping Cart"} style={{ background: "#7f96ad" }}></Footer>
    </Layout>
  );
};

export default EmployeeLayout;
