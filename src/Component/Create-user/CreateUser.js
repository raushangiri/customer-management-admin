import React, { useState } from 'react';
import Select from 'react-select';

import './CreateUser.css'; // Import your CSS file

const CreateUser = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastBody, setToastBody] = useState('');
  const [showToast, setShowToast] = useState(false);
 
  const [reportingTo, setReportingTo] = useState('');

  const handleCreateUser = async () => {
    const baseurl = "http://localhost:3006/api/v1/register";

    if (!name || !role) {
      setToastMessage("Error");
      setToastBody("Name and Role are required.");
      setShowToast(true);
      return;
    }

    try {
      const response = await fetch(baseurl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, role })
      });

      const result = await response.json();

      if (response.ok) {
        setToastMessage("User Created Successfully");
        setToastBody(`User ID: ${result.userId}, Initial Password: ${result.initialPassword}`);
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

  const teamLeaders = [
    { value: 'TL1', label: 'Team Leader 1' },
    { value: 'TL2', label: 'Team Leader 2' },
    // Add more team leaders as needed
  ];

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
          <option value="TL">Team Leader</option>
          <option value="sales">Sales Agent</option>
          <option value="TVR">TVR Team</option>
          <option value="CDR">CDR Team</option>
          <option value="Bank login Team">Bank Login Team</option>
        </select>
      </div>

      {(role === 'admin' || role === 'TL' || role === 'sales' || role === 'TVR' || role === 'CDR' || role === 'Bank login Team') && (
        <>
          {role !== 'admin' && role !== 'TL' && (
            <div className="mb-3">
              <label htmlFor="reportingTo" className="form-label text-light">Select Reporting To</label>
              <Select
                id="reportingTo"
                options={teamLeaders}
                placeholder="Select Team Leader"
                className="text-dark"
                value={reportingTo}
                onChange={(selectedOption) => setReportingTo(selectedOption.value)}
              />
            </div>
          )}

          {role === 'TL' && (
            <div className="mb-3">
              <label htmlFor="selectdepartment" className="form-label text-light">Select Department</label>
              <Select
                id="selectdepartment"
                options={options}
                isMulti
                placeholder="Select Department"
                className="text-dark"
              />
            </div>
          )}

          {role !== 'admin' && role !== 'TL' && (
            <div className="mb-3">
              <label htmlFor="selectdepartment" className="form-label text-light">Select Department</label>
              <Select
                id="selectdepartment"
                options={options}
                isMulti
                placeholder="Select Department"
                className="text-dark"
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
              onClick={() => { setName(''); setRole(''); setReportingTo(''); }}
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
