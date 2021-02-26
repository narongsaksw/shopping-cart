import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as RiIcons from 'react-icons/ri';
import * as MdIcons from 'react-icons/md';

export const SidebarTab = [
  {
    title: 'ข้อมูลการขาย',
    path: '/history',
    icon: <MdIcons.MdAttachMoney />,
  },
  {
    title: 'คลังสินค้า',
    path: '/stock',
    icon: <FaIcons.FaWarehouse />,
  },
  {
    title: 'พนักงาน',
    path: '/employee-list',
    icon: <RiIcons.RiGroupLine />,
  },
];
