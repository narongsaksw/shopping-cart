import React, { useEffect, useState, useRef } from "react";
import { functionGet } from "../../services/employee";
import { warehouse_find_one, promotion_find_one, promotion_item_find_pid } from "../../constant";

const Orders = ({ orderId, Allprice, order }) => {
  const [value, setValue] = useState([]);
  const data = useRef([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    // eslint-disable-next-line array-callback-return
    await order.map(async (item) => {
      const orderOne = JSON.parse(item);
      await check(orderOne.id, async (res) => {
        console.log(res);
        if (res === "Promotion") {
          functionGet(`${promotion_find_one}${orderOne.id}`, async (resf) => {
            if (resf.dataValues != null) {
              functionGet(`${promotion_item_find_pid}${resf.dataValues.key}`, async (res) => {
                if (res.dataValues != null) {
                  let d = (
                    <tr key={orderOne.id}>
                      <td>{resf.dataValues.title}</td>
                      <td></td>
                      <td style={{ textAlign: "right" }}>{orderOne.dataValues.value}</td>
                    </tr>
                  );
                  data.current = [...data.current, d];
                  setValue(data.current);
                  // eslint-disable-next-line array-callback-return
                  await res.dataValues.map((item) => {
                    let d = (
                      <tr key={orderOne.id + item.Warehouse.key}>
                        <td></td>
                        <td>{item.Warehouse.title}</td>
                        <td style={{ textAlign: "right" }}>{item.value}</td>
                      </tr>
                    );
                    data.current = [...data.current, d];
                    setValue(data.current);
                  });
                }
              });
            }
          });
        } else {
          functionGet(`${warehouse_find_one}${orderOne.id}`, (res) => {
            if (res.dataValues != null) {
              const d = (
                <tr key={orderOne.id}>
                  <td>{res.dataValues.title}</td>
                  <td></td>
                  <td style={{ textAlign: "right" }}>{orderOne.dataValues.value}</td>
                </tr>
              );
              data.current = [...data.current, d];
              setValue(data.current);
            }
          });
        }
      });
    });
  }, [order]);

  const check = (id, callback) => {
    functionGet(`${promotion_find_one}${id}`, (resf) => {
      if (resf.dataValues != null) {
        callback("Promotion");
      }
    });
    functionGet(`${warehouse_find_one}${id}`, (resf) => {
      if (resf.dataValues != null) {
        callback("Warehouse");
      }
    });
  };

  return (
    <>
      <table style={{ width: "90%" }}>
        <thead>
          <tr>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <table style={{ width: "100%" }}>
                <thead>
                  <tr>
                    <th></th>
                    <th></th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Order ID</td>
                    <td></td>
                    <td style={{ textAlign: "right" }}>{orderId}</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td></td>
                    <td style={{ textAlign: "right" }}>{`${Allprice} BATH`}</td>
                  </tr>
                  <tr>
                    <td>Items</td>
                    <td></td>
                    <td style={{ textAlign: "right" }}></td>
                  </tr>
                  {data.current}
                </tbody>
              </table>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Orders;
