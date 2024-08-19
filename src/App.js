import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import Navbar from './Component/Navbar/Navbar';
import Auth from './Component/Auth/Login';
import Dashboard from "./Component/Dashboard/Dashboard";
import Sidebar from './Component/Navbar/Sidebar';
import CreateUser from './Component/Create-user/CreateUser';
import UnlockUser from './Component/Create-user/UnlockUser';
import UploadCsv from './Component/Upload/UploadCsv';
import Userlist from './Component/Create-user/Userlist';
import Report from './Component/Report/Report';
import Sales from './Component/Sales/Sales';
import Tvr from './Component/TVR/Tvr';
import Cdr from './Component/CDR/Cdr';
import Bank_login from './Component/Bank-login/Bank-login';
import bankLogindashboard from "./Component/Dashboard/bankLogin_dashboard";
import Sales_dashboard from "./Component/Dashboard/Sales_dashboard";
import tvr_dashboard from "./Component/Dashboard/tvr_dashboard";
import CDRdashboard from './Component/Dashboard/CDRdashboard';

function App() {
  return (
    <Router>
      <Main />
    </Router>
  );
}

function Main() {
  const location = useLocation();

  // Determine if the current path is not "/"
  const isAuthRoute = location.pathname === "/";

  return (
    <div className="App">
      {!isAuthRoute && (
        <>
          {/* <Navbar /> */}
          <Sidebar />
        </>
      )}
      <div className={!isAuthRoute ? "content-with-sidebar" : ""}>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sales-dashboard" element={<Sales_dashboard />} />
          <Route path="/tvr-dashboard" element={<tvr_dashboard />} />
          <Route path="/CDRdashboard" element={<CDRdashboard />} />

          <Route path="/banklogin-dashboard" element={<bankLogindashboard />} />

          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/unlock-user" element={<UnlockUser />} />
          <Route path="/upload-csv" element={<UploadCsv />} />
          <Route path="/user-list" element={<Userlist />} />
          <Route path="/reports" element={<Report />} />
          <Route path="/sales-team" element={<Sales />} />
          <Route path="/tvr-team" element={<Tvr />} />
          <Route path="/cdr-team" element={<Cdr />} />
          <Route path="/bank-login-team" element={<Bank_login />} />



          {/* Add more routes here */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
