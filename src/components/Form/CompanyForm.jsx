import React from "react";
import { Form, Input, Col } from "antd";
import SaveButton from "./SaveButton";

const CompanyForm = (props) => {
  return (
    <Form {...props}>
      <Col>
        <Form.Item
          label="ชื่อ"
          name="name"
          rules={[{ required: true, message: "*กรุณากรอกชื่อ" }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col>
        <Form.Item
          label="ที่อยู่"
          name="address"
          rules={[{ required: true, message: "*กรุณากรอกที่อยู่" }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col>
        <Form.Item
          label="อีเมล์"
          name="email"
          rules={[{ required: true, message: "*กรุณากรอกอีเมล์" }]}
        >
          <Input />
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
      <SaveButton />
    </Form>
  );
};

export default CompanyForm;
