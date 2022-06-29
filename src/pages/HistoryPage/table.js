import React, { useEffect, useState } from "react";
import { Table } from "antd";

const TableHistory = ({ columns, dataSource, tablePagination, handlePagination }) => {
  return (
    <Table
      rowKey="uuid"
      columns={columns}
      dataSource={dataSource}
      pagination={tablePagination}
      onChange={handlePagination}
    />
  );
};

export default TableHistory;
