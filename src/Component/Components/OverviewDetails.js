// import React, { useState } from 'react';
// import axios from 'axios';
// const baseurl = process.env.REACT_APP_API_BASE_URL;

// const OverviewDetails = () => {
//   const [mobileNumber, setMobileNumber] = useState('');
//   const [formData, setFormData] = useState({
//     customerName: '',
//     loan_bank_name: '',
//     previousLoanType: '',
//     previousProductModel: '',
//     loan_amount: '',
//     previousLoanSanctionDate: '',
//     previousLoanInsuranceValue: '',
//   });

//   // Handler functions
//   const handleMobileNumberChange = (e) => {
//     setMobileNumber(e.target.value);
//   };

//   const handleMobileNumberBlur = () => {
//     if (mobileNumber) {
//       fetchFileData(mobileNumber);
//     }
//   };

//   const handleMobileNumberEnter = (e) => {
//     if (e.key === 'Enter') {
//       fetchFileData(mobileNumber);
//     }
//   };

//   // Fetch API data
//   const fetchFileData = async (mobileNumber) => {
//     try {
//       const response = await axios.get(`https://jbjcsdashboard-backend.onrender.com/api/v1/getfiledata/${mobileNumber}`);
//       const data = response.data;

//       // Map the API data to form fields
//       setFormData({
//         customerName: data.customer_name || '',
//         loan_bank_name: data.previous_loan_bank_name || '',
//         previousLoanType: data.previous_loan_type || '',
//         previousProductModel: data.previous_product_model || '',
//         loan_amount: data.previous_loan_amount || '',
//         previousLoanSanctionDate: data.previous_loan_sanction_date || '',
//         previousLoanInsuranceValue: data.previous_loan_insurance_value || '',
//       });
//     } catch (error) {
//       console.error('Error fetching file data:', error);
//     }
//   };

//   return (
//     <>
//       <div className="tab-pane active">
//         <form className='mb-5'>
//           <div className="mb-3 row">
//             {/* Mobile Number */}
//             <div className="col-md-6">
//               <label htmlFor="customerNumber" className="form-label fw-bold">Mobile Number</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="customerNumber"
//                 placeholder="Enter mobile number"
//                 value={mobileNumber}
//                 onChange={handleMobileNumberChange}
//                 onBlur={handleMobileNumberBlur}
//                 onKeyDown={handleMobileNumberEnter} // Trigger fetch on "Enter" key
//               />
//             </div>

//             {/* Name */}
//             <div className="col-md-6">
//               <label htmlFor="name" className="form-label fw-bold">Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="name"
//                 placeholder="Enter name"
//                 value={formData.customerName}
//                 onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
//               />
//             </div>

//             {/* Previous Loan Bank Name */}
//             <div className="col-md-6">
//               <label htmlFor="loan_bank_name" className="form-label fw-bold">Previous Loan Bank Name</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="loan_bank_name"
//                 placeholder="Enter previous loan bank name"
//                 value={formData.loan_bank_name}
//                 onChange={(e) => setFormData({ ...formData, loan_bank_name: e.target.value })}
//               />
//             </div>

//             {/* Previous Loan Type */}
//             <div className="col-md-6">
//               <label htmlFor="previousLoanType" className="form-label fw-bold">Previous Loan Type</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="previousLoanType"
//                 placeholder="Enter previous loan type"
//                 value={formData.previousLoanType}
//                 onChange={(e) => setFormData({ ...formData, previousLoanType: e.target.value })}
//               />
//             </div>

//             {/* Previous Product Model */}
//             <div className="col-md-6">
//               <label htmlFor="previousProductModel" className="form-label fw-bold">Previous Product Model</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="previousProductModel"
//                 placeholder="Enter previous product model"
//                 value={formData.previousProductModel}
//                 onChange={(e) => setFormData({ ...formData, previousProductModel: e.target.value })}
//               />
//             </div>

