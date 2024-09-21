import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TeamMember = () => {
  const navigate = useNavigate();
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = localStorage.getItem('userId');
  const baseurl = process.env.REACT_APP_API_BASE_URL;

  // Function to fetch team members reporting to a specific user (e.g., team leader ID 3325)
  const fetchTeamMembers = async () => {
    try {
      const response = await axios.get(`${baseurl}/getUserbyteamleader/${userId}`);
      setTeamMembers(response.data.data); // Assuming response.data.data contains the array of users
      setLoading(false); // Set loading to false after data is fetched
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamMembers();
  }, []);

  if (loading) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-5 text-danger">Error: {error}</div>;
  }

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
            <tr key={member._id}>
              <td>{member.name}</td>
              <td>{member.role}</td>
              <td>{member.department.join(', ')}</td>
              <td>
                <button
                  className="btn btn-primary btn-sm me-2"
                  onClick={() => navigate(`/view/${member.userId}`)}
                >
                  <i className="fas fa-eye"></i> View
                </button>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => navigate(`/edit/${member.userId}`)}
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
