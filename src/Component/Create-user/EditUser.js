import React, { useEffect, useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../Navbar/Sidebar';  // Assuming Sidebar is used somewhere in the app
const baseurl = process.env.REACT_APP_API_BASE_URL;

const EditUser = () => {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [reportingTo, setReportingTo] = useState('');
  const [department, setDepartment] = useState([]);
  const [teamLeaders, setTeamLeaders] = useState([]);
  const [toastMessage, setToastMessage] = useState('');
  const [toastBody, setToastBody] = useState('');
  const [showToast, setShowToast] = useState(false);
  const { userId } = useParams();  // Get the user ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch user details to prepopulate form for editing
  const fetchUserDetails = async () => {
    try {
      const response = await axios.get(`${baseurl}/getUserById/${userId}`);
      if (response.data.success) {
        const { name, role, reportingTo, department } = response.data.data;
        setName(name);
        setRole(role);
        setReportingTo(reportingTo || '');
        setDepartment(department.map(dep => ({ value: dep, label: dep })));
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  // Fetch team leaders for 'Reporting To' field
  useEffect(() => {
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
    fetchUserDetails();
  }, [userId]);

  // Handle updating user details
  const handleUpdateUser = async () => {
    if (!name || !role) {
      setToastMessage('Error');
      setToastBody('Name and Role are required.');
      setShowToast(true);
      return;
    }

    const payload = {
        userId,
      name,
      role,
      reportingTo: role !== 'admin' && role !== 'team_leader' ? reportingTo : undefined,
      department: department.map(d => d.value),
    };

    try {
      const response = await axios.put(`${baseurl}/updateuser`, payload);
      if (response.data.status === 200) {
        setToastMessage('User Updated Successfully');
        setToastBody('User details have been updated.');
        navigate('/User-list');
      } else {
        setToastMessage('Error');
        setToastBody(response.data.message || 'Failed to update user.');
      }
    } catch (error) {
      setToastMessage('Error');
      setToastBody('An error occurred while updating the user.');
    }

    setShowToast(true);
  };

  // Department options
  const departmentOptions = [
    { value: 'AL', label: 'Auto Loan' },
    { value: 'BL', label: 'Business Loan' },
    { value: 'LAP', label: 'Land & Property Loan' },
    { value: 'HL', label: 'Home Loan' },
    { value: 'PL', label: 'Personal Loan' },
  ];

  return (
    <>
      <h3 className='text-center mt-5 pt-5'>Edit User</h3>
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

        {(role === 'team_leader' || (role !== 'admin' && role !== 'team_leader')) && (
          <div className="mb-3">
            <label htmlFor="selectdepartment" className="form-label text-light">Select Department</label>
            <Select
              id="selectdepartment"
              options={departmentOptions}
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
            onClick={handleUpdateUser}
          >
            Update User
          </button>
          <button
            type="button"
            className="btn btn-outline-light mb-3"
            onClick={() => { setName(''); setRole(''); setReportingTo(''); setDepartment([]); }}
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

export default EditUser;
