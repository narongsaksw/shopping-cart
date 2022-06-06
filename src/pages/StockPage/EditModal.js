import React from "react";
import { Modal as AntdModal, Form, Input, InputNumber, Row, Col, Typography, Button, Select, message } from "antd";
import SaveButton from "./SaveButton";
import axios from "axios";
import { updateStockById } from "../../constant";

const Modal = ({ record, isModalVisible, setModalVisible }) => {
  const initialValues = {
    firstname: record.firstname,
    lastname: record.lastname,
    description: record.description,
    price: record.price,
    value: record.value,
    title: record.title,
    image: record.image,
    shop_item_id: record.key,
  };
  const handleSubmit = async (values) => {
    const data = {
      shop_item_id: record.key,
      dataValues: {
        firstname: values.firstname,
        lastname: values.lastname,
        value: values.value,
        name: values.title,
        price: values.price,
        image: values.image,
        description: values.description,
      },
    };
    try {
      await axios.put(updateStockById, data);
      message.success("success");
      setModalVisible(false);
    } catch (error) {
      message.error("error");
      console.log(JSON.stringify(error, null, 2));
    }
  };

  return (
    <AntdModal
      title="อัพเดตรายการ"
      footer={null}
      centered
      onCancel={() => setModalVisible(false)}
      visible={isModalVisible}
    >
      <Form name="add" initialValues={initialValues} onFinish={handleSubmit}>
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
          <Form.Item label="ราคาขายต่อชิ้น" name="price" rules={[{ required: true, message: "*กรุณากรอกราคาต่อชิ้น" }]}>
            <InputNumber min={0} />
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
