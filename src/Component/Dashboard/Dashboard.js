import React, { useEffect, useState } from 'react';
import axios from 'axios';



const Dashboard = () => {


  const [dashboardData, setDashboardData] = useState({
    loanFileCount:0,
    interestedCount: 0,
    notInterestedCount: 0,
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
          const response = await axios.get(`${baseurl}/admindashboardcount`);
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
   
    <p>Welcome back Admin</p>
    <div className="row">
    <div className="col-sm-4 mb-3 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">MTD- Total File uploaded</h5>
        <p>Total Count: {dashboardData.loanFileCount} </p>
        <p> Total Amount: </p>
      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">MTD- Total Intrested</h5>
        <p>Total Count: {dashboardData.interestedCount}</p>
        <p> Total Amount: </p>
      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">MTD- Total Not-Intrested</h5>
        <p>Total Count: {dashboardData.notInterestedCount}</p>
        <p> Total Amount: </p>
      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">MTD-Total Pending TVR</h5>
        <p>Total Count: {dashboardData.tvrPending}</p>
        <p> Total Amount: </p>

      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">MTD-Total Completed TVR</h5>
        <p>Total Count: {dashboardData.tvrCompleted}</p>
        <p> Total Amount: </p>

      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">MTD-Total Rejected TVR</h5>
        <p>Total Count: {dashboardData.tvrRejected}</p>
        <p> Total Amount: </p>

      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">MTD-Total Pending CDR</h5>
        <p>Total Count: {dashboardData.cdrPending}</p>
        <p> Total Amount: </p>

      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">MTD-Total Completed CDR</h5>
        <p>Total Count: {dashboardData.cdrCompleted}</p>
        <p> Total Amount: </p>

      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">MTD-Total Rejected CDR</h5>
        <p>Total Count: {dashboardData.cdrRejected}</p>
        <p> Total Amount: </p>

      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">MTD-Total Bank logged-in</h5>
        <p>Total Count: {dashboardData.bankloginCompleted}</p>
        <p> Total Amount: </p>

      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">MTD-Total Approved Bank logged-in</h5>
        <p>Total Count: </p>
        <p> Total Amount: </p>

      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">MTD-Total Rejected Bank logged-in</h5>
        <p>Total Count: {dashboardData.bankloginRejected}</p>
        <p> Total Amount: </p>

      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">MTD-Total File Completed</h5>
        <p>Total Count: </p>
        <p> Total Amount: </p>
      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">MTD-Total File Rejected</h5>
        <p>Total Count: </p>
        <p> Total Amount: </p>
      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">MTD-Total Disbursal File</h5>
        <p>Total Count: </p>
        <p> Total Amount: </p>
      </div>
    </div>
  </div>
</div>
    
    </>
  )
}

export default Dashboard