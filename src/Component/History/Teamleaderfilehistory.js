// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye } from '@fortawesome/free-solid-svg-icons';

// const Teamleaderfilehistory = () => {
//   const [loanFiles, setLoanFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const baseurl = process.env.REACT_APP_API_BASE_URL;
//   const userId = localStorage.getItem('userId');

//   // Fetch loan files when the component mounts
//   useEffect(() => {
//     const fetchLoanFiles = async () => {
//       try {
//         const response = await axios.get(`${baseurl}/getSalesTeamLoanFiles/${userId}`);
//         if (response.data && response.data.status === 200 && response.data.data) {
//           setLoanFiles(response.data.data); // Update state with the `data` array from the response
//         } else {
//           setError('No loan files found.');
//         }
//       } catch (err) {
//         setError('Failed to fetch loan files.');
//       } finally {
//         setLoading(false); // Stop loading after the request is complete
//       }
//     };

//     fetchLoanFiles();
//   }, [userId, baseurl]);

//   if (loading) {
//     return <div className="container mt-4">Loading loan files...</div>;
//   }

//   if (error) {
//     return <div className="container mt-4 alert alert-danger">{error}</div>;
//   }

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Loan Files History</h2>
//       {loanFiles.length > 0 ? (
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
//             </tr>
//           </thead>
//           <tbody> 
//             {loanFiles.map((loanFile, index) => (
//               <tr key={loanFile._id}>
//                 <th scope="row">{index + 1}</th>
//                 <td>
//                 {new Date(loanFile.createdAt).toLocaleDateString('en-GB')}<br />
//           {new Date(loanFile.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
//           </td>
//                 <td>{loanFile.sales_agent_name}</td>

//                 <td>{loanFile.customer_name}</td>
//                 <td>{loanFile.customer_mobile_number}</td>
//                 <td>{loanFile.sales_status}</td>
//                 <td>{loanFile.file_status}</td>
//                 <td className="text-center">
//                   <Link to={`/view-filedetails/${loanFile.file_number}`}>
//                     <FontAwesomeIcon icon={faEye} />
//                   </Link>
//                 </td>
//               </tr>
//             ))}
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

// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// const Teamleaderfilehistory = () => {
//   const [loanFiles, setLoanFiles] = useState([]);
//   const [filteredLoanFiles, setFilteredLoanFiles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [salesAgent, setSalesAgent] = useState('');
//   const [selectedDate, setSelectedDate] = useState('');

//   const baseurl = process.env.REACT_APP_API_BASE_URL;
//   const userId = localStorage.getItem('userId');

//   // Fetch loan files when the component mounts
//   useEffect(() => {
//     const fetchLoanFiles = async () => {
//       try {
//         const response = await axios.get(`${baseurl}/getSalesTeamLoanFiles/${userId}`);
//         if (response.data && response.data.status === 200 && response.data.data) {
//           setLoanFiles(response.data.data); // Update state with the `data` array from the response
//           setFilteredLoanFiles(response.data.data); // Initialize filtered loan files
//         } else {
//           setError('No loan files found.');
//         }
//       } catch (err) {
//         setError('Failed to fetch loan files.');
//       } finally {
//         setLoading(false); // Stop loading after the request is complete
//       }
//     };

//     fetchLoanFiles();
//   }, [userId, baseurl]);

//   // Handle sales agent filter change
//   const handleSalesAgentChange = (event) => {
//     const value = event.target.value;
//     setSalesAgent(value);
//     filterLoanFiles(value, selectedDate);
//   };

//   // Handle date filter change
//   const handleDateChange = (event) => {
//     const value = event.target.value;
//     setSelectedDate(value);
//     filterLoanFiles(salesAgent, value);
//   };

//   // Function to filter loan files based on sales agent and date
//   const filterLoanFiles = (agent, date) => {
//     const filtered = loanFiles.filter((loanFile) => {
//       const isAgentMatch = loanFile.sales_agent_name.toLowerCase().includes(agent.toLowerCase());
//       const isDateMatch = date ? new Date(loanFile.sales_assign_date).toLocaleDateString('en-GB') === new Date(date).toLocaleDateString('en-GB') : true;
//       return isAgentMatch && isDateMatch;
//     });
//     setFilteredLoanFiles(filtered);
//   };

