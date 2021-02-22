import React, { useState, useMemo } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { UserContext } from './hooks/userContext';
import './App.css';

import PublicRoute from './routes/publicRoute';
import PrivateRoute from './routes/privateRoute';

//layouts
import AdminLayout from './Layout/AdminLayout';

//pages
import LoginPage from './pages/LoginPage';
import EmployeePage from './pages/EmployeePage';
import HistoryPage from './pages/HistoryPage';
import StockPage from './pages/StockPage';
import EmployeeListPage from './pages/EmployeeListPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  const [user, setUser] = useState(null);
  const value = useMemo(() => ({ user, setUser }), [user, setUser]);
  return (
    <Router>
      <UserContext.Provider value={value}>
        <Switch>
          <PublicRoute restricted={true} path='/' exact component={LoginPage} />
          <PrivateRoute>
            <AdminLayout>
              <Switch>
                <PrivateRoute path='/admin/history' component={HistoryPage} />
                <PrivateRoute path='/admin/stock' component={StockPage} />
                <PrivateRoute
                  path='/admin/employee-list'
                  component={EmployeeListPage}
                />
              </Switch>
            </AdminLayout>
          </PrivateRoute>
          <PrivateRoute path='/employee' component={EmployeePage} />
          <PrivateRoute path='*' component={NotFoundPage} />
          <PublicRoute path='*' component={NotFoundPage} />
        </Switch>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
