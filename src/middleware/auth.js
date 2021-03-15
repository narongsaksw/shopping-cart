import axios from 'axios';
import { Redirect } from 'react-router-dom';

const setUserData = ({ role, name }) => {
  localStorage.setItem('userData', JSON.stringify({ role, name }));
};

export const isLogin = () => {
  if (localStorage.getItem('userData')) return true;
  return false;
};

export const login = async ({ history, username, password }) => {
  await axios
    // .post('http://fourdust.kozow.com:3001/api/v1/act-membership/login', {
    .post('http://localhost:3001/api/v1/act-membership/login', {
      username,
      password,
    })
    .then((res) => {
      if (res.data.dataValues !== null) {
        const {
          Role: { role },
          user,
        } = res.data.dataValues;
        setUserData({ role, name: user });
      } else {
        return <Redirect to='/' />;
      }
    });

  if (JSON.parse(localStorage.getItem('userData')).role === 'Admin') {
    history.push('/history');
  } else {
    history.push('/employee/All Product');
  }
};
