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
  
  // Set default date to current date
  const getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().substr(0, 10); // Format as YYYY-MM-DD
  };

  const [startDate, setStartDate] = useState(getCurrentDate());
  const [endDate, setEndDate] = useState(getCurrentDate());

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (name === 'startDate') {
      setStartDate(value);
    } else if (name === 'endDate') {
      setEndDate(value);
    }
  };

  const fetchDashboardData = async (useSelectedDates = false) => {
    try {
      const userId = localStorage.getItem('userId'); // Get userId from localStorage
      if (userId) {
        let start = startDate;
        let end = endDate;

        // If no dates are selected, use the current date
        if (!useSelectedDates) {
          start = getCurrentDate();
          end = getCurrentDate();
        }

        const response = await axios.get(
          `${baseurl}/getdashboardcount/${userId}`,
          {
            params: {
              startDate: start,
              endDate: end
            }
          }
        );
        setDashboardData(response.data);
      } else {
        console.error('User ID not found in localStorage');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  // Fetch data with current date when component mounts
  useEffect(() => {
    fetchDashboardData(); // Use current date by default
  }, []); // Empty dependency array ensures this only runs once on mount

  // Handle "Apply" button click
  const handleApply = () => {
    fetchDashboardData(true); // Use selected dates
  };

  return (
    <>
      <p>Welcome {dashboardData.username}</p>
      
      {/* Date filters */}
      <div className="row mb-3">
        <div className="col-sm-4">
          <label>Start Date:</label>
          <input
            type="date"
            name="startDate"
            value={startDate}
            onChange={handleDateChange}
            className="form-control"
          />
        </div>
        <div className="col-sm-4">
          <label>End Date:</label>
          <input
            type="date"
            name="endDate"
            value={endDate}
            onChange={handleDateChange}
            className="form-control"
          />
        </div>
        <div className="col-sm-4 mt-4">
        <button onClick={handleApply} className="btn btn-primary">
          Apply
        </button>
      </div>
      </div>

      {/* Apply button */}
      
      
      <div className="row">
        {/* Cards displaying data */}
        <div className="col-sm-4 mb-3 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Total Interested</h5>
              <p>Total Count: {dashboardData.loanFileCount}</p>
              <p>Total Amount: 0</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title"> Total Not-Interested</h5>
              <p>Total Count: {dashboardData.notInterestedCount}</p>
             <p> Total Amount: 0</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title"> Total Pending TVR</h5>
              <p>Total Count: {dashboardData.tvrPending}</p>
             <p> Total Amount: 0</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title"> Total Completed TVR</h5>
              <p>Total Count: {dashboardData.tvrCompleted}</p>
             <p> Total Amount: 0</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title"> Total Rejected TVR</h5>
              <p>Total Count: {dashboardData.tvrRejected}</p>
             <p> Total Amount: 0</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title"> Total Pending CDR</h5>
              <p>Total Count: {dashboardData.cdrPending}</p>
             <p> Total Amount: 0</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title"> Total Completed CDR</h5>
              <p>Total Count: {dashboardData.cdrCompleted}</p>
             <p> Total Amount: 0</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title"> Total Rejected CDR</h5>
              <p>Total Count: {dashboardData.cdrRejected}</p>
             <p> Total Amount: 0</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title"> Total Pending Bank Log-in</h5>
              <p>Total Count: {dashboardData.bankloginPending}</p>
             <p> Total Amount: 0</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title"> Total Bank Logged-in</h5>
              <p>Total Count: {dashboardData.bankloginCompleted}</p>
             <p> Total Amount: 0</p>
            </div>
          </div>
        </div>
        
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title"> Total Rejected Bank Logged-in</h5>
              <p>Total Count: {dashboardData.bankloginRejected}</p>
             <p> Total Amount: 0</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title"> Total Approval</h5>
              <p>Total Count: </p>
             <p> Total Amount:</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sales_dashboard;
