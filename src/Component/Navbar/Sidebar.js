import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronDown } from '@fortawesome/free-solid-svg-icons'; // Import the correct icon
import './Sidebar.css'; // Optional: For styling
import logo from "../Auth/jbj-fintech-logo.webp";

const Sidebar = () => {
  const [showSubMenu, setShowSubMenu] = useState(false);
   const userRole = localStorage.getItem('userRole'); // Get the user's role
  // const userRole = "Admin" 
  //const userRole = "sales" 
  // const userRole = "tvr-team" 
  // const userRole = "cdr-team" 


  const toggleSubMenu = () => {
    setShowSubMenu(!showSubMenu);
  };

  return (
    <div className="sidebar border border-primary">
      <img src={logo} alt='logo' style={{ width: '90%' }} className='img1' />
      <ul>
        
        {userRole === 'Admin' && (
          <>
          <li>
          <Link to="/dashboard">Dashboard</Link>
        </li>
            <li>
              <div onClick={toggleSubMenu} className="submenu-title">
                Manage User
                <FontAwesomeIcon icon={faCircleChevronDown} />
              </div>
              {showSubMenu && (
                <ul className="submenu">
                  <li><Link to="/create-user">Add User</Link></li>
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

{userRole === 'Sales' && (
          <>
          <li>
          <Link to="/sales-dashboard">Dashboard</Link>
        </li>
          <li><Link to="/sales-team">sales</Link></li>
            </>
        )}
        {userRole === 'TVR' && (
          <>
           <li>
          <Link to="/tvr-dashboard">Dashboard</Link>
        </li>
              <li><Link to="/tvr-team">TVR</Link></li>
            </>
        )}
    
        {userRole === 'CDR' && (
          <>
           <li>
          <Link to="/cdr-dashboard">Dashboard</Link>
        </li>
        <li><Link to="/cdr-team">CDR</Link></li>
        </>
        )}
         {userRole === 'bank-login' && (
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
