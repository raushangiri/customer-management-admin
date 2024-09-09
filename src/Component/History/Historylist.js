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
import React from 'react';
import { Link } from 'react-router-dom';

const History = () => {
  // Sample loan file data
  const loanFiles = [
    {
      _id: '1',
      customer_name: 'John Doe',
      customer_mobile_number: '9876543210',
      loan_type: 'Auto Loan',
      file_status: 'Approved'
    },
    {
      _id: '2',
      customer_name: 'Jane Smith',
      customer_mobile_number: '9123456780',
      loan_type: 'Home Loan',
      file_status: 'Pending'
    },
    {
      _id: '3',
      customer_name: 'Alex Johnson',
      customer_mobile_number: '9987654321',
      loan_type: 'Personal Loan',
      file_status: 'Rejected'
    }
  ];

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
                <td><Link to={`/view-filedetails/${loanFile._id}`}>View Details</Link></td>
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
