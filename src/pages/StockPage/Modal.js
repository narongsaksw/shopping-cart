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

const Modal = ({ isModalVisible, setModalVisible }) => {
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
            label='ชื่อผู้ค้า'
            name='name'
            rules={[{ required: true, message: '*กรุณากรอกชื่อผู้ค้า' }]}
          >
            <Input />
          </Form.Item>
        </Col>

        <Col>
          <Form.Item
            label='วัตถุดิบ'
            name='title'
            rules={[{ required: true, message: '*กรุณากรอกวัตถุดิบ' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label='คงเหลือ'
            name='value'
            rules={[{ required: true, message: '*กรุณากรอกจำนวนคงเหลือ' }]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col>
          <Form.Item
            label='หน่วย'
            name='description'
            rules={[{ required: true, message: '*กรุณากรอกหน่วย' }]}
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
