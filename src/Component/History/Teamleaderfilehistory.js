

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// const Teamleaderfilehistory = () => {
//   const [loanFiles, setLoanFiles] = useState([]);
//   const [filteredLoanFiles, setFilteredLoanFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [salesAgent, setSalesAgent] = useState('');
//   const baseurl = process.env.REACT_APP_API_BASE_URL;
//   const userId = localStorage.getItem('userId');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');

//   useEffect(() => {
//     const today = new Date();
//     const yesterday = new Date(today);
//     yesterday.setDate(today.getDate() - 2);
//     setStartDate(yesterday.toISOString().split('T')[0]); 
//     setEndDate(today.toISOString().split('T')[0]);
//   }, []);
//     const fetchLoanFiles = async () => {
//     setLoading(true);
//     try {
//       const params = {
//         startDate,
//         endDate,
//         salesAgentName: salesAgent,
//       };
//       const response = await axios.get(`${baseurl}/getSalesTeamLoanFiles/${userId}`, { params });
//       if (response.data && response.data.status === 200 && response.data.data) {
//         setLoanFiles(response.data.data); 
//         setFilteredLoanFiles(response.data.data); 
//       } else {
//         setError('No loan files found.');
//       }
//     } catch (err) {
//       setError('Failed to fetch loan files.');
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   useEffect(() => {
//     if (startDate && endDate) {
//       fetchLoanFiles();
//     }
//   }, [userId, baseurl, startDate, endDate]);

//   const handleSalesAgentChange = (event) => {
//     setSalesAgent(event.target.value);
//   };
//   const handleStartDateChange = (event) => {
//     setStartDate(event.target.value);
//   };
//   const handleEndDateChange = (event) => {
//     setEndDate(event.target.value);
//   };
//   const handleApplyFilters = () => {
//     fetchLoanFiles();
//   };
//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Loan Files History</h2>
//       <div className="row mb-3">
//         <div className="col-sm-4">
//           <input
//             type="date"
//             className="form-control"
//             value={startDate}
//             onChange={handleStartDateChange}
//           />
//         </div>
//         <div className="col-sm-4">
//           <input
//             type="date"
//             className="form-control"
//             value={endDate}
//             onChange={handleEndDateChange}
//           />
//         </div>
//         <div className="col-sm-4">
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Search Sales Agent..."
//             value={salesAgent}
//             onChange={handleSalesAgentChange}
//           />
//         </div>
//       </div>
//       <div className="row mb-4">
//         <div className="col-sm-12">
//           <button className="btn btn-primary" onClick={handleApplyFilters}>
//             Apply Filters
//           </button>
//         </div>
//       </div>
//       <div className='position-relative'>
//       {loading && (
//         <div
//           className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-light bg-opacity-75"
//           style={{ zIndex: 1050 }}
//         >
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       )}
//       </div>
//       {filteredLoanFiles.length > 0 ? (
//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th scope="col">#</th>
//               <th scope="col">Date</th>
//               <th scope="col">Sales Agent Name</th>
//               <th scope="col">Customer Name</th>
//               <th scope="col">Mobile Number</th>
//               <th scope="col">Sales Status</th>
//               <th scope="col">File Status</th>
//               <th scope="col" className="text-center">View Details</th>
//               <th scope="col" className="text-center">Search Details</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredLoanFiles
//               .sort((a, b) => new Date(b.sales_assign_date) - new Date(a.sales_assign_date)) 
//               .map((loanFile, index) => (
//                 <tr key={loanFile._id}>
//                   <th scope="row">{index + 1}</th>
//                   <td>
//                     {new Date(loanFile.sales_assign_date).toLocaleDateString('en-GB')}<br />
//                     {new Date(loanFile.sales_assign_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
//                   </td>
//                   <td>{loanFile.sales_agent_name}</td>
//                   <td>{loanFile.customer_name}</td>
//                   <td>{loanFile.customer_mobile_number}</td>
//                   <td>{loanFile.sales_status}</td>
//                   <td>{loanFile.file_status}</td>
//                   <td className="text-center">
//                     <Link to={`/view-filedetails/${loanFile.file_number}`}>
//                       <FontAwesomeIcon icon={faEye} />
//                     </Link>
//                   </td>
//                   <td className="text-center">
//                     <Link to={`/Adminsearch/${loanFile.customer_mobile_number}`}>
//                       <FontAwesomeIcon icon={faMagnifyingGlass} />
//                     </Link>
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       ) : (
//         <div className="alert alert-info" role="alert">
//           No loan files available.
//         </div>
//       )}
//     </div>
//   );
// };

// export default Teamleaderfilehistory;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Teamleaderfilehistory = () => {
  const [loanFiles, setLoanFiles] = useState([]);
  const [filteredLoanFiles, setFilteredLoanFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salesAgent, setSalesAgent] = useState('');
  const [fileStatusFilter, setFileStatusFilter] = useState(''); // Added for file status filter
  const baseurl = process.env.REACT_APP_API_BASE_URL;
  const userId = localStorage.getItem('userId');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  // Fetch unique file statuses
  const getUniqueFileStatuses = (files) => {
    const uniqueStatuses = [...new Set(files.map((file) => file.file_status))];
    return uniqueStatuses;
  };

  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 2);
    setStartDate(yesterday.toISOString().split('T')[0]); 
    setEndDate(today.toISOString().split('T')[0]);
  }, []);

  const fetchLoanFiles = async () => {
    setLoading(true);
    try {
      const params = {
        startDate,
        endDate,
        salesAgentName: salesAgent,
      };
      const response = await axios.get(`${baseurl}/getSalesTeamLoanFiles/${userId}`, { params });
      if (response.data && response.data.status === 200 && response.data.data) {
        setLoanFiles(response.data.data); 
        setFilteredLoanFiles(response.data.data); 
      } else {
        setError('No loan files found.');
      }
    } catch (err) {
      setError('Failed to fetch loan files.');
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (startDate && endDate) {
      fetchLoanFiles();
    }
  }, [userId, baseurl, startDate, endDate]);

  const handleSalesAgentChange = (event) => {
    setSalesAgent(event.target.value);
  };
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };
  const handleFileStatusChange = (event) => {
    setFileStatusFilter(event.target.value);  // Added handler for file status filter
  };
  const handleApplyFilters = () => {
    const filteredFiles = loanFiles.filter(file => 
      (salesAgent === '' || file.sales_agent_name.toLowerCase().includes(salesAgent.toLowerCase())) &&
      (fileStatusFilter === '' || file.file_status === fileStatusFilter)
    );
    setFilteredLoanFiles(filteredFiles);
  };

  const downloadCSV = () => {
    if (filteredLoanFiles.length === 0) return;

    const headers = [
      'Date',
      'Sales Agent Name',
      'Customer Name',
      'Mobile Number',
      'Sales Status',
      'File Status'
    ];

    const rows = filteredLoanFiles.map(loanFile => [
      new Date(loanFile.sales_assign_date).toLocaleDateString('en-GB') + ' ' +
      new Date(loanFile.sales_assign_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      loanFile.sales_agent_name,
      loanFile.customer_name,
      loanFile.customer_mobile_number,
      loanFile.sales_status,
      loanFile.file_status
    ]);

    let csvContent = 'data:text/csv;charset=utf-8,';
    csvContent += headers.join(',') + '\n';
    csvContent += rows.map(row => row.join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', 'loan_files.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Loan Files History</h2>
      <div className="row mb-3">
        <div className="col-sm-4">
          <input
            type="date"
            className="form-control"
            value={startDate}
            onChange={handleStartDateChange}
          />
        </div>
        <div className="col-sm-4">
          <input
            type="date"
            className="form-control"
            value={endDate}
            onChange={handleEndDateChange}
          />
        </div>
        <div className="col-sm-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search Sales Agent..."
            value={salesAgent}
            onChange={handleSalesAgentChange}
          />
        </div>
      </div>
      <div className="row mb-3">
        <div className="col-sm-4">
          <select
            className="form-control"
            value={fileStatusFilter}
            onChange={handleFileStatusChange}
          >
            <option value="">All File Statuses</option>
            {getUniqueFileStatuses(loanFiles).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="row mb-4">
        <div className="col-sm-6">
          <button className="btn btn-primary" onClick={handleApplyFilters}>
            Apply Filters
          </button>

          <button className="btn btn-success mx-2" onClick={downloadCSV}>
            Download CSV
          </button>
        </div>
      </div>
      <div className='position-relative'>
      {loading && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-light bg-opacity-75"
          style={{ zIndex: 1050 }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
      </div>
      {filteredLoanFiles.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Date</th>
              <th scope="col">Sales Agent Name</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Sales Status</th>
              <th scope="col">File Status</th>
              <th scope="col" className="text-center">View Details</th>
              <th scope="col" className="text-center">Search Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoanFiles
              .sort((a, b) => new Date(b.sales_assign_date) - new Date(a.sales_assign_date)) 
              .map((loanFile, index) => (
                <tr key={loanFile._id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    {new Date(loanFile.sales_assign_date).toLocaleDateString('en-GB')}<br />
                    {new Date(loanFile.sales_assign_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td>{loanFile.sales_agent_name}</td>
                  <td>{loanFile.customer_name}</td>
                  <td>{loanFile.customer_mobile_number}</td>
                  <td>{loanFile.sales_status}</td>
                  <td>{loanFile.file_status}</td>
                  <td className="text-center">
                    <Link to={`/view-filedetails/${loanFile.file_number}`}>
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                  </td>
                  <td className="text-center">
                    <Link to={`/Adminsearch/${loanFile.customer_mobile_number}`}>
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Link>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <p>{error || 'No loan files found.'}</p>
      )}
    </div>
  );
};

export default Teamleaderfilehistory;

