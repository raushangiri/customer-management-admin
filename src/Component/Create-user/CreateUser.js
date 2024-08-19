import React, { useState } from 'react';
import './CreateUser.css'; // Import your CSS file

const CreateUser = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  const [toastBody, setToastBody] = useState('');
  const [showToast, setShowToast] = useState(false);

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

  return (
    <>
      <h3 className='text-center mt-5 pt-5'>Add New User</h3>
      <div className='container mb-5' style={{ width: '60%', background: "#2c3e50" }}>
       
        <div className="mb-3">
        <label htmlFor="userName" className="form-label text-light">Select User Role</label>
          <select 
            className="form-select" 
            aria-label="Select Role" 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="">Select Role</option>
            <option value="sales">Sales Agent</option>
            <option value="TVR">TVR Team</option>
            <option value="CDR">CDR Team</option>
            <option value="Bank login Team">Bank Login Team</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div className="mb-3">
        <label htmlFor="selectdepartment" className="form-label text-light">select Department</label>
                            <select
                                className="form-control"
                                id="selectdepartment"
                                placeholder="select role"
                            >
                                <option value="">Select Department</option>
                                <option value="Admin">Admin</option>
                                <option value="AL">Auto Loan</option>
                                <option value="BL">Bank Loan</option>
                                <option value="LAP">Land & Property Loan</option>
                                <option value="HL">Home Loan</option>
                                <option value="PL">Personal Loan</option>
                                {/* <option value="Bank">Bank login team</option> */}
                            </select>
                        </div>
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
            onClick={() => { setName(''); setRole(''); }}
          >
            Cancel
          </button>
        </div>
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
