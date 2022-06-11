import React from "react";
import { message } from "antd";
import Modal from "../../components/Modal";
import EmployeeForm from "../../components/Form/EmployeeForm";
import axios from "axios";

import { updateEmployee } from "../../constant";

const EditModal = ({ record, isModalVisible, setModalVisible }) => {
  const initialValues = {
    firstname: record.firstname,
    lastname: record.lastname,
    email: record.email,
    age: record.age,
    phoneNumber: record.phone_number,
    username: record.username,
    password: record.password,
    address: record.address,
  };
  const handleSubmit = async (values) => {
    const data = {
      act_member_id: record.uuid,
      dataValues: {
        userId: record.id,
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        age: values.age,
        phoneNumber: values.phoneNumber,
        username: values.username,
        password: values.password,
        address: values.address,
      },
    };
    try {
      await axios.put(updateEmployee, data);
      message.success("success");
      setModalVisible(false);
    } catch (error) {
      message.error("error");
      console.log(JSON.stringify(error, null, 2));
    }
  };

  return (
    <Modal
      title="แก้ไขข้อมูลพนักงาน"
      onCancel={() => setModalVisible(false)}
      visible={isModalVisible}
    >
      <EmployeeForm
        name="edit"
        initialValues={initialValues}
        onFinish={handleSubmit}
      />
    </Modal>
  );
};

export default EditModal;
