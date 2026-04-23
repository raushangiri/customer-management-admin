import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Adminfiledisbursalhistory = () => {
  const [loanFiles, setLoanFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterAgent, setFilterAgent] = useState('');
  const [filterTL, setFilterTL] = useState('');

  const baseurl = process.env.REACT_APP_API_BASE_URL;
  const userRole = localStorage.getItem('userRole');

  // Default Dates
  const getDefaultStartDate = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  };

  const getDefaultEndDate = () => {
    const d = new Date();
    return d.toISOString().split('T')[0];
  };

  // API Call
  const fetchLoanFiles = async (start, end) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${baseurl}/getdisbursalfilesbyDate`, {
        params: {
          startDate: start,
          endDate: end
        }
      });

      if (response.data) {
        setLoanFiles(response.data.data);
      } else {
        setError('No records found.');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const start = getDefaultStartDate();
    const end = getDefaultEndDate();

    setStartDate(start);
    setEndDate(end);

    fetchLoanFiles(start, end);
  }, []);

  const applyFilters = () => {
    fetchLoanFiles(startDate, endDate);
  };

  // CSV Download
  const downloadCSV = () => {
    const headers = [
      'Date',
      userRole === 'admin' ? 'Team Leader' : null,
      userRole === 'admin' ? 'Agent Name' : null,
      'Customer Name',
      'Mobile',
      'Loan Type',
      'Approval Status',
      'Remarks'
    ].filter(Boolean).join(',');

    const rows = loanFiles.map(file => [
      file.approval_date
        ? new Date(file.approval_date).toLocaleString('en-GB')
        : '',
      userRole === 'admin' ? file.teamleadername : null,
      userRole === 'admin' ? file.approval_agent_name : null,
      file.customer_name,
      file.customer_mobile_number,
      file.type_of_loan,
      file.approval_status,
      file.remarks
    ]);

    const csvContent = [
      headers,
      ...rows.map(row => row.filter(Boolean).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'file_approval_history.csv';
    link.click();
  };

  return (
    <div className="container mt-4">
      <h2>File Disbursal History</h2>

      {/* Filters */}
      <div className="row mb-3">
        <div className="col-md-3">
          <label>Start Date</label>
          <input type="date" className="form-control" value={startDate}
            onChange={(e) => setStartDate(e.target.value)} />
        </div>

        <div className="col-md-3">
          <label>End Date</label>
          <input type="date" className="form-control" value={endDate}
            onChange={(e) => setEndDate(e.target.value)} />
        </div>

        {userRole === 'admin' && (
          <>
            <div className="col-md-3">
              <label>TL Name</label>
              <input type="text" className="form-control"
                value={filterTL}
                onChange={(e) => setFilterTL(e.target.value)} />
            </div>

            <div className="col-md-3">
              <label>Agent Name</label>
              <input type="text" className="form-control"
                value={filterAgent}
                onChange={(e) => setFilterAgent(e.target.value)} />
            </div>
          </>
        )}

        <div className="col-md-3 mt-4">
          <button className="btn btn-primary" onClick={applyFilters}>
            Apply
          </button>{' '}
          <button className="btn btn-success" onClick={downloadCSV}>
            Download CSV
          </button>
        </div>
      </div>

      {/* Loader */}
      {loading && <div className="spinner-border text-primary"></div>}

      {/* Table */}
      {loanFiles.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              {userRole === 'admin' && (
                <>
                  <th>TL</th>
                  <th>Agent</th>
                </>
              )}
              <th>Customer</th>
              <th>Mobile</th>
              <th>Loan Type</th>
              <th>Approval Status</th>
              <th>Remarks</th>
              <th>View</th>
              <th>Search</th>
            </tr>
          </thead>

          <tbody>
            {loanFiles.map((file, index) => (
              <tr key={file._id}>
                <td>{index + 1}</td>
                <td>
                  {file.approval_date && (
                    <>
                      {new Date(file.approval_date).toLocaleDateString('en-GB')}<br />
                      {new Date(file.approval_date).toLocaleTimeString()}
                    </>
                  )}
                </td>

                {userRole === 'admin' && (
                  <>
                    <td>{file.teamleadername}</td>
                    <td>{file.approval_agent_name}</td>
                  </>
                )}

                <td>{file.customer_name}</td>
                <td>{file.customer_mobile_number}</td>
                <td>{file.type_of_loan}</td>
                <td>{file.disbursal_status}</td>
                <td>{file.remarks}</td>

                <td className="text-center">
                  <Link to={`/view-filedetails/${file.file_number}`}>
                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                </td>

                <td className="text-center">
                  <Link to={`/Adminsearch/${file.customer_mobile_number}`}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        !loading && <div className="alert alert-info">No data found</div>
      )}
    </div>
  );
};

export default Adminfiledisbursalhistory;