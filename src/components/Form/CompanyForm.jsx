import React from "react";
import { Form, Input, Col, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import SaveButton from "./SaveButton";

const uploadProps = {
  name: "icon",
  beforeUpload: (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }

    return isJpgOrPng;
  },
  onChange(info) {
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  customRequest: ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  },
  maxCount: 1,
  progress: {
    strokeColor: {
      "0%": "#108ee9",
      "100%": "#87d068",
    },
    strokeWidth: 3,
    format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
  },
};

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }

  return e?.fileList;
};

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
