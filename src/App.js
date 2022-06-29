import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

//layouts
import AdminLayout from "./Layout/AdminLayout";
import EmployeeLayout from "./Layout/EmployeeLayout";

//pages
import LoginPage from "./pages/LoginPage";
import CompanyListPage from "./pages/CompanyListPage";
import HistoryPage from "./pages/HistoryPage";
import StockHistoryPage from "./pages/StockHistoryPage";
import StockPage from "./pages/StockPage";
import EmployeeListPage from "./pages/EmployeeListPage";
import PromotionPage from "./pages/PromotionPage";
import NotFoundPage from "./pages/NotFoundPage";
import LogoutPage from "./pages/LogoutPage";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={LoginPage} />
        <Route
          path={[
            "/dashboard",
            "/history",
            "/stockHistory",
            "/employeeList",
            "/companyList",
            "/stock",
            "/promotion",
            "/logout",
          ]}
        >
          <AdminLayout>
            <Route path="/history" component={HistoryPage} />
            <Route path="/stock" component={StockPage} />
            <Route path="/stockHistory" component={StockHistoryPage} />
            <Route path="/employeeList" component={EmployeeListPage} />
            <Route path="/companyList" component={CompanyListPage} />
            <Route path="/promotion" component={PromotionPage} />
            <Route exact path="/logout" component={LogoutPage} />
          </AdminLayout>
        </Route>
        <Route path={["/employee", "/cart"]}>
          <Route path="/employee/:group" component={EmployeeLayout} />
          <Route path="/cart" component={EmployeeLayout} />
        </Route>
        <Route path="/not-found" component={NotFoundPage} />
        <Redirect to="/not-found" />
      </Switch>
    </Router>
  );
};

export default App;
