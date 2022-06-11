import React, { useState, useEffect, Fragment } from "react";
import PageLayout from "../../Layout/PageLayout";
import { Table, Input } from "antd";
import AddButton from "./AddButton";
import EditModal from './EditModal'

import ListOperation from "../../components/ListOperation";

const { Search } = Input;

const CompanyListPage = () => {
  const [data, setData] = useState([]);
  const [isModalEditVisible, setModalEditVisible] = useState(false);
  const [isModalAddVisible, setModalAddVisible] = useState(false);
  const [record, setRecord] = useState({});
  const [filterTable, setFilterTable] = useState(null);

  const search = (value) => {
    const filterTable = data.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase().trim())
      )
    );
    setFilterTable(filterTable);
  };

  const onEdit = (record) => {
    setRecord(record);
    setModalEditVisible((state) => !state);
  };

  const columns = [
    {
      title: "ชื่อ",
      dataIndex: "name",
    },
    {
      title: "ที่อยู่",
      dataIndex: "address",
    },
    {
      title: "อีเมล์",
      dataIndex: "email",
    },
    {
      title: "เบอร์โทรศัพท์",
      dataIndex: "phone_number",
    },
    {
      dataIndex: "uuid",
      render: (id, record) => {
        return (
          <ListOperation
            onEdit={() => onEdit(record)}
            //   deletePath={`${deleteEmployee}/${id}`}
          />
        );
      },
    },
  ];
  return (
    <PageLayout
      subTitle={
        <AddButton
          isModalVisible={isModalAddVisible}
          setModalVisible={setModalAddVisible}
        />
      }
      extra={[
        <Search placeholder="Search by..." enterButton onSearch={search} />,
      ]}
    >
      <Fragment>
        <Table
          dataSource={filterTable === null ? data : filterTable}
          columns={columns}
        />
        <EditModal
          record={record}
          isModalVisible={isModalEditVisible}
          setModalVisible={setModalEditVisible}
        />
      </Fragment>
    </PageLayout>
  );
};

export default CompanyListPage;
