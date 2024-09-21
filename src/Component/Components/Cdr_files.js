import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useOverview } from '../ContentHook/OverviewContext';

const Cdr_files = ({onViewClick}) => {
  const [loanFiles, setLoanFiles] = useState([]);
  const baseurl = process.env.REACT_APP_API_BASE_URL;
  const { setMobileNumber, formData, setFormData, fetchFileData } = useOverview();

  useEffect(() => {
    const fetchLoanFiles = async () => {
      try {
        const response = await axios.get(`${baseurl}/getProcessToCDRFiles`); // Replace with your actual API endpoint
        setLoanFiles(response.data.data);
      } catch (error) {
        console.error('Error fetching loan files:', error);
      }
    };

    fetchLoanFiles();
  }, []);

  const handleViewClick = (customer_mobile_number) => {
    onViewClick(customer_mobile_number);

};
  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">CDR Files</h2>
      <table className="table table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Date</th>
            <th scope="col">Sales Agent Name</th>
            <th scope="col">Customer Name</th>
            <th scope="col">Loan Type</th>
            <th scope="col">Loan Category</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {loanFiles.length > 0 ? (
            loanFiles.map((file, index) => (
              <tr key={file.id}>
                <td>{index + 1}</td>
                <td>{new Date(file.createdAt).toLocaleDateString()}<br />
                {new Date(file.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                </td>
                <td>{file.sales_agent_name}</td>
                <td>{file.customer_name}</td>
                <td>{file.type_of_loan}</td>
                <td>{file.loan_category}</td>
                <td>
                  <button className="btn btn-primary"
                  onClick={() => {
                    fetchFileData(file.customer_mobile_number);
                    handleViewClick(file.customer_mobile_number);
                  }} 
                  >
                    <FontAwesomeIcon icon={faEye} /> View Deatils
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">No loan files found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Cdr_files;
