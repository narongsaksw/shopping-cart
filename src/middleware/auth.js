import axios from 'axios';

const setUserData = ({ role, name }) => {
  localStorage.setItem('userData', JSON.stringify({ role, name }));
};

export const isLogin = () => {
  if (localStorage.getItem('userData')) return true;
  return false;
};

export const login = async ({ history, username, password }) => {
  const res = await axios
    .post('http://fourdust.kozow.com:3001/api/v1/act-membership/login', {
      username,
      password,
    })
    .then((res) => res.data);
  const {
    role: { role },
    user,
  } = res.dataValues;
  setUserData({ role: role, name: user });
  if (JSON.parse(localStorage.getItem('userData')).role === 'Admin') {
    history.push('/dashboard');
  } else {
    history.push('/employee');
  }
};
