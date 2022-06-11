import React from "react";
import { message } from "antd";
import Modal from "../../components/Modal";
import CompanyForm from "../../components/Form/CompanyForm";
import axios from "axios";

import { updateEmployee } from "../../constant";

const EditModal = ({ record, isModalVisible, setModalVisible }) => {
  const initialValues = {
    name: record.name,
    email: record.email,
    phoneNumber: record.phone_number,
    address: record.address,
  };
  const handleSubmit = async (values) => {
    const data = {
      act_member_id: record.uuid,
      dataValues: {
        name: values.name,
        email: values.email,
        phoneNumber: values.phoneNumber,
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
      title="แก้ไขข้อมูลบริษัทคู่ค้า"
      onCancel={() => setModalVisible(false)}
      visible={isModalVisible}
    >
      <CompanyForm
        name="edit"
        initialValues={initialValues}
        onFinish={handleSubmit}
      />
    </Modal>
  );
};

export default EditModal;
