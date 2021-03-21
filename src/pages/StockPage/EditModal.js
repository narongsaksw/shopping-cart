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
} from 'antd';
import SaveButton from './SaveButton';

const initialValues = {
  firstname: '',
  lastname: '',
  email: '',
  roles: '',
};

const Modal = ({ record, isModalVisible, setModalVisible }) => {
  console.log(record);
  const handleSubmit = async (values) => {
    try {
      console.log(values);
      message.success('success');
      setModalVisible(false);
    } catch (error) {
      message.error('error');
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
            <Input />
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
        <SaveButton />
      </Form>
    </AntdModal>
  );
};

export default Modal;
