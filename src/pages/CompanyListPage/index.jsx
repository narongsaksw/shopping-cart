import React, { useState, useEffect, Fragment } from "react";
import PageLayout from "../../Layout/PageLayout";
import { Table, Input } from "antd";
import AddButton from "./AddButton";
import EditModal from './EditModal'

import ListOperation from "../../components/ListOperation";
import axios from "axios";

//api
import { companyAPI } from "../../constant";

const { Search } = Input;

const CompanyListPage = () => {
  const [companies, setCompanies] = useState([]);
  const [isModalEditVisible, setModalEditVisible] = useState(false);
  const [isModalAddVisible, setModalAddVisible] = useState(false);
  const [record, setRecord] = useState({});
  const [filterTable, setFilterTable] = useState(null);
  
  useEffect(() => {
    getCompanies()
  },[])

  const getCompanies = async () => {
    try {
      const res = await axios.get(companyAPI).then((res) => res.data.data);
      setCompanies(res)
      
    } catch (error) {
      console.log('error', error);
      setCompanies([])
    }
  }

  const search = (value) => {
    const filterTable = companies.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase().trim())
      )
    );
    setFilterTable(filterTable);
  };

  const onEdit = (record) => {
    setRecord(record);
    setModalEditVisible(true);
  };

  const columns = [
    {
      title: "ลำดับที่",
      key: "key",
      render: (_, __, index) => {
        return index + 1;
      },
    },
    {
      title: "ชื่อ",
      dataIndex: "merchant_name",
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
      dataIndex: 'uuid',
      render: (id, record) => {
        return (
          <ListOperation
             key={record.uuid}
            onEdit={() => onEdit(record)}
              deletePath={`${companyAPI}/${id}`}
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
          dataSource={filterTable === null ? companies : filterTable}
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
