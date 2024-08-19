import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [showToast, setShowToast] = useState(false); // State for toast visibility
  const [toastMessage, setToastMessage] = useState(''); // State for toast message

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3006/api/v1/getalluser'); // API endpoint to get all users
        const data = await response.json();
        setUsers(data.Data); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Function to handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch('http://localhost:3006/api/v1/deleteUser', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }), // Payload with userId
      });

      if (response.ok) {
        // Remove the deleted user from the state
        setUsers(users.filter((user) => user.userId !== userId));
        // Show toast notification
        setToastMessage(`User with ID ${userId} has been deleted successfully.`);
        setShowToast(true);
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <>
      <h3>All User List</h3>

      <div className='container'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">User ID</th>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.userId || 'N/A'}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>
                  <FontAwesomeIcon icon={faPenToSquare} />
                  <FontAwesomeIcon 
                    icon={faTrash} 
                    style={{ marginLeft: '1rem', cursor: 'pointer' }} 
                    onClick={() => handleDeleteUser(user.userId)} // Delete action
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bootstrap Toast */}
      <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
        <div className={`toast ${showToast ? 'show' : 'hide'}`} role="alert" aria-live="assertive" aria-atomic="true">
          <div className="toast-header">
            <strong className="me-auto">Notification</strong>
            <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowToast(false)}></button>
          </div>
          <div className="toast-body">
            {toastMessage}
          </div>
        </div>
      </div>
    </>
  );
};

export default Userlist;
