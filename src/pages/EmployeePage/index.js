import React, { useState, useEffect, useRef, useContext } from "react";
import { Container } from "./style";
import CardItems from "../../components/CardItems";
import Drawer from "./Drawer";
import { functionGet } from "../../services/employee";
import {
  warehouse_find_all,
  warehouse_product_group,
  warehouse_find_one,
} from "../../constant";
import { Skeleton, Modal, Card, Avatar, Empty } from "antd";
import { old_file_value } from "../../form/employee";

const { Meta } = Card;

export const EmployeePage = (props) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleModal, setVisibleModal] = useState(false);
  const { updateShopingCart } = useContext(props.menuContext);
  const order = useRef([]);
  const val_old = useRef([]);
  const url = useRef("");
  const checkModal = useRef(false);
  const [shopingCards, setShopingCards] = useState([]);

  useEffect(async () => {
    const group = props.group;
    if (group === "All Product") {
      card(warehouse_find_all);
      url.current = warehouse_find_all;
    } else {
      setLoading(true);
      card(`${warehouse_product_group}${group}`);
      url.current = `${warehouse_product_group}${group}`;
    }
  }, [props.group]);

  useEffect(() => {
    shopingCard();
    setVisibleModal(props.visible);
  }, [props.visible]);

  const updateOrderItem = async (e) => {
    val_old.current = await val_old.current.map((element) => {
      let _val = JSON.parse(element);
      if (_val.item_id === e.warehouse_id) {
        _val.value = e.dataValues.value;
      }
      return JSON.stringify(_val);
    });

    let findCheck = order.current.filter((item) => {
      return JSON.parse(item).warehouse_id === e.warehouse_id;
    });
    if (findCheck.length != 0) {
      if (e.dataValues.value === 0) {
        let data = await order.current.filter((item) => {
          return JSON.parse(item).warehouse_id != e.warehouse_id;
        });
        order.current = data;
        updateShopingCart(order.current.length);
      } else {
        let old_Data = JSON.parse(findCheck[0]);
        old_Data.dataValues.value = e.dataValues.value;
        old_Data.dataValues.price = e.dataValues.price;
        let dataSplit = await order.current.filter((item) => {
          return JSON.parse(item).warehouse_id != e.warehouse_id;
        });
        dataSplit.push(JSON.stringify(old_Data));
        order.current = dataSplit;
      }
    } else {
      order.current.push(JSON.stringify(e));
      updateShopingCart(order.current.length);
    }
    setValue({});
  };

  const card = (e) => {
    functionGet(e, async (res) => {
      const val = [];
      await res.forEach(async (element) => {
        let new_element = null;
        let data = await val_old.current.filter((e) => {
          return JSON.parse(e).item_id === element.key;
        });
        if (data.length === 0) {
          const new_old_file_value = old_file_value;
          new_old_file_value.item_id = element.key;
          new_old_file_value.value = 0;
          val_old.current.push(JSON.stringify(new_old_file_value));
          new_element = { ...element, value_buy: 0, id: element.key };
        } else {
          new_element = {
            ...element,
            value_buy: JSON.parse(data[0]).value,
            id: element.key,
          };
        }
        val.push(
          <CardItems
            {...new_element}
            description={`price ${new_element.price} BATH`}
            setVisible={(e) => {
              setVisible(e);
              setValue(new_element);
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

  const shopingCard = async () => {
    let val = [];
    await order.current.forEach(async (element) => {
      let data = JSON.parse(element);
      let data_item;
      await functionGet(`${warehouse_find_one}${data.warehouse_id}`, (res) => {
        data_item = res;
      });
      let new_element = null;
      let dataFilter = await val_old.current.filter((e) => {
        return JSON.parse(e).item_id === data_item.key;
      });
      new_element = {
        ...data_item,
        value_buy: JSON.parse(dataFilter[0]).value,
        id: element.key,
      };
      await val.push(
        <Card
          {...new_element}
          style={{
            width: "100%",
            marginTop: 16,
            cursor: "pointer",
            zIndex: 200,
          }}
          onClick={() => {
            setVisible(true);
            props.setVisibles(false);
            checkModal.current = true;
            setValue(new_element);
          }}
        >
          <Meta
            avatar={<Avatar src={`${data_item.image}`} />}
            title={`${data.dataValues.value} Item ${data.dataValues.price} Bath`}
            description={data_item.description}
          />
        </Card>
      );
      if (val.length === order.current.length) {
        setShopingCards(val);
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
        setVisible={async (e) => {
          setVisible(e);
          if (checkModal.current) {
            props.setVisibles(true);
          }
        }}
        value={value}
        orderItems={(e) => {
          updateOrderItem(e);
          if (checkModal.current) {
            shopingCard();
            card(url.current);
            props.setVisibles(true);
          }
        }}
      />
      <Modal
        title="Orders"
        centered
        visible={visibleModal}
        onOk={() => {
          props.setVisibles(false);
          checkModal.current = false;
        }}
        onCancel={() => {
          props.setVisibles(false);
          checkModal.current = false;
        }}
        width={1000}
      >
        {order.current.length === 0 ? (
          <Empty description={false} />
        ) : (
          <div style={{ maxHeight: 500, overflow: "auto" }}>{shopingCards}</div>
        )}
      </Modal>
    </Container>
  );
};

export default EmployeePage;
