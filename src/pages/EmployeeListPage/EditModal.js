import React from 'react';
import {
  Modal as AntdModal,
  Form,
  Input,
  InputNumber,
  Row,
  Col,
  Typography,
  Button,
  Select,
  message,
} from 'antd';
import SaveButton from './SaveButton';
import axios from 'axios';

import { updateEmployee } from '../../constant';

const Modal = ({ record, isModalVisible, setModalVisible }) => {
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
      message.success('success');
      setModalVisible(false);
    } catch (error) {
      message.error('error');
      console.log(JSON.stringify(error, null, 2));
    }
  };

  return (
    <AntdModal
      title='Add Content'
      footer={null}
      centered
      onCancel={() => setModalVisible(false)}
      visible={isModalVisible}
    >
      <Form name='add' initialValues={initialValues} onFinish={handleSubmit}>
        <Col>
          <Form.Item
            label='ชื่อ'
            name='firstname'
            rules={[{ required: true, message: '*กรุณากรอกชื่อ' }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item
            label='นามสกุล'
            name='lastname'
            rules={[{ required: true, message: '*กรุณากรอกนามสกุล' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label='อายุ'
            name='age'
            rules={[{ required: true, message: '*กรุณากรอกอายุ' }]}
          >
            <InputNumber />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label='ที่อยู่'
            name='address'
            rules={[{ required: true, message: '*กรุณากรอกที่อยู่' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label='อีเมล์'
            name='email'
            rules={[{ required: true, message: '*กรุณากรอกอีเมล์' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label='เบอร์ติดต่อ'
            name='phoneNumber'
            rules={[{ required: true, message: '*กรุณากรอกเบอร์โทรศัพท์' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label='ยูสเซอร์'
            name='username'
            rules={[{ required: true, message: '*กรุณากรอกยูสเซอร์' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label='รหัสผ่าน'
            name='password'
            rules={[{ required: true, message: '*กรุณากรอกรหัสผ่าน' }]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
        <SaveButton />
      </Form>
    </AntdModal>
  );
};

export default Modal;
