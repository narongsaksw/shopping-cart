import axios from 'axios';

const setUserData = ({ role, name }) => {
  localStorage.setItem('userData', JSON.stringify({ role, name }));
};

export const isLogin = () => {
  if (localStorage.getItem('userData')) return true;
  return false;
};

export const login = async ({ history, username, password }) => {
  await axios
    .post('https://shopeexpress.herokuapp.com/api/v1/member/login', {
      username,
      password,
    })
    .then((res) => {
      const {
        role: { role },
        user,
      } = res?.data?.dataValues;
      setUserData({ role: role, name: user });
    });

  if (JSON.parse(localStorage.getItem('userData')).role === 'Admin') {
    history.push('/dashboard');
  } else {
    history.push('/employee');
  }
  // console.log({  parse: JSON.parse(getUserData) });
};
