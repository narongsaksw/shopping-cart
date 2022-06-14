import React, { useEffect, useState } from "react";
import PageLayout from "../../Layout/PageLayout";
import { Typography } from "antd";
import { Table, Space, Avatar, Image, Input, Card, Tag, Modal } from "antd";
import AddButton from "./AddButton";
import { functionGet } from "../../services/employee";
import {
  promotion_find_all,
  find_warehouse_all,
  promotion_find_one,
  find_value_id,
  update_promotion,
  delete_promotion,
} from "../../constant";
import CollectionCreateForm from "./CollectionCreateForm";
import axios from "axios";

const { Search } = Input;
const { Meta } = Card;

const PromotionPage = () => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [field, setField] = useState([]);
  const [promotion_id, setPromotion_id] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ware, setWare] = useState([]);

  const columns = [
    { title: "Name", dataIndex: "title", key: "title" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Items",
      dataIndex: "key",
      key: "key",
      render: (res) => (
        <Space>
          <a
            onClick={() => {
              showModal(res);
            }}
          >
            ดูรายการ
          </a>
        </Space>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (e) => (
        <>
          <Avatar
            size="large"
            src={<Image src={e != null ? e : `https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`} />}
          />
        </>
      ),
    },
    {
      title: "Action",
      dataIndex: "key",
      key: "action",
      render: (res) => (
        <Space>
          <a
            onClick={() => {
              warning(res);
            }}
          >
            ลบ
          </a>
          <a
            onClick={() => {
              updatePromotionForm(res);
            }}
          >
            แก้ไข
          </a>
        </Space>
      ),
    },
  ];

  const updatePromotionForm = async (id) => {
    setPromotion_id(id);
    let f = [];
    let res1 = null;
    let res2 = null;
    await functionGet(`${promotion_find_one}${id}`, (res) => {
      res1 = res.dataValues;
    });
    await functionGet(`${find_value_id}${id}`, (res) => {
      res2 = res.dataValues;
    });
    f = [
      ...f,
      {
        name: ["name"],
        value: res1.title,
      },
      {
        name: ["price"],
        value: res1.price,
      },
      {
        name: ["description"],
        value: res1.description,
      },
      {
        name: ["image"],
        value: res1.image,
      },
      {
        name: ["dataValues"],
        value: [...res2],
      },
    ];
    setField(f);
    setVisible(true);
  };

  const warning = async (id) => {
    Modal.warning({
      title: "ยืนยันการลบโปรโมชั่น",
      content: "ท่านแน่ใจแล้วหรือไม่ที่ต้องการจะลบโปรโมชั่นนี้",
      onOk() {
        deletePromotion(id);
      },
    });
  };

  useEffect(() => {
    if (data.length === 0) {
      getPromotion();
    }
  }, []);

  const getPromotion = async () => {
    await functionGet(promotion_find_all, (res) => {
      setData(res.dataValues);
    });
  };

  const deletePromotion = async (id) => {
    await axios.delete(delete_promotion + id).then((res) => {
      if (res.status === 200) {
        setTimeout(() => {
          getPromotion();
        }, 500);
      }
    });
  };

  const onCreate = async (values) => {
    const formData = new FormData()
    formData.append("promotion_id", promotion_id);
    formData.append('name', values.name)
    formData.append('price', values.price)
    formData.append('description', values.description)
    formData.append("dataValues", JSON.stringify(values.dataValues));
    formData.append("file", values.image[0].originFileObj);
    await axios.put(update_promotion, formData).then((res) => {
      setVisible(false);
      getPromotion();
    });
  };

  const showModal = async (id) => {
    let res1 = [];
    await functionGet(`${find_warehouse_all}${id}`, (res) => {
      res1 = res.dataValues;
    });
    setWare(
      res1.map((item) => {
        const title = item.title;
        delete item.title;
        return (
          <Card
            {...item}
            style={{
              width: "100%",
              marginTop: 16,
              cursor: "pointer",
              zIndex: 200,
            }}
          >
            <Meta
              avatar={
                <Avatar
                  src={`${
                    item.image != null
                      ? item.image
                      : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  }`}
                />
              }
              title={
                <>
                  <Tag color="blue" style={{ fontSize: 18 }}>{`${title}`}</Tag>
                  <Tag
                    color="geekblue"
                    style={{ fontSize: 18, marginTop: 5 }}
                  >{`${item.value} item`}</Tag>
                  <Tag
                    color="purple"
                    style={{ fontSize: 18 }}
                  >{`${item.price} Bath`}</Tag>
                  <Tag color="cyan">{`${item.description}`}</Tag>
                </>
              }
            />
          </Card>
        );
      }),
    );
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <PageLayout subTitle={<AddButton getPromotion={() => getPromotion()} />}>
      <Typography.Text>
        <Table columns={columns} dataSource={data} />
      </Typography.Text>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
        field={field}
      />
      <Modal
        title="รายการสินค้า"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {ware}
      </Modal>
    </PageLayout>
  );
};

export default PromotionPage;
