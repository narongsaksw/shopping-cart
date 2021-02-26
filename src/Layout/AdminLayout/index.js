import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import { isLogin } from '../../middleware/auth';
import SideBar from '../../components/SideBar';

const AdminLayout = ({ children }) => {
  if (!isLogin()) {
    return <Redirect to='/' />;
  }
  return (
    <Fragment>
      <SideBar />
      {children}
    </Fragment>
  );
};

export default AdminLayout;
