import React, { useState, useEffect } from 'react';
import PageLayout from '../../Layout/PageLayout';
import styled from 'styled-components';
import { Table } from 'antd';
import AddButton from './AddButton';
import { getEmployeeList } from '../../constant';
import axios from 'axios';

const Column = styled.div`
  text-align: center;
`;

const Record = styled.div`
  text-align: center;
`;

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

  const columns = [
    {
      title: <Column>ชื่อ</Column>,
      dataIndex: 'firstname',
    },
    {
      title: <Column>นามสกุล</Column>,
      dataIndex: 'lastname',
    },
    {
      title: <Column>อายุ</Column>,
      dataIndex: 'age',
    },
    {
      title: <Column>ที่อยู่</Column>,
      dataIndex: 'address',
    },
    {
      title: <Column>อีเมล</Column>,
      dataIndex: 'email',
    },
    {
      title: <Column>แอคชั่น</Column>,
      dataIndex: 'operation',
    },
  ];
  return (
    <PageLayout extra={[<AddButton />]}>
      <Table dataSource={data} columns={columns} />
    </PageLayout>
  );
}

export default EmployeeList;
