import React from "react";
import { useHistory } from "react-router";
import { login } from "../../middleware/auth";

import { EntryPage, PageHeader } from "../style";

import EntryCard from "../../components/EntryCard";
import Input from "../../components/Input";
import InputGroup from "../../components/InputGroup";
import Button from "../../components/Button";

const LoginPage = () => {
  const history = useHistory();
  const onSubmit = async e => {
    e.preventDefault();
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;
    if (username && password) {
      login({ history, username, password });
    } else {
      alert("username หรือ password ไม่ถูกต้อง !!");
    }
  };
  return (
    <EntryPage>
      <PageHeader to="/">Shopping Cart</PageHeader>
      <EntryCard>
        <form onSubmit={onSubmit}>
          <InputGroup>
            <label htmlFor="login-username">Username</label>
            <Input type="text" placeholder="username" id="login-username" />
          </InputGroup>
          <InputGroup>
            <label htmlFor="login-password">Password</label>
            <Input type="password" placeholder="Password" id="login-password" />
          </InputGroup>
          <Button type="submit" full>
            Log in
          </Button>
        </form>
      </EntryCard>
    </EntryPage>
  );
};

export default LoginPage;
