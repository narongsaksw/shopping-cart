import React, { useState, useEffect } from "react";
import { Table } from "antd";
import PageLayout from "../../Layout/PageLayout";
import moment from "moment";
import { getHistory } from "../../constant";

import axios from "axios";

const columns = [
  {
    title: "ลำดับที่",
    key: "id",
    render: (_, __, index) => {
      return index + 1;
    },
  },
  {
    title: "วันและเวลา",
    dataIndex: "updatedAt",
    key: "date",
    render: (date) => {
      return moment(date).format("DD/MM/YYYY hh:mm:ss");
    },
  },
  {
    title: "ผู้ค้า",
    dataIndex: "merchant_name",
    key: "name",
  },
  {
    title: "สินค้า",
    dataIndex: "product_name",
    key: "product_name",
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

  const [history, setHistory] = useState([]);

  useEffect(() => {
    getHistoryList();
  }, []);

  const getHistoryList = async () => {
    const res = await axios.get(getHistory).then((res) => res.data.dataValues);
    setHistory(res);
  };

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
        rowKey="id"
        columns={columns}
        dataSource={history}
        pagination={pagination}
        onChange={paginationHandler}
      />
    </PageLayout>
  );
}

export default StockHistoryPage;
