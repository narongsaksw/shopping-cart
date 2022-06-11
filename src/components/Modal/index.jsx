import React from "react";
import { Modal as AntdModal } from "antd";

const Modal = ({ children, ...rest }) => {
  return (
    <AntdModal centered footer={null} {...rest}>
      {children}
    </AntdModal>
  );
};

export default Modal;
