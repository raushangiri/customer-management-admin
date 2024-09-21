import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Teamleaderfilehistory = () => {
  const [loanFiles, setLoanFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseurl = process.env.REACT_APP_API_BASE_URL;
  const userId = localStorage.getItem('userId');

  // Fetch loan files when the component mounts
  useEffect(() => {
    const fetchLoanFiles = async () => {
      try {
        const response = await axios.get(`${baseurl}/getSalesTeamLoanFiles/${userId}`);
        if (response.data && response.data.status === 200 && response.data.data) {
          setLoanFiles(response.data.data); // Update state with the `data` array from the response
        } else {
          setError('No loan files found.');
        }
      } catch (err) {
        setError('Failed to fetch loan files.');
      } finally {
        setLoading(false); // Stop loading after the request is complete
      }
    };

    fetchLoanFiles();
  }, [userId, baseurl]);

  if (loading) {
    return <div className="container mt-4">Loading loan files...</div>;
  }

  if (error) {
    return <div className="container mt-4 alert alert-danger">{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Loan Files History</h2>
      {loanFiles.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Sales Agent Name</th>
              <th scope="col">File Number</th>
              <th scope="col">Customer Name</th>
              <th scope="col">Mobile Number</th>
              <th scope="col">Sales Status</th>
              <th scope="col">File Status</th>
              <th scope="col" className="text-center">View Details</th>
            </tr>
          </thead>
          <tbody>
            {loanFiles.map((loanFile, index) => (
              <tr key={loanFile._id}>
                <th scope="row">{index + 1}</th>
                <td>{loanFile.sales_agent_name}</td>
                <td>{loanFile.file_number}</td>
                <td>{loanFile.customer_name}</td>
                <td>{loanFile.customer_mobile_number}</td>
                <td>{loanFile.sales_status}</td>
                <td>{loanFile.file_status}</td>
                <td className="text-center">
                  <Link to={`/view-filedetails/${loanFile.file_number}`}>
                    <FontAwesomeIcon icon={faEye} />
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

