import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Select, Button, Space } from "antd";
import { functionGet } from "../../services/employee";
import { warehouse_find_all } from "../../constant";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const CollectionCreateForm = ({ visible, onCreate, onCancel, field }) => {
  const [form] = Form.useForm();
  const [fields, setFields] = useState([]);
  const [wha, setWha] = useState([]);

  useEffect(() => {
    setFields(field);
  }, [field]);

  useEffect(() => {
    findWarehouse();
  }, []);

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
  }

  const findWarehouse = () => {
    functionGet(warehouse_find_all, (res) => {
      setWha(
        res.dataValues.map((item) => {
          return <Option key={item.key}>{item.title}</Option>;
        })
      );
    });
  };

  return (
    <Modal
      height={100}
      visible={visible}
      title="สร้างโปรโมชั่น"
      okText="ยืนยัน"
      cancelText="ยกเลิก"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
        fields={fields}
        autoComplete="off"
      >
        <Form.Item
          name="name"
          label="ชื่อโปรโมชั่น"
          rules={[
            {
              required: true,
              message: "กรุณาใส่ชื่อ!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="price"
          label="ราคา"
          rules={[
            {
              required: true,
              message: "กรุณาใส่ราคา!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="บรรยาย"
          rules={[
            {
              required: true,
              message: "กรุณาใส่คำบรรยาย!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="image"
          label="รูป"
          rules={[
            {
              required: true,
              message: "กรุณาใส่รูป!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.List name="dataValues">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space key={field.key} style={{ width: "100%" }}>
                  <Form.Item
                    noStyle
                    shouldUpdate={(prevValues, curValues) => prevValues.area !== curValues.area || prevValues.sights !== curValues.sights}
                  >
                    {() => (
                      <Form.Item
                        {...field}
                        label="สินค้า"
                        name={[field.name, "id"]}
                        fieldKey={[field.fieldKey, "id"]}
                        rules={[{ required: true, message: "กรุณาใส่สินค้า" }]}
                        style={{ display: "flex" }}
                      >
                        <Select style={{ width: 260 }}>{wha}</Select>
                      </Form.Item>
                    )}
                  </Form.Item>
                  <Form.Item
                    {...field}
                    label="จำนวน"
                    name={[field.name, "value"]}
                    fieldKey={[field.fieldKey, "value"]}
                    rules={[{ required: true, message: "กรุณาใส่จำนวน" }]}
                  >
                    <Input />
                  </Form.Item>

                  <MinusCircleOutlined onClick={() => remove(field.name)} />
                </Space>
              ))}

              <Form.Item>
                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                  เพิ่มรายการสินค้า
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Modal>
  );
};

export default CollectionCreateForm;
