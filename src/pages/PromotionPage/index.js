import React, { useEffect, useState } from "react";
import PageLayout from "../../Layout/PageLayout";
import { Typography } from "antd";
import { Table, Space, Avatar, Image, Input, Card, Tag } from "antd";
import AddButton from "./AddButton";
import { functionGet } from "../../services/employee";
import { promotion_find_all, find_warehouse_all } from "../../constant";
import axios from "axios";

const { Search } = Input;
const { Meta } = Card;

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
    dataIndex: "action",
    key: "action",
    render: () => (
      <Space>
        <a>Delete</a>
        <a>Edite</a>
      </Space>
    ),
  },
];

const PromotionPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (data.length === 0) {
      functionGet(promotion_find_all, (res) => {
        console.log("res.dataValues ", res.dataValues);
        setData(res.dataValues);
      });
    }
  }, []);

  const expanded = async (record) => {
    let dataItem = [];

    await axios.get(`${find_warehouse_all}${record.key}`).then(async (res) => {
      if (res.data != null) {
        console.log("record ==> ", record);
        res.data.dataValues.forEach((element) => {
          console.log("element ", element);
        });
        // const dataRes = await res.data.dataValues.map((item) => {
        // return <p style={{ margin: 0 }}>{item.Warehouse.description}</p>;
        // const title = item.Warehouse.title;
        // console.log("title ", title);
        // delete item.Warehouse.title;
        // return (
        //   <Card
        //     {...item.Warehouse}
        //     style={{
        //       width: "100%",
        //       marginTop: 16,
        //       cursor: "pointer",
        //       zIndex: 200,
        //     }}
        //   >
        //     <Meta
        //       avatar={
        //         <Avatar
        //           src={`${
        //             item.Warehouse.image != null ? item.Warehouse.image : "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        //           }`}
        //         />
        //       }
        //       title={
        //         <>
        //           <Tag color="blue" style={{ fontSize: 18 }}>{`${title}`}</Tag>
        //           <Tag color="geekblue" style={{ fontSize: 18, marginTop: 5 }}>{`${item.Warehouse.value} item`}</Tag>
        //           <Tag color="purple" style={{ fontSize: 18 }}>{`${item.Warehouse.price} Bath`}</Tag>
        //           <Tag color="cyan">{`${item.Warehouse.description}`}</Tag>
        //         </>
        //       }
        //     />
        //   </Card>
        // );
        // });

        // dataItem = dataRes;
      }
    });
    return dataItem;
  };

  return (
    <PageLayout subTitle={<AddButton />} extra={[<Search placeholder="Search by..." enterButton onSearch={""} />]}>
      <Typography.Text>
        <Table columns={columns} dataSource={data} />
      </Typography.Text>
    </PageLayout>
  );
};

export default PromotionPage;
