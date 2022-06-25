import React, { useEffect, useState } from "react";
import { Descriptions } from "antd";

const Order = ({ order }) => {
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")));
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  useEffect(() => {
    initial();
  }, [order]);

  const initial = async () => {
    await getTotalPriceAndValue();
  };

  const getTotalPriceAndValue = async () => {
    let total = 0;
    let value = 0;
    if (order) {
      total = await order.reduce((pre, cur) => pre + cur.dataValues.price, 0);
      value = await order.reduce((pre, cur) => pre + cur.dataValues.value, 0);
    }
    setTotalPrice(total);
    setTotalValue(value);
  };

  return (
    <Descriptions title="Order" column={1}>
      <Descriptions.Item label="ราคารวม" labelStyle={{ weight: 600 }}>
        {totalPrice}
      </Descriptions.Item>
      <Descriptions.Item label="จำนวนรวม">{totalValue}</Descriptions.Item>
      <Descriptions.Item label="Cart ID">{userData.quote}</Descriptions.Item>
      <Descriptions.Item label="พนักงาน">{userData.name}</Descriptions.Item>
    </Descriptions>
  );
};

export default Order;
