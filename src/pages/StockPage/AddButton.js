import React, { useState } from 'react';
import { Button } from 'antd';
import Modal from './Modal';

const AddButton = ({ isModalVisible, setModalVisible }) => {
  return (
    <>
      <Button
        type='primary'
        block
        onClick={() => setModalVisible((state) => (state = !state))}
      >
        เพิ่มรายการ
      </Button>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default AddButton;
