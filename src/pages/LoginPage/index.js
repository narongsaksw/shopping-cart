import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { EntryPage, PageHeader } from '../style';
import EntryCard from '../../components/EntryCard';
import Input from '../../components/Input';
import InputGroup from '../../components/InputGroup';
import Button from '../../components/Button';

const LoginPage = () => {
  const onSubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    console.log({ email, password });
  };
  return (
    <EntryPage>
      <PageHeader to='/'>Shopping Cart</PageHeader>
      <EntryCard>
        <form onSubmit={onSubmit}>
          <InputGroup>
            <label htmlFor='login-username'>Username</label>
            <Input type='text' placeholder='username' id='login-username' />
          </InputGroup>
          <InputGroup>
            <label htmlFor='login-password'>Password</label>
            <Input type='password' placeholder='Password' id='login-password' />
          </InputGroup>
          <Button type='submit' full>
            Log in
          </Button>
        </form>
      </EntryCard>
    </EntryPage>
  );
};

export default LoginPage;
