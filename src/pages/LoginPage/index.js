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
  };
  return (
    <EntryPage>
      <PageHeader to='/'>Shopping Cart</PageHeader>
      <EntryCard>
        <form onSubmit={onSubmit}>
          <InputGroup>
            <label htmlFor='login-email'>Email Address</label>
            <Input
              type='text'
              placeholder='example@email.com'
              id='login-email'
            />
          </InputGroup>
          <InputGroup>
            <label htmlFor='login-password'>Password</label>
            <Input type='text' placeholder='Password' id='login-password' />
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
