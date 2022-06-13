import React from "react";
import { Menu, Dropdown, Popconfirm, message } from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import axios from "axios";

function ListOperation({ deletePath, onEdit }) {
  const onDelete = async () => {
    try {
      await axios.delete(deletePath);
      message.success("Success");
    } catch (e) {
      console.error(e);
      message.error("Error");
    }
  };

  const menu = (
    <Menu>
      <Menu.Item>
        <div style={{ color: "#27889F" }} onClick={onEdit}>
          แก้ไข
        </div>
      </Menu.Item>
      <Menu.Item>
        <Popconfirm title="คุณแน่ใจไหมที่จะลบสิ่งนี้" okText="ลบ" cancelText="ยกเลิก" onConfirm={onDelete}>
          <div style={{ color: "#27889F" }}>ลบ</div>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu}>
      <EllipsisOutlined style={{ fontSize: 40, color: "#CDCDCD" }} />
    </Dropdown>
  );
}

export default ListOperation;
