import React, { useState, useEffect } from "react";
import { Table, Typography } from "antd";
import PageLayout from "../../Layout/PageLayout";
import moment from "moment";

import axios from "axios";

const columns = [
  {
    title: "ลำดับที่",
    dataIndex: "key",
    key: "key",
    render: (_, __, index) => {
      return index + 1;
    },
  },
  {
    title: "วันและเวลา",
    dataIndex: "date",
    key: "date",
    render: (date) => {
      return moment(date).format("DD/MM/YYYY hh:mm:ss");
    },
  },
  {
    title: "ผู้ค้า",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "รายการ",
    dataIndex: "order",
    key: "order",
    render: (orders) => {
      return orders.map((text, idx) => {
        if (idx !== orders.length - 1) {
          return <Typography.Text>{text} , </Typography.Text>;
        } else {
          return <Typography.Text>{text}</Typography.Text>;
        }
      });
    },
  },
  {
    title: "ราคา(บาท)",
    dataIndex: "price",
    key: "price",
  },
];

const data = [];
function StockHistoryPage() {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 5,
    startTime: null,
    endTime: null,
  });

  const [historyData, setHistoryData] = useState([]);

  console.log(historyData);

  useEffect(() => {}, []);

  const paginationHandler = (pagination) => {
    const { pageSize, current } = pagination;
    setFilter({
      ...filter,
      current,
      limit: pageSize,
    });
  };

  const pagination = {
    pageSize: filter.limit,
    current: filter.current || 1,
    total: data.length,
    pageSizeOptions: ["5", "10", "20", "30"],
    showSizeChanger: true,
    showTotal: (total) => `ทั้งหมด: ${total} รายการ`,
    size: "small",
  };
  return (
    <PageLayout shownBack={false}>
      <Table
        rowKey="uuid"
        columns={columns}
        dataSource={historyData}
        pagination={pagination}
        onChange={paginationHandler}
      />
    </PageLayout>
  );
}

export default StockHistoryPage;
