import React, { useEffect, useState, useRef } from "react";
import { Col, Row, Typography, Divider, Space, Button, Tooltip, Empty } from "antd";
import CardProductComponent from "../../components/cardProduct";
import Order from "../../components/Card/order";
import AddButton from "../../components/Button/AddButton";
import CancleButton from "../../components/Button/CancleButton";
import { useHistory } from "react-router";
import { RollbackOutlined } from "@ant-design/icons";
import Drawer from "../EmployeePage/Drawer";

const Cart = ({ order, CancleCart, SubmitQuote, setVisibles, updateOrder, product, promotion }) => {
  const history = useHistory();
  const [visibleDrawer, setVisibleDrawer] = useState(false);
  const [valueDrawer, setValueDrawer] = useState({});
  const checkModal = useRef(false);

  const VisibleDrawer = async (data, status) => {
    const result = { ...data, value_buy: data.dataValues.value, id: data.id, key: data.id };
    setValueDrawer(result);
    setVisibleDrawer(status);
  };

  return (
    <>
      <Space>
        <Tooltip title="search">
          <Button
            type="primary"
            shape="circle"
            icon={<RollbackOutlined />}
            onClick={() => {
              history.goBack();
            }}
          />
        </Tooltip>
        <Typography.Title level={4} style={{ margin: 0 }}>
          Order
        </Typography.Title>
      </Space>

      <Divider />
      <Row gutter={[8, 8]}>
        <Col span={14}>
          <Col span={22}>
            {order.length ? (
              <div
                style={{
                  height: "auto",
                  width: 500,
                  position: "relative",
                  display: "flex",
                  padding: 10,
                  float: "right",
                  marginBottom: 10,
                }}
              >
                {order.map((item, index) => (
                  <CardProductComponent
                    key={index}
                    image={item.dataValues.image}
                    value={item.dataValues.value}
                    price={item.dataValues.price}
                    name={item.dataValues.name}
                    type={item.dataValues.type}
                    style={{ width: "100%" }}
                    color={"black"}
                    onClick={(event) => {
                      VisibleDrawer(item, true);
                    }}
                  />
                ))}
              </div>
            ) : (
              <Empty />
            )}
          </Col>
        </Col>
        <Col span={6} style={{ border: "1px solid rgb(235, 242, 245)", borderRadius: "4px", padding: 10 }}>
          <Space direction="vertical">
            <Order order={order} />
            <AddButton title={"สั่งซื้อ"} onClick={SubmitQuote} />
            <CancleButton title={"ยกเลิก"} onClick={CancleCart} />
          </Space>
        </Col>
      </Row>
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
    </>
  );
};

export default Cart;
