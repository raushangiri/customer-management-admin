import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Example team member data (you'd normally fetch this data from an API)
  const teamMember = {
    id: id,
    name: 'John Doe',
    role: 'Team Leader',
    department: 'Sales',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Team Member Details</h3>
      <div className="card p-4">
        <h5 className="card-title">Name: {teamMember.name}</h5>
        <p className="card-text">Role: {teamMember.role}</p>
        <p className="card-text">Department: {teamMember.department}</p>
        <p className="card-text">Email: {teamMember.email}</p>
        <p className="card-text">Phone: {teamMember.phone}</p>
        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
};

export default ViewDetails;
