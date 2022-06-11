import React from "react";
import { Form, message } from "antd";
import Modal from "../../components/Modal";
import CompanyForm from "../../components/Form/CompanyForm";
import { createEmployee } from "../../constant";
import axios from "axios";

const initialValues = {
  name: "",
  email: "",
  phoneNumber: "",
  address: "",
};

const AddModal = ({ isModalVisible, setModalVisible }) => {
  const [form] = Form.useForm();
  const handleSubmit = async (values) => {
    const data = {
      name: values.name,
      phone_number: values.phoneNumber,
      address: values.address,
      email: values.email,
    };
    try {
      await axios.post(createEmployee, data);
      message.success("success");
      setModalVisible(false);
    } catch (error) {
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
