import React, {useState, useEffect} from "react";
import { Modal as AntdModal, Form, Input, InputNumber, Col, Select, message, Upload, Button } from "antd";
import SaveButton from "./SaveButton";
import axios from "axios";
import { updateStockById, companyAPI} from "../../constant";
import { normFile, uploadProps } from "../../utils";
import { UploadOutlined } from "@ant-design/icons";

const { Option } = Select;

const Modal = ({ record, isModalVisible, setModalVisible }) => {
  useEffect(() => {
    form.setFieldsValue({merchantId: record.merchant_id, ...record});
  }, [record]);
  const [form] = Form.useForm();
  const initialValues = {
    merchantId: record.merchant_id,
    description: record.description,
    price: record.price,
    value: record.value,
    title: record.title,
    shop_item_id: record.key,
  };

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
    formData.append("shop_item_id", record.key);
    formData.append(
      "dataValues",
      JSON.stringify({
        value: values.value,
        name: values.title,
        price: values.price,
        description: values.description,
      })
    );
    formData.append("file", values.image[0].originFileObj);
    try {
      await axios.put(updateStockById, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
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
      <Form
        name="add"
        initialValues={initialValues}
        form={form}
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
            label="ราคาขายต่อชิ้น"
            name="price"
            rules={[{ required: true, message: "*กรุณากรอกราคาต่อชิ้น" }]}
          >
            <InputNumber min={0} />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            name="image"
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
    </AntdModal>
  );
};

export default Modal;
