import React, { useState, useEffect, useRef, useContext } from "react";
import { Container } from "./style";
import CardItems from "../../components/CardItems";
import Drawer from "./Drawer";
import { functionGet, functionPost } from "../../services/employee";
import {
  warehouse_find_all,
  warehouse_product_group,
  warehouse_find_one,
  promotion_find_one,
  createOrder,
  createItems,
  createTransaction,
  ip,
  cancleTransaction,
} from "../../constant";
import { Skeleton, Modal, Card, Avatar, Tag, Empty, Divider } from "antd";
import { old_file_value } from "../../form/employee";
import { tradingOrder, order_sell } from "../../form/employee";
import Promotion from "./Promotion";
import Printer from "./Print";

const { Meta } = Card;

export const EmployeePage = ({
  group,
  menuContext,
  visible,
  setVisibles,
  order,
  updateOrder,
  CancleCart,
  product,
  promotion,
}) => {
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [valueDrawer, setValueDrawer] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);
  const { updateShopingCart } = useContext(menuContext);
  // const order = useRef([]);
  const val_old = useRef([]);
  const url = useRef("");
  const checkModal = useRef(false);
  const [shopingCards, setShopingCards] = useState([]);
  const Allprice = useRef(0);

  const VisibleDrawer = async (data, status) => {
    const findOrder = await order.find((item) => item.id == data.key);
    if (findOrder) data["value_buy"] = findOrder.dataValues.value;
    else data["value_buy"] = 0;
    data["id"] = data.key;
    setValueDrawer(data);
    setVisibleDrawer(status);
  };

  console.log("promotion ", promotion);

  return (
    <Container>
      {promotion.length == 0 && product.length == 0 ? (
        <div style={{ width: "100%", height: "100%" }}>
          <Empty description={false} />
        </div>
      ) : (
        <div style={{ width: "100%" }}>
          <div>{promotion.length > 0 ? <Divider orientation="left">Promotion</Divider> : null}</div>
          <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
            {promotion.map((item, index) => (
              <CardItems
                key={item.key}
                image={item.image}
                description={`price ${item.price} BATH`}
                title={item.title}
                setVisibleDrawer={(event) => {
                  VisibleDrawer(item, event);
                }}
              />
            ))}
          </div>
          <div>{product.length > 0 ? <Divider orientation="left">Product</Divider> : null}</div>
          <div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
            {product.map((item, index) => (
              <CardItems
                key={item.key}
                image={item.image}
                description={`price ${item.price} BATH`}
                title={item.name}
                setVisibleDrawer={(event) => {
                  VisibleDrawer(item, event);
                }}
              />
            ))}
          </div>
        </div>
      )}
      <Drawer
        visible={visibleDrawer}
        setVisible={async (e) => {
          setVisibleDrawer(e);
          if (checkModal.current) {
            setVisibles(true);
          }
          setValueDrawer({});
        }}
        value={valueDrawer}
        updateOrder={updateOrder}
      />
    </Container>
  );
};

export default EmployeePage;
