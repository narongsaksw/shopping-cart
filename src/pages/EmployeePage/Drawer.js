import React, { useState, useEffect } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Image,
} from "antd";

const { Option } = Select;

const Drawers = (props) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState({});
  const [random, setRandom] = useState(Date.now());

  useEffect(() => {
    setVisible(props.visible);
    setValue(props.value);
  }, [props.visible, props.value]);

  const onClose = () => {
    props.setVisible(false);
  };

  return (
    <>
      <Drawer
        title={value.title}
        width={720}
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
        <Image
          width={200}
          src={`${value.image}`}
          placeholder={
            <Image preview={true} src={`${value.image}`} width={300} />
          }
        />
        <Form layout="vertical" hideRequiredMark></Form>
      </Drawer>
    </>
  );
};

export default Drawers;
