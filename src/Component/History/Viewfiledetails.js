// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const ViewFileDetails = () => {
//   const { id } = useParams(); // Get the loan file ID from the URL
//   const [loanFile, setLoanFile] = useState(null);

//   useEffect(() => {
//     // Fetch the loan file details using the ID
//     const fetchLoanFileDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3007/api/v1/loanFiles/${id}`); // Replace with actual API
//         setLoanFile(response.data); // Assuming the API returns the loan file details
//       } catch (error) {
//         console.error('Error fetching loan file details:', error);
//       }
//     };

//     fetchLoanFileDetails();
//   }, [id]);

//   if (!loanFile) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="container mt-4">
//       <h2>Loan File Details</h2>

//       {/* Personal Details */}
//       <section className="mb-4">
//         <h4>Personal Details</h4>
//         <p><strong>Customer Name:</strong> {loanFile.customer_name}</p>
//         <p><strong>Mobile Number:</strong> {loanFile.customer_mobile_number}</p>
//         <p><strong>Loan Type:</strong> {loanFile.loan_type}</p>
//       </section>

//       {/* TVR Section */}
//       <section className="mb-4">
//         <h4>TVR Section</h4>
//         <p><strong>Agent ID:</strong> {loanFile.tvr_agent_id}</p>
//         <p><strong>Agent Name:</strong> {loanFile.tvr_agent_name}</p>
//         <p><strong>TVR Status:</strong> {loanFile.tvr_status}</p>
//       </section>

//       {/* CDR Section */}
//       <section className="mb-4">
//         <h4>CDR Section</h4>
//         <p><strong>Agent ID:</strong> {loanFile.cdr_agent_id}</p>
//         <p><strong>Agent Name:</strong> {loanFile.cdr_agent_name}</p>
//         <p><strong>CDR Status:</strong> {loanFile.cdr_status}</p>
//       </section>

//       {/* Bank Login Section */}
//       <section className="mb-4">
//         <h4>Bank Login Section</h4>
//         <p><strong>Bank Login Agent ID:</strong> {loanFile.bank_login_agent_id}</p>
//         <p><strong>Bank Login Agent Name:</strong> {loanFile.bank_login_agent_name}</p>
//         <p><strong>Bank Name:</strong> {loanFile.bank_name}</p>
//         <p><strong>Bank Login Status:</strong> {loanFile.bank_login_status}</p>
//       </section>
//     </div>
//   );
// };

// export default ViewFileDetails;


import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ViewFileDetails = () => {
  const { file_number } = useParams(); // Get the loan file ID from the URL
  const [loanFile, setLoanFiles] = useState([]);
  const baseurl = process.env.REACT_APP_API_BASE_URL;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchLoanFiles = async () => {
      try {
        const response = await axios.get(`${baseurl}/getLoandetails/${file_number}`);
        if (response.data && response.data.data.length > 0) {
          setLoanFiles(response.data.data[0]); // Access the first element in the array
          // console.log(response.data.data[0].customer_name, "loanFiles");
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
  }, [file_number]);

 

  if (!loanFile) {
    return <div>Loading...</div>;
  }
  return (
    <div className="container mt-4">
      <h2>Loan File Details</h2>

      {/* Personal Details */}
      <section className="mb-4">
        <h4>Personal Details</h4>
        <p><strong>Customer Name:</strong> {loanFile.customer_name}</p>
        <p><strong>Mobile Number:</strong> {loanFile.customer_mobile_number}</p>
        <p><strong>Loan Type:</strong> {loanFile.loan_type}</p>
      </section>

      {/* TVR Section */}
      <section className="mb-4">
        <h4>TVR Section</h4>
        <p><strong>Agent ID:</strong> {loanFile.tvr_agent_id}</p>
        <p><strong>Agent Name:</strong> {loanFile.tvr_agent_name}</p>
        <p><strong>TVR Status:</strong> {loanFile.tvr_status}</p>
      </section>

      {/* CDR Section */}
      <section className="mb-4">
        <h4>CDR Section</h4>
        <p><strong>Agent ID:</strong> {loanFile.cdr_agent_id}</p>
        <p><strong>Agent Name:</strong> {loanFile.cdr_agent_name}</p>
        <p><strong>CDR Status:</strong> {loanFile.cdr_status}</p>
      </section>

      {/* Bank Login Section */}
      <section className="mb-4">
        <h4>Bank Login Section</h4>
        <p><strong>Bank Login Agent ID:</strong> {loanFile.bank_login_agent_id}</p>
        <p><strong>Bank Login Agent Name:</strong> {loanFile.bank_login_agent_name}</p>
        <p><strong>Bank Name:</strong> {loanFile.bank_name}</p>
        <p><strong>Bank Login Status:</strong> {loanFile.bank_login_status}</p>
      </section>
    </div>
  );
};

export default ViewFileDetails;
