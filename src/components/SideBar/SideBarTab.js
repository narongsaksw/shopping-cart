import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';

export const SidebarTab = [
  {
    title: 'ข้อมูลการขาย',
    path: '/admin/history',
    icon: <MdIcons.MdAttachMoney />,
  },
  {
    title: 'คลังสินค้า',
    path: '/admin/stock',
    icon: <FaIcons.FaWarehouse />,
  },
  {
    title: 'พนักงาน',
    path: '/admin/employee-list',
    icon: <RiIcons.RiGroupLine />,
  },
];
