import React, { useState, useEffect } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Select,
  Image,
  Divider,
  InputNumber,
  Space,
} from "antd";

const { Option } = Select;

const style = { background: "#fff", padding: "8px 0" };

const Drawers = (props) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState({});
  const [random, setRandom] = useState(Date.now());
  const [values, setValues] = useState("99");

  useEffect(() => {
    setVisible(props.visible);
    setValue(props.value);
    setValues(1);
  }, [props.visible, props.value]);

  const onClose = () => {
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
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={onClose} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={onClose} type="primary">
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
                      min={1}
                      max={value.value}
                      value={values}
                      onChange={setValues}
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
