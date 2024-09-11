import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
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
import BankLogin_dashboard from "./Component/Dashboard/bankLogin_dashboard";
import Sales_dashboard from "./Component/Dashboard/Sales_dashboard";
import Tvr_dashboard from "./Component/Dashboard/tvr_dashboard";
import CDRdashboard from './Component/Dashboard/CDRdashboard';
import Team_member from './Component/Team_Leader/Team_member';
import EditTeamMember from './Component/Team_Leader/EditTeamMember';
import ViewDetails from './Component/Team_Leader/ViewDetails';
import ChangePassword from './Component/Auth/changePassword';
// import { OverviewProvider } from './Component/ContentHook/OverviewContext';
import { OverviewProvider } from './Component/ContentHook/OverviewContext';
import EditUser from './Component/Create-user/EditUser';
import History from './Component/History/Historylist';
import ViewFileDetails from './Component/History/Viewfiledetails';
import Viewdisposition from './Component/Components/Viewdisposition';
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
  const isAuthRoute = location.pathname === "/" || location.pathname === "/change-password"

  return (
    <div className="App">
      <OverviewProvider>
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
          <Route path="/tvr-dashboard" element={<Tvr_dashboard />} />
          <Route path="/CDRdashboard" element={<CDRdashboard />} />

          <Route path="/banklogin-dashboard" element={<BankLogin_dashboard />} />

          <Route path="/create-user" element={<CreateUser />} />
          <Route path="/unlock-user" element={<UnlockUser />} />
          <Route path="/upload-csv" element={<UploadCsv />} />
          <Route path="/user-list" element={<Userlist />} />
          <Route path="/reports" element={<Report />} />
          <Route path="/sales-team" element={<Sales />} />
          <Route path="/tvr-team" element={<Tvr />} />
          <Route path="/cdr-team" element={<Cdr />} />
          <Route path="/bank-login-team" element={<Bank_login />} />
          <Route path="/search" element={<Bank_login />} />
          <Route path="/Team-Member" element={<Team_member />} />
          <Route path="/view/:id" element={<ViewDetails />} />
        <Route path="/edit/:id" element={<EditTeamMember />} />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/editUser/:userId" element={<EditUser />} />
        <Route path="/file-history" element={<History />} />
        <Route path="/view-filedetails/:file_number" element={<ViewFileDetails />} />
        <Route path="/view-disposition" element={<Viewdisposition />} />
        {/* <Route path=" /view-filehistory/:file_name" element={<ViewFileDetails />} /> */}


       
       
        </Routes>
      </div>
      </OverviewProvider>
    </div>
  );
}

export default App;
