import React, { useState, useEffect, useId } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown, faUser, faComment } from '@fortawesome/free-solid-svg-icons'; // Import the correct icon
import './Sidebar.css'; // Optional: For styling
import logo from "../Auth/jbj-fintech-logo.webp";
import axios from 'axios';

const Sidebar = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [showSubMenuhistory, setShowSubMenuhistory] = useState(false);
  const [showSubMenuperformance, setShowSubMenuperformance] = useState(false);


  const [userdata, setUserdata] = useState({});
  const userRole = localStorage.getItem('userRole');
  const userId = localStorage.getItem('userId');
  const [error, setError] = useState(null);
  const baseurl = process.env.REACT_APP_API_BASE_URL;
const [loading, setLoading] = useState(true);
const [unreadCount, setUnreadCount] = useState(0);

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  const toggleSubMenufilehistory = () => {
    setShowSubMenuhistory(!showSubMenuhistory);
  };

  const toggleSubMenufileperformance = () => {
    setShowSubMenuperformance(!showSubMenuperformance);
  };


const fetchUnreadCount = async () => {
  try {

    const response = await axios.get(
      `${baseurl}/messages/unread-count/${userId}`
    );

    if (response.data) {
      setUnreadCount(response.data.unreadCount);
    }

  } catch (err) {
    console.error("Unread count error:", err);
  }
};


useEffect(() => {

 const fetchUser = async () => {
  try {
    const response = await axios.get(`${baseurl}/getUserById/${userId}`);

    if (response.data.success) {
      setUserdata(response.data.data);
    } else {
      setError("No user data found.");
    }

  } catch (err) {
    setError("Failed to fetch user data.");
  } finally {
    setLoading(false);
  }
};

  fetchUser();
  fetchUnreadCount();

}, [userId, baseurl]);


