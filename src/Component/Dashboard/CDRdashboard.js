import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import Navbar from "../Navbar/Navbar"; // Uncomment if you want to use Navbar

const CDRdashboard = () => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dashboardData, setDashboardData] = useState({
    cdrCompleted: 0,
    cdrPending: 0,
    cdrRejected: 0,
    bankloginCompleted: 0,
    bankloginPending: 0,
    bankloginRejected: 0,
    username:"Back"
  });
  const userId = localStorage.getItem('userId'); 
  const baseurl = process.env.REACT_APP_API_BASE_URL;

  // Function to fetch data from API
  const fetchData = async (start, end) => {
    try {
      const response = await axios.get(`${baseurl}/getCdrDocumentsCountByUserId/${userId}?startDate=${start}&endDate=${end}`);
      const data = response.data;
      setDashboardData({
        cdrCompleted: data.cdrCompleted || 0,
        cdrPending: data.cdrPending || 0,
        cdrRejected: data.cdrRejected || 0,
        bankloginCompleted: data.bankloginCompleted || 0,
        bankloginPending: data.bankloginPending || 0,
        bankloginRejected: data.bankloginRejected || 0,
        username:data.username || "Back",
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
      {/* <p>Welcome back Admin</p> Uncomment if you want to show a welcome message */}
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
                <h5 className="card-title">Pending CDR</h5>
                <p > Count: {dashboardData.cdrPending}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Completed CDR</h5>
                <p > Count: {dashboardData.cdrCompleted}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Rejected CDR</h5>
                <p > Count: {dashboardData.cdrRejected}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Bank logged-in</h5>
                <p > Count: {dashboardData.bankloginPending}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Approved Bank logged-in</h5>
                <p > Count: {dashboardData.bankloginCompleted}</p>
              </div>
            </div>
          </div>
          <div className="col-sm-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Rejected Bank logged-in</h5>
                <p > Count: {dashboardData.bankloginRejected}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CDRdashboard;
