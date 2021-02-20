import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import AdminPage from './AdminPage';
import EmployeePage from './EmployeePage';
import LoginPage from './LoginPage';

const user1 = {
  name: 'user1',
  lastname: 'user1',
  role: 'admin',
};
const user2 = {
  name: 'user2',
  lastname: 'user2',
  role: 'employee',
};
const user3 = {
  name: 'user3',
  lastname: 'user3',
  role: 'hacker',
};
const Roles = () => {
  const [role, setRole] = useState('admin');

  axios.defaults.withCredentials = true;

  useEffect(() => {
    //   axios.get('').then(res => {
    //       if(res.data){
    //           setRole(res.data.role)
    //       }
    //   })
    setRole(user1.role);
  }, []);

  return (
    <Fragment>
      {role === 'admin' && <AdminPage />}
      {role === 'employee' && <EmployeePage />}
      {role === '' && <LoginPage />}
    </Fragment>
  );
};

export default Roles;
