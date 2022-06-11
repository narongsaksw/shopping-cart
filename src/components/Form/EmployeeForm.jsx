import React from "react";
import { Form, Input, Col, Select, InputNumber } from "antd";
import SaveButton from "./SaveButton";

const EmployeeForm = (props) => {
  return (
    <Form {...props}>
      <Col>
        <Form.Item
          label="ชื่อ"
          name="firstname"
          rules={[{ required: true, message: "*กรุณากรอกชื่อ" }]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col>
        <Form.Item
          label="นามสกุล"
          name="lastname"
          rules={[{ required: true, message: "*กรุณากรอกนามสกุล" }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col>
        <Form.Item
          label="อายุ"
          name="age"
          rules={[{ required: true, message: "*กรุณากรอกอายุ" }]}
        >
          <InputNumber />
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
      <Col>
        <Form.Item
          label="ยูสเซอร์"
          name="username"
          rules={[{ required: true, message: "*กรุณากรอกยูสเซอร์" }]}
        >
          <Input />
        </Form.Item>
      </Col>
      <Col>
        <Form.Item
          label="รหัสผ่าน"
          name="password"
          rules={[{ required: true, message: "*กรุณากรอกรหัสผ่าน" }]}
        >
          <Input.Password />
        </Form.Item>
      </Col>
      <Col>
        <Form.Item label="ตำแหน่ง" name="role">
          <Select>
            <Select.Option value="Admin">ผู้ดูแลระบบ</Select.Option>
            <Select.Option value="Employee">พนักงาน</Select.Option>
            <Select.Option value="Programmer">โปรแกรมเมอร์</Select.Option>
          </Select>
        </Form.Item>
      </Col>
      <SaveButton />
    </Form>
  );
};

export default EmployeeForm;
