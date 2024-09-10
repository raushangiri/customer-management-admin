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
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const History = () => {
  const [loanFiles, setLoanFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseurl = process.env.REACT_APP_API_BASE_URL;
  const userId = localStorage.getItem('userId');

  // Fetch loan files when the component mounts
  useEffect(() => {
    const fetchLoanFiles = async () => {
      try {
        const response = await axios.get(`${baseurl}/getLoanFilesByUserId/${userId}`);
        if (response.data.success) {
          setLoanFiles(response.data.loanFiles); // Update state with loan files
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

  if (loading) {
    return <div className="container mt-4">Loading loan files...</div>;
  }

  if (error) {
    return <div className="container mt-4 alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Loan Files History</h2>
      {loanFiles.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Loan Type</th>
              <th scope="col">File Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {loanFiles.map((loanFile, index) => (
              <tr key={loanFile._id}>
                <th scope="row">{index + 1}</th>
                <td>{loanFile.customer_name}</td>
                <td>{loanFile.customer_mobile_number}</td>
                <td>{loanFile.loan_type}</td>
                <td>{loanFile.file_status}</td>
                <td>View Details</td>

                {/* <td><Link to={`/view-filedetails/${loanFile._id}`}>View Details</Link></td> */}
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

