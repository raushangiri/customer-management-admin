import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    loanFileCount: 0,
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
    totalRejectedBankLoggedIn: 0,
  });

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const baseurl = process.env.REACT_APP_API_BASE_URL;

  // Function to fetch data from the API
  const fetchDashboardData = async () => {
    try {
      const userId = localStorage.getItem('userId'); // Get userId from localStorage
      if (userId) {
        const response = await axios.get(`${baseurl}/admindashboardcount`, {
          params: {
            startDate,
            endDate,
          },
        });
        setDashboardData(response.data);
      } else {
        console.error('User ID not found in localStorage');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [startDate, endDate]); // Re-fetch data when the date filter changes

  // Handle filter submit
  const handleFilterSubmit = (e) => {
    e.preventDefault();
    fetchDashboardData();
  };

  return (
    <>
      <p>Welcome back Admin</p>

      {/* Date filter form */}
      <form onSubmit={handleFilterSubmit}>
        <div className="row mb-5">
          <div className="col-sm-4">
            <label htmlFor="startDate">Start Date:</label>
            <input
              type="date"
              id="startDate"
              className="form-control"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="col-sm-4">
            <label htmlFor="endDate">End Date:</label>
            <input
              type="date"
              id="endDate"
              className="form-control"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="col-sm-2">
          <button type="submit" className="btn btn-primary form-control mt-4">Apply Filter</button>
          </div>
        </div>
        
      </form>

      <div className="row">
        <div className="col-sm-4 mb-3 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title"> Total File uploaded</h5>
              <p>Total Count: {dashboardData.loanFileCount}</p>
              <p> Total Amount: </p>
            </div>
          </div>
        </div>
  <div className="col-sm-4 mb-3 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title"> Total Intrested</h5>
        <p>Total Count: {dashboardData.interestedCount}</p>
        <p> Total Amount: </p>
      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title"> Total Not-Intrested</h5>
        <p>Total Count: {dashboardData.notInterestedCount}</p>
        <p> Total Amount: </p>
      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Total Pending TVR</h5>
        <p>Total Count: {dashboardData.tvrPending}</p>
        <p> Total Amount: </p>

      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Total Completed TVR</h5>
        <p>Total Count: {dashboardData.tvrCompleted}</p>
        <p> Total Amount: </p>

      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Total Rejected TVR</h5>
        <p>Total Count: {dashboardData.tvrRejected}</p>
        <p> Total Amount: </p>

      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Total Pending CDR</h5>
        <p>Total Count: {dashboardData.cdrPending}</p>
        <p> Total Amount: </p>

      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Total Completed CDR</h5>
        <p>Total Count: {dashboardData.cdrCompleted}</p>
        <p> Total Amount: </p>

      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Total Rejected CDR</h5>
        <p>Total Count: {dashboardData.cdrRejected}</p>
        <p> Total Amount: </p>

      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Total Bank logged-in</h5>
        <p>Total Count: {dashboardData.bankloginCompleted}</p>
        <p> Total Amount: </p>

      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Total Approved Bank logged-in</h5>
        <p>Total Count: </p>
        <p> Total Amount: </p>

      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Total Rejected Bank logged-in</h5>
        <p>Total Count: {dashboardData.bankloginRejected}</p>
        <p> Total Amount: </p>

      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Total File Completed</h5>
        <p>Total Count: </p>
        <p> Total Amount: </p>
      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Total File Rejected</h5>
        <p>Total Count: </p>
        <p> Total Amount: </p>
      </div>
    </div>
  </div>
  <div className="col-sm-4 mb-3">
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Total Disbursal File</h5>
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