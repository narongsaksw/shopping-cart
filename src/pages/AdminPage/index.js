import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import SideBar from '../../components/SideBar';

import HistoryPage from '../HistoryPage';
import StockPage from '../StockPage';
import EmployeeListPage from '../EmployeeListPage';

const AdminPage = () => {
  return (
    <Fragment>
      <Router>
        <SideBar />
        <Switch>
          <Route path='/history' component={HistoryPage} />
          <Route path='/stock' component={StockPage} />
          <Route path='/employee-list' component={EmployeeListPage} />
        </Switch>
      </Router>
    </Fragment>
  );
};

export default AdminPage;
