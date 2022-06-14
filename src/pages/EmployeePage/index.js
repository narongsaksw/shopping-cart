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
import { Skeleton, Modal, Card, Avatar, Empty, Row, Col, Tag } from "antd";
import { old_file_value } from "../../form/employee";
import { tradingOrder, order_sell } from "../../form/employee";
import Promotion from "./Promotion";
import Printer from "./Print";

const { Meta } = Card;

export const EmployeePage = (props) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);
  const { updateShopingCart } = useContext(props.menuContext);
  const order = useRef([]);
  const val_old = useRef([]);
  const url = useRef("");
  const checkModal = useRef(false);
  const [shopingCards, setShopingCards] = useState([]);
  const Allprice = useRef(0);
  // eslint-disable-next-line no-unused-vars
  const componentRef = useRef();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const group = props.group;
    if (group === "All Product") {
      card(warehouse_find_all).then((res) => {
        setData(res);
        setLoading(false);
      });
      url.current = warehouse_find_all;
    } else {
      setLoading(true);
      card(`${warehouse_product_group}${group}`).then((res) => {
        setData(res);
        setLoading(false);
      });
      url.current = `${warehouse_product_group}${group}`;
    }
  }, [props.group]);

  useEffect(() => {
    shopingCard();
    setVisibleModal(props.visible);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.visible]);

  useEffect(() => {
    props.order.forEach((item) => {
      updateOrderItem(item);
    });
  }, [props.order]);

  const updateOrderItem = async (e) => {
    val_old.current = await val_old.current.map((element) => {
      let _val = JSON.parse(element);
      if (_val.item_id === e.id) {
        _val.value = e.dataValues.value;
      }
      return JSON.stringify(_val);
    });

    let findCheck = order.current.filter((item) => {
      return JSON.parse(item).id === e.id;
    });
    if (findCheck.length !== 0) {
      if (e.dataValues.value === 0) {
        let data = await order.current.filter((item) => {
          return JSON.parse(item).id !== e.id;
        });
        order.current = data;
        updateShopingCart(order.current.length);
      } else {
        let old_Data = JSON.parse(findCheck[0]);
        old_Data.dataValues.value = e.dataValues.value;
        old_Data.dataValues.price = e.dataValues.price;
        let dataSplit = await order.current.filter((item) => {
          return JSON.parse(item).id !== e.id;
        });
        dataSplit.push(JSON.stringify(old_Data));
        order.current = dataSplit;
      }
    } else if (e.dataValues.value !== 0 && findCheck.length === 0) {
      order.current.push(JSON.stringify(e));
      updateShopingCart(order.current.length);
    }
    setValue({});
  };

  const card = async (e) => {
    let val = [];
    await functionGet(e, async (res) => {
      if (res.dataValues != null) {
        await res.dataValues.forEach(async (element) => {
          let new_element = null;
          let data = await val_old.current.filter((e) => {
            return JSON.parse(e).item_id === element.key;
          });
          if (data.length === 0) {
            const new_old_file_value = old_file_value;
            new_old_file_value.item_id = element.key;
            new_old_file_value.value = 0;
            val_old.current.push(JSON.stringify(new_old_file_value));
            new_element = { ...element, value_buy: 0, id: element.key };
          } else {
            new_element = {
              ...element,
              value_buy: JSON.parse(data[0]).value,
              id: element.key,
            };
          }
          val.push(
            <CardItems
              {...new_element}
              description={`price ${new_element.price} BATH`}
              setVisible={(e) => {
                setVisible(e);
                let findCheck = order.current.filter((item) => {
                  return JSON.parse(item).id === new_element.id;
                });
                if (findCheck.length !== 0) {
                  new_element.value_buy = JSON.parse(findCheck).dataValues.value;
                  setValue(new_element);
                } else {
                  new_element.value_buy = 0;
                  setValue(new_element);
                }
              }}
            />,
          );
        });
      }
    });
    return val;
  };

  const shopingCard = async () => {
    try {
      let val = [];
      Allprice.current = 0;
      await order.current.forEach(async (element) => {
        let data = JSON.parse(element);
        Allprice.current += data.dataValues.price;
        let data_item;
        await functionGet(`${warehouse_find_one}${data.id}`, (res) => {
          if (res.dataValues != null) {
            data_item = res.dataValues;
          }
        });
        await functionGet(`${promotion_find_one}${data.id}`, (res) => {
          if (res.dataValues != null) {
            data_item = res.dataValues;
          }
        });
        let new_element = null;
        let findCheck = order.current.filter((item) => {
          return JSON.parse(item).id === data.id;
        });
        console.log("findCheck ", findCheck);
        if (findCheck.length > 0) {
          new_element = {
            ...data_item,
            value_buy: JSON.parse(findCheck).dataValues.value,
            id: data.id,
          };
          delete new_element.title;
          await val.push(
            <Card
              {...new_element}
              style={{
                width: "100%",
                marginTop: 16,
                cursor: "pointer",
                zIndex: 200,
              }}
              onClick={() => {
                setValue(new_element);
                setVisible(true);
                props.setVisibles(false);
                checkModal.current = true;
              }}
            >
              <Meta
                avatar={
                  <Avatar
                    src={`${
                      data_item.image != null
                        ? ip + "/" + data_item.image
                        : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    }`}
                  />
                }
                title={
                  <>
                    <Tag color="blue" style={{ fontSize: 18 }}>{`${data_item.title}`}</Tag>
                    <Tag color="geekblue" style={{ fontSize: 18, marginTop: 5 }}>{`${data.dataValues.value} item`}</Tag>
                    <Tag color="purple" style={{ fontSize: 18 }}>{`${data.dataValues.price} Bath`}</Tag>
                    <Tag color="cyan">{`${data_item.description}`}</Tag>
                  </>
                }
              />
            </Card>,
          );
          if (val.length === order.current.length) {
            setShopingCards(val);
          }
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  const modalSubmit = async () => {
    if (order.current.length !== 0) {
      let form = tradingOrder;
      let formSell = order_sell;
      formSell.dataValues = order.current;
      form.dataValues.price = Allprice.current;
      functionPost(`${createOrder}SELL`, form, (res) => {
        formSell.order_sale_id = res.dataValues.uuid;
        functionPost(`${createItems}`, formSell, (response) => {
          if (response.message === "OK") {
            info(res.dataValues.order_id, Allprice.current, order.current);
          }
        });
      });
      await functionPost(
        `${createTransaction}`,
        { quote_id: JSON.parse(localStorage.getItem("userData"))["quote"] },
        (res) => {
          let userData = JSON.parse(localStorage.getItem("userData"));
          userData.quote = res.quote_id;
          localStorage.setItem("userData", JSON.stringify(userData));
        },
      );
    }
  };

  const modalCancle = async () => {
    if (order.current.length !== 0) {
      await functionPost(
        `${cancleTransaction}`,
        { quote_id: JSON.parse(localStorage.getItem("userData"))["quote"] },
        (res) => {
          let userData = JSON.parse(localStorage.getItem("userData"));
          userData.quote = res.quote_id;
          localStorage.setItem("userData", JSON.stringify(userData));
          order.current = [];
          props.setVisibles(false);
          checkModal.current = false;
          updateShopingCart(0);
        },
      );
    }
  };

  const info = (orderId, Allprice, orders) => {
    Modal.info({
      title: "รายละเอียดรายการสั่งซื้อ",
      content: <Printer orderId={orderId} Allprice={Allprice} order={orders} />,
      okText: "ยืนยันสั่งซื้อ",
      cancelText: "ยกเลิกการสั่งซื้อ",
      onOk() {
        checkModal.current = false;
        val_old.current = [];
        order.current = [];
        setValue({});
        card(url.current);
        updateShopingCart(order.current.length);
        props.setVisibles(false);
      },
    });
  };

  return (
    <Container>
      {loading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <>
          <Promotion card={(e) => card(e)} val_old={val_old} />
          {data}
        </>
      )}
      <Drawer
        visible={visible}
        setVisible={async (e) => {
          setVisible(e);
          if (checkModal.current) {
            props.setVisibles(true);
          }
          setValue({});
        }}
        value={value}
        orderItems={(e) => {
          updateOrderItem(e);
          if (checkModal.current) {
            shopingCard();
            card(url.current);
            props.setVisibles(true);
          }
        }}
      />
      <Modal
        title="รายการสั่งซื้อ"
        centered
        visible={visibleModal}
        okText={"สั่งซื้อ"}
        cancelText={"ยกเลิกการสั่งซื้อ"}
        onOk={() => {
          modalSubmit();
        }}
        onCancel={() => {
          props.setVisibles(false);
          checkModal.current = false;
        }}
        width={1000}
      >
        {order.current.length === 0 ? (
          <Empty description={false} />
        ) : (
          <div style={{ maxHeight: 500, overflow: "auto" }}>
            <Row>
              <Col
                style={{
                  fontSize: 15,
                  fontFamily: "sans-serif",
                  fontWeight: 600,
                }}
                span={22}
              >
                {`Total price : ${Allprice.current}`}
              </Col>
              <Col
                style={{
                  fontSize: 12,
                  fontFamily: "sans-serif",
                  color: "red",
                  cursor: "pointer",
                }}
                onClick={modalCancle}
                span={2}
              >
                {`ยกเลิก`}
              </Col>
            </Row>
            {shopingCards}
          </div>
        )}
      </Modal>
    </Container>
  );
};

export default EmployeePage;
