import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Teamleader_dashboard = () => {
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
    username:"Back",
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split("T")[0]); // Current date as default
  const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]); // Current date as default
  const baseurl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    // Fetch dashboard data with default current date range
    fetchDashboardData(startDate, endDate);
  }, [startDate, endDate]); // Fetch data when dates change

  const fetchDashboardData = async (start, end) => {
    try {
      const userId = localStorage.getItem('userId');
      if (userId) {
        const response = await axios.get(`${baseurl}/teamleaderdashboardcount/${userId}?startDate=${start}&endDate=${end}`);
        setDashboardData(response.data);
      } else {
        console.error('User ID not found in localStorage');
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  // Function to handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Function to filter the dashboard cards based on search term
  const filterCards = () => {
    const cardData = [
      { title: 'Interested', value: dashboardData.interestedCount },
      { title: 'Not-Interested', value: dashboardData.notInterestedCount },
      { title: 'Pending TVR', value: dashboardData.totalPendingTVR },
      { title: 'Completed TVR', value: dashboardData.totalCompletedTVR },
      { title: 'Rejected TVR', value: dashboardData.totalRejectedTVR },
      { title: 'Pending CDR', value: dashboardData.totalPendingCDR },
      { title: 'Completed CDR', value: dashboardData.totalCompletedCDR },
      { title: 'Rejected CDR', value: dashboardData.totalRejectedCDR },
      { title: 'Bank Logged-in', value: dashboardData.totalBankLoggedIn },
      { title: 'Approved Bank Logged-in', value: dashboardData.totalApprovedBankLoggedIn },
      { title: 'Rejected Bank Logged-in', value: dashboardData.totalRejectedBankLoggedIn },
      // { title: 'File Completed', value: dashboardData.loanFileCount },
      // { title: 'File Rejected', value: dashboardData.loanFileCount },
      // { title: 'Disbursal File', value: dashboardData.loanFileCount }
    ];

    return cardData.filter(card =>
      card.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredCards = filterCards();

  // Function to handle apply button click
  const handleApply = () => {
    fetchDashboardData(startDate, endDate); // Fetch data with selected date range
  };

  return (
    <>
      <h3>Welcome {dashboardData.username}</h3>
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
      <div className="row">
        {filteredCards.map((card, index) => (
          <div className="col-sm-4 mb-3" key={index}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{card.title}</h5>
                <p>Total Count: {card.value || 0}</p>
                <p>Total Amount: </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Teamleader_dashboard;
