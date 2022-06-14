import React, { useState, useEffect } from 'react';
import PageLayout from '../../Layout/PageLayout';
import { Table, Input } from 'antd';
import AddButton from './AddButton';
import { getEmployeeList, deleteEmployee } from '../../constant';
import axios from 'axios';
import ListOperation from '../../components/ListOperation';
import EditModal from './EditModal';

const { Search } = Input;

function EmployeeList() {
  const [data, setData] = useState([]);
  const [isModalEditVisible, setModalEditVisible] = useState(false);
  const [isModalAddVisible, setModalAddVisible] = useState(false);
  const [record, setRecord] = useState({});
  const [filterTable, setFilterTable] = useState(null);

  const getEmployee = async () => {
    const res = await axios.get(getEmployeeList).then((res) => res.data);
    if (res.message === 'OK') {
      setData(res.dataValues);
    }
  };
  useEffect(() => {
    getEmployee();
  }, [isModalEditVisible, isModalAddVisible]);

  const onEdit = (record) => {
    setRecord(record);
    setModalEditVisible((state) => !state);
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
          isModalVisible={isModalEditVisible}
          setModalVisible={setModalEditVisible}
        />
      </>
    </PageLayout>
  );
}

export default EmployeeList;
