import React, { useState, useEffect } from 'react';
import PageLayout from '../../Layout/PageLayout';
import styled from 'styled-components';
import { Table, Input } from 'antd';
import AddButton from './AddButton';
import { getEmployeeList, deleteEmployee } from '../../constant';
import axios from 'axios';
import ListOperation from '../../components/ListOperation';
import EditModal from './EditModal';

const { Search } = Input;

function EmployeeList() {
  const [data, setData] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalAddVisible, setModalAddVisible] = useState(false);
  const [record, setRecord] = useState({});
  const [filterTable, setFilterTable] = useState(null);

  const getEmployee = async () => {
    const res = await axios.get(getEmployeeList).then((res) => res.data);
    if (res.message === 'OK') {
      setData(res.dataValues);
    }
    console.log(res);
  };
  useEffect(() => {
    getEmployee();
  }, [isModalVisible, isModalAddVisible]);

  const onEdit = (record) => {
    setRecord(record);
    setModalVisible((state) => !state);
  };
  const columns = [
    {
      title: 'ชื่อ-นามสกุล',
      dataIndex: 'firstname',
    },
    {
      title: 'ชื่อ-นามสกุล',
      dataIndex: 'lastname',
    },
    {
      title: 'อายุ',
      dataIndex: 'age',
    },
    {
      title: 'ที่อยู่',
      dataIndex: 'address',
    },
    {
      title: 'อีเมล์',
      dataIndex: 'email',
    },
    {
      title: 'เบอร์โทรศัพท์',
      dataIndex: 'phone_number',
    },
    {
      dataIndex: 'uuid',
      render: (id, record) => {
        return (
          <ListOperation
            onEdit={() => onEdit(record)}
            deletePath={`${deleteEmployee}/${id}`}
          />
        );
      },
    },
  ];

  const search = (value) => {
    const filterTable = data.filter((o) =>
      Object.keys(o).some((k) =>
        String(o[k]).toLowerCase().includes(value.toLowerCase().trim())
      )
    );
    setFilterTable(filterTable);
  };
  return (
    <PageLayout
      subTitle={
        <AddButton
          isModalVisible={isModalAddVisible}
          setModalVisible={setModalAddVisible}
        />
      }
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
