import React, { useState, useEffect } from "react";
import {
  Drawer,
  Button,
  Col,
  Row,
  Image,
  Divider,
  InputNumber,
  Space,
} from "antd";
import { order_item } from "../../form/employee";

const style = { background: "#fff", padding: "8px 0" };

const Drawers = (props) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState({});
  const [values, setValues] = useState(0);

  useEffect(() => {
    setVisible(props.visible);
    setValue(props.value);
    setValues(props.value.value_buy);
    if (props.value.id != null) {
      await functionGet(`${warehouse_find_one}${props.value.id}`, async (res) => {
        if (res.dataValues != null) {
          setValue(res.dataValues);
        } else {
          await functionGet(`${promotion_find_one}${props.value.id}`, (res) => {
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
    await functionGet(`${promotion_find_one}${id}`, async (res) => {
      res.dataValues.map(async (item) => {
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
              avatar={<Avatar src={`${item.Warehouse.image}`} />}
              title={
                <>
                  <Tag color="blue" style={{ fontSize: 18 }}>{`${title}`}</Tag>
                  <Tag
                    color="geekblue"
                    style={{ fontSize: 18, marginTop: 5 }}
                  >{`${item.value} item`}</Tag>
                  <Tag color="cyan">{`${item.Warehouse.description}`}</Tag>
                </>
              }
            />
          </Card>
        );
      });
    });
    setSumItem(val);
  };

  const onClose = () => {
    props.setVisible(false);
  };

  const submit = () => {
    let order_item_form = order_item;
    order_item_form.id = value.key;
    order_item_form.dataValues.value = values;
    props.value.value_buy = values;
    order_item_form.dataValues.price = parseInt(values) * parseInt(value.price);
    order_item_form.dataValues.old_value = 0;
    props.orderItems(order_item_form);
    props.setVisible(false);
  };
  return (
    <>
      <Drawer
        title="Product information"
        width={550}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        zIndex={1500}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={submit} type="primary">
              Submit
            </Button>
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
                src={`${value.image}`}
                placeholder={
                  <Image preview={true} src={`${value.image}`} width={197} />
                }
              />
            </div>
          </Col>
          <Col className="gutter-row" span={14}>
            <Row gutter={8}>
              <Col className="gutter-row" span={9}>
                <div style={{ ...style, float: "right", color: "#C6C6C6" }}>
                  Product name :
                </div>
              </Col>
              <Col className="gutter-row" span={15}>
                <div style={style}>{value.title}</div>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col className="gutter-row" span={9}>
                <div style={{ ...style, float: "right", color: "#C6C6C6" }}>
                  Price :
                </div>
              </Col>
              <Col className="gutter-row" span={15}>
                <div style={style}>{`${value.price} Bath`}</div>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col className="gutter-row" span={9}>
                <div style={{ ...style, float: "right", color: "#C6C6C6" }}>
                  Description :
                </div>
              </Col>
              <Col className="gutter-row" span={15}>
                <div style={style}>{value.description}</div>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col className="gutter-row" span={9}>
                <div style={{ ...style, float: "right", color: "#C6C6C6" }}>
                  Quantity :
                </div>
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
                      Reset
                    </Button>
                  </Space>
                </div>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col className="gutter-row" span={9}>
                <div style={{ ...style, float: "right", color: "#C6C6C6" }}>
                  Price/Quantity :
                </div>
              </Col>
              <Col className="gutter-row" span={15}>
                <div style={{ ...style, color: "red" }}>{`${
                  values * value.price
                } Bath`}</div>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider orientation="right">Select product quantity</Divider>
        <Row gutter={16}></Row>
      </Drawer>
    </>
  );
};

export default Drawers;
