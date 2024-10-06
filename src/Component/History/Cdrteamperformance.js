import React, { useState, useEffect } from 'react';
import axios from 'axios';


const Cdrteamperformance = () => {
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [selectedTeamLeader, setSelectedTeamLeader] = useState('');
    const [selectedAgent, setSelectedAgent] = useState('');
    const [teamData, setTeamData] = useState([]);
    const [filteredFiles, setFilteredFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filterAgent, setFilterAgent] = useState('');
    const [filterTL, setFilterTL] = useState('');
    const baseurl = process.env.REACT_APP_API_BASE_URL;
  
    // Function to fetch data from API based on filters
    const fetchFilteredData = async () => {
      if (!startDate || !endDate) return;
  
      try {
        setLoading(true);
        const response = await axios.get(`${baseurl}/getcdrperformanceByFilters`, {
          params: {
            startDate,
            endDate,
            teamLeaderName: selectedTeamLeader,
            cdrAgentName: selectedAgent,
          },
        });
        setTeamData(response.data.data || []);
        setFilteredFiles(response.data.data || []); // Initialize filteredFiles with fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
        setTeamData([]);
        setFilteredFiles([]); // Clear filtered data on error
      } finally {
        setLoading(false);
      }
    };
  
    // Filtering based on user input
    useEffect(() => {
      let filtered = teamData;
  
      if (filterAgent) {
        filtered = filtered.filter(data =>
          data.tvr_agent_name?.toLowerCase().includes(filterAgent.toLowerCase())
        );
      }
  
      if (filterTL) {
        filtered = filtered.filter(data =>
          data.teamLeaderName?.toLowerCase().includes(filterTL.toLowerCase())
        );
      }
  
      setFilteredFiles(filtered);
    }, [filterAgent, filterTL, teamData]);
  
    // Function to download CSV
    const downloadCSV = () => {
      const csvHeaders = [
        'Date',
        'Team Leader',
        'CDR Agent',
        'CDR Pending',
        'CDR Completed',
        'Bank Login',
      ];
  
      const csvRows = filteredFiles.map(file => [
        new Date(file.date).toLocaleDateString('en-GB'),
        file.teamLeaderName,
        file.tvr_agent_name,
       
        file.tvrPending,
        file.tvrCompleted,
        file.cdrPending,
        file.cdrCompleted,
        file.bankLogin,
      ]);
  
      const csvContent = [csvHeaders, ...csvRows]
        .map(row => row.join(','))
        .join('\n');
  
      // Trigger file download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'Agent_performance.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  
    return (
      <div className="container mt-4">
        <h2>CDR Team Performance</h2>
  
        {/* Filter Options */}
        <div className="row mb-3">
          <div className="col-md-3">
            <label htmlFor="startDateFilter">Start Date:</label>
            <input
              type="date"
              className="form-control"
              id="startDateFilter"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
  
          <div className="col-md-3">
            <label htmlFor="endDateFilter">End Date:</label>
            <input
              type="date"
              className="form-control"
              id="endDateFilter"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
  
          <div className="col-md-3">
            <label htmlFor="filterTL">Filter by Team Leader Name:</label>
            <input
              type="text"
              className="form-control"
              id="filterTL"
              placeholder="Enter Team Leader Name"
              value={selectedTeamLeader}
              onChange={(e) => setSelectedTeamLeader(e.target.value)}
            />
          </div>
  
          <div className="col-md-3">
            <label htmlFor="filterAgent">Filter by CDR Agent Name:</label>
            <input
              type="text"
              className="form-control"
              id="filterAgent"
              placeholder="Enter CDR Agent Name"
              value={selectedAgent}
              onChange={(e) => setSelectedAgent(e.target.value)}
            />
          </div>
        </div>
  
        {/* Apply and Download Buttons */}
        <div className="row mb-3">
          <div className="col-md-12 text-right">
            <button className="btn btn-primary" onClick={fetchFilteredData}>
              Apply
            </button>
            {' '}
            <button
              className="btn btn-success"
              onClick={downloadCSV}
              disabled={filteredFiles.length === 0}
            >
              Download Report
            </button>
          </div>
        </div>
  
        {/* Display loading spinner */}
        {loading && <div>Loading...</div>}
  
        {/* Table to display performance data */}
        {!loading && (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Team Leader</th>
                <th scope="col">Agent Name</th>
               
                <th scope="col">CDR Pending</th>
                <th scope="col">CDR Completed</th>
                <th scope="col">CDR Rejected</th>
                <th scope="col">Bank Login</th>
              </tr>
            </thead>
            <tbody>
              {filteredFiles.length > 0 ? (
                filteredFiles.map((data, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>
                      {new Date(data.date).toLocaleDateString('en-GB')}
                      <br />
                      {new Date(data.date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td>{data.teamLeaderName}</td>
                    <td>{data.cdr_agent_name}</td>
                    <td>{data.cdrPending}</td>
                    <td>{data.cdrCompleted}</td>
                    <td>{data.cdrRejectedCount}</td>

                    
                    <td>{data.bankLogin}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center">
                    No data available for the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    );
  };

export default Cdrteamperformance