import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Sales_dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalInterested: 0,
    totalNotInterested: 0,
    totalPendingTVR: 0,
    totalCompletedTVR: 0,
    totalRejectedTVR: 0,
    totalPendingCDR: 0,
    totalCompletedCDR: 0,
    totalRejectedCDR: 0,
    totalBankLoggedIn: 0,
    totalApprovedBankLoggedIn: 0,
    totalRejectedBankLoggedIn: 0
  });
  const baseurl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    // Function to fetch data from the API
    const fetchDashboardData = async () => {
      try {
        const userId = localStorage.getItem('userId'); // Get userId from localStorage
        if (userId) {
          const response = await axios.get(`${baseurl}/getdashboardcount/${userId}`);
          setDashboardData(response.data);
        } else {
          console.error('User ID not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []); // Empty dependency array means this effect runs once on component mount

  return (
    <>
      {/* <Navbar/> */}
      <p>Welcome {dashboardData.username}</p>
      <div className="row">
        <div className="col-sm-4 mb-3 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">MTD- Total Interested</h5>
              <p>Total Count: {dashboardData.loanFileCount}</p>
              <p> Total Amount: {dashboardData.interestedCount}</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">MTD- Total Not-Interested</h5>
              <p>Total Count: {dashboardData.notInterestedCount}</p>
             <p> Total Amount: {dashboardData.interestedCount}</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">MTD- Total Pending TVR</h5>
              {/* <p className='fs-4'>{dashboardData.totalPendingTVR}</p> */}
              <p>Total Count: {dashboardData.pendingTvrCount}</p>
             <p> Total Amount: {dashboardData.interestedCount}</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">MTD- Total Completed TVR</h5>
              <p>Total Count: {dashboardData.completedtvrcount}</p>
             <p> Total Amount: {dashboardData.interestedCount}</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">MTD- Total Rejected TVR</h5>
              <p className='fs-4'>{dashboardData.totalRejectedTVR}</p>
              <p>Total Count: {dashboardData.notInterestedCount}</p>
             <p> Total Amount: {dashboardData.interestedCount}</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">MTD- Total Pending CDR</h5>
              {/* <p className='fs-4'>{dashboardData.totalPendingCDR}</p> */}
              <p>Total Count: {dashboardData.pendingCdrCount}</p>
             <p> Total Amount: {dashboardData.interestedCount}</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">MTD- Total Completed CDR</h5>
              <p className='fs-4'>{dashboardData.totalCompletedCDR}</p>
              <p>Total Count: {dashboardData.notInterestedCount}</p>
             <p> Total Amount: {dashboardData.interestedCount}</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">MTD- Total Rejected CDR</h5>
              <p className='fs-4'>{dashboardData.totalRejectedCDR}</p>
              <p>Total Count: {dashboardData.notInterestedCount}</p>
             <p> Total Amount: {dashboardData.interestedCount}</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">MTD- Total Bank Logged-in</h5>
              <p className='fs-4'>{dashboardData.totalBankLoggedIn}</p>
              <p>Total Count: {dashboardData.notInterestedCount}</p>
             <p> Total Amount: {dashboardData.interestedCount}</p>
            </div>
          </div>
        </div>
        
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">MTD- Total Rejected Bank Logged-in</h5>
              <p className='fs-4'>{dashboardData.totalRejectedBankLoggedIn}</p>
              <p>Total Count: {dashboardData.notInterestedCount}</p>
             <p> Total Amount: {dashboardData.interestedCount}</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">MTD- Total Approval</h5>
              <p className='fs-4'>{dashboardData.totalRejectedBankLoggedIn}</p>
              <p>Total Count: {dashboardData.notInterestedCount}</p>
             <p> Total Amount: {dashboardData.interestedCount}</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">MTD- Total Disbursed</h5>
              <p className='fs-4'>{dashboardData.totalRejectedBankLoggedIn}</p>
              <p>Total Count: {dashboardData.notInterestedCount}</p>
             <p> Total Amount: {dashboardData.interestedCount}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sales_dashboard;
