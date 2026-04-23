import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const History = () => {
  const [loanFiles, setLoanFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterAgent, setFilterAgent] = useState('');
  const [filterTL, setFilterTL] = useState('');
  const [filterFileStatus, setFilterFileStatus] = useState(''); 
  const [fileStatusOptions, setFileStatusOptions] = useState([]); 
  const [allLoanFiles, setAllLoanFiles] = useState([]); 
  const [filteredLoanFiles, setFilteredLoanFiles] = useState([]); 
  const baseurl = process.env.REACT_APP_API_BASE_URL;
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');

  const handleStartDateChange = (e) => {
    const selected = new Date(e.target.value);
    selected.setHours(0, 0, 0, 0); 
    setStartDate(selected.toISOString());
  };

  const handleEndDateChange = (e) => {
    const selected = new Date(e.target.value);
    selected.setHours(23, 59, 59, 999); 
    setEndDate(selected.toISOString());
  };

  const sortLoanFilesByDate = (loanFiles) => {
    return loanFiles.sort((a, b) => new Date(b.sales_assign_date) - new Date(a.sales_assign_date));
  };

  const handleFileStatusFilter = (e) => {
  const selectedStatus = e.target.value;
  setFilterFileStatus(selectedStatus);

  const statusField = roleStatusMap[userRole] || "file_status";

  if (selectedStatus === "") {
    setFilteredLoanFiles(allLoanFiles);
  } else {
    const filteredData = allLoanFiles.filter(
      (file) => file[statusField] === selectedStatus
    );
    setFilteredLoanFiles(filteredData);
  }
};

  useEffect(() => {
  if (loanFiles.length > 0) {
    const uniqueStatuses = [...new Set(loanFiles.map((file) => file.file_status))];
    setFileStatusOptions(uniqueStatuses);
  }
}, [loanFiles]); 


  <div className="mb-3">
  <label htmlFor="fileStatus" className="form-label">
    Filter by File Status:
  </label>
  <select
    id="fileStatus"
    className="form-select"
    value={filterFileStatus}
    onChange={handleFileStatusFilter}
  >
    <option value="">All</option>
    {fileStatusOptions.map((status, index) => (
      <option key={index} value={status}>
        {status}
      </option>
    ))}
  </select>
</div>

  const fetchLoanFiles = async (
    start = startDate,
    end = endDate,
    salesAgentName = filterAgent,
    teamLeaderName = filterTL
  ) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${baseurl}/getLoanFilesByUserId/${userId}`,
        {
          params: {
            startDate: start,
            endDate: end,
            salesAgentName: salesAgentName || "",
            teamLeaderName: teamLeaderName || "",
          },
        }
      );

      if (response.data.success) {
        const loanFiles = response.data.data;
        setLoanFiles(loanFiles);
        setAllLoanFiles(loanFiles);
        setFilteredLoanFiles(loanFiles);

        // extract unique statuses for dropdown
        const uniqueStatuses = [
          ...new Set(loanFiles.map((file) => file.sales_status)),
        ];
        setFileStatusOptions(uniqueStatuses);
      } else {
        setError("No loan files found.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to fetch loan files.");
    } finally {
      setLoading(false);
    }
  };
console.log(loanFiles,"loanFiles");
  const applyFilters = () => {
    fetchLoanFiles(startDate, endDate, filterAgent, filterTL, filterFileStatus);
  };

  const downloadCSV = () => {
    const headers = [
      'Date',
      'Time',
      userRole === 'admin' ? 'Team Leader Name' : null,
      userRole === 'admin' ? 'Agent Name' : null,
      'Customer Name',
      'Mobile Number',
      'Loan Type',
      'File Status',
    ]
      .filter(Boolean)
      .join(',');

    const rows = loanFiles.map((loanFile) => [
      loanFile.sales_assign_date
        ? new Date(loanFile.sales_assign_date).toLocaleString('en-GB', {
          dateStyle: 'short',
          timeStyle: 'short',
        })
        : '',
      userRole === 'admin' ? loanFile.teamleadername : null,
      userRole === 'admin' ? loanFile.sales_agent_name : null,
      loanFile.customer_name,
      loanFile.customer_mobile_number,
      loanFile.type_of_loan,
      loanFile.file_status,
    ]);

    const csvContent = [
      headers,
      ...rows.map((row) => row.filter(Boolean).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);

    link.setAttribute('href', url);
    link.setAttribute('download', `loan_files_history.csv`);
    link.style.visibility = 'hidden';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

const roleDateMap = {
  "sales": "sales_assign_date",
  "TVR": "tvr_action_date",
  "CDR": "cdr_action_date",
  "Bank login": "banklogin_action_date",
  "admin": "sales_assign_date", // default for admin (can be changed)
};

const roleStatusMap = {
  "sales": "sales_status",
  "TVR": "tvr_status",
  "CDR": "cdr_status",
  "Bank_login": "banklogin_status",
  "admin": "file_status", // admin sees final file status
};

const getDefaultStartDate = () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // midnight today
  console.log(today,"time");
  return today.toISOString();
};

const getDefaultEndDate = () => {
  const now = new Date();
  const isoString = now.toISOString();
  console.log("Default End Date (current time):", isoString);
  return isoString;
};


useEffect(() => {
  const start = getDefaultStartDate();
  const end = getDefaultEndDate();
  setStartDate(start);
  setEndDate(end);

  // Fetch records immediately on mount
  fetchLoanFiles(start, end);
}, [userId]);

useEffect(() => {
  if (allLoanFiles.length > 0) {
    const statusField = roleStatusMap[userRole] || "file_status";
    const uniqueStatuses = [
      ...new Set(allLoanFiles.map((file) => file[statusField])),
    ].filter(Boolean);
    setFileStatusOptions(uniqueStatuses);
  }
  
}, [allLoanFiles, userRole]);



  return (
    <div className="container mt-4">
      <h2 className="mb-4">Loan Files History</h2>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-3">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={startDate.split("T")[0]}   // extract YYYY-MM-DD
            onChange={handleStartDateChange}
          />
        </div>

        <div className="col-md-3">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={endDate.split("T")[0]}
            onChange={handleEndDateChange}
          />
        </div>

        {userRole === 'admin' && (
          <>
            <div className="col-md-3">
              <label htmlFor="filterTL">Team Leader Name:</label>
              <input
                type="text"
                className="form-control"
                id="filterTL"
                placeholder="Enter Team Leader Name"
                value={filterTL}
                onChange={(e) => setFilterTL(e.target.value)}
              />
            </div>

            <div className="col-md-3">
              <label htmlFor="filterAgent">Sales Agent Name:</label>
              <input
                type="text"
                className="form-control"
                id="filterAgent"
                placeholder="Enter Sales Agent Name"
                value={filterAgent}
                onChange={(e) => setFilterAgent(e.target.value)}
              />
            </div>
          </>
        )}
        <div className="mb-3">
          <label htmlFor="fileStatus" className="form-label">
            Filter by File Status:
          </label>
          <select
            id="fileStatus"
            className="form-select"
            value={filterFileStatus}
            onChange={handleFileStatusFilter}
          >
            <option value="">All</option>
            {fileStatusOptions.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-3 d-flex align-items-end">
          <button className="btn btn-primary me-2" onClick={applyFilters}>
            Apply Filters
          </button>
          {(userRole === 'admin' || userRole === 'Team leader')&& (
            <>
              <button className="btn btn-success" onClick={downloadCSV}>
                Download CSV
              </button>
            </>
          )}
        </div>
      </div>
      <div className="position-relative">
        {loading && (
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        )}
       {!loading && filteredLoanFiles.length > 0 ? (
  <table className="table table-bordered">
    <thead>
      <tr>
        <th>#</th>
        <th>Date</th>
        {userRole === 'admin' && <th>TL Name</th>}
        {userRole === 'admin' && <th>Agent Name</th>}
        <th>Customer Name</th>
        <th>Mobile Number</th>
        <th>Loan Type</th>
        <th>File Status</th>
        <th className="text-center">View Details</th>
      </tr>
    </thead>
    <tbody>
      {filteredLoanFiles.map((loanFile, index) => (
        <tr key={loanFile._id}>
          <td>{index + 1}</td>
          <td>
  {(() => {
    const dateField = roleDateMap[userRole] || "sales_assign_date";
    return loanFile[dateField]
      ? new Date(loanFile[dateField]).toLocaleDateString()
      : "";
  })()}
</td>
          {userRole === "admin" && <td>{loanFile.teamleadername}</td>}
          {userRole === "admin" && <td>{loanFile.sales_agent_name}</td>}
          <td>{loanFile.customer_name}</td>
          <td>{loanFile.customer_mobile_number}</td>
          <td>{loanFile.type_of_loan}</td>
          <td>{loanFile.file_status}</td>
          <td className="text-center">
            <Link
              to={`/view-filedetails/${loanFile.file_number}`}
              className="btn btn-primary btn-sm"
            >
              <FontAwesomeIcon icon={faEye} />
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
) : (
  <p className="text-muted">No loan files available.</p>
)}

      </div>
    </div>
  );
};

export default History;
