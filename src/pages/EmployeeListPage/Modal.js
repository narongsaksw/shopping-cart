import React from 'react';
import {
  Modal as AntdModal,
  Form,
  Input,
  Row,
  Col,
  Typography,
  Button,
  Select,
  message,
  InputNumber,
} from 'antd';
import SaveButton from './SaveButton';
import { createEmployee } from '../../constant';
import axios from 'axios';

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  role: '',
  age: '',
  phoneNumber: '',
  address: '',
  username: '',
  password: '',
  email: '',
};

const Modal = ({ isModalVisible, setModalVisible }) => {
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
      message.success('success');
      setModalVisible(false);
    } catch (error) {
      message.error('error');
    }
    form.resetFields();
  };

  return (
    <AntdModal
      title='เพิ่มพนักงาน'
      footer={null}
      centered
      onCancel={() => setModalVisible(false)}
      visible={isModalVisible}
    >
      <Form
        name='add'
        form={form}
        initialValues={initialValues}
        onFinish={handleSubmit}
      >
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
        <Col>
          <Form.Item label='ตำแหน่ง' name='role'>
            <Select>
              <Select.Option value='Admin'>ผู้ดูแลระบบ</Select.Option>
              <Select.Option value='Employee'>พนักงาน</Select.Option>
              <Select.Option value='Programmer'>โปรแกรมเมอร์</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <SaveButton />
      </Form>
    </AntdModal>
  );
};

export default Modal;
