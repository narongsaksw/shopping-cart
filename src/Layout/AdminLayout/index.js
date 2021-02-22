import React, { Fragment } from 'react';
import SideBar from '../../components/SideBar';

const AdminLayout = ({ children }) => {
  return (
    <Fragment>
      <SideBar />
      {children}
    </Fragment>
  );
};

export default AdminLayout;
