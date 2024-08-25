import React from 'react';
import { useNavigate } from 'react-router-dom';

const TeamMember = () => {
  const navigate = useNavigate();

  const teamMembers = [
    { id: 1, name: 'John Doe', role: 'CDR Team', department: 'Auto Loan' },
    { id: 2, name: 'Jane Smith', role: 'Sales Agent', department: 'Business Loan' },
    { id: 3, name: 'Mike Johnson', role: 'TVR Team', department: 'Auto Loan' },
    // Add more team members as needed
  ];

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Team List</h3>
      <table className="table table-dark table-striped">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Department</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((member) => (
            <tr key={member.id}>
              <td>{member.name}</td>
              <td>{member.role}</td>
              <td>{member.department}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => navigate(`/view/${member.id}`)}
                >
                  <i className="fas fa-eye"></i> View
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => navigate(`/edit/${member.id}`)}
                >
                  <i className="fas fa-edit"></i> Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeamMember;
