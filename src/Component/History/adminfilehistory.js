import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Adminfilehistory = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTeamLeader, setSelectedTeamLeader] = useState('');
  const [selectedAgent, setSelectedAgent] = useState('');
  const [teamData, setTeamData] = useState([]);
  const [filteredFiles, setFilteredFiles] = useState([]); // State for filtered results
  const [loading, setLoading] = useState(false);
  const [filterAgent, setFilterAgent] = useState('');
  const [filterTL, setFilterTL] = useState('');
  const baseurl = process.env.REACT_APP_API_BASE_URL;

  // Function to fetch data from API
  const fetchFilteredData = async () => {
    if (!selectedDate) return; // Prevent fetching if no date is selected
    
    try {
      setLoading(true);

      const response = await axios.get(`${baseurl}/getLoanFilesByFilters`, {
        params: {
          date: selectedDate,
          teamLeader: selectedTeamLeader,
          agentName: selectedAgent,
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

  useEffect(() => {
    fetchFilteredData(); // Fetch data when component mounts or filters change
  }, [selectedDate, selectedTeamLeader, selectedAgent]);

  useEffect(() => {
    let filtered = teamData;

    // Filter by sales agent name if entered
    if (filterAgent) {
      filtered = filtered.filter(data =>
        data.sales_agent_name?.toLowerCase().includes(filterAgent.toLowerCase())
      );
    }

    // Filter by team leader name if entered
    if (filterTL) {
      filtered = filtered.filter(data =>
        data.teamLeaderName?.toLowerCase().includes(filterTL.toLowerCase())
      );
    }

    setFilteredFiles(filtered); // Update the state for filtered results
  }, [filterAgent, filterTL, teamData]); // Trigger filter effect based on these states

  return (
    <div className="container mt-4">
      <h2>Team Performance Details</h2>

      {/* Filter Options */}
      <div className="row mb-3">
        {/* Filter by Date */}
        <div className="col-md-4">
          <label htmlFor="dateFilter" >Filter by Date:</label>
          <input
            type="date"
            className="form-control"
            id="dateFilter"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>

        {/* Filter by Team Leader */}
        <div className="col-md-4">
          <label htmlFor="filterTL">Filter by Team Leader Name:</label>
          <input
            type="text"
            className="form-control"
            id="filterTL"
            placeholder="Enter Team Leader Name"
            value={filterTL}
            onChange={(e) => setFilterTL(e.target.value)}
          />
        </div>

        {/* Filter by Sales Agent */}
        <div className="col-md-4">
          <label htmlFor="filterAgent">Filter by Sales Agent Name:</label>
          <input
            type="text"
            className="form-control"
            id="filterAgent"
            placeholder="Enter Sales Agent Name"
            value={filterAgent}
            onChange={(e) => setFilterAgent(e.target.value)}
          />
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
              <th scope="col">Interested</th>
              <th scope="col">TVR Pending</th>
              <th scope="col">TVR Completed</th>
              <th scope="col">CDR Pending</th>
              <th scope="col">CDR Completed</th>
              <th scope="col">Bank Login</th>
            </tr>
          </thead>
          <tbody>
            {filteredFiles.length > 0 ? (
              filteredFiles.map((data, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{data.date}</td>
                  <td>{data.teamLeaderName}</td>
                  <td>{data.sales_agent_name}</td>
                  <td>{data.interested}</td>
                  <td>{data.tvrPending}</td>
                  <td>{data.tvrCompleted}</td>
                  <td>{data.cdrPending}</td>
                  <td>{data.cdrCompleted}</td>
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

export default Adminfilehistory;
