import React, { useState } from 'react';
import { Button } from 'antd';
import Modal from './Modal';

const AddButton = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Button
        type='primary'
        block
        onClick={() => setModalVisible((state) => (state = !state))}
        className='content-add-button'
      >
        Add
      </Button>
      <Modal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
};

export default AddButton;
