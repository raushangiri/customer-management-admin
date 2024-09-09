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

const ViewFileDetails = () => {
  const { id } = useParams(); // Get the loan file ID from the URL
  const [loanFile, setLoanFile] = useState(null);

  // Sample static data for loan files
  const sampleLoanFiles = [
    {
      _id: '1',
      customer_name: 'John Doe',
      customer_mobile_number: '9876543210',
      loan_type: 'Auto Loan',
      file_status: 'Approved',
      tvr_agent_id: 'TVR001',
      tvr_agent_name: 'Agent A',
      tvr_status: 'Verified',
      cdr_agent_id: 'CDR001',
      cdr_agent_name: 'Agent B',
      cdr_status: 'Cleared',
      bank_login_agent_id: 'BL001',
      bank_login_agent_name: 'Agent C',
      bank_name: 'IDFC FIRST BANK',
      bank_login_status: 'Approved'
    },
    {
      _id: '2',
      customer_name: 'Jane Smith',
      customer_mobile_number: '9123456780',
      loan_type: 'Home Loan',
      file_status: 'Pending',
      tvr_agent_id: 'TVR002',
      tvr_agent_name: 'Agent D',
      tvr_status: 'Pending',
      cdr_agent_id: 'CDR002',
      cdr_agent_name: 'Agent E',
      cdr_status: 'Pending',
      bank_login_agent_id: 'BL002',
      bank_login_agent_name: 'Agent F',
      bank_name: 'HDFC Bank',
      bank_login_status: 'Pending'
    },
    {
      _id: '3',
      customer_name: 'Alex Johnson',
      customer_mobile_number: '9987654321',
      loan_type: 'Personal Loan',
      file_status: 'Rejected',
      tvr_agent_id: 'TVR003',
      tvr_agent_name: 'Agent G',
      tvr_status: 'Rejected',
      cdr_agent_id: 'CDR003',
      cdr_agent_name: 'Agent H',
      cdr_status: 'Rejected',
      bank_login_agent_id: 'BL003',
      bank_login_agent_name: 'Agent I',
      bank_name: 'SBI',
      bank_login_status: 'Rejected'
    }
  ];

  useEffect(() => {
    // Fetch loan file details from static data instead of API
    const loanFileData = sampleLoanFiles.find(file => file._id === id);
    setLoanFile(loanFileData);
  }, [id]);

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
