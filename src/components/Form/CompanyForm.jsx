import React from "react";
import { Form, Input, Col, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import SaveButton from "./SaveButton";
import { uploadProps, normFile } from '../../utils'

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
      <Col>
        <Form.Item
          name="icon"
          label="อัพโหลดรูปภาพ"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "*กรุณาอัพโหลดรูป" }]}
        >
          <Upload {...uploadProps}>
            <Button icon={<UploadOutlined />}>Upload jpeg/png only</Button>
          </Upload>
        </Form.Item>
      </Col>
      <SaveButton />
    </Form>
  );
};

export default CompanyForm;
