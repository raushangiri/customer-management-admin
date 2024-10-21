// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// const Adminsaleshistory = () => {
//     const [loanFiles, setLoanFiles] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const [startDate, setStartDate] = useState('');
//     const [endDate, setEndDate] = useState('');
//     const [filterAgent, setFilterAgent] = useState('');
//     const [filterTL, setFilterTL] = useState('');
  
//     const baseurl = process.env.REACT_APP_API_BASE_URL;
//     const userId = localStorage.getItem('userId');
//     const userRole = localStorage.getItem('userRole');
  
//     const getDefaultStartDate = () => {
//       const today = new Date();
//       const last1Day = new Date(today);
//       last1Day.setDate(today.getDate() - 1);
//       last1Day.setHours(0, 0, 0, 0);
//       return last1Day.toISOString();
//     };
  
//     const getDefaultEndDate = () => {
//       const today = new Date();
//       today.setHours(23, 59, 59, 999);
//       return today.toISOString();
//     };
  
//     const fetchLoanFiles = async (start, end, agent = '', tl = '') => {
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await axios.get(`${baseurl}/getLoanFilesByUserId/${userId}`, {
//           params: {
//             startDate: start,
//             endDate: end,
//             salesAgentName: agent,
//             teamLeaderName: tl,
//           },
//         });
  
//         if (response.data.success) {
//           setLoanFiles(response.data.data);
//         } else {
//           setError('No loan files found.');
//         }
//       } catch (error) {
//         console.error('Error submitting form:', error);
//         setError('Failed to fetch loan files.');
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     useEffect(() => {
//       const start = getDefaultStartDate();
//       const end = getDefaultEndDate();
//       setStartDate(start);
//       setEndDate(end);
  
//       fetchLoanFiles(start, end);
//     }, [userId]);
  
//     const applyFilters = () => {
//       fetchLoanFiles(startDate, endDate, filterAgent, filterTL);
//     };
  
//     // Convert loan files data to CSV
//     const downloadCSV = () => {
//       const headers = [
//         'Date',
//         userRole === 'admin' ? 'Team Leader Name' : null,
//         userRole === 'admin' ? 'Agent Name' : null,
//         'Customer Name',
//         'Mobile Number',
//         'Loan Type',
//         'File Status',
//       ]
//         .filter(Boolean)
//         .join(',');
  
//       const rows = loanFiles.map((loanFile) => [
//         loanFile.sales_assign_date
//           ? new Date(loanFile.sales_assign_date).toLocaleString('en-GB', {
//               dateStyle: 'short',
//               timeStyle: 'short',
//             })
//           : '',
//         userRole === 'admin' ? loanFile.teamleadername : null,
//         userRole === 'admin' ? loanFile.sales_agent_name : null,
//         loanFile.customer_name,
//         loanFile.customer_mobile_number,
//         loanFile.type_of_loan,
//         loanFile.file_status,
//       ]);
  
//       const csvContent = [
//         headers,
//         ...rows.map((row) => row.filter(Boolean).join(',')),
//       ].join('\n');
  
//       const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//       const link = document.createElement('a');
//       const url = URL.createObjectURL(blob);
  
//       link.setAttribute('href', url);
//       link.setAttribute('download', `loan_files_history.csv`);
//       link.style.visibility = 'hidden';
  
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//     };
  
//     // if (loading) {
//     //   return <div className="container mt-4">Loading loan files...</div>;
//     // }
  
//     // if (error) {
//     //   return <div className="container mt-4 alert alert-danger">{error}</div>;
//     // }

//     return (
//       <div className="container  mt-4">
//         <h2 className="mb-4">Sales Team Files History</h2>
  
//         {/* Filters */}
//         <div className="row mb-4">
//           <div className="col-md-4">
//             <label htmlFor="startDate">Start Date:</label>
//             <input
//               type="date"
//               className="form-control"
//               id="startDate"
//               value={startDate}
//               onChange={(e) => setStartDate(e.target.value)}
//             />
//           </div>
  
//           <div className="col-md-4">
//             <label htmlFor="endDate">End Date:</label>
//             <input
//               type="date"
//               className="form-control"
//               id="endDate"
//               value={endDate}
//               onChange={(e) => setEndDate(e.target.value)}
//             />
//           </div>
  
//           {userRole === 'admin' && (
//             <>
//               <div className="col-md-4">
//                 <label htmlFor="filterTL">Team Leader Name:</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="filterTL"
//                   placeholder="Enter Team Leader Name"
//                   value={filterTL}
//                   onChange={(e) => setFilterTL(e.target.value)}
//                 />
//               </div>
  
//               <div className="col-md-4">
//                 <label htmlFor="filterAgent">Sales Agent Name:</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="filterAgent"
//                   placeholder="Enter Sales Agent Name"
//                   value={filterAgent}
//                   onChange={(e) => setFilterAgent(e.target.value)}
//                 />
//               </div>
//             </>
//           )}
  
//           <div className="col-md-4">
//             <button className="btn btn-primary mt-4" onClick={applyFilters}>
//               Apply Filters
//             </button>
//             {' '}
          
//             <button className="btn btn-success mt-4" onClick={downloadCSV}>
//               Download CSV
//             </button>
//           </div>
//         </div>
//         <div className='position-relative'>
//         {loading && (
//           <div
//             className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-light bg-opacity-75"
//             style={{ zIndex: 1050 }}
//           >
//             <div className="spinner-border text-primary" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </div>
//           </div>
//         )}
//         {/* Loan Files Table */}
//         {loanFiles.length > 0 ? (
//           <table className="table table-bordered">
//             <thead>
//               <tr>
//                 <th scope="col">#</th>
//                 <th scope="col">Date</th>
//                 {userRole === 'admin' && (
//                   <>
//                     <th scope="col">TL Name</th>
//                     <th scope="col">Agent Name</th>
//                   </>
//                 )}
//                 <th scope="col">Customer Name</th>
//                 <th scope="col">Mobile Number</th>
//                 <th scope="col">Loan Type</th>
//                 <th scope="col">File Status</th>
//                 <th scope="col" className="text-center">View Details</th>
//                 <th scope="col" className="text-center">Search Details</th>
//               </tr>
//             </thead>
//             <tbody>
//               {loanFiles.map((loanFile, index) => (
//                 <tr key={loanFile._id}>
//                   <th scope="row">{index + 1}</th>
//                   <td>
//                     {loanFile.sales_assign_date && (
//                       <>
//                         {new Date(loanFile.sales_assign_date).toLocaleDateString('en-GB')}<br />
//                         {new Date(loanFile.sales_assign_date).toLocaleTimeString('en-US', {
//                           hour: '2-digit',
//                           minute: '2-digit',
//                         })}
//                       </>
//                     )}
//                   </td>
//                   {userRole === 'admin' && (
//                     <>
//                       <td>{loanFile.teamleadername}</td>
//                       <td>{loanFile.sales_agent_name}</td>
//                     </>
//                   )}
//                   <td>{loanFile.customer_name}</td>
//                   <td>{loanFile.customer_mobile_number}</td>
//                   <td>{loanFile.type_of_loan}</td>
//                   <td>{loanFile.file_status}</td>
//                   <td className="text-center">
//                     <Link to={`/view-filedetails/${loanFile.file_number}`}>
//                       <FontAwesomeIcon icon={faEye} />
//                     </Link>
//                   </td>
//                   <td className="text-center">
//                       <Link to={`/Adminsearch/${loanFile.customer_mobile_number}`}>
//                         <FontAwesomeIcon icon={faMagnifyingGlass} />
//                       </Link>
//                     </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <div className="alert alert-info" role="alert">
//             No loan files available.
//           </div>
//         )}
//         </div>
//       </div>
//     );
//   };

// export default Adminsaleshistory







import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const Adminsaleshistory = () => {
  const [allLoanFiles, setAllLoanFiles] = useState([]); // Store all loan files fetched from the API
  const [loanFiles, setLoanFiles] = useState([]); // Filtered loan files to be displayed
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [filterAgent, setFilterAgent] = useState('');
  const [filterTL, setFilterTL] = useState('');
  const [filterStatus, setFilterStatus] = useState(''); // File status filter
  const [fileStatuses, setFileStatuses] = useState([]); // Unique file statuses

  const baseurl = process.env.REACT_APP_API_BASE_URL;
  const userId = localStorage.getItem('userId');
  const userRole = localStorage.getItem('userRole');

  const getDefaultStartDate = () => {
    const today = new Date();
    today.setDate(today.getDate() - 1);
    return today.toISOString().split('T')[0]; // Return only the date part (YYYY-MM-DD)
  };

  const getDefaultEndDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0]; // Return only the date part (YYYY-MM-DD)
  };

  const fetchLoanFiles = async (start, end, agent = '', tl = '') => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${baseurl}/getLoanFilesByUserId/${userId}`, {
        params: {
          startDate: start,
          endDate: end,
          salesAgentName: agent,
          teamLeaderName: tl,
        },
      });

      if (response.data.success) {
        const sortedData = response.data.data.sort((a, b) => new Date(b.sales_assign_date) - new Date(a.sales_assign_date));
        setAllLoanFiles(sortedData); // Store the full set of loan files
        setLoanFiles(sortedData); // Initially show all loan files
        const uniqueStatuses = [...new Set(sortedData.map(file => file.file_status))];
        setFileStatuses(uniqueStatuses); // Extract unique file statuses
      } else {
        setError('No loan files found.');
      }
    } catch (error) {
      console.error('Error fetching loan files:', error);
      setError('Failed to fetch loan files.');
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
  }, [userId]);

  const applyFilters = () => {
    // Apply filters except for file status
    fetchLoanFiles(startDate, endDate, filterAgent, filterTL);
  };

  // Apply file status filter separately
  const handleFileStatusChange = (status) => {
    setFilterStatus(status);
    if (status === '') {
      setLoanFiles(allLoanFiles); // If no status is selected, show all loan files
    } else {
      const filteredFiles = allLoanFiles.filter(file => file.file_status === status);
      setLoanFiles(filteredFiles);
    }
  };

  // Convert loan files data to CSV
  const downloadCSV = () => {
    const headers = [
      'Date',
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

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Sales Team Files History</h2>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-4">
          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            value={startDate} // Only the date part
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            value={endDate} // Only the date part
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        {userRole === 'admin' && (
          <>
            <div className="col-md-4">
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

            <div className="col-md-4">
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

        <div className="col-md-4">
          <label htmlFor="filterStatus">File Status:</label>
          <select
            className="form-control"
            id="filterStatus"
            value={filterStatus}
            onChange={(e) => handleFileStatusChange(e.target.value)} // Trigger local filtering
          >
            <option value="">All Statuses</option>
            {fileStatuses.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <button className="btn btn-primary mt-4" onClick={applyFilters}>
            Apply Filters
          </button>
          {' '}
          <button className="btn btn-success mt-4" onClick={downloadCSV}>
            Download CSV
          </button>
        </div>
      </div>

      <div className='position-relative'>
      {loading && (
  <div
    className="position-absolute top-50 start-50 translate-middle d-flex justify-content-center align-items-center"
    style={{
      zIndex: 1050,
      width: '100px', // Adjust width as needed
      height: '100px', // Adjust height as needed
    }}
  >
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
)}

        {/* Loan Files Table */}
        {loanFiles.length > 0 ? (
          <table className="table table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                {userRole === 'admin' && (
                  <>
                    <th scope="col">TL Name</th>
                    <th scope="col">Agent Name</th>
                  </>
                )}
                <th scope="col">Customer Name</th>
                <th scope="col">Mobile Number</th>
                <th scope="col">Loan Type</th>
                <th scope="col">File Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {loanFiles.map((loanFile, index) => (
                <tr key={loanFile._id}>
                  <td>{index + 1}</td>
                  <td>{new Date(loanFile.sales_assign_date).toLocaleString('en-GB', { dateStyle: 'short', timeStyle: 'short' })}</td>
                  {userRole === 'admin' && (
                    <>
                      <td>{loanFile.teamleadername}</td>
                      <td>{loanFile.sales_agent_name}</td>
                    </>
                  )}
                  <td>{loanFile.customer_name}</td>
                  <td>{loanFile.customer_mobile_number}</td>
                  <td>{loanFile.type_of_loan}</td>
                  <td>{loanFile.file_status}</td>
                  <td>
                    <Link to={`/view-filedetails/${loanFile.file_number}`} className="btn btn-info btn-sm">
                      <FontAwesomeIcon icon={faEye} />
                    </Link>
                    
                    </td>
                    <td>
                    <Link to={`/Adminsearch/${loanFile.customer_mobile_number}`} className="btn btn-warning btn-sm ms-2">
                      <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>No loan files found.</p>
        )}
      </div>
    </div>
  );
};

export default Adminsaleshistory;
