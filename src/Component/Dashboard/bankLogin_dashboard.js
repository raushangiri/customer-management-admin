
// import React from 'react'
// import Navbar from "../Navbar/Navbar"
// const Banklogindashboard = () => {
//   return (
//     <>
//     {/* <Navbar/> */}
//     <p>Welcome Back login Team</p>
//     <div className="row">
  
//   <div className="col-sm-4 mb-3">
//     <div className="card">
//       <div className="card-body">
//         <h5 className="card-title">MTD-Total Bank logged-in</h5>
//         <p className='fs-4'>10</p>

//       </div>
//     </div>
//   </div>
//   <div className="col-sm-4 mb-3">
//     <div className="card">
//       <div className="card-body">
//         <h5 className="card-title">MTD-Total Approved Bank logged-in</h5>
//         <p className='fs-4'>10</p>

//       </div>
//     </div>
//   </div>
//   <div className="col-sm-4 mb-3">
//     <div className="card">
//       <div className="card-body">
//         <h5 className="card-title">MTD-Total Rejected Bank logged-in</h5>
//         <p className='fs-4'>10</p>

//       </div>
//     </div>
//   </div>
//   <div className="col-sm-4 mb-3">
//     <div className="card">
//       <div className="card-body">
//         <h5 className="card-title">MTD-Total Loan Approved</h5>
//         <p className='fs-4'>10</p>

//       </div>
//     </div>
//   </div>
//   <div className="col-sm-4 mb-3">
//     <div className="card">
//       <div className="card-body">
//         <h5 className="card-title">MTD-Total Loan Rejected</h5>
//         <p className='fs-4'>10</p>

//       </div>
//     </div>
//   </div>
//   <div className="col-sm-4 mb-3">
//     <div className="card">
//       <div className="card-body">
//         <h5 className="card-title">MTD-Total Disbursal Approved</h5>
//         <p className='fs-4'>10</p>

//       </div>
//     </div>
//   </div>
//   <div className="col-sm-4 mb-3">
//     <div className="card">
//       <div className="card-body">
//         <h5 className="card-title">MTD-Total Disbursal Rejected</h5>
//         <p className='fs-4'>10</p>

//       </div>
//     </div>
//   </div>
// </div>
//     </>
//   )
// }

// export default Banklogindashboard

import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Navbar from "../Navbar/Navbar"; // Uncomment if you want to use Navbar

const Banklogindashboard = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dashboardData, setDashboardData] = useState({
    totalBanklogin: 0,
    totalBankloginApproved: 0,
    totalBankloginRejected: 0,
    totalLoanApproved: 0,
    totalLoanRejected: 0,
    totalDisbursalApproved: 0,
    totalDisbursalRejected: 0,
    username: "Login Team"
  });
  const userId = localStorage.getItem('userId'); 
  const baseurl = process.env.REACT_APP_API_BASE_URL;

  // Function to fetch data from API
  const fetchData = async (start, end) => {
    try {
      const response = await axios.get(`${baseurl}/getBankLoginDataByUserId/${userId}?startDate=${start}&endDate=${end}`);
      const data = response.data;
      setDashboardData({
        totalBanklogin: data.totalBanklogin || 0,
        totalBankloginApproved: data.totalBankloginApproved || 0,
        totalBankloginRejected: data.totalBankloginRejected || 0,
        totalLoanApproved: data.totalLoanApproved || 0,
        totalLoanRejected: data.totalLoanRejected || 0,
        totalDisbursalApproved: data.totalDisbursalApproved || 0,
        totalDisbursalRejected: data.totalDisbursalRejected || 0,
        username: data.username || "Login Team",
      });
    } catch (error) {
      console.error('Error fetching dashboard data', error);
    }
  };

  // Fetch data with current date on initial load
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    setStartDate(today);
    setEndDate(today);
    fetchData(today, today); // Call API with current date
  }, []);

  // Handle Apply button click
  const handleApply = () => {
    const start = startDate || new Date().toISOString().split('T')[0]; // Use selected start date or current date
    const end = endDate || new Date().toISOString().split('T')[0]; // Use selected end date or current date
    fetchData(start, end);
  };

  return (
    <>
      {/* <Navbar /> Uncomment if you want to use Navbar */}
      <div className="container">
        <h2>Welcome {dashboardData.username}</h2>

        {/* Date Selection */}
        <div className="mb-4">
          <div className="row mb-3">
            <div className='col-sm-4'>
              <input 
                type="date" 
                value={startDate} 
                onChange={(e) => setStartDate(e.target.value)} 
                className="form-control" 
                placeholder="Select Start Date" 
              />
            </div>
            <div className='col-sm-4'>
              <input 
                type="date" 
                value={endDate} 
                onChange={(e) => setEndDate(e.target.value)} 
                className="form-control" 
                placeholder="Select End Date" 
              />
            </div>
            <div className='col-sm-4'>
              <button 
                className="btn btn-primary" 
                onClick={handleApply} 
                disabled={!startDate && !endDate}
              >
                Apply
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Cards */}
        <div className="row">
          <div className="col-sm-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">MTD-Total Bank logged-in</h5>
                <p className='fs-4'>Count: {dashboardData.totalBanklogin}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">MTD-Total Approved Bank logged-in</h5>
                <p className='fs-4'>Count: {dashboardData.totalBankloginApproved}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">MTD-Total Rejected Bank logged-in</h5>
                <p className='fs-4'>Count: {dashboardData.totalBankloginRejected}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">MTD-Total Loan Approved</h5>
                <p className='fs-4'>Count: {dashboardData.totalLoanApproved}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">MTD-Total Loan Rejected</h5>
                <p className='fs-4'>Count: {dashboardData.totalLoanRejected}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">MTD-Total Disbursal Approved</h5>
                <p className='fs-4'>Count: {dashboardData.totalDisbursalApproved}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">MTD-Total Disbursal Rejected</h5>
                <p className='fs-4'>Count: {dashboardData.totalDisbursalRejected}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banklogindashboard;
