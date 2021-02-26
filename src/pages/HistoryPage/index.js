import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Table, Tag, Space, DatePicker, Row, Card } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
const Container = styled.div`
  display: flex;
  height: 90vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  // padding: 50px 0;
  // background: ;
  over-flow: hidden;
`;

const columns = [
  {
    title: 'วันและเวลา',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'รายการ',
    dataIndex: 'order',
    key: 'order',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'ราคา',
    dataIndex: 'price',
    key: 'price',
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <Space size='middle'>
        <a>Edit</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];
function History() {
  const onCalendarChange = (dates, stringDates) => {
    console.log({ dates, stringDates });
  };
  return (
    <Fragment>
      <RangePicker
        format='DD/MM/YYYY'
        defaultValue={[moment(), moment()]}
        onCalendarChange={(dates, stringDates) =>
          onCalendarChange(dates, stringDates)
        }
      />
      <Row style={{ justifyContent: 'space-around' }}>
        <Card>รายรับทั้งหมด</Card>
        <Card>รายจ่ายทั้งหมด</Card>
      </Row>
      <Table columns={columns} dataSource={data} pagination={20} />
    </Fragment>
  );
}

export default History;
