import React, { useState, useEffect } from 'react';
import PageLayout from '../../Layout/PageLayout';
import { Table, Input, Typography } from 'antd';
import AddButton from './AddButton';
import EditModal from './EditModal';
import ListOperation from '../../components/ListOperation';
import axios from 'axios';
import { getWarehouseAll, deleteStockById } from '../../constant';

const { Search } = Input;

function Stock() {
  const [stock, setStock] = useState([]);
  const [record, setRecord] = useState({});
  const [isModalVisible, setModalVisible] = useState(false);
  const [filterTable, setFilterTable] = useState(null);
  const onEdit = (record) => {
    setRecord(record);
    setModalVisible((state) => !state);
  };
  const phoneNumberFormat = (val) => {
    //08-1234-5678
    let phoneNumber;
    if (val !== null) {
      const pn = val.split('');
      phoneNumber = `${pn[0]}${pn[1]}-${pn[2]}${pn[3]}${pn[4]}${pn[5]}-${pn[6]}${pn[7]}${pn[8]}${pn[9]}`;
      return phoneNumber;
    }
  };
  const columns = [
    {
      title: 'ลำดับที่',
      dataIndex: 'key',
      render: (text, _, idx) => {
        return <Typography.Text>{idx + 1}</Typography.Text>;
      },
    },
    {
      title: 'ผู้ค้า',
      dataIndex: 'fullname',
    },
    {
      title: 'วัตถุดิบ',
      dataIndex: 'title',
    },
    {
      title: 'คงเหลือ',
      dataIndex: 'value',
    },
    {
      title: 'หน่วย',
      dataIndex: 'description',
    },
    {
      title: 'เบอร์ติดต่อ',
      dataIndex: 'phone_number',
      render: (text) => {
        return <Typography.Text>{phoneNumberFormat(text)}</Typography.Text>;
      },
    },
    {
      title: 'แอคชั่น',
      dataIndex: 'key',
      render: (id, record) => {
        return (
          <ListOperation
            onEdit={() => onEdit(record)}
            deletePath={`${deleteStockById}/${id}`}
          />
        );
      },
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
  }, [isModalVisible]);

  const search = (value) => {
    const filterTable = stock.filter((o) =>
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
      <Table
        columns={columns}
        dataSource={filterTable === null ? stock : filterTable}
      />
      <EditModal
        record={record}
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
      />
    </PageLayout>
  );
}

export default Stock;
