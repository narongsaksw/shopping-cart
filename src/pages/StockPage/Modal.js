import React from "react";
import { Modal as AntdModal, Form, Input, InputNumber, Row, Col, Typography, Button, Select, message } from "antd";
import SaveButton from "./SaveButton";
import axios from "axios";

import { createStock } from "../../constant";

const initialValues = {
  firstname: "",
  lastname: "",
  title: "",
  value: "",
  description: "",
  price: "",
  eachprice: "",
  phoneNumber: "",
  image: "",
};

const Modal = ({ isModalVisible, setModalVisible }) => {
  const [form] = Form.useForm();
  const handleSubmit = async (values) => {
    const data = {
      name: values.firstname,
      firstname: values.firstname,
      lastname: values.lastname,
      phone_number: values.phoneNumber,
      role: "BUY",
      dataValues: [
        {
          price: values.price,
          group: "Food",
          warehouse: {
            name: values.title,
            value: values.value,
            price: values.eachprice,
            image: values.image,
            description: values.description,
          },
        },
      ],
    };
    try {
      await axios.post(createStock, data);
      message.success("success");
      setModalVisible(false);
    } catch (error) {
      message.error("error");
    }
    form.resetFields();
  };

  return (
    <AntdModal
      title="เพิ่มรายการ"
      footer={null}
      centered
      onCancel={() => {
        form.resetFields();
        setModalVisible(false);
      }}
      visible={isModalVisible}
    >
      <Form name="add" form={form} initialValues={initialValues} onFinish={handleSubmit}>
        <Col>
          <Form.Item label="ชื่อผู้ค้า" name="firstname" rules={[{ required: true, message: "*กรุณากรอกชื่อผู้ค้า" }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="นามสกุล" name="lastname" rules={[{ required: true, message: "*กรุณากรอกนามสกุล" }]}>
            <Input />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item label="วัตถุดิบ" name="title" rules={[{ required: true, message: "*กรุณากรอกวัตถุดิบ" }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="จำนวน" name="value" rules={[{ required: true, message: "*กรุณากรอกจำนวนคงเหลือ" }]}>
            <InputNumber min={0} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="หน่วย" name="description" rules={[{ required: true, message: "*กรุณากรอกหน่วย" }]}>
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="ราคา" name="price" rules={[{ required: true, message: "*กรุณากรอกราคา" }]}>
            <InputNumber min={0} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label="ราคาขายต่อชิ้น"
            name="eachprice"
            rules={[{ required: true, message: "*กรุณากรอกราคาต่อชิ้น" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label="เบอร์ติดต่อ"
            name="phoneNumber"
            rules={[{ required: true, message: "*กรุณากรอกเบอร์โทรศัพท์" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item label="รูป" name="image" rules={[{ required: true, message: "*กรุณาเพิ่มรูป(ลิ้งค์)" }]}>
            <Input />
          </Form.Item>
        </Col>
        <SaveButton />
      </Form>
    </AntdModal>
  );
};

export default Modal;