//             {/* Previous Loan Amount */}
//             <div className="col-md-6">
//               <label htmlFor="loan_amount" className="form-label fw-bold">Previous Loan Amount</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="loan_amount"
//                 placeholder="Enter previous loan amount"
//                 value={formData.loan_amount}
//                 onChange={(e) => setFormData({ ...formData, loan_amount: e.target.value })}
//               />
//             </div>

//             {/* Previous Loan Sanction Date */}
//             <div className="col-md-6">
//               <label htmlFor="previousLoanSanctionDate" className="form-label fw-bold">Previous Loan Sanction Date</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="previousLoanSanctionDate"
//                 placeholder="Enter previous loan sanction date"
//                 value={formData.previousLoanSanctionDate}
//                 onChange={(e) => setFormData({ ...formData, previousLoanSanctionDate: e.target.value })}
//               />
//             </div>

//             {/* Previous Loan Insurance Value */}
//             <div className="col-md-6">
//               <label htmlFor="previousLoanInsuranceValue" className="form-label fw-bold">Previous Loan Insurance Value</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="previousLoanInsuranceValue"
//                 placeholder="Enter previous loan insurance value"
//                 value={formData.previousLoanInsuranceValue}
//                 onChange={(e) => setFormData({ ...formData, previousLoanInsuranceValue: e.target.value })}
//               />
//             </div>
//           </div>
//         </form>

//         {/* File Disposition History */}
//         <div>
//           <h3>File Disposition History</h3>
//           <table className="table">
//             <thead>
//               <tr>
//                 <th scope="col">Date</th>
//                 <th scope="col">User Name</th>
//                 <th scope="col">Loan Type</th>
//                 <th scope="col">Category</th>
//                 <th scope="col">Disposition</th>
//                 <th scope="col">Remark</th>
//               </tr>
//             </thead>
//             <tbody>
//               {/* Replace this section with dynamic data */}
//               <tr>
//                 <th scope="row">1</th>
//                 <td>Mark</td>
//                 <td>Home Loan</td>
//                 <td>@mdo</td>
//               </tr>
//               <tr>
//                 <th scope="row">2</th>
//                 <td>Jacob</td>
//                 <td>Auto Loan</td>
//                 <td>@fat</td>
//               </tr>
//               <tr>
//                 <th scope="row">3</th>
//                 <td colspan="2">Larry the Bird</td>
//                 <td>@twitter</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// };

// export default OverviewDetails;


