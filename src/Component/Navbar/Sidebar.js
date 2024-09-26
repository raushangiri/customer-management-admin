import React, { useState,useEffect, useId } from 'react';
import { NavLink, Link  } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown,faUser } from '@fortawesome/free-solid-svg-icons'; // Import the correct icon
import './Sidebar.css'; // Optional: For styling
import logo from "../Auth/jbj-fintech-logo.webp";
import axios from 'axios';

const Sidebar = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [userdata, setUserdata]=useState({});
  const userRole = localStorage.getItem('userRole'); 
  const userId = localStorage.getItem('userId'); 
  const [error, setError] = useState(null);
  const baseurl = process.env.REACT_APP_API_BASE_URL;
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${baseurl}/getUserById/${userId}`);
        if (response.data) {
          setUserdata(response.data); // Update state with full user data
        } else {
          setError('No user data found.');
        }
      } catch (err) {
        setError('Failed to fetch user data.');
      } finally {
        setLoading(false); // Stop loading after the request is complete
      }
    };

    fetchUser();
  }, [userId, baseurl]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };
  return (
    <div className="sidebar border border-primary">
      <img src={logo} alt='logo' style={{ width: '90%' }} className='img1' />
      <ul>
      <p>
  <FontAwesomeIcon icon={faUser} className='mx-2'/>
  <strong> Hi {userdata.data.name}</strong>
</p><hr></hr>
        {userRole === 'admin' && (
          <>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active-link' : ''}>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/Adminsearch" className={({ isActive }) => isActive ? 'active-link' : ''}>Search File Details</NavLink>
            </li>
            <li><NavLink to="/file-history" className={({ isActive }) => isActive ? 'active-link' : ''}>File History</NavLink></li>
            <li><NavLink to="/Adminfilehistory" className={({ isActive }) => isActive ? 'active-link' : ''}>Team Performance</NavLink></li>
            <li>
              <div onClick={toggleSubMenu} className="submenu-title">
                Manage User
                <FontAwesomeIcon icon={faCircleChevronDown} />
              </div>
              {showSubMenu && (
                <ul className="submenu">
                  <li><NavLink to="/create-user" className={({ isActive }) => isActive ? 'active-link' : ''}>Create User</NavLink></li>
                  <li><NavLink to="/user-list" className={({ isActive }) => isActive ? 'active-link' : ''}>User List</NavLink></li>
                  <li><NavLink to="/unlock-user" className={({ isActive }) => isActive ? 'active-link' : ''}>Unlock User</NavLink></li>
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
              <NavLink  to="/banklogin-dashboard" className={({ isActive }) => isActive ? 'active-link' : ''}>Dashboard</NavLink>
            </li>
            <li><NavLink  to="/bank-login-team" className={({ isActive }) => isActive ? 'active-link' : ''}>Bank Login Team</NavLink></li>
            <li>
              <NavLink to="/Adminsearch" className={({ isActive }) => isActive ? 'active-link' : ''}>Search File Details</NavLink>
            </li>
            <li>
              <NavLink to="/file-history" className={({ isActive }) => isActive ? 'active-link' : ''}>File History</NavLink></li>

          </>
        )}

        <li><NavLink to="/">Logout</NavLink></li>

      </ul>
    </div>
  );
};

export default Sidebar;
