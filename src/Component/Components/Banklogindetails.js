import React, { useState,useEffect  } from 'react';
import { useOverview } from '../ContentHook/OverviewContext';
import axios from 'axios';

const Banklogindetails = () => {
    const [activeIndex, setActiveIndex] = useState(null);
    const [loginStatus, setLoginStatus] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedReason, setSelectedReason] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [bankNames, setBankNames] = useState([]);
    const [remarks, setRemarks] = useState('');
    const [email1, setEmail1] = useState('');
    const [email2, setEmail2] = useState('');
    const [documentStatus, setDocumentStatus] = useState('');
    const baseurl = process.env.REACT_APP_API_BASE_URL;
    const { formData, handleSubmit } = useOverview();
    const userId = localStorage.getItem('userId');
    const [bankLoginDetails, setBankLoginDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [personalDetails, setPersonalDetails] = useState(null);
    const [documents, setDocuments] = useState(null);
    const [bankDetail, setBankDetail] = useState({});

    const [error1, setError1] = useState(null);
    
    

    const toggleSection = (index) => {
        // Toggle the current section
        setActiveIndex(activeIndex === index ? null : index);
    };


    useEffect(() => {
        const fetchPersonalDetails = async () => {
          try {
            const response = await axios.get(`${baseurl}/getpersonadetails/${formData.file_number}`);
            setPersonalDetails(response.data.data); // Assuming the API returns the data in response.data.data
          } catch (error) {
            console.error('Error fetching personal details:', error);
          }
        };
    
        if (formData.file_number) {
          fetchPersonalDetails();
        }
      }, [formData.file_number]
    );


    useEffect(() => {
        const fetchBankDetails = async () => {
          try {
            const response = await axios.get(`${baseurl}/getbanklogindetails/${formData.file_number}`);
            const { data } = response;
    
            // Populate form fields with the fetched data
            setBankDetail(data);
            setEmail2(data.email2 || '');
            setRemarks(data.remarks || '');
            // setLoading(false);
          } catch (err) {
            // setError1('Error fetching bank details'); // Set error1
            // setLoading(false);
          }
        };
    
        fetchBankDetails();
      }, [formData.file_number]);
    
      // Handle form submission (edit/save)
      const handleSave = async () => {
        // try {
        //   const updatedDetails = {
        //     ...bankDetail,
        //     email2,
        //     remarks,
        //   };
    
        //   // Send a PUT request to update the bank details
        //   await axios.post(`http://localhost:3007/api/v1/getbanklogindetails/${formData.file_number}`, updatedDetails);
        //   alert('Bank details updated successfully!');
        // } catch (err) {
        //   setError1('Error updating bank details'); // Set error1
        // }
      };
   

    useEffect(() => {
        const fetchDocuments = async () => {
          try {
            const response = await axios.get(`${baseurl}/getdocumentdata/${formData.file_number}`);
            setDocuments(response.data.attachments);
            // setLoading(false);
          } catch (err) {
            setError('Error fetching document data');
            // setLoading(false);
          }
        };
    
        fetchDocuments();
      }, [formData.file_number]);
    
      // if (loading) {
      //   return <p>Loading...</p>;
      // }
    
      // if (error) {
      //   return <p>{error}</p>;
      // }
    return (
        <div className="container mt-4">
            {/* Personal Details Section */}
            <div className="card">
        <div className="card-header">
          <h5 className="mb-0">
            <button
              className="btn btn-link"
              onClick={() => toggleSection(0)}
              aria-expanded={activeIndex === 0 ? "true" : "false"}
            >
              Personal Details
            </button>
          </h5>
        </div>
        <div className={`collapse ${activeIndex === 0 ? "show" : ""}`}>
          <div className="card-body">
            {personalDetails ? (
              <div>
                <p><strong>File Number:</strong> {personalDetails.file_number}</p>
                <p><strong>Name:</strong> {personalDetails.name || 'N/A'}</p>
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
            <button
              className="btn btn-link"
              onClick={() => toggleSection(1)}
              aria-expanded={activeIndex === 1 ? "true" : "false"}
            >
              Document
            </button>
          </h5>
        </div>
        <div className={`collapse ${activeIndex === 1 ? "show" : ""}`}>
          <div className="card-body">
            {documents.length > 0 ? (
              <ul className="list-group">
                {documents.map((document) => (
                  <li key={document._id} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>{document.document_name}</span> {/* Displaying document name */}
                    <div>
                      <a href={document.readUrl} target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-primary mr-2">
                        View
                      </a>
                      {/* <button
                        onClick={() => handleDelete(document._id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button> */}
                    </div>
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
          <button
            className="btn btn-link"
            onClick={() => toggleSection(2)}
            aria-expanded={activeIndex === 2 ? "true" : "false"}
          >
            RM Details
          </button>
        </h5>
      </div>
      <div className={`collapse ${activeIndex === 2 ? "show" : ""}`}>
        <div className="card-body">
          {/* RM Name */}
          <div className="col-md-6 form-group mt-3">
            <label htmlFor="rm1_name">RM Name:</label>
            <input
              id="rm1_name"
              type="text"
              className="form-control"
              value={bankDetail.rm1_name || ''}
              onChange={(e) => setBankDetail((prev) => ({ ...prev, rm1_name: e.target.value }))}
            />
          </div>

          {/* RM Contact Number */}
          <div className="col-md-6 form-group mt-3">
            <label htmlFor="rm1_contact_number">RM Contact No:</label>
            <input
              id="rm1_contact_number"
              type="text"
              className="form-control"
              value={bankDetail.rm1_contact_number || ''}
              onChange={(e) => setBankDetail((prev) => ({ ...prev, rm1_contact_number: e.target.value }))}
            />
          </div>

          {/* Email 1 */}
          <div className="col-md-6 form-group mt-3">
            <label htmlFor="email_1">Email 1:</label>
            <input
              id="email_1"
              type="email"
              className="form-control"
              value={bankDetail.email_1}
              onChange={(e) => setBankDetail((prev) => ({ ...prev, email_1: e.target.value }))}
            />
          </div>

          {/* Email 2 */}
          <div className="col-md-6 form-group mt-3">
            <label htmlFor="email2">Email 2:</label>
            <input
              id="email2"
              type="email"
              className="form-control"
              value={email2}
              onChange={(e) => setEmail2(e.target.value)}
            />
          </div>

          {/* Remarks */}
          <div className="col-md-6 form-group">
            <label htmlFor="remark">Message</label>
            <textarea
              className="form-control"
              id="remarks"
              placeholder="Enter Messages"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
            />
          </div>

          {/* Save Button */}
          <button className="btn btn-primary mt-3" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
        </div>
    );
};

export default Banklogindetails;