//   if (loading) {
//     return <div className="container mt-4">Loading loan files...</div>;
//   }

//   if (error) {
//     return <div className="container mt-4 alert alert-danger">{error}</div>;
//   }

//   return (
//     <div className="container mt-4">
//       <h2 className="mb-4">Loan Files History</h2>

//       {/* Filter inputs */}
      
//         <div className="row mb-3">
//         <div className='col-sm-4'>
          
//             <input
//               type="date"
//               className="form-control"
//               value={selectedDate}
//               onChange={handleDateChange}
//             />
//           </div>
//           <div className='col-sm-4'>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search Sales Agent..."
//               value={salesAgent}
//               onChange={handleSalesAgentChange}
//             />
//           </div>
          
//         </div>
     
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
//           {filteredLoanFiles
//             .sort((a, b) => new Date(b.sales_assign_date) - new Date(a.sales_assign_date)) // Sort in descending order
//             .map((loanFile, index) => (
//               <tr key={loanFile._id}>
//                 <th scope="row">{index + 1}</th>
//                 <td>
//                   {new Date(loanFile.sales_assign_date).toLocaleDateString('en-GB')}<br />
//                   {new Date(loanFile.sales_assign_date).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
//                 </td>
//                 <td>{loanFile.sales_agent_name}</td>
//                 <td>{loanFile.customer_name}</td>
//                 <td>{loanFile.customer_mobile_number}</td>
//                 <td>{loanFile.sales_status}</td>
//                 <td>{loanFile.file_status}</td>
//                 <td className="text-center">
//                   <Link to={`/view-filedetails/${loanFile.file_number}`}>
//                     <FontAwesomeIcon icon={faEye} />
//                   </Link>
//                 </td>
//                 <td className="text-center">
//                   <Link to={`/Adminsearch/${loanFile.customer_mobile_number}`}>
//                   <FontAwesomeIcon icon={faMagnifyingGlass} />
//                   </Link>
//                 </td>
//               </tr>
//             ))}
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
  const baseurl = process.env.REACT_APP_API_BASE_URL;
  const userId = localStorage.getItem('userId');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // Set default start and end dates (yesterday and today)
  useEffect(() => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 2);
  
    setStartDate(yesterday.toISOString().split('T')[0]); // Format as yyyy-mm-dd
    setEndDate(today.toISOString().split('T')[0]);
  }, []);
  
  // Function to fetch loan files based on filters
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
        setLoanFiles(response.data.data); // Update state with the `data` array from the response
        setFilteredLoanFiles(response.data.data); // Initialize filtered loan files
      } else {
        setError('No loan files found.');
      }
    } catch (err) {
      setError('Failed to fetch loan files.');
    } finally {
      setLoading(false); // Stop loading after the request is complete
    }
  };
  
  // Call fetchLoanFiles only after startDate and endDate are set
  useEffect(() => {
    if (startDate && endDate) {
      fetchLoanFiles();
    }
  }, [userId, baseurl, startDate, endDate]);

  // Handle sales agent filter change
  const handleSalesAgentChange = (event) => {
    setSalesAgent(event.target.value);
  };

  // Handle start date change
  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  // Handle end date change
  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  // Handle Apply button click to fetch filtered loan files
  const handleApplyFilters = () => {
    fetchLoanFiles();
  };

  // if (loading) {
  //   return <div className="container mt-4">Loading loan files...</div>;
  // }

  if (error) {
    return <div className="container mt-4 alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Loan Files History</h2>

      {/* Filter inputs */}
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

      {/* Apply button to trigger the API call */}
      <div className="row mb-4">
        <div className="col-sm-12">
          <button className="btn btn-primary" onClick={handleApplyFilters}>
            Apply Filters
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
              .sort((a, b) => new Date(b.sales_assign_date) - new Date(a.sales_assign_date)) // Sort in descending order
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
        <div className="alert alert-info" role="alert">
          No loan files available.
        </div>
      )}
    </div>
  );
};

export default Teamleaderfilehistory;
