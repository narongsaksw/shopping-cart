import React, { useState, useEffect } from "react";
import { DatePicker, Typography, Avatar, Image, Badge, Space, Dropdown, Menu, Button, Modal } from "antd";
import { DownOutlined } from "@ant-design/icons";
import Card from "../../components/Card";
import PageLayout from "../../Layout/PageLayout";
import moment from "moment";
import { getHistoryByDate, ip, getHistoryByDateV2 } from "../../constant";
import Select from "../../components/select";
import { DateCard, TitleDate, NegativePrice, PositivePrice } from "./style";
import axios from "axios";
import Table from "./table";
import Printer from "../EmployeePage/Print";

const menu = (
  <Menu
    items={[
      {
        key: "1",
        label: "Action 1",
      },
      {
        key: "2",
        label: "Action 2",
      },
    ]}
  />
);

const { RangePicker } = DatePicker;
// const columns = [];
const SelectOption2 = [
  "รายงานยอดขายสินค้า",
  "รายงานรายรับรายจ่าย",
  "รายงานข้อมูลจำนวนสินค้าคงเหลือในคลังสินค้า",
  "รายงานการชำระเงิน",
  "รายงานข้อมูลสินค้า",
];
const data = [];
const dataColume0 = [
  {
    title: "ลำดับที่",
    dataIndex: "uuid",
    key: "key",
    render: (_, __, index) => {
      return index + 1;
    },
  },
  {
    title: "วันและเวลา",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt) => {
      return moment(createdAt).format("DD/MM/YYYY hh:mm:ss");
    },
  },
  {
    title: "จำนวนที่ขาย",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "ชื่อสินค้า",
    dataIndex: "Warehouse.name",
    key: "name",
    render: (name, record) => <Typography.Text>{record?.Warehouse?.name}</Typography.Text>,
  },
  {
    title: "รูปสินค้า",
    dataIndex: "Warehouse.image",
    key: "image",
    render: (e, record) => (
      <>
        <Avatar
          size="large"
          src={
            <Image
              src={
                record?.Warehouse?.image != null
                  ? `${ip}/${record?.Warehouse?.image}`
                  : `https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`
              }
            />
          }
        />
      </>
    ),
  },
  {
    title: "ราคา(บาท)",
    dataIndex: "price",
    key: "price",
    render: (price) => <Typography.Text>{price}</Typography.Text>,
  },
];

const dataColume1 = [
  {
    title: "ลำดับที่",
    dataIndex: "uuid",
    key: "key",
    render: (_, __, index) => {
      return index + 1;
    },
  },
  {
    title: "วันและเวลา",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt) => {
      return moment(createdAt).format("DD/MM/YYYY hh:mm:ss");
    },
  },
  {
    title: "ราคา(บาท)",
    dataIndex: "price",
    key: "price",
    render: (price) => <Typography.Text>{price}</Typography.Text>,
  },
  {
    title: "สถานะ",
    dataIndex: "TradingRole.name",
    key: "status",
    render: (status, record) =>
      record?.TradingRole?.name === "SELL" ? (
        <PositivePrice>{record?.TradingRole?.name}</PositivePrice>
      ) : (
        <NegativePrice>{record?.TradingRole?.name}</NegativePrice>
      ),
  },
];

const dataColume2 = [
  {
    title: "ลำดับที่",
    dataIndex: "uuid",
    key: "key",
    render: (_, __, index) => {
      return index + 1;
    },
  },
  {
    title: "วันและเวลา",
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt) => {
      return moment(createdAt).format("DD/MM/YYYY hh:mm:ss");
    },
  },
  {
    title: "ชื่อสินค้า",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "รูปสินค้า",
    dataIndex: "image",
    key: "image",
    render: (e) => (
      <>
        <Avatar
          size="large"
          src={
            <Image
              src={e != null ? `${ip}/${e}` : `https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`}
            />
          }
        />
      </>
    ),
  },
  {
    title: "ราคา(บาท)",
    dataIndex: "price",
    key: "price",
    render: (price) => <Typography.Text>{price}</Typography.Text>,
  },
  {
    title: "ชื่อคู้ค้า",
    dataIndex: "StoreInformation.PersonalInformation.merchant_name",
    key: "merchant_name",
    render: (merchant_name, record) => (
      <Typography.Text>{record?.StoreInformation?.PersonalInformation?.merchant_name}</Typography.Text>
    ),
  },
  {
    title: "รูปคู่ค้า",
    dataIndex: "StoreInformation.PersonalInformation.icon",
    key: "merchant_image",
    render: (e, record) => (
      <>
        <Avatar
          size="large"
          src={
            <Image
              src={
                record?.StoreInformation?.PersonalInformation?.icon != null
                  ? `${ip}/${record?.StoreInformation?.PersonalInformation?.icon}`
                  : `https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`
              }
            />
          }
        />
      </>
    ),
  },
  {
    title: "ที่อยู่",
    dataIndex: "StoreInformation.PersonalInformation.address",
    key: "merchant_address",
    render: (merchant_address, record) => (
      <Typography.Text>{record?.StoreInformation?.PersonalInformation?.address}</Typography.Text>
    ),
  },
];

