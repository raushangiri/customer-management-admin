import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Select from 'react-select';

const EditTeamMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Example team member data (you'd normally fetch this data from an API)
  const [teamMember, setTeamMember] = useState({
    id: id,
    name: 'John Doe',
    role: 'Team Leader',
    department: 'Sales',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeamMember({ ...teamMember, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Submit the form data to your backend or API
    console.log('Updated team member:', teamMember);
    navigate(-1); // Redirect back to the team list
  };

  const options = [
    { value: 'AL', label: 'Auto Loan' },
    { value: 'BL', label: 'Business Loan' },
    { value: 'LAP', label: 'Land & Property Loan' },
    { value: 'HL', label: 'Home Loan' },
    { value: 'PL', label: 'Personal Loan' },
 
  ];

  return (
    <div className="container mt-5" style={{height:"80vh"}}>
      <h3 className="text-center mb-4">Edit Team Member</h3>
      <form onSubmit={handleFormSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={teamMember.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">Role</label>
          <input
            type="text"
            className="form-control"
            id="role"
            name="role"
            value={teamMember.role}
            onChange={handleInputChange}
          />
        </div>
       

        <div className="mb-3">
              <label htmlFor="department" className="form-label ">Select Department</label>
              <Select
                 id="department"
                 name="department"
                 value={options.value}
                options={options}
                isMulti
                placeholder="Select Department"
                className="text-dark"
              />
            </div>

          {/* <label htmlFor="department" className="form-label">Department</label>
          <input
            type="text"
            className="form-control"
            id="department"
            name="department"
            value={teamMember.department}
            onChange={handleInputChange}
          /> */}
      
        <button type="submit" className="btn btn-primary">Save Changes</button>
        <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditTeamMember;
