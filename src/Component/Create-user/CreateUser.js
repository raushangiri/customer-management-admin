import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import './CreateUser.css'; // Import your CSS file
import Sidebar from '../Navbar/Sidebar';
const baseurl = process.env.REACT_APP_API_BASE_URL;

const CreateUser = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastBody, setToastBody] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [reportingTo, setReportingTo] = useState('');
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [department, setDepartment] = useState([]);

  const handleCreateUser = async () => {
    // const baseurl = "http://localhost:3007/api/v1/register";
  
    if (!name || !role) {
      setToastMessage("Error");
      setToastBody("Name and Role are required.");
      setShowToast(true);
      return;
    }
  
    const payload = { name, role };
  
    if (role !== 'admin' && role !== 'team_leader') {
      if (!reportingTo) {
        setToastMessage("Error");
        setToastBody("Reporting To is required for this role.");
        setShowToast(true);
        return;
      }
      payload.reportingTo = reportingTo;
    }
  
    if (role === 'team_leader' || (role !== 'admin' && role !== 'team_leader')) {
      if (department.length === 0) {
        setToastMessage("Error");
        setToastBody("Department is required.");
        setShowToast(true);
        return;
      }
      payload.department = department.map(d => d.value); // Ensure department values are strings
    }
  
    try {
      const response = await fetch(`${baseurl}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        setToastMessage("User Created Successfully");
        setToastBody(`User ID: ${result.Data.UserId}, Initial Password: ${result.Data.TemporaryPassword}`);
        // Reset fields
        setName('');
        setRole('');
        setReportingTo('');
        setDepartment([]); // Reset department state
      } else {
        setToastMessage("Error");
        setToastBody(result.message || "Failed to create user.");
      }
    } catch (error) {
      setToastMessage("Error");
      setToastBody("An error occurred while creating the user.");
    }
  
    setShowToast(true);
  };
  

  const options = [
    { value: 'AL', label: 'Auto Loan' },
    { value: 'BL', label: 'Business Loan' },
    { value: 'LAP', label: 'Land & Property Loan' },
    { value: 'HL', label: 'Home Loan' },
    { value: 'PL', label: 'Personal Loan' },
  ];

  useEffect(() => {
    // Fetch team leaders from the API when the component mounts
    const fetchTeamLeaders = async () => {
      try {
        const response = await axios.get(`${baseurl}/findteamleader`);
        if (response.data.status === 200) {
          const options = response.data.Teamleaderslist.map(leader => ({
            value: leader,
            label: leader
          }));
          setTeamLeaders(options);
        }
      } catch (error) {
        console.error('Error fetching team leaders:', error);
      }
    };

    fetchTeamLeaders();
  }, []);

  return (
    <>
    
      <h3 className='text-center mt-5 pt-5'>Add New User</h3>
      <div className='container mb-5' style={{ width: '60%', background: "#2c3e50" }}>
        <div className="mb-3">
          <label htmlFor="userRole" className="form-label text-light">Select User Role</label>
          <select
            className="form-select"
            aria-label="Select Role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="team_leader">Team Leader</option>
            <option value="sales">Sales Agent</option>
            <option value="TVR">TVR Team</option>
            <option value="CDR">CDR Team</option>
            <option value="Bank login Team">Bank Login Team</option>
          </select>
        </div>

        {(role === 'admin' || role === 'team_leader' || role === 'sales' || role === 'TVR' || role === 'CDR' || role === 'Bank login Team') && (
          <>
            {role !== 'admin' && role !== 'team_leader' && (
              <div className="mb-3">
                <label htmlFor="reportingTo" className="form-label text-light">Select Reporting To</label>
                <Select
                  id="reportingTo"
                  options={teamLeaders}
                  placeholder="Select Team Leader"
                  className="text-dark"
                  value={teamLeaders.find(option => option.value === reportingTo)}
                  onChange={(selectedOption) => setReportingTo(selectedOption?.value)}
                />
              </div>
            )}

            {role === 'team_leader' && (
              <div className="mb-3">
                <label htmlFor="selectdepartment" className="form-label text-light">Select Department</label>
                <Select
  id="selectdepartment"
  options={options}
  isMulti
  placeholder="Select Department"
  className="text-dark"
  value={department}
  onChange={(selectedOptions) => setDepartment(selectedOptions)}
/>

              </div>
            )}

            {role !== 'admin' && role !== 'team_leader' && (
              <div className="mb-3">
                <label htmlFor="selectdepartment" className="form-label text-light">Select Department</label>
                <Select
  id="selectdepartment"
  options={options}
  isMulti
  placeholder="Select Department"
  className="text-dark"
  value={department}
  onChange={(selectedOptions) => setDepartment(selectedOptions)}
/>

              </div>
            )}

            <div className="mb-3">
              <label htmlFor="userName" className="form-label text-light">Enter User Name</label>
              <input
                type="text"
                className="form-control"
                id="userName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="d-flex text-center">
              <button
                type="button"
                className="btn btn-primary mb-3 mx-2"
                onClick={handleCreateUser}
              >
                Add User
              </button>
              <button
                type="button"
                className="btn btn-outline-light mb-3"
                onClick={() => { setName(''); setRole(''); setReportingTo(''); setDepartment([]); }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>

      {/* Toast Notification */}
      {showToast && (
        <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 11 }}>
          <div className="toast show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="me-auto">{toastMessage}</strong>
              <button type="button" className="btn-close" onClick={() => setShowToast(false)} aria-label="Close"></button>
            </div>
            <div className="toast-body">
              {toastBody}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateUser;
