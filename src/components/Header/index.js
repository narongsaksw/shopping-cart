import React from "react";
import { Layout } from "antd";
import { headerStyle } from "./style";

const { Header } = Layout;

const Headers = ({ children }) => {
  return <Header style={headerStyle}>{children}</Header>;
};

export default Headers;
