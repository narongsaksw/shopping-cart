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
      // width={700}
    >
      <Form name='add' initialValues={initialValues} onFinish={handleSubmit}>
        <div className='row'>
          <Col span={20}>
            <Form.Item
              name='link'
              rules={[{ required: true }]}
              style={{ flexFlow: 'row', marginBottom: 0 }}
            >
              <Input
                className='content-input'
                placeholder='Link'
                style={{ margin: 0 }}
              />
            </Form.Item>
          </Col>
          {/* <Col span={4}> */}
          <SaveButton />
          {/* </Col> */}
        </div>
      </Form>
    </AntdModal>
  );
};

export default Modal;
