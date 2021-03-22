import React, { useState, useEffect } from 'react';
import PageLayout from '../../Layout/PageLayout';
import styled from 'styled-components';
import { Table, Input } from 'antd';
import AddButton from './AddButton';
import { getEmployeeList } from '../../constant';
import axios from 'axios';
import ListOperation from '../../components/ListOperation';
import EditModal from './EditModal';

const { Search } = Input;

const originData = [];

for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    firstname: `Firstname ${i}`,
    lastname: `Lastname ${i}`,
    age: 32,
    address: `London Park no. ${i}`,
    email: `Email no. ${i}`,
    password: `Password no. ${i}`,
  });
}

function EmployeeList() {
  const [data, setData] = useState(originData);
  const [isModalVisible, setModalVisible] = useState(false);
  const [record, setRecord] = useState({});
  const [filterTable, setFilterTable] = useState(null);
  const onSubmit = async (data) => {
    const { email, password } = data;
    console.log(data);
  };

  const getEmployee = async () => {
    const res = await axios.get(getEmployeeList).then((res) => res.data);
    console.log(res);
  };

  useEffect(() => {
    getEmployee();
  }, []);

  const onEdit = (record) => {
    setRecord(record);
    setModalVisible((state) => !state);
  };
  const columns = [
    {
      title: 'ชื่อ',
      dataIndex: 'firstname',
    },
    {
      title: 'นามสกุล',
      dataIndex: 'lastname',
    },
    {
      title: 'อายุ',
      dataIndex: 'age',
    },
    {
      title: 'ที่อยู',
      dataIndex: 'address',
    },
    {
      title: 'อีเมล์',
      dataIndex: 'email',
    },
    {
      title: 'แอคชั่น',
      dataIndex: 'key',
      render: (text, record) => {
        return (
          <ListOperation onEdit={() => onEdit(record)} deletePath={record} />
        );
      },
    },
  ];

  const search = (value) => {
    const filterTable = originData.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase().trim())
      )
    );
    setFilterTable(filterTable);
  };
  return (
    <PageLayout
      subTitle={<AddButton />}
      extra={[
        <Search placeholder='Search by...' enterButton onSearch={search} />,
      ]}
    >
      <>
        <Table
          dataSource={filterTable === null ? data : filterTable}
          columns={columns}
        />
        <EditModal
          record={record}
          isModalVisible={isModalVisible}
          setModalVisible={setModalVisible}
        />
      </>
    </PageLayout>
  );
}

export default EmployeeList;
