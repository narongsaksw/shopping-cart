import React from "react";
import Order from "./Order";

const Printer = ({ orderId, Allprice, order }) => {
  return <Order orderId={orderId} Allprice={Allprice} order={order} />;
};

export default Printer;