useEffect(() => {

  const interval = setInterval(() => {
    fetchUnreadCount();
  }, 10000);

  return () => clearInterval(interval);

}, []);

  return (
    <div className="sidebar border border-primary overflow-auto"
      style={{
        flex: 1,
        background: "linear-gradient(to bottom, #1e3c72, #2a5298)", // adjust colors
        color: "white",
      }}
    >
      {/* <img src={logo} alt='logo' style={{ width: '90%' }} className='img1' /> */}
      <div className="text-center">
        <img src={logo} alt="logo" style={{ width: "150px" }} className="mb-3" />
        {/* <h4 className="fw-bold">JBJ Fintech</h4> */}
        {/* <p className="mb-0">A Professional Way For Funding</p> */}
      </div>
      <ul>
        <p>
          <FontAwesomeIcon icon={faUser} className='mx-2' />
          <strong>Hi {userdata?.name}</strong>
        </p><hr></hr>
        {userRole === 'admin' && (
          <>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active-link' : ''}>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/Adminsearch" className={({ isActive }) => isActive ? 'active-link' : ''}>Search File Details</NavLink>
            </li>
            <li>
              <div onClick={toggleSubMenufilehistory} className="submenu-title">
                File History
                <FontAwesomeIcon icon={faCircleChevronDown} />
              </div>
              {showSubMenuhistory && (
                <ul className="submenu">
                  <li><NavLink to="/adminsaleshistory" className={({ isActive }) => isActive ? 'active-link' : ''}>Sales File History</NavLink></li>
                  {/* <li><NavLink to="/admintvrhistory" className={({ isActive }) => isActive ? 'active-link' : ''}>TVR File History</NavLink></li> */}
                  <li><NavLink to="/admincdrhistory" className={({ isActive }) => isActive ? 'active-link' : ''}>CDR File History</NavLink></li>
                  <li><NavLink to="/adminbankloginhistory" className={({ isActive }) => isActive ? 'active-link' : ''}>bank_login File History</NavLink></li>
                  <li><NavLink to="/unlock-user" className={({ isActive }) => isActive ? 'active-link' : ''}>Approval File History</NavLink></li>
                </ul>
              )}
              {/* <NavLink to="/team-filehistory" className={({ isActive }) => isActive ? 'active-link' : ''}>File History</NavLink></li> */}
            </li>
            <li>
              {/* <NavLink to="/Adminfilehistory" className={({ isActive }) => isActive ? 'active-link' : ''}>Team Performance</NavLink> */}
              <div onClick={toggleSubMenufileperformance} className="submenu-title">
                Team Performance
                <FontAwesomeIcon icon={faCircleChevronDown} />
              </div>
              {showSubMenuperformance && (
                <ul className="submenu">
                  <li><NavLink to="/Adminfilehistory" className={({ isActive }) => isActive ? 'active-link' : ''}>Sales Team Performance</NavLink></li>
                  {/* <li><NavLink to="/tvrteamperformance" className={({ isActive }) => isActive ? 'active-link' : ''}>TVR Team Performance</NavLink></li> */}
                  <li><NavLink to="/cdrteamperformance" className={({ isActive }) => isActive ? 'active-link' : ''}>CDR Team Performance</NavLink></li>
                  <li><NavLink to="/bankloginteamperformance" className={({ isActive }) => isActive ? 'active-link' : ''}>bank_login Performance</NavLink></li>
                  {/* <li><NavLink to="/unlock-user" className={({ isActive }) => isActive ? 'active-link' : ''}>Approval Team Performance</NavLink></li> */}

                </ul>
              )}
            </li>
            <li>
              <div onClick={toggleSubMenu} className="submenu-title">
                Manage User
                <FontAwesomeIcon icon={faCircleChevronDown} />
              </div>
              {showSubMenu && (
                <ul className="submenu">
                  <li><NavLink to="/user-list" className={({ isActive }) => isActive ? 'active-link' : ''}>Manage Users</NavLink></li>
                  <li><NavLink to="/availableuser" className={({ isActive }) => isActive ? 'active-link' : ''}>Available Users</NavLink></li>
                </ul>
              )}
            </li>
            <li>
              <NavLink to="/upload-csv" className={({ isActive }) => isActive ? 'active-link' : ''}>Upload File</NavLink>
            </li>
            <li><NavLink to="/reports" className={({ isActive }) => isActive ? 'active-link' : ''}>Reports</NavLink></li>
          </>
        )}
        {userRole === 'Team leader' && (
          <>
            <li>
              <NavLink to="/teamLeader-dashboard" className={({ isActive }) => isActive ? 'active-link' : ''}>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/Team-Member" className={({ isActive }) => isActive ? 'active-link' : ''}> Team Members</NavLink>
            </li>
            <li><NavLink to="/team-filehistory" className={({ isActive }) => isActive ? 'active-link' : ''}>Team File History</NavLink></li>
            <li><NavLink to="/team-performance" className={({ isActive }) => isActive ? 'active-link' : ''}>Team Performance</NavLink></li>
            <li>
              <NavLink to="/Adminsearch" className={({ isActive }) => isActive ? 'active-link' : ''}>Search File Details</NavLink>
            </li>
            <li>
              <NavLink to="/upload-csv" className={({ isActive }) => isActive ? 'active-link' : ''}>Upload File</NavLink>
            </li>
            <li><NavLink to="/reports" className={({ isActive }) => isActive ? 'active-link' : ''}>Reports</NavLink></li>
          </>
        )}

        {userRole === 'sales' && (
          <>
            <li>
              <NavLink to="/sales-dashboard" className={({ isActive }) => isActive ? 'active-link' : ''}>Dashboard</NavLink>
            </li>
            <li><NavLink to="/sales-team" className={({ isActive }) => isActive ? 'active-link' : ''}>Search File</NavLink></li>
            <li><NavLink to="/file-history" className={({ isActive }) => isActive ? 'active-link' : ''}>File History</NavLink></li>
          </>
        )}
        {userRole === 'TVR' && (
          <>
            <li>
              <NavLink to="/tvr-dashboard" className={({ isActive }) => isActive ? 'active-link' : ''}>Dashboard</NavLink>
            </li>
            <li><NavLink to="/tvr-team" className={({ isActive }) => isActive ? 'active-link' : ''}>TVR</NavLink></li>
            <li>
              <NavLink to="/Tvrsearch" className={({ isActive }) => isActive ? 'active-link' : ''}>Search File Details</NavLink>
            </li>
            <li><NavLink to="/file-history" className={({ isActive }) => isActive ? 'active-link' : ''}>File History</NavLink></li>
          </>
        )}

        {userRole === 'CDR' && (
          <>
            <li>
              <NavLink to="/CDRdashboard" className={({ isActive }) => isActive ? 'active-link' : ''}>Dashboard</NavLink>
            </li>
            <li><NavLink to="/cdr-team" className={({ isActive }) => isActive ? 'active-link' : ''}>CDR</NavLink></li>
            <li>
              <NavLink to="/Cdrsearch" className={({ isActive }) => isActive ? 'active-link' : ''}>Search File Details</NavLink>
            </li>
            <li><NavLink to="/file-history" className={({ isActive }) => isActive ? 'active-link' : ''}>File History</NavLink></li>
          </>
        )}
        {userRole === 'Bank login' && (
          <>
            <li>
              <NavLink to="/banklogin-dashboard" className={({ isActive }) => isActive ? 'active-link' : ''}>Dashboard</NavLink>
            </li>
            <li><NavLink to="/bank-login-team" className={({ isActive }) => isActive ? 'active-link' : ''}>bank_login</NavLink></li>
            <li>
              <NavLink to="/Adminsearch" className={({ isActive }) => isActive ? 'active-link' : ''}>Search File Details</NavLink>
            </li>
            <li>
              <NavLink to="/file-history" className={({ isActive }) => isActive ? 'active-link' : ''}>File History</NavLink></li>

          </>
        )}
        {/* <li><NavLink to="/chat">Chat <FontAwesomeIcon icon={faComment} /></NavLink></li> */}
        <li>
  <NavLink to="/chat">
    Chat <FontAwesomeIcon icon={faComment} />
    {unreadCount > 0 && (
      <span className="chat-badge">{unreadCount}</span>
    )}
  </NavLink>
</li>
        <li><NavLink to="/">Logout</NavLink></li>

      </ul>
    </div>
  );
};

export default Sidebar;
