import React from "react";
import { Form, message } from "antd";
import Modal from "../../components/Modal";
import CompanyForm from "../../components/Form/CompanyForm";
import { companyAPI } from "../../constant";
import axios from "axios";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  address: "",
  icon: null,
};

const AddModal = ({ isModalVisible, setModalVisible }) => {
  const [form] = Form.useForm();
  const handleSubmit = async (values) => {
    const formData = new FormData()
    formData.append("merchant_name", values.name);
    formData.append("phone_number", values.phoneNumber);
    formData.append("address", values.address);
    formData.append("email", values.email);
    formData.append("file", values.icon[0].originFileObj);
    try {
      await axios({
        url: companyAPI,
        method: "POST",
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      message.success("success");
      setModalVisible(false);
    } catch (error) {
      console.log('error', error)
      message.error("error");
    }
    form.resetFields();
  };

  return (
    <Modal
      title="เพิ่มบริษัทคู่ค้า"
      onCancel={() => setModalVisible(false)}
      visible={isModalVisible}
    >
      {" "}
      <CompanyForm
        name="add"
        form={form}
        initialValues={initialValues}
        onFinish={handleSubmit}
      />
    </Modal>
  );
};

export default AddModal;
