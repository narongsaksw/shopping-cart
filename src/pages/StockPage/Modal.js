import React, { useEffect, useState } from "react";
import {
  Modal as AntdModal,
  Form,
  Input,
  InputNumber,
  Col,
  Select,
  message,
  Upload,
  Button,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import SaveButton from "./SaveButton";
import axios from "axios";
import { normFile, uploadProps } from "../../utils";

import { createStock, companyAPI } from "../../constant";

const { Option } = Select;

const initialValues = {
  title: "",
  value: "",
  description: "",
  price: "",
  eachprice: "",
  phoneNumber: "",
};

const Modal = ({ isModalVisible, setModalVisible }) => {
  const [form] = Form.useForm();
  const [companyList, setCompanyList] = useState([]);

  useEffect(() => {
    getCompanyList();
  }, []);

  const getCompanyList = async () => {
    const res = await axios.get(companyAPI).then((res) => res.data.data);
    setCompanyList(res);
  };
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("merchant_id", values.merchantId);
    formData.append("phone_number", values.phoneNumber);
    formData.append("role", "BUY");
    formData.append(
      "dataValues",
      JSON.stringify([
        {
          price: values.price,
          group: "Food",
          warehouse: {
            name: values.title,
            value: values.value,
            price: values.eachprice,
            description: values.description,
          },
        },
      ])
    );
    formData.append("file", values.image[0].originFileObj);
    try {
      await axios.post(createStock, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
      <Form
        name="add"
        form={form}
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
        <Col>
          <Form.Item
            label="ชื่อผู้ค้า"
            name="merchantId"
            rules={[
              {
                required: true,
                message: "*กรุณาเลือกบริษัทคู่ค้า",
              },
            ]}
          >
            <Select allowClear>
              {companyList.map((company) => (
                <Option key={company.uuid} value={company.uuid}>
                  {company.merchant_name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label="วัตถุดิบ"
            name="title"
            rules={[{ required: true, message: "*กรุณากรอกวัตถุดิบ" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label="จำนวน"
            name="value"
            rules={[{ required: true, message: "*กรุณากรอกจำนวนคงเหลือ" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label="หน่วย"
            name="description"
            rules={[{ required: true, message: "*กรุณากรอกหน่วย" }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label="ราคา"
            name="price"
            rules={[{ required: true, message: "*กรุณากรอกราคา" }]}
          >
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
          <Form.Item
            name="image"
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
    </AntdModal>
  );
};

export default Modal;
