import React from "react";
import { Button } from "antd";

const AddButton = ({ title, ...rest }) => {
  return (
    <Button type="primary" block {...rest}>
      {title}
    </Button>
  );
};

export default AddButton;
