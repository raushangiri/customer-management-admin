// import React, { useState, useEffect } from 'react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
// const baseurl = process.env.REACT_APP_API_BASE_URL;

// const Userlist = () => {
//   const [users, setUsers] = useState([]);
//   const [showToast, setShowToast] = useState(false); // State for toast visibility
//   const [toastMessage, setToastMessage] = useState(''); // State for toast message

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(`${baseurl}/getalluser`); // API endpoint to get all users
//         const data = await response.json();
//         setUsers(data.Data); // Update state with fetched data
//       } catch (error) {
//         console.error('Error fetching users:', error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   // Function to handle user deletion
//   const handleDeleteUser = async (userId) => {
//     try {
//       const response = await fetch(`${baseurl}/deleteUser`, {
//         method: 'DELETE',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ userId }), // Payload with userId
//       });

//       if (response.ok) {
//         // Remove the deleted user from the state
//         setUsers(users.filter((user) => user.userId !== userId));
//         // Show toast notification
//         setToastMessage(`User with ID ${userId} has been deleted successfully.`);
//         setShowToast(true);
//       } else {
//         console.error('Failed to delete user');
//       }
//     } catch (error) {
//       console.error('Error deleting user:', error);
//     }
//   };

//   return (
//     <>
//       <h3>All User List</h3>

//       <div className='container'>
//         <table className="table">
//           <thead>
//             <tr>
//               <th scope="col">User ID</th>
//               <th scope="col">Name</th>
//               <th scope="col">Role</th>
//               <th scope="col">Reporting To</th>
//               <th scope="col">Department</th>
//               <th scope="col">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map((user) => (
//               <tr key={user._id}>
//                 <td>{user.userId || 'N/A'}</td>
//                 <td>{user.name}</td>
//                 <td>{user.role}</td>
//                 <td>{user.reportingTo || 'N/A'}</td>
//                 <td>
//                   {user.department && user.department.length > 0
//                     ? user.department.join(', ')
//                     : 'N/A'}
//                 </td>
//                 <td>
//                   <FontAwesomeIcon icon={faPenToSquare} />
//                   <FontAwesomeIcon 
//                     icon={faTrash} 
//                     style={{ marginLeft: '1rem', cursor: 'pointer' }} 
//                     onClick={() => handleDeleteUser(user.userId)} // Delete action
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Bootstrap Toast */}
//       <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
//         <div className={`toast ${showToast ? 'show' : 'hide'}`} role="alert" aria-live="assertive" aria-atomic="true">
//           <div className="toast-header">
//             <strong className="me-auto">Notification</strong>
//             <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowToast(false)}></button>
//           </div>
//           <div className="toast-body">
//             {toastMessage}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Userlist;

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate

const baseurl = process.env.REACT_APP_API_BASE_URL;

const Userlist = () => {
  const [users, setUsers] = useState([]);
  const [showToast, setShowToast] = useState(false); // State for toast visibility
  const [toastMessage, setToastMessage] = useState(''); // State for toast message
  const navigate = useNavigate(); // Initialize useNavigate

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     try {
  //       const response = await fetch(`${baseurl}/getalluser`); // API endpoint to get all users
  //       const data = await response.json();
  //       setUsers(data.Data); // Update state with fetched data
  //     } catch (error) {
  //       console.error('Error fetching users:', error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  const [filter, setFilter] = useState("active"); // default filter

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let url = `${baseurl}/getalluser`;

        // append query param based on filter
        if (filter !== "all") {
          url += `?status=${filter}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setUsers(data.Data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [filter]);

  // Function to handle user deletion
  const handleDeleteUser = async (userId) => {
    try {
      const response = await fetch(`${baseurl}/deleteUser`, {
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

  // Function to handle navigation to the EditUser page
  const handleEditUser = (userId) => {
    navigate(`/editUser/${userId}`); // Navigate to the editUser page with the userId
  };

  return (
    <>
      <h3>All User List</h3>
      <div className="d-flex justify-content-end mb-3">
        <button
          type="button"
          className="btn me-2"
          style={{
            background: "linear-gradient(to bottom, #1e3c72, #2a5298)", // adjust colors
            color: "white",

          }}
          onClick={() => navigate("/create-user")}
        >
          Create New User
          {/* <NavLink to="/create-user">Create New User</NavLink> */}

        </button>
        <button
          type="button"
          className="btn btn-secondary"
          style={{
            background: "linear-gradient(to bottom, #304366ff, #5172aaff)", // adjust colors
            color: "white",
          }}
          onClick={() => navigate("/unlock-user")}
        >
          Unlock User
        </button>
      </div>
      <div className='container'>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Sr.No</th>
              <th scope="col">User ID</th>
              <th scope="col">Name</th>
              <th scope="col">Role</th>
              <th scope="col">Reporting To</th>
              <th scope="col">Department</th>
              <th scope="col" className="position-relative">
                <div className="d-flex align-items-center">
                  Status
                  <div className="dropdown ms-1">
                    <button
                      className="btn btn-sm btn-light dropdown-toggle p-0 border-0 bg-transparent"
                      type="button"
                      id="statusDropdown"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bi bi-caret-down-fill"></i> {/* Bootstrap Icon */}
                    </button>
                    <ul className="dropdown-menu" aria-labelledby="statusDropdown">
                      <li>
                        <button className="dropdown-item" onClick={() => setFilter("active")}>
                          Active
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => setFilter("inactive")}
                        >
                          Inactive
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={() => setFilter("all")}>
                          All
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </th>

              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user,index) => (
              <tr key={user._id}>
                <td>{index + 1}</td>
                <td>{user.userId || 'N/A'}</td>
                <td>{user.name}</td>
                <td style={{ textTransform: 'capitalize' }}>{user.role}</td>
                <td>{user.reportingTo || 'N/A'}</td>
                <td>
                  {user.department && user.department.length > 0
                    ? user.department.join(', ')
                    : 'N/A'}
                </td>
                <td style={{ textTransform: 'capitalize' }}>{user.status}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleEditUser(user.userId)} // Navigate on click
                  />
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
