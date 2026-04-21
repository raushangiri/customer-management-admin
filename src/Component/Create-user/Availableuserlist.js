import React, { useEffect, useState } from "react";
import axios from "axios";

const Availableuserlist = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseurl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${baseurl}/loggeduserlist`);
        setUsers(response.data.users || []);
      } catch (error) {
        console.error("Error fetching available users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Available Users List</h4>
      {loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No users found with Available aux today.</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col">Available User</th>
              <th scope="col">Login Time</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              // Get last aux entry to display current aux
              const currentAux =
                user.auxChanges && user.auxChanges.length > 0
                  ? user.auxChanges[user.auxChanges.length - 1].aux
                  : "N/A";

              return (
                <tr key={index}>
                  <td>{user.userId}</td>
                  <td>{user.name || "N/A"}</td>
                  <td>{user.role || "Agent"}</td>
                  <td>{currentAux}</td>
                   <td>{user.totalAvailableTime} Hrs</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Availableuserlist;
