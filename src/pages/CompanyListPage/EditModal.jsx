import React, { useEffect } from "react";
import { message, Form } from "antd";
import Modal from "../../components/Modal";
import CompanyForm from "../../components/Form/CompanyForm";
import axios from "axios";

import { companyAPI } from "../../constant";

const EditModal = ({ record, isModalVisible, setModalVisible }) => {
  useEffect(() => {
    form.setFieldsValue({ name: record.merchant_name, ...record });
  }, [record]);
  const [form] = Form.useForm();
  const initialValues = {
    name: record.merchant_name,
    email: record.email,
    phoneNumber: record.phone_number,
    address: record.address,
  };
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("merchant_name", values.name);
    formData.append("phone_number", values.phoneNumber);
    formData.append("address", values.address);
    formData.append("email", values.email);
    formData.append("file", values.icon[0].originFileObj);
    formData.append("id", record.uuid);

    try {
      await axios({
        url: companyAPI,
        method: "PUT",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success("success");
      setModalVisible(false);
    } catch (error) {
      message.error("error");
      console.error(JSON.stringify(error, null, 2));
    }
  };

  return (
    <Modal
      title="แก้ไขข้อมูลบริษัทคู่ค้า"
      onCancel={() => setModalVisible(false)}
      visible={isModalVisible}
    >
      <CompanyForm
        name="edit"
        form={form}
        initialValues={initialValues}
        onFinish={handleSubmit}
      />
    </Modal>
  );
};

export default EditModal;
