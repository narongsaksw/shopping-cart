import React, { useState, useEffect } from "react";
import { Table, DatePicker, Typography } from "antd";
import Card from "../../components/Card";
import PageLayout from "../../Layout/PageLayout";
import moment from "moment";
import { getHistoryByDate } from "../../constant";

import {
  DateCard,
  TitleDate,
  NegativePrice,
  PositivePrice,
} from "./style";
import axios from "axios";
const { RangePicker } = DatePicker;

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
    title: "รายการ",
    dataIndex: "items",
    key: "items",
  },
  {
    title: "ราคา(บาท)",
    dataIndex: "price",
    key: "price",
    render: (price) => <Typography.Text>{price}</Typography.Text>,
  },
  {
    title: "สถานะ",
    dataIndex: "status",
    key: "status",
    render: (status, record) => {
      if (record.status === "CANCEL") {
        return <NegativePrice>{status}</NegativePrice>;
      } else {
        return <PositivePrice>{status}</PositivePrice>;
      }
    },
  },
];

const data = [];
function History() {
  const [filter, setFilter] = useState({
    offset: 0,
    limit: 5,
    startTime: null,
    endTime: null,
  });
  const [startDate, setStartDate] = useState(moment().format("YYYY-MM-DD"));
  const [endDate, setEndDate] = useState(moment().format("YYYY-MM-DD"));

  const [historyData, setHistoryData] = useState([]);
  const [incomes, setIncomes] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const getHistory = async () => {
    const res = await axios
      .get(`${getHistoryByDate}/${startDate}/${endDate}`)
      .then((res) => res.data);
    const { dataValues, totalBuy, totalSell } = res;
    setHistoryData(dataValues);
    setIncomes(totalSell);
    setExpenses(totalBuy);
  };

  useEffect(() => {
    getHistory();
  }, [startDate, endDate]);

  const handlePagination = (pagination) => {
    const { pageSize, current } = pagination;
    setFilter({
      ...filter,
      current,
      limit: pageSize,
    });
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current > moment().endOf("day");
  };

  const onCalendarChange = (dates, stringDates) => {
    setStartDate(moment(dates[0]).format("YYYY-MM-DD"));
    setEndDate(moment(dates[1]).format("YYYY-MM-DD"));
  };

  const tablePagination = {
    pageSize: filter.limit,
    current: filter.current || 1,
    total: data.length,
    pageSizeOptions: ["5", "10", "20", "30"],
    showSizeChanger: true,
    showTotal: (total) => `ทั้งหมด: ${total} รายการ`,
    size: "small",
  };
  return (
    <PageLayout
      shownBack={false}
      extra={[
        <div key="extra" style={{ display: "flex" }}>
          <DateCard>
            <TitleDate>วันที่</TitleDate>
            <RangePicker
              format="DD/MM/YYYY"
              disabledDate={disabledDate}
              defaultValue={[moment(), moment()]}
              onCalendarChange={(dates, stringDates) =>
                onCalendarChange(dates, stringDates)
              }
              size="large"
              style={{ height: 60, top: "40%", borderRadius: 6 }}
              allowClear={false}
            />
          </DateCard>
          <Card title="รายรับทั้งหมด" amount={`${incomes} บาท`} />
          <Card title="รายจ่ายทั้งหมด" amount={`${expenses} บาท`} />
          <Card title="รายได้สุทธิ" amount={`${incomes - expenses} บาท`} />
        </div>,
      ]}
    >
      <Table
        rowKey="uuid"
        columns={columns}
        dataSource={historyData}
        pagination={tablePagination}
        onChange={handlePagination}
      />
    </PageLayout>
  );
}

export default History;
