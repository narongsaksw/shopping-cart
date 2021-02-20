import React from 'react';
import { Redirect } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';

const Routes = {
  path: '/user',
  //   layout: LoginPage,
  routes: [
    {
      exact: true,
      subpath: '/',
      render: ({ match }) => <Redirect to={`${match.url}/login`} />,
    },
    {
      exact: true,
      subpath: '/login',
      component: LoginPage,
    },
  ],
};

export default Routes;
