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
import { useOverview } from '../ContentHook/OverviewContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons'; // Import the correct icon
import { Link } from 'react-router-dom';

const ViewFileDetails = () => {
  const { file_number } = useParams(); // Get the loan file ID from the URL
  const [loanFile, setLoanFiles] = useState(null);
  const baseurl = process.env.REACT_APP_API_BASE_URL;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bankLoginDetails, setBankLoginDetails] = useState([]);
  const userId = localStorage.getItem('userId');


  useEffect(() => {
    const fetchBankLoginDetails = async () => {
        try {
            const response = await axios.get(`${baseurl}/getbanklogindetails/${file_number}`);
            setBankLoginDetails(response.data);
            
        } catch (error) {
            console.error('Error fetching data');
            
        }
    };

    fetchBankLoginDetails();
}, [userId]);

console.log(bankLoginDetails,"bankLoginDetails")


  useEffect(() => {
    const fetchLoanFiles = async () => {
      try {
        const response = await axios.get(`${baseurl}/getLoanfiledetailsbyfilenumber/${file_number}`);
        if (response.data.data) {
          setLoanFiles(response.data.data);
        } else {
          setError('No loan files found.');
        }
      } catch (err) {
        setError('Failed to fetch loan files.');
      } finally {
        setLoading(false);
      }
    };

    fetchLoanFiles();
  }, [file_number]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!loanFile || !loanFile.loanDetails) {
    return <div>No data available</div>;
  }

  return (
    <div className="container mt-4">
      <h2>Loan File Details</h2>

      {/* Personal Details */}
      <section className="mb-4">
        <h4>Personal Details</h4>
        <hr />
        <div className='row md-4'>
          <div className='col-md-6'>
            <p><strong>Customer Name:</strong> {loanFile.loanDetails.customer_name}</p>
          </div>
          <div className='col-md-6'>
            <p><strong>Mobile Number:</strong> {loanFile.loanDetails.customer_mobile_number}</p>
          </div>
          <div className='col-md-6'>
            <p><strong>Loan Type:</strong> {loanFile.type_of_loan}</p>
          </div>
          <div className='col-md-6'>
            <p><strong>Loan Category:</strong> {loanFile.loan_category}</p>
          </div>
        </div>
      </section>

      {/* Sales Agent Section */}
      <section className="mb-4">
        <h4>Sales Agent Section</h4>
        <hr />
        <div className='row md-4'>
          <div className='col-md-6'>
            <p><strong>Sales Agent ID:</strong> {loanFile.loanDetails.sales_agent_id}</p>
          </div>
          <div className='col-md-6'>
            <p><strong>Sales Agent Name:</strong> {loanFile.sales_agent_name}</p>
          </div>
          <div className='col-md-6'>
            <p><strong>Sales Team Status:</strong> {loanFile.loanDetails.sales_status}</p>
          </div>
          <div className='col-md-6'>
            <p><strong>Date:</strong> {loanFile.sales_date}</p>
          </div>
        </div>
      </section>

      {/* TVR Section */}
      <section className="mb-4">
        <h4>TVR Section</h4>
        <hr />
        <div className='row md-4'>
          <div className='col-md-6'>
            <p><strong>Agent ID:</strong> {loanFile.loanDetails.tvr_agent_id}</p>
          </div>
          <div className='col-md-6'>
            <p><strong>Agent Name:</strong> {loanFile.tvr_agent_name}</p>
          </div>
          <div className='col-md-6'>
            <p><strong>TVR Status:</strong> {loanFile.tvr_status}</p>
          </div>
          <div className='col-md-6'>
            <p><strong>Date:</strong> {loanFile.tvr_date}</p>
          </div>
        </div>
      </section>

      {/* CDR Section */}
      <section className="mb-4">
        <h4>CDR Section</h4>
        <hr />
        <div className='row md-4'>
          <div className='col-md-6'>
            <p><strong>CDR Agent ID:</strong> {loanFile.loanDetails.cdr_agent_id}</p>
          </div>
          <div className='col-md-6'>
            <p><strong>CDR Agent Name:</strong> {loanFile.cdr_agent_name}</p>
          </div>
          <div className='col-md-6'>
            <p><strong>CDR Team Status:</strong> {loanFile.cdr_status}</p>
          </div>
          <div className='col-md-6'>
            <p><strong>Date:</strong> {loanFile.cdr_date}</p>
          </div>
        </div>
      </section>

      {/* Bank Login Section */}
      <section className="mb-4">
        <h4>Bank Login Section</h4>
        <hr />
        <div className='row md-4'>
          <div className='col-md-6'>
            <p><strong>Bank Login Agent ID:</strong> {loanFile.bank_login_agent_id}</p>
          </div>
          <div className='col-md-6'>
            <p><strong>Bank Login Agent Name:</strong> {loanFile.banklogin_agent_name}</p>
          </div>
          <table className="table table-striped table-bordered table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>User ID</th>
                        <th>Bank Login Status</th>
                        <th>Loan Type</th>
                        <th>Bank Name</th>
                        <th>RM Name</th>
                        <th>RM Contact Number</th>
                        <th>RM Email</th>
                        <th>Document Status</th>
                        <th>Remarks</th>
                        <th scope="col" className="text-center">View Deatils</th>
                    </tr>
                </thead>
                <tbody>
                    {bankLoginDetails.map((detail) => (
                        <tr key={detail._id}>
                            <td>{detail.userId}</td>
                            <td>{detail.bank_login_status}</td>
                            <td>{detail.loan_type}</td>
                            <td>{detail.bank_name}</td>
                            <td>{detail.rm1_name}</td>
                            <td>{detail.rm1_contact_number}</td>
                            <td>{detail.email_1}</td>
                            

                            <td>{detail.remarks}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </section>
    </div>
  );
};

export default ViewFileDetails;
