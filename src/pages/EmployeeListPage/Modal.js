import React from "react";
import { Form, message } from "antd";
import Modal from "../../components/Modal";
import EmployeeForm from "../../components/Form/EmployeeForm";
import { createEmployee } from "../../constant";
import axios from "axios";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  role: "",
  age: "",
  phoneNumber: "",
  address: "",
  username: "",
  password: "",
};

const AddModal = ({ isModalVisible, setModalVisible }) => {
  const [form] = Form.useForm();
  const handleSubmit = async (values) => {
    const data = {
      firstname: values.firstname,
      lastname: values.lastname,
      age: values.age,
      phone_number: values.phoneNumber,
      address: values.address,
      username: values.username,
      password: values.password,
      id: values.username,
      role_name: values.role,
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
      title="เพิ่มพนักงาน"
      onCancel={() => setModalVisible(false)}
      visible={isModalVisible}
    >
      {" "}
      <EmployeeForm
        name="add"
        form={form}
        initialValues={initialValues}
        onFinish={handleSubmit}
      />
    </Modal>
  );
};

export default AddModal;