const dataColume3 = [
  {
    title: "ลำดับที่",
    dataIndex: "item.uuid",
    key: "key",
    render: (_, __, index) => {
      return index + 1;
    },
  },
  {
    title: "วันและเวลา",
    dataIndex: "item.createdAt",
    key: "createdAt",
    render: (createdAt) => {
      return moment(createdAt).format("DD/MM/YYYY hh:mm:ss");
    },
  },
  {
    title: "Order ID",
    dataIndex: "item.order_id",
    key: "order_id",
    render: (price, { item }) => <Typography.Text>{item?.order_id}</Typography.Text>,
  },
  {
    title: "ราคา(บาท)",
    dataIndex: "item.price",
    key: "price",
    render: (price) => <Typography.Text>{price}</Typography.Text>,
  },
  {
    title: "จำนวนสินค้า",
    dataIndex: "item.value",
    key: "value",
    render: (price, { item }) => <Typography.Text>{item?.value}</Typography.Text>,
  },
  {
    title: "สลิป",
    dataIndex: "item.slip",
    key: "slip",
    render: (e, { item }) => (
      <>
        {/* <Avatar
          size="large"
          src={
            <Image
              src={
                item?.slip != null
                  ? `${ip}/${item?.slip}`
                  : `https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`
              }
            />
          }
        /> */}
        <Button
          onClick={() =>
            Modal.info({
              title: "รายละเอียดรายการสั่งซื้อ",
              content:
                item?.slip != null ? (
                  <Printer
                    orderId={JSON.parse(item?.slip).props.orderId}
                    Allprice={JSON.parse(item?.slip).props.Allprice}
                    order={JSON.parse(item?.slip).props.order}
                  />
                ) : (
                  <>No slip</>
                ),
              okText: "OK",
            })
          }
        >
          Slip
        </Button>
      </>
    ),
  },
  {
    title: "สถานะ",
    dataIndex: "item.status",
    key: "status",
    render: (status, { item }) =>
      item?.status === "COMPLETE" ? (
        <PositivePrice>{item?.status}</PositivePrice>
      ) : (
        <NegativePrice>{item?.status}</NegativePrice>
      ),
  },
];

const dataColume4 = [
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
    dataIndex: "createdAt",
    key: "createdAt",
    render: (createdAt) => {
      return moment(createdAt).format("DD/MM/YYYY hh:mm:ss");
    },
  },
  {
    title: "ชื่อสินค้า",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "ราคา(บาท)",
    dataIndex: "price",
    key: "price",
    render: (price) => <Typography.Text>{price}</Typography.Text>,
  },
  {
    title: "จำนวน",
    dataIndex: "value",
    key: "value",
  },
  {
    title: "ชนิด",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "รูปสินค้า",
    dataIndex: "image",
    key: "image",
    render: (e) => (
      <>
        <Avatar
          size="large"
          src={
            <Image
              src={e != null ? `${ip}/${e}` : `https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png`}
            />
          }
        />
      </>
    ),
  },
];

const History = () => {
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
  const [columns, setColumns] = useState([]);
  const [list, setList] = useState(1);

  const getHistory = async (list) => {
    const res = await axios.get(`${getHistoryByDateV2}/${startDate}/${endDate}/id/${list}`).then((res) => res.data);
    const { dataValues, totalBuy, totalSell } = res;
    setHistoryData(dataValues);
    setIncomes(totalSell);
    setExpenses(totalBuy);
  };

  useEffect(() => {
    getHistory(list);
    setCol(list);
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

  useEffect(() => {
    getHistory(list);
  }, [list]);

  const handleChange = async (value, object) => {
    setList(object.key);
    setCol(parseInt(object.key));
  };

  const setCol = (list) => {
    switch (list) {
      case 0:
        setColumns(dataColume0);
        break;
      case 1:
        setColumns(dataColume1);
        break;
      case 2:
        setColumns(dataColume2);
        break;
      case 3:
        setColumns(dataColume3);
        break;
      case 4:
        setColumns(dataColume4);
        break;
      default:
        setColumns([]);
        break;
    }
  };

  const info = async (slip) => {
    Modal.info({
      title: "รายละเอียดรายการสั่งซื้อ",
      content: JSON.parse(slip),
      okText: "OK",
    });
  };

  return (
    <PageLayout
      shownBack={false}
      extra={[
        <div key="extra" style={{ display: "flex" }}>
          <div style={{ heigh: "100%", display: "flex", alignItems: "center", marginRight: "20px" }}>
            <div style={{ width: "100%" }}>
              <Select
                defaultValue={"รายงานยอดขายสินค้า"}
                width={200}
                handleChange={handleChange}
                option={SelectOption2}
                style={{ borderRadius: 6 }}
              />
            </div>
          </div>
          <DateCard>
            <TitleDate>วันที่</TitleDate>
            <RangePicker
              format="DD/MM/YYYY"
              disabledDate={disabledDate}
              defaultValue={[moment(), moment()]}
              onCalendarChange={(dates, stringDates) => onCalendarChange(dates, stringDates)}
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
        className="components-table-demo-nested"
        columns={columns}
        dataSource={historyData}
        pagination={tablePagination}
        onChange={handlePagination}
      />
    </PageLayout>
  );
};

export default History;
