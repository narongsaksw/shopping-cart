import React, { useState } from 'react';
import { Button } from 'antd';

const SaveButton = () => {
  return (
    <Button
      type='primary'
      htmlType='submit'
      block
      className='content-button'
      // style={{ width: 100 }}
    >
      Save
    </Button>
  );
};

export default SaveButton;
