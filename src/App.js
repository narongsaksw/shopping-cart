import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import EmployeePage from './pages/EmployeePage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact render={(props) => <LoginPage {...props} />} />
        <Route
          path='/admin'
          exact
          render={(props) => <AdminPage {...props} />}
        />
        <Route
          path='/employee'
          exact
          render={(props) => <EmployeePage {...props} />}
        />
        <Route render={(props) => <NotFoundPage {...props} />} />
      </Switch>
    </Router>
  );
};

export default App;
