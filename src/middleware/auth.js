import axios from "axios";

const setUserData = ({ role, name }) => {
  localStorage.setItem("userData", JSON.stringify({ role, name }));
};

export const isLogin = () => {
  if (localStorage.getItem("userData")) return true;
  return false;
};

export const login = async ({ history, username, password }) => {
  const res = await axios
    .post("http://fourdust.kozow.com:3001/api/v1/act-membership/login", {
      username,
      password,
    })
    .then((res) => {
      if (res.data.dataValues != null) {
        const {
          role: { role },
          user,
        } = res.data.dataValues;
        setUserData({ role, name: user });
      } else {
        window.location.href = "http://localhost:3000";
      }
    });

  if (JSON.parse(localStorage.getItem("userData")).role === "Admin") {
    history.push("/dashboard");
  } else {
    history.push("/employee/All Product");
  }
};
