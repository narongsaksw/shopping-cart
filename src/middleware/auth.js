import axios from 'axios';
import { Redirect } from 'react-router-dom';

const setUserData = ({ role, name, id }) => {
  localStorage.setItem('userData', JSON.stringify({ role, name, id }));
};

export const isLogin = () => {
  if (localStorage.getItem('userData')) return true;
  return false;
};

export const login = async ({ history, username, password }) => {
  await axios
    .post('http://localhost:3001/api/v1/act-membership/login', {
      username,
      password,
    })
    .then((res) => {
      if (res.status === 200) {
        const {
          Role: { role },
          user,
          act_member_id,
        } = res.data.dataValues;
        setUserData({ role, name: user, id: act_member_id });
      }
    })
    .catch((err) => alert('username หรือ password ไม่ถูกต้อง !!'));

  if (JSON.parse(localStorage.getItem('userData')) !== null) {
    if (JSON.parse(localStorage.getItem('userData')).role === 'Admin') {
      history.push('/history');
    } else {
      history.push('/employee/All Product');
    }
  } else {
    console.log('err');
  }
};

export const logout = () => {
  localStorage.removeItem('userData');
};
