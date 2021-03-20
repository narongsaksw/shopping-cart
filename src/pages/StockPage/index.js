import React, { useState, useEffect } from 'react';
import PageLayout from '../../Layout/PageLayout';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { Table } from 'antd';
import AddButton from './AddButton';
import axios from 'axios';
import { getWarehouseAll } from '../../constant';

const Column = styled.div`
  text-align: center;
`;

const Record = styled.div`
  text-align: center;
`;

const originData = [];

for (let i = 0; i < 20; i++) {
  originData.push({
    key: i.toString(),
    name: `name ${i}`,
    material: `material ${i}`,
    unit: ` ${i}`,
    price: ` ${i}`,
    phoneNumber: '0812345678',
  });
}
function Stock() {
  const { register, handleSubmit, errors, reset } = useForm();
  const [stock, setStock] = useState([]);
  const onSubmit = async (data) => {
    const { email, password } = data;
    console.log(data);
    reset();
  };
  const phoneNumberFormat = (val) => {
    //08-1234-5678
    let phoneNumber;
    const pn = val.split('');
    phoneNumber = `${pn[0]}${pn[1]}-${pn[2]}${pn[3]}${pn[4]}${pn[5]}-${pn[6]}${pn[7]}${pn[8]}${pn[9]}`;
    return phoneNumber;
  };
  const columns = [
    {
      title: <Column>ลำดับที่</Column>,
      dataIndex: 'key',
      render: (text, _, idx) => <Record>{idx + 1}</Record>,
    },
    {
      title: <Column>ผู้ค้า</Column>,
      dataIndex: 'name',
      render: (text) => <Record>{text}</Record>,
    },
    {
      title: <Column>วัตถุดิบ</Column>,
      dataIndex: 'title',
      render: (text) => <Record>{text}</Record>,
    },
    {
      title: <Column>คงเหลือ</Column>,
      dataIndex: 'value',
      render: (text) => <Record>{text}</Record>,
    },
    {
      title: <Column>หน่วย</Column>,
      dataIndex: 'description',
      render: (text) => <Record>{text}</Record>,
    },
    {
      title: <Column>เบอร์ติดต่อ</Column>,
      dataIndex: 'phoneNumber',
      render: (text) => <Record>{text}</Record>,
    },
  ];

  const getWarehouse = async () => {
    const res = await axios
      .get(getWarehouseAll)
      .then((res) => res.data.dataValues);
    setStock(res);
  };
  useEffect(() => {
    getWarehouse();
  }, []);
  return (
    <PageLayout extra={[<AddButton />]}>
      <Table columns={columns} dataSource={stock} />
    </PageLayout>
  );
}

export default Stock;
