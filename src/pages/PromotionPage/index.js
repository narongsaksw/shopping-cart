import React, { useEffect, useState } from "react";
import PageLayout from "../../Layout/PageLayout";
import { Typography } from "antd";
import { Table, Space, Avatar, Image, Input, Card, Tag } from "antd";
import AddButton from "./AddButton";
import { functionGet } from "../../services/employee";
import { promotion_find_all, promotion_item_find_pid, promotion_find_one, find_value_id, update_promotion, delete_promotion } from "../../constant";
import CollectionCreateForm from "./CollectionCreateForm";
import axios from "axios";

const { Search } = Input;
const { Meta } = Card;

const PromotionPage = () => {
  const [data, setData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [field, setField] = useState([]);
  const [promotion_id, setPromotion_id] = useState("");

  const columns = [
    { title: "Name", dataIndex: "title", key: "title" },
    { title: "Price", dataIndex: "price", key: "price" },
    { title: "Description", dataIndex: "description", key: "description" },
    {
      title: "Items",
      dataIndex: "key",
      key: "key",
      render: () => (
        <Space>
          <a onClick={() => {}}>View items</a>
        </Space>
      ),
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (e) => (
        <>
          <Avatar size="large" src={<Image src={e != null ? e : `https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`} />} />
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
              deletePromotion(res);
            }}
          >
            Delete
          </a>
          <a
            onClick={() => {
              updatePromotionForm(res);
            }}
          >
            Edite
          </a>
        </Space>
      ),
    },
  ];

  const updatePromotionForm = async (id) => {
    console.log(id);
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

  useEffect(() => {
    if (data.length === 0) {
      getPromotion();
    }
  }, []);

  const getPromotion = () => {
    functionGet(promotion_find_all, (res) => {
      setData(res.dataValues);
    });
  };

  const deletePromotion = async (id) => {
    await axios.delete(delete_promotion + id).then((res) => {
      getPromotion();
    });
  };

  const onCreate = async (values) => {
    await axios.put(update_promotion, { promotion_id: promotion_id, ...values }).then((res) => {
      setVisible(false);
      getPromotion();
    });
  };

  return (
    <PageLayout
      subTitle={<AddButton getPromotion={() => getPromotion()} />}
      extra={[<Search placeholder="Search by..." enterButton onSearch={""} />]}
    >
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
    </PageLayout>
  );
};

export default PromotionPage;
