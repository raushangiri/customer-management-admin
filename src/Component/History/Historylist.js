// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const History = () => {
//   const [loanFiles, setLoanFiles] = useState([]);

//   // Fetch loan file data from the API
//   const fetchLoanFiles = async () => {
//     try {
//       const response = await axios.get('http://localhost:3007/api/v1/loanFiles'); // Replace with actual API
//       setLoanFiles(response.data);  // Assuming the API returns an array of loan files
//     } catch (error) {
//       console.error('Error fetching loan file data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchLoanFiles();
//   }, []);

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Loan Files History</h2>
//       {loanFiles.length > 0 ? (
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th scope="col">#</th>
//               <th scope="col">Customer Name</th>
//               <th scope="col">Mobile Number</th>
//               <th scope="col">Loan Type</th>
//               <th scope="col">File Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loanFiles.map((loanFile, index) => (
//               <tr key={loanFile._id}>
//                 <th scope="row">{index + 1}</th>
//                 <td>{loanFile.customer_name}</td>
//                 <td>{loanFile.customer_mobile_number}</td>
//                 <td>{loanFile.loan_type}</td>
//                 <td>{loanFile.file_status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div className="alert alert-info" role="alert">
//           No loan files available.
//         </div>
//       )}
//     </div>
//   );
// };

// export default History;
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye } from '@fortawesome/free-solid-svg-icons';

// const History = () => {
//   const [loanFiles, setLoanFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const baseurl = process.env.REACT_APP_API_BASE_URL;
//   const userId = localStorage.getItem('userId');

//   // Fetch loan files when the component mounts
//   useEffect(() => {
//     const fetchLoanFiles = async () => {
//       try {
//         const response = await axios.get(`${baseurl}/getSalesTeamLoanFiles/${userId}`);
//         if (response.data && response.data.status === 200 && response.data.data) {
//           setLoanFiles(response.data.data); // Update state with the `data` array from the response
//         } else {
//           setError('No loan files found.');
//         }
//       } catch (err) {
//         setError('Failed to fetch loan files.');
//       } finally {
//         setLoading(false); // Stop loading after the request is complete
//       }
//     };

//     fetchLoanFiles();
//   }, [userId, baseurl]);

//   if (loading) {
//     return <div className="container mt-4">Loading loan files...</div>;
//   }

//   if (error) {
//     return <div className="container mt-4 alert alert-danger">{error}</div>;
//   }

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Loan Files History</h2>
//       {loanFiles.length > 0 ? (
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th scope="col">#</th>
//               <th scope="col">File Number</th>
//               <th scope="col">Customer Name</th>
//               <th scope="col">Mobile Number</th>
//               <th scope="col">Sales Status</th>
//               <th scope="col">File Status</th>
//               <th scope="col" className="text-center">View Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loanFiles.map((loanFile, index) => (
//               <tr key={loanFile._id}>
//                 <th scope="row">{index + 1}</th>
//                 <td>{loanFile.file_number}</td>
//                 <td>{loanFile.customer_name}</td>
//                 <td>{loanFile.customer_mobile_number}</td>
//                 <td>{loanFile.sales_status}</td>
//                 <td>{loanFile.file_status}</td>
//                 <td className="text-center">
//                   <Link to={`/view-filedetails/${loanFile.file_number}`}>
//                     <FontAwesomeIcon icon={faEye} />
//                   </Link>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div className="alert alert-info" role="alert">
//           No loan files available.
//         </div>
//       )}
//     </div>
//   );
// };

// export default History;

//////////////////////////Updated file history/////////////////////////////////
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye } from '@fortawesome/free-solid-svg-icons'; // Import the correct icon
// const History = () => {
//   const [loanFiles, setLoanFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const baseurl = process.env.REACT_APP_API_BASE_URL;
//   const userId = localStorage.getItem('userId');
//   const userRole = localStorage.getItem('userRole');

//   // Fetch loan files when the component mounts
//   useEffect(() => {
//     const fetchLoanFiles = async () => {
//       try {
//         const response = await axios.get(`${baseurl}/getLoanFilesByUserId/${userId}`);
//         if (response.data.success) {
//           setLoanFiles(response.data.data); // Update state with loan files
//         } else {
//           setError('No loan files found.');
//         }
//       } catch (err) {
//         setError('Failed to fetch loan files.');
//       } finally {
//         setLoading(false); // Stop loading after the request is complete
//       }
//     };

//     fetchLoanFiles();
//   }, [userId]);

//   if (loading) {
//     return <div className="container mt-4">Loading loan files...</div>;
//   }

//   if (error) {
//     return <div className="container mt-4 alert alert-danger">{error}</div>;
//   }

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Loan Files History</h2>
//       {loanFiles.length > 0 ? (
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th scope="col">#</th>
//               <th scope="col">Date</th>
//               {userRole==="admin"
//               &&(
//                 <>
//                 {/* <th scope="col">Team Leader</th> */}
//                 <th scope="col">Sales Agent Name</th>
//                 </>
//               )
//               }
//               <th scope="col">Customer Name</th>
//               <th scope="col">Mobile Number</th>
//               <th scope="col">Loan Type</th>
//               <th scope="col">File Status</th>
//               <th scope="col"className="text-center">View Deatils</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loanFiles.map((loanFile, index) => (
//               <tr key={loanFile._id}>
//                 <th scope="row">{index + 1}</th>
//                 <td>
//                   {loanFile.sales_assign_date && (
//                     <>
//                    {new Date(loanFile.sales_assign_date).toLocaleDateString('en-GB')}<br />
//                    {new Date(loanFile.sales_assign_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
//                    </>
//                 )
//                   }
//                 </td>
//                 {userRole==="admin"
//               &&(
//                 <>
//                 {/* <td >Team Leader</td> */}
//                 <td >{loanFile.sales_agent_name}</td>
//                 </>
//               )
//               }
//                 <td>{loanFile.customer_name}</td>
//                 <td>{loanFile.customer_mobile_number}</td>
//                 <td>{loanFile.type_of_loan}</td>
//                 <td>{loanFile.file_status}</td>
//                 <td className="text-center">
//                   <Link to={`/view-filedetails/${loanFile.file_number}`}>
//                     <FontAwesomeIcon icon={faEye} />
//                   </Link>
//                 </td>

