import React, { useState, useEffect } from "react";
import { Container } from "./style";
import CardItems from "../../components/CardItems";
import Drawer from "./Drawer";
import { functionGet } from "../../services/employee";
import { warehouse_find_all, warehouse_product_group } from "../../constant";
import { Skeleton } from "antd";

const EmployeePage = (props) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const group = props.match.params.group;
    if (group === "All Product") {
      card(warehouse_find_all);
    } else {
      card(`${warehouse_product_group}${group}`);
    }
  }, [props.match.params.group]);

  const card = (e) => {
    functionGet(e, async (res) => {
      const val = [];
      await res.forEach((element) => {
        val.push(
          <CardItems
            {...element}
            description={`price ${element.price} BATH`}
            setVisible={(e) => {
              setVisible(e);
              setValue(element);
            }}
          />
        );
      });
      if (val.length > 0) {
        setData(val);
        setLoading(false);
      }
    });
  };

  return (
    <Container>
      {loading ? (
        <>
          <Skeleton active />
          <Skeleton active />
          <Skeleton active />
        </>
      ) : (
        <>{data}</>
      )}
      <Drawer
        visible={visible}
        setVisible={(e) => setVisible(e)}
        value={value}
      />
    </Container>
  );
};

export default EmployeePage;
