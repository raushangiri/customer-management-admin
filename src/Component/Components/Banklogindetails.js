import React, { useState, useEffect } from 'react';
import { useOverview } from '../ContentHook/OverviewContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Banklogindetails = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [email2, setEmail2] = useState('');
  const [remarks, setRemarks] = useState('');
  const [bankDetail, setBankDetail] = useState({});
  const baseurl = process.env.REACT_APP_API_BASE_URL;
  const { formData } = useOverview();
  const [personalDetails, setPersonalDetails] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [error, setError] = useState(null);
  const [bankDetails, setBankDetails] = useState([]);
  const [selectedBankDetails, setSelectedBankDetails] = useState([]);

  const toggleSection = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // This will take the user to the previous page
  };

  // Fetch personal details
  useEffect(() => {
    const fetchPersonalDetails = async () => {
      try {
        const response = await axios.get(`${baseurl}/getpersonadetails/${formData.file_number}`);
        setPersonalDetails(response.data.data);
      } catch (error) {
        console.error('Error fetching personal details:', error);
      }
    };
    if (formData.file_number) {
      fetchPersonalDetails();
    }
  }, [formData.file_number]);

  // Fetch bank login details
  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        const response = await axios.get(`${baseurl}/getbanklogindetails/${formData.file_number}`);
        setBankDetail(response.data);
        setEmail2(response.data.email2 || '');
        setRemarks(response.data.remarks || '');
      } catch (error) {
        console.error('Error fetching bank details:', error);
      }
    };
    if (formData.file_number) {
      fetchBankDetails();
    }
  }, [formData.file_number]);

  // Fetch document data
  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`${baseurl}/getdocumentdata/${formData.file_number}`);
        setDocuments(response.data.attachments || []);
      } catch (error) {
        setError('Error fetching documents');
      }
    };
    fetchDocuments();
  }, [formData.file_number]);

  // Fetch RM details (Bank Login details)
  useEffect(() => {
    const fetchRMDetails = async () => {
      try {
        const response = await axios.get(`${baseurl}/getbanklogindetails/${formData.file_number}`);
        setBankDetails(response.data || []);
      } catch (error) {
        console.error('Error fetching RM details:', error);
      }
    };
    if (formData.file_number) {
      fetchRMDetails();
    }
  }, [formData.file_number]);

  // Handle selection change for RM details
  const handleSelectChange = (index) => {
    const updatedSelection = [...selectedBankDetails];
    if (updatedSelection.includes(index)) {
      updatedSelection.splice(updatedSelection.indexOf(index), 1);
    } else {
      updatedSelection.push(index);
    }
    setSelectedBankDetails(updatedSelection);
  };

  // Handle save operation
  const handleSave = async () => {
    try {
      const updatedDetails = {
        ...bankDetail,
        email2,
        remarks,
      };
      await axios.post(`${baseurl}/updatebanklogindetails/${formData.file_number}`, updatedDetails);
      alert('Bank details updated successfully!');
    } catch (error) {
      console.error('Error updating bank details:', error);
    }
  };

  const handleEdit = (index) => {
    // Here you can implement functionality to edit specific bank details
    console.log('Editing RM detail at index:', index);
    const selectedDetail = bankDetails[index];
    // Now, you can either populate the form with this data to allow editing
  };

  return (
    <div className="container mt-4">
      {/* Personal Details Section */}
      <div className="card">
        <div className="card-header">
          <h5 className="mb-0">
            <button className="btn btn-link" onClick={() => toggleSection(0)}>
              Personal Details
            </button>
          </h5>
        </div>
        <div className={`collapse ${activeIndex === 0 ? 'show' : ''}`}>
          <div className="card-body">
                       {personalDetails ? (
              <div>
                <p><strong>File Number:</strong> {personalDetails.file_number}</p>
                <p><strong>Name:</strong> {personalDetails.customerName || 'N/A'}</p>
                <p><strong>Mobile Number:</strong> {personalDetails.mobile_number || 'N/A'}</p>
                <p><strong>Alternate Number:</strong> {personalDetails.alternate_number || 'N/A'}</p>
                <p><strong>Date of Birth:</strong> {personalDetails.date_of_birth || 'N/A'}</p>
                <p><strong>Father's Name:</strong> {personalDetails.father_name || 'N/A'}</p>
                <p><strong>Mother's Name:</strong> {personalDetails.mother_name || 'N/A'}</p>
                <p><strong>Spouse Name:</strong> {personalDetails.spouse_name || 'N/A'}</p>
                <p><strong>Marital Status:</strong> {personalDetails.marital_status || 'N/A'}</p>
                <p><strong>Occupation Type:</strong> {personalDetails.occupation_type || 'N/A'}</p>
                <p><strong>Nature of Business:</strong> {personalDetails.nature_of_business || 'N/A'}</p>
                <p><strong>Service Type:</strong> {personalDetails.service_type || 'N/A'}</p>
                <p><strong>Other Income:</strong> {personalDetails.other_income || 'N/A'}</p>
                <p><strong>GST and ITR Income:</strong> {personalDetails.gst_and_itr_income || 'N/A'}</p>
                <p><strong>GST/ITR Filed:</strong> {personalDetails.gst_itr_filed || 'N/A'}</p>
                <p><strong>Inhand Salary:</strong> {personalDetails.inhand_salary || 'N/A'}</p>
                <p><strong>Years at Current Organization:</strong> {personalDetails.years_at_current_organization || 'N/A'}</p>
                <p><strong>Years at Current Residence:</strong> {personalDetails.years_at_current_residence || 'N/A'}</p>
                <p><strong>Total Time in Delhi:</strong> {personalDetails.total_time_in_delhi || 'N/A'}</p>
                <p><strong>Loan Category:</strong> {personalDetails.loan_category || 'N/A'}</p>
                <p><strong>Type of Loan:</strong> {personalDetails.type_of_loan || 'N/A'}</p>
                <p><strong>Required Amount:</strong> {personalDetails.required_amount || 'N/A'}</p>
                <p><strong>Permanent Address:</strong> {personalDetails.permanent_address || 'N/A'}</p>
                <p><strong>Permanent Address Landmark:</strong> {personalDetails.permanent_address_landmark || 'N/A'}</p>
                <p><strong>Current Address:</strong> {personalDetails.current_address || 'N/A'}</p>
                <p><strong>Office Name:</strong> {personalDetails.office_name || 'N/A'}</p>
                <p><strong>Office Address:</strong> {personalDetails.office_address || 'N/A'}</p>
                <p><strong>Office Address Landmark:</strong> {personalDetails.office_address_landmark || 'N/A'}</p>
                <p><strong>Personal Email ID:</strong> {personalDetails.personal_email_id || 'N/A'}</p>
                <p><strong>Official Email ID:</strong> {personalDetails.official_email_id || 'N/A'}</p>
                <p><strong>Type of Resident:</strong> {personalDetails.type_of_resident || 'N/A'}</p>
                <p><strong>Years at current Residence:</strong> {personalDetails.years_at_current_residence || 'N/A'}</p>
                <p><strong>Years at current Organization:</strong> {personalDetails.years_at_current_organization || 'N/A'}</p>
                {/* Add more fields as necessary */}
              </div>
            ) : (
              <p>Loading personal details...</p>
            )}
          </div>
        </div>
      </div>

      {/* Document Section */}
      <div className="card mt-2">
        <div className="card-header">
          <h5 className="mb-0">
            <button className="btn btn-link" onClick={() => toggleSection(1)}>
              Document
            </button>
          </h5>
        </div>
        <div className={`collapse ${activeIndex === 1 ? 'show' : ''}`}>
          <div className="card-body">
            {documents.length > 0 ? (
              <ul className="list-group">
                {documents.map((doc) => (
                  <li key={doc._id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{doc.document_name}</span>
                    <a href={doc.readUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary mr-2">
                      View
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No documents found.</p>
            )}
          </div>
        </div>
      </div>

      {/* RM Details Section */}
      <div className="card mt-2">
        <div className="card-header">
          <h5 className="mb-0">
            <button className="btn btn-link" onClick={() => toggleSection(2)}>
              RM Details
            </button>
          </h5>
        </div>
        <div className={`collapse ${activeIndex === 2 ? 'show' : ''}`}>
          <div className="table-responsive">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Bank Name</th>
                  <th>RM Name</th>
                  <th>RM Contact No</th>
                  <th>Email 1</th>
                  <th>Email 2</th>
                  <th>Remarks</th>
                  <th>Document Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {bankDetails.map((detail, index) => (
                  <tr key={detail._id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedBankDetails.includes(index)}
                        onChange={() => handleSelectChange(index)}
                      />
                    </td>
                    <td>{detail.bank_name}</td>
                    <td>{detail.rm1_name}</td>
                    <td>{detail.rm1_contact_number}</td>
                    <td>{detail.email_1}</td>
                    <td>{detail.email_2 || 'N/A'}</td>
                    <td>{detail.remarks}</td>
                    <td>{detail.document_status}</td>
                    <td>
                      <button className="btn btn-primary btn-sm" onClick={() => handleEdit(index)}>
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className='text-center'>
      <button className="btn btn-secondary mt-3 me-2" onClick={handleBack}>
        Back
      </button>
      <button className="btn btn-primary mt-3" onClick={handleSave}>
        Share with RM
      </button>
      </div>
    </div>
  );
};

export default Banklogindetails;
