import React from "react";
import PageLayout from "../../Layout/PageLayout";
import { Typography } from "antd";
import { Table, Space, Avatar, Image, Input } from "antd";
import AddButton from "./AddButton";

const { Search } = Input;

const columns = [
  { title: "Name", dataIndex: "name", key: "name" },
  { title: "Price", dataIndex: "price", key: "price" },
  { title: "Description", dataIndex: "description", key: "description" },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: () => (
      <>
        <Avatar
          size="large"
          src={<Image src="https://www.cotrpro.com/wp-content/uploads/2020/10/120575624_3473412096050455_817319443843280933_o-1140x1140.jpg" />}
        />
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

const data = [
  {
    key: 1,
    name: "John Brown",
    age: 32,
    address: "New York No. 1 Lake Park",
    description: "My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.",
  },
  {
    key: 2,
    name: "Jim Green",
    age: 42,
    address: "London No. 1 Lake Park",
    description: "My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.",
  },
  {
    key: 3,
    name: "Not Expandable",
    age: 29,
    address: "Jiangsu No. 1 Lake Park",
    description: "This not expandable",
  },
  {
    key: 4,
    name: "Joe Black",
    age: 32,
    address: "Sidney No. 1 Lake Park",
    description: "My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.",
  },
];

const PromotionPage = () => {
  return (
    <PageLayout subTitle={<AddButton />} extra={[<Search placeholder="Search by..." enterButton onSearch={""} />]}>
      <Typography.Text>
        <Table
          columns={columns}
          expandable={{
            expandedRowRender: (record) => <p style={{ margin: 0 }}>{record.description}</p>,
            rowExpandable: (record) => record.name !== "Not Expandable",
          }}
          dataSource={data}
        />
        ,
      </Typography.Text>
    </PageLayout>
  );
};

export default PromotionPage;
