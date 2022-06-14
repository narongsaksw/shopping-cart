import React, { useState, useEffect } from "react";
import PageLayout from "../../Layout/PageLayout";
import { Table, Input, Typography } from "antd";
import AddButton from "./AddButton";
import EditModal from "./EditModal";
import ListOperation from "../../components/ListOperation";
import axios from "axios";
import { getWarehouseAll, deleteStockById } from "../../constant";

const { Search } = Input;

function Stock() {
  const [stock, setStock] = useState([]);
  const [record, setRecord] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalAddVisible, setModalAddVisible] = useState(false);
  const [filterTable, setFilterTable] = useState(null);
  const onEdit = (record) => {
    setRecord(record);
    setModalVisible((state) => !state);
  };
  const columns = [
    {
      title: "ลำดับที่",
      dataIndex: "key",
      render: (text, _, idx) => {
        return <Typography.Text>{idx + 1}</Typography.Text>;
      },
    },
    {
      title: "ผู้ค้า",
      dataIndex: "merchant_name",
    },
    {
      title: "วัตถุดิบ",
      dataIndex: "title",
    },
    {
      title: "คงเหลือ",
      dataIndex: "value",
    },
    {
      title: "หน่วย",
      dataIndex: "description",
    },
    {
      title: "เบอร์ติดต่อ",
      dataIndex: "phone_number",
      render: (text) => {
        return <Typography.Text>{text}</Typography.Text>;
      },
    },
    {
      title: "แอคชั่น",
      dataIndex: "key",
      render: (id, record) => {
        return <ListOperation onEdit={() => onEdit(record)} deletePath={`${deleteStockById}/${id}`} />;
      },
    },
  ];

  const getWarehouse = async () => {
    const res = await axios.get(getWarehouseAll).then((res) => res.data.dataValues);
    setStock(res);
  };
  useEffect(() => {
    getWarehouse();
  }, [isModalVisible, isModalAddVisible]);

  const search = (value) => {
    const filterTable = stock.filter((o) =>
      Object.keys(o).some((k) => String(o[k]).toLowerCase().includes(value.toLowerCase().trim())),
    );
    setFilterTable(filterTable);
  };

  return (
    <PageLayout
      subTitle={<AddButton stock={stock} isModalVisible={isModalAddVisible} setModalVisible={setModalAddVisible} />}
      extra={[<Search placeholder="Search by..." enterButton onSearch={search} />]}
    >
      <Table columns={columns} dataSource={filterTable === null ? stock : filterTable} />
      <EditModal record={record} isModalVisible={isModalVisible} setModalVisible={setModalVisible} />
    </PageLayout>
  );
}

export default Stock;
