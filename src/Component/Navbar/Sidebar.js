import React, { useState,useEffect, useId } from 'react';
import { Link } from 'react-router-dom';
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
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/search">Search File Details</Link>
            </li>
            <li><Link to="/file-history">File History</Link></li>

            <li>
              <div onClick={toggleSubMenu} className="submenu-title">
                Manage User
                <FontAwesomeIcon icon={faCircleChevronDown} />
              </div>
              {showSubMenu && (
                <ul className="submenu">
                  <li><Link to="/create-user">Create User</Link></li>
                  <li><Link to="/user-list">User List</Link></li>
                  <li><Link to="/unlock-user">Unlock User</Link></li>
                </ul>
              )}
            </li>
            <li>
              <Link to="/upload-csv">Upload File</Link>
            </li>
            <li><Link to="/reports">Reports</Link></li>
          </>
        )}
        {userRole === 'Team leader' && (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/Team-Member"> Team Members</Link>
            </li>
            <li>
              <Link to="/search">Search File Details</Link>
            </li>
            <li>
              <Link to="/upload-csv">Upload File</Link>
            </li>
            <li><Link to="/reports">Reports</Link></li>
          </>
        )}

        {userRole === 'sales' && (
          <>
            <li>
              <Link to="/sales-dashboard">Dashboard</Link>
            </li>
            <li><Link to="/sales-team">Search File</Link></li>
            <li><Link to="/file-history">File History</Link></li>
          </>
        )}
        {userRole === 'TVR' && (
          <>
            <li>
              <Link to="/tvr-dashboard">Dashboard</Link>
            </li>
            <li><Link to="/tvr-team">TVR</Link></li>
            <li><Link to="/file-history">File History</Link></li>
          </>
        )}

        {userRole === 'CDR' && (
          <>
            <li>
              <Link to="/CDRdashboard">Dashboard</Link>
            </li>
            <li><Link to="/cdr-team">CDR</Link></li>
            <li><Link to="/file-history">File History</Link></li>
          </>
        )}
        {userRole === 'Bank login' && (
          <>
            <li>
              <Link to="/banklogin-dashboard">Dashboard</Link>
            </li>
            <li><Link to="/bank-login-team">Bank Login Team</Link></li>
          </>
        )}

        <li><Link to="/">Logout</Link></li>

      </ul>
    </div>
  );
};

export default Sidebar;
