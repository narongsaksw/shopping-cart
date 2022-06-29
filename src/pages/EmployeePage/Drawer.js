import React, { useState, useEffect } from "react";
import { Drawer, Button, Col, Row, Image, Divider, InputNumber, Space, Card, Avatar, Tag, Empty } from "antd";
import { order_item } from "../../form/employee";
import {
  warehouse_find_one,
  promotion_find_one,
  promotion_item_find_pid,
  addQuote,
  deleteQuoteItemById,
  ip,
} from "../../constant";
import { functionGet, functionPost, functionPut, functionDelete } from "../../services/employee";

const style = { background: "#fff", padding: "8px 0" };

const { Meta } = Card;

const Drawers = (props) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState({});
  const [values, setValues] = useState(0);
  const [subItem, setSumItem] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    setVisible(props.visible);
  }, [props.visible]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    setValues(props.value.value_buy);
    if (props.value.id != null) {
      await functionGet(`${warehouse_find_one}${props.value.key}`, async (res) => {
        if (res.dataValues != null) {
          setValue(res.dataValues);
        } else {
          await functionGet(`${promotion_find_one}${props.value.key}`, (res) => {
            if (res.dataValues != null) {
              setValue(res.dataValues);
              itemPromotion(res.dataValues.key);
            }
          });
        }
      });
    }
  }, [props.value]);

  const itemPromotion = async (id) => {
    let val = [];
    await functionGet(`${promotion_item_find_pid}${id}`, async (res) => {
      res.dataValues.map(async (item) => {
        if (item.Warehouse != null) {
          const title = item.Warehouse.title;
          const data = item.Warehouse;
          delete data.title;
          await val.push(
            <Card
              {...data}
              style={{
                width: "100%",
                marginTop: 16,
                cursor: "pointer",
                zIndex: 200,
              }}
            >
              <Meta
                avatar={<Avatar src={`${ip}/${item.Warehouse.image}`} />}
                title={
                  <>
                    <Tag color="blue" style={{ fontSize: 18 }}>{`${title}`}</Tag>
                    <Tag color="geekblue" style={{ fontSize: 18, marginTop: 5 }}>{`${item.value} item`}</Tag>
                    <Tag color="cyan">{`${item.Warehouse.description}`}</Tag>
                  </>
                }
              />
            </Card>,
          );
        }
      });
    });
    setSumItem(val);
  };

  const onClose = () => {
    setSumItem([]);
    props.setVisible(false);
  };

  const submit = async () => {
    let quoteForm = {
      quote_id: JSON.parse(localStorage.getItem("userData"))["quote"],
      type: "item",
      item_id: value.key,
      value: values,
      price: parseInt(values) * parseInt(value.price),
    };
    await functionPost(`${addQuote}`, quoteForm, async (res) => {});
    props.updateOrder();
    props.setVisible(false);
    setSumItem([]);
  };

  const update = async () => {
    let quoteForm = {
      quote_id: JSON.parse(localStorage.getItem("userData"))["quote"],
      type: "item",
      item_id: value.key,
      value: values,
      price: parseInt(values) * parseInt(value.price),
    };
    await functionPut(`${addQuote}`, quoteForm, async (res) => {});
    props.updateOrder();
    props.setVisible(false);
    setSumItem([]);
  };

  const deleteQuoteItem = async () => {
    await functionDelete(
      `${deleteQuoteItemById}${JSON.parse(localStorage.getItem("userData")).quote}/item/${value.key}`,
      async (res) => {},
    );
    props.updateOrder();
    props.setVisible(false);
    setSumItem([]);
  };

  return (
    <>
      <Drawer
        title="รายละเอียดสินค้า"
        width={550}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              ยกเลิก
            </Button>
            <>
              {props.value.value_buy > 0 ? (
                <>
                  {parseInt(values) === 0 ? (
                    <Button onClick={deleteQuoteItem} type="primary">
                      ลบในตระกร้า
                    </Button>
                  ) : (
                    <Button onClick={update} disabled={values === props.value.value_buy} type="primary">
                      อัพเดตในตระกร้า
                    </Button>
                  )}
                </>
              ) : (
                <Button onClick={submit} type="primary">
                  เพิ่มในตระกร้า
                </Button>
              )}
            </>
          </div>
        }
      >
        <Row gutter={8}>
          <Col className="gutter-row" span={10}>
            <div
              style={{
                maxHeight: 200,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #DDDDDD",
              }}
            >
              <Image
                width={197}
                src={`${ip}/${
                  value.image != null ? value.image : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                }`}
                placeholder={
                  <Image
                    preview={true}
                    src={`${
                      value.image != null
                        ? value.image
                        : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    }`}
                    width={197}
                  />
                }
              />
            </div>
          </Col>
          <Col className="gutter-row" span={14}>
            <Row gutter={8}>
              <Col className="gutter-row" span={9}>
                <div style={{ ...style, float: "right", color: "#C6C6C6" }}>ชื่อสินค้า :</div>
              </Col>
              <Col className="gutter-row" span={15}>
                <div style={style}>{value.title}</div>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col className="gutter-row" span={9}>
                <div style={{ ...style, float: "right", color: "#C6C6C6" }}>ราคา :</div>
              </Col>
              <Col className="gutter-row" span={15}>
                <div style={style}>{`${value.price} Bath`}</div>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col className="gutter-row" span={9}>
                <div style={{ ...style, float: "right", color: "#C6C6C6" }}>หน่วย :</div>
              </Col>
              <Col className="gutter-row" span={15}>
                <div style={style}>{value.description}</div>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col className="gutter-row" span={9}>
                <div style={{ ...style, float: "right", color: "#C6C6C6" }}>คงเหลือในคลัง :</div>
              </Col>
              <Col className="gutter-row" span={15}>
                <div style={style}>{`${value.value - values} ${value.description}`} </div>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col className="gutter-row" span={9}>
                <div style={{ ...style, float: "right", color: "#C6C6C6" }}>จำนวน :</div>
              </Col>
              <Col className="gutter-row" span={15}>
                <div style={style}>
                  <Space>
                    <InputNumber
                      min={0}
                      max={value.value}
                      value={values}
                      onChange={(e) => {
                        setValues(e);
                      }}
                    />
                    <Button
                      type="primary"
                      onClick={() => {
                        setValues(1);
                      }}
                    >
                      ค่าเริ่มต้น
                    </Button>
                  </Space>
                </div>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col className="gutter-row" span={9}>
                <div style={{ ...style, float: "right", color: "#C6C6C6" }}>ราคาต่อจำนวน :</div>
              </Col>
              <Col className="gutter-row" span={15}>
                <div style={{ ...style, color: "red" }}>{`${values * value.price} Bath`}</div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider orientation="right">รายละเอียดย่อยของรายการ</Divider>
        {subItem.length !== 0 ? <>{subItem}</> : <Empty description={false} />}
      </Drawer>
    </>
  );
};

export default Drawers;
