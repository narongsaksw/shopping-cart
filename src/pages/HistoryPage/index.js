import React, { useState, useEffect } from 'react';
import { Table, Tag, Space, DatePicker, Row } from 'antd';
import Card from '../../components/Card';
import moment from 'moment';
import { getHistoryByDate } from '../../constant';

import {
  Container,
  DateCard,
  TitleDate,
  Column,
  Record,
  NegativePrice,
  PositivePrice,
} from './style';
import axios from 'axios';
const { RangePicker } = DatePicker;

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

  const [historyData, setHisitoryData] = useState([]);
  const [incomes, setIncomes] = useState(0);
  const [expenses, setExpenses] = useState(0);

  const getHistory = async () => {
    const start = moment().format('YYYY-MM-DD 00:00:00');
    const end = moment().format('YYYY-MM-DD 00:00:00');
    const res = await axios
      .get(`${getHistoryByDate}${start}/${end}`)
      .then((res) => res.data);
    const { allBuy, allSell, order } = res.dataValues;
    setHisitoryData(order);
    setIncomes(allBuy);
    setExpenses(allSell);
    console.log('res history', res);
  };

  useEffect(() => {
    getHistory();
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
        <Card title='รายได้สุทธิ' amount={`${incomes - expenses}บาท`} />
      </Row>
      <Table
        columns={columns}
        dataSource={historyData}
        pagination={tablePagination}
        onChange={handlePagination}
      />
    </Container>
  );
}

export default History;
