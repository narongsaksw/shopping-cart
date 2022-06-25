import React from "react";
import { Button } from "antd";

const CancleButton = ({ title, ...rest }) => {
  return (
    <Button type="primary" block {...rest} danger>
      {title}
    </Button>
  );
};

export default CancleButton;