//                 {/* <td><Link to={`/view-filedetails/${loanFile._id}`}>View Details</Link></td> */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <div className="alert alert-info" role="alert">
//           No loan files available.
//         </div>
//       )}
//     </div>
//   );
// };

// export default History;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons'; // Import the correct icon

const History = () => {
  const [loanFiles, setLoanFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredFiles, setFilteredFiles] = useState([]);
  const [filterDate, setFilterDate] = useState('');
  const [filterAgent, setFilterAgent] = useState('');
  const [filterTL, setFilterTL] = useState('');

  const baseurl = process.env.REACT_APP_API_BASE_URL;
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');

  // Fetch loan files when the component mounts
  useEffect(() => {
    const fetchLoanFiles = async () => {
      try {
        const response = await axios.get(`${baseurl}/getLoanFilesByUserId/${userId}`);
        if (response.data.success) {
          setLoanFiles(response.data.data); // Update state with loan files
          setFilteredFiles(response.data.data); // Initially set filtered files to all files
        } else {
          setError('No loan files found.');
        }
      } catch (err) {
        setError('Failed to fetch loan files.');
      } finally {
        setLoading(false); // Stop loading after the request is complete
      }
    };

    fetchLoanFiles();
  }, [userId]);

  // Function to handle filtering by date and agent name
  useEffect(() => {
    let filtered = loanFiles;

    // Filter by date if a filter date is selected
    if (filterDate) {
      filtered = filtered.filter(loanFile => {
        const assignDate = new Date(loanFile.sales_assign_date).toISOString().split('T')[0]; // Extract only the YYYY-MM-DD part
        return assignDate === filterDate; // Make sure filterDate is also in YYYY-MM-DD format
      });
    }

    // Filter by sales agent name if entered
    if (filterAgent) {
      filtered = filtered.filter(loanFile => loanFile.sales_agent_name?.toLowerCase().includes(filterAgent.toLowerCase()));
    }

    if (filterTL) {
      filtered = filtered.filter(loanFile => loanFile.teamleadername?.toLowerCase().includes(filterTL.toLowerCase()));
    }

    setFilteredFiles(filtered);
  }, [filterDate, filterAgent, loanFiles,filterTL]);

  if (loading) {
    return <div className="container mt-4">Loading loan files...</div>;
  }

  if (error) {
    return <div className="container mt-4 alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Loan Files History</h2>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-4">
          <label htmlFor="filterDate">Filter by Date:</label>
          <input
            type="date"
            className="form-control"
            id="filterDate"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />
        </div>

        {userRole === "admin" && (
          <>
          <div className="col-md-4">
            <label htmlFor="filterTL">Filter by Team Leader Name:</label>
            <input
              type="text"
              className="form-control"
              id="filterTL"
              placeholder="Enter Team Leader Name"
              value={filterTL}
              onChange={(e) => setFilterTL(e.target.value)}
            />
          </div>
          <div className="col-md-4">
          <label htmlFor="filterAgent">Filter by Sales Agent Name:</label>
          <input
            type="text"
            className="form-control"
            id="filterAgent"
            placeholder="Enter sales agent name"
            value={filterAgent}
            onChange={(e) => setFilterAgent(e.target.value)}
          />
        </div>
        </>
        )}
      </div>

      {/* Table */}
      {filteredFiles.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              {userRole === "admin" && (
                <>
                <th scope="col">TL Name</th>
                  <th scope="col">Agent Name</th>
                </>
              )}
              <th scope="col">Customer Name</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Loan Type</th>
              <th scope="col">File Status</th>
              <th scope="col" className="text-center">View Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredFiles.map((loanFile, index) => (
              <tr key={loanFile._id}>
                <th scope="row">{index + 1}</th>
                <td>
                  {loanFile.sales_assign_date && (
                    <>
                      {new Date(loanFile.sales_assign_date).toLocaleDateString('en-GB')}<br />
                      {new Date(loanFile.sales_assign_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </>
                  )}
                </td>
                {userRole === "admin" && (
                  <>
                  <td>{loanFile.teamleadername}</td>
                  <td>{loanFile.sales_agent_name}</td>
                  
                  </>
                )}
                <td>{loanFile.customer_name}</td>
                <td>{loanFile.customer_mobile_number}</td>
                <td>{loanFile.type_of_loan}</td>
                <td>{loanFile.file_status}</td>
                <td className="text-center">
                  <Link to={`/view-filedetails/${loanFile.file_number}`}>
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="alert alert-info" role="alert">
          No loan files available.
        </div>
      )}
    </div>
  );
};

export default History;
