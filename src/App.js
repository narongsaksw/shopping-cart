import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './App.css';

//layouts
import AdminLayout from './Layout/AdminLayout';
import EmployeeLayout from './Layout/EmployeeLayout';

//pages
import LoginPage from './pages/LoginPage';
import EmployeePage from './pages/EmployeePage';
import HistoryPage from './pages/HistoryPage';
import StockPage from './pages/StockPage';
import EmployeeListPage from './pages/EmployeeListPage';
import PromotionPage from './pages/PromotionPage';
import NotFoundPage from './pages/NotFoundPage';
import LogoutPage from './pages/LogoutPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={LoginPage} />
        <Route
          path={[
            '/dashboard',
            '/history',
            '/employee-list',
            '/stock',
            '/promotion',
            '/logout',
          ]}
        >
          <AdminLayout>
            <Route path='/history' component={HistoryPage} />
            <Route path='/stock' component={StockPage} />
            <Route path='/employee-list' component={EmployeeListPage} />
            <Route path='/promotion' component={PromotionPage} />
            <Route exact path='/logout' component={LogoutPage} />
          </AdminLayout>
        </Route>
        <Route path={['/employee']}>
          <Route path='/employee/:group' component={EmployeeLayout} />
        </Route>
        <Route path='/not-found' component={NotFoundPage} />
        <Redirect to='/not-found' />
      </Switch>
    </Router>
  );
};

export default App;
