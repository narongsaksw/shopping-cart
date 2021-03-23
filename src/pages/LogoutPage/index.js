import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { logout } from '../../middleware/auth';

const LogoutPage = () => {
  const history = useHistory();
  useEffect(() => {
    logout();
    history.replace('/');
  });
  return <div>Logout</div>;
};

export default LogoutPage;