import React, { useEffect, useState } from 'react';
import { useOverview } from '../ContentHook/OverviewContext';
import {Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons'; // Import the correct icon
const OverviewDetails = () => {
  const { mobileNumber, setMobileNumber, formData, setFormData, fetchFileData  } = useOverview();

 
  const baseurl = process.env.REACT_APP_API_BASE_URL;


  // Handler functions
  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  const handleMobileNumberBlur = () => {
    if (mobileNumber) {
      fetchFileData(mobileNumber);
    }
  };

  const handleMobileNumberEnter = (e) => {
    if (e.key === 'Enter') {
      fetchFileData(mobileNumber);
    }
  };

  const [dispositionData, setDispositionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Function to fetch data from the API
    const fetchDispositionData = async () => {
      try {
        const response = await fetch(`${baseurl}/getdesposition/${formData.file_number}`);
        const result = await response.json();
        
        if (response.ok) {
          setDispositionData(result.data);  // Assuming the data is in the 'data' field
        } else {
          setError('Error fetching data');
        }
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };

    fetchDispositionData();
  }, [formData.file_number]);

  if (loading) return <div className="spinner-grow text-light" role="status">
  <span className="visually-hidden">Loading...</span>
</div>;
  // if (error) return <div>{error}</div>;
  return (
    <>
      <div className="tab-pane active">
        <form className='mb-5'>
          <div className="mb-3 row">
            {/* Mobile Number */}
            <div className="col-md-6">
              <label htmlFor="customerNumber" className="form-label fw-bold">Mobile Number</label>
              <input
                type="text"
                className="form-control"
                id="customerNumber"
                placeholder="Enter mobile number"
                value={mobileNumber}
                onChange={handleMobileNumberChange}
                onBlur={handleMobileNumberBlur}
                onKeyDown={handleMobileNumberEnter} // Trigger fetch on "Enter" key
              />
            </div>
           
            {/* Name */}
            <div className="col-md-6">
              <label htmlFor="name" className="form-label fw-bold">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter name"
                value={formData.customerName}
                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
              />
            </div>

            {/* Previous Loan Bank Name */}
            <div className="col-md-6">
              <label htmlFor="loan_bank_name" className="form-label fw-bold">Previous Loan Bank Name</label>
              <input
                type="text"
                className="form-control"
                id="loan_bank_name"
                placeholder="Enter previous loan bank name"
                value={formData.loan_bank_name}
                onChange={(e) => setFormData({ ...formData, loan_bank_name: e.target.value })}
              />
            </div>

            {/* Previous Loan Type */}
            <div className="col-md-6">
              <label htmlFor="previousLoanType" className="form-label fw-bold">Previous Loan Type</label>
              <input
                type="text"
                className="form-control"
                id="previousLoanType"
                placeholder="Enter previous loan type"
                value={formData.previousLoanType}
                onChange={(e) => setFormData({ ...formData, previousLoanType: e.target.value })}
              />
            </div>

            {/* Previous Product Model */}
            <div className="col-md-6">
              <label htmlFor="previousProductModel" className="form-label fw-bold">Previous Product Model</label>
              <input
                type="text"
                className="form-control"
                id="previousProductModel"
                placeholder="Enter previous product model"
                value={formData.previousProductModel}
                onChange={(e) => setFormData({ ...formData, previousProductModel: e.target.value })}
              />
            </div>

            {/* Previous Loan Amount */}
            <div className="col-md-6">
              <label htmlFor="loan_amount" className="form-label fw-bold">Previous Loan Amount</label>
              <input
                type="text"
                className="form-control"
                id="loan_amount"
                placeholder="Enter previous loan amount"
                value={formData.loan_amount}
                onChange={(e) => setFormData({ ...formData, loan_amount: e.target.value })}
              />
            </div>

            {/* Previous Loan Sanction Date */}
            <div className="col-md-6">
              <label htmlFor="previousLoanSanctionDate" className="form-label fw-bold">Previous Loan Sanction Date</label>
              <input
                type="text"
                className="form-control"
                id="previousLoanSanctionDate"
                placeholder="Enter previous loan sanction date"
                value={formData.previousLoanSanctionDate}
                onChange={(e) => setFormData({ ...formData, previousLoanSanctionDate: e.target.value })}
              />
            </div>

            {/* Previous Loan Insurance Value */}
            <div className="col-md-6">
              <label htmlFor="previousLoanInsuranceValue" className="form-label fw-bold">Previous Loan Insurance Value</label>
              <input
                type="text"
                className="form-control"
                id="previousLoanInsuranceValue"
                placeholder="Enter previous loan insurance value"
                value={formData.previousLoanInsuranceValue}
                onChange={(e) => setFormData({ ...formData, previousLoanInsuranceValue: e.target.value })}
              />
            </div>
          </div>
        </form>

        {/* File Disposition History */}
        <div>
      <h3>File Disposition History</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">User Name</th>
            <th scope="col">Status</th>
            <th scope="col">Disposition</th>
            <th scope="col">Sub Disposition</th>
            <th scope="col">Remark</th>
            <th scope="col" className='text-center'>View Deatils</th>
          </tr>
        </thead>
        <tbody>
          {dispositionData.length > 0 ? (
            dispositionData.map((item, index) => (
              <tr key={item._id}>
                <td>{item.createdat}</td>
                <td>{item.username}</td>
                <td>{item.call_status}</td>
                <td>{item.is_interested}</td>
                <td>{item.disposition}</td>
                <td>{item.remarks || "No Remark"}</td>
                <td className="text-center">
                  <Link to="/view-disposition">
                    {/* Font Awesome Eye Icon */}
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
      </div>
    </>
  );
};

export default OverviewDetails;
