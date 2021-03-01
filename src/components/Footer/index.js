import React from "react";
import { Layout } from "antd";
import { footerStyle } from "./style";

const { Footer } = Layout;

const Footers = (props) => {
  return <Footer style={footerStyle}>{props.description}</Footer>;
};

export default Footers;
