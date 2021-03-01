import React, { useState } from 'react';
import styled from 'styled-components';
import { Table, Tag, Space, DatePicker, Row } from 'antd';
import Card from '../../components/Card';
import moment from 'moment';
const { RangePicker } = DatePicker;
const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
`;

const DateCard = styled.div`
  height: 100px;
  position: relative;
  margin: 20px 10px 20px 0;
  border: 1px solid #f0f0f0;
  border-radius: 6px;
`;

const TitleDate = styled.div`
  position: absolute;
  top: 5px;
  left: 5px;
  font-size: 18px;
`;

const Column = styled.div`
  text-align: center;
`;
const Record = styled.div`
  text-align: center;
`;

const NegativePrice = styled.div`
  text-align: center;
  color: red;
`;
const PositivePrice = styled.div`
  text-align: center;
  color: #07fe06;
`;
const columns = [
  {
    title: <Column>ลำดับที่</Column>,
    dataIndex: 'key',
    key: 'key',
    render: (text) => <Record>{text}</Record>,
  },
  {
    title: <Column>วันและเวลา</Column>,
    dataIndex: 'date',
    key: 'date',
    render: (text) => <Record>{text}</Record>,
  },
  {
    title: <Column>ผู้ค้า</Column>,
    dataIndex: 'name',
    key: 'name',
    render: (text) => <Record>{text}</Record>,
  },
  {
    title: <Column>รายการ</Column>,
    dataIndex: 'order',
    key: 'order',
    render: (text) => <Record>{text}</Record>,
  },
  {
    title: <Column>ราคา(บาท)</Column>,
    dataIndex: 'price',
    key: 'price',
    render: (price) => {
      if (price < 0) {
        return <NegativePrice>{price}</NegativePrice>;
      } else {
        return <PositivePrice>{price}</PositivePrice>;
      }
    },
  },
];

const data = [];
for (let i = 0; i < 50; i++) {
  data.push({
    key: i + 1,
    date: `${moment().format('DD/MM/YYYY HH:mm:ss')}`,
    name: `Edward King ${i}`,
    order: `order${i}`,
    price: Math.ceil(Math.random() * 99) * (Math.round(Math.random()) ? 1 : -1),
  });
}
function History() {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 5,
    startTime: null,
    endTime: null,
  });

  const handlePagination = (pagination) => {
    const { pageSize, current } = pagination;
    setFilter({
      ...filter,
      current,
      limit: pageSize,
    });
  };
  const onCalendarChange = (dates, stringDates) => {
    console.log({ dates, stringDates });
  };

  const tablePagination = {
    pageSize: filter.limit,
    current: filter.current || 1,
    total: data.length,
    pageSizeOptions: ['5', '10', '20', '30'],
    showSizeChanger: true,
    showTotal: (total) => `ทั้งหมด: ${total} รายการ`,
    size: 'small',
  };

  const sumPrice = data.reduce((sum, item) => {
    return sum + item.price;
  }, 0);

  const expenses = data
    .filter((item) => item.price < 0)
    .reduce((sum, item) => {
      return sum + item.price;
    }, 0);
  const incomes = data
    .filter((item) => item.price > 0)
    .reduce((sum, item) => {
      return sum + item.price;
    }, 0);
  return (
    <Container>
      <Row style={{ justifyContent: 'flex-end' }}>
        <DateCard>
          <TitleDate>วันที่</TitleDate>
          <RangePicker
            format='DD/MM/YYYY'
            defaultValue={[moment(), moment()]}
            onCalendarChange={(dates, stringDates) =>
              onCalendarChange(dates, stringDates)
            }
            size='large'
            style={{ height: 60, top: '40%', borderRadius: 6 }}
          />
        </DateCard>
        <Card title='รายรับทั้งหมด' amount={`${incomes}บาท`} />
        <Card title='รายจ่ายทั้งหมด' amount={`${expenses}บาท`} />
        <Card title='รายได้สุทธิ' amount={`${sumPrice}บาท`} />
      </Row>
      <Table
        columns={columns}
        dataSource={data}
        pagination={tablePagination}
        onChange={handlePagination}
      />
    </Container>
  );
}

export default History;
