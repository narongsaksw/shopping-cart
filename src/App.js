import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import EmployeePage from './pages/EmployeePage';
import HistoryPage from './pages/HistoryPage';
import StockPage from './pages/StockPage';
import EmployeeListPage from './pages/EmployeeListPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={LoginPage} />
        <AdminPage>
          <Switch>
            <Route path='/stock' component={StockPage} />
            <Route path='/history' component={HistoryPage} />
            <Route path='/employee-list' component={EmployeeListPage} />
          </Switch>
        </AdminPage>
        {/* <Route path='/admin' render={(props) => <AdminPage {...props} />} /> */}
        <Route path='/employee' component={EmployeePage} />
        <Route component={NotFoundPage} />
      </Switch>
    </Router>
  );
};

export default App;
