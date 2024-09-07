import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOverview } from '../ContentHook/OverviewContext';

const Disposition = () => {
  const [callStatus, setCallStatus] = useState('');
  const [disposition, setDisposition] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [documentList, setDocumentList] = useState([]);
  const [expectedDocumentDate, setExpectedDocumentDate] = useState('');
  const [remark, setRemark] = useState('');
  const [fileNumber, setFileNumber] = useState(''); // Make sure to set this appropriately
  const { formData, setFormData } = useOverview();
  const baseurl = process.env.REACT_APP_API_BASE_URL;

  const fetchDocumentList = async () => {
    try {
      const response = await axios.post(`${baseurl}/getdocuments`, {
        type_of_loan: formData.type_of_loan,
        loan_category: formData.loan_category
      });
      setDocumentList(Array.isArray(response.data.documents) ? response.data.documents : [response.data.documents]);
    } catch (error) {
      console.error("Error fetching document list", error);
    }
  };
 // Retrieve the accessToken from localStorage
const userId = localStorage.getItem('userId');




  useEffect(() => {
    if (formData) {
      fetchDocumentList();
    }
  }, [formData]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedDocuments((prev) =>
      checked ? [...prev, value] : prev.filter((doc) => doc !== value)
    );
  };

  const handleCallStatusChange = (e) => {
    setCallStatus(e.target.value);
    setDisposition(''); // Reset disposition when call status changes
  };

  const handleDispositionChange = (e) => {
    setDisposition(e.target.value);
  };

  const handleExpectedDocumentDateChange = (e) => {
    setExpectedDocumentDate(e.target.value);
  };

  const handleRemarkChange = (e) => {
    setRemark(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const documentListFormatted = selectedDocuments.map(doc => ({
      document_name: doc,
      document_url: '' // Placeholder, adjust if necessary to include actual URLs
    }));

    const payload = {
      call_status: callStatus,
      disposition: disposition,
      user_id: userId, // Assuming user_id is in formData
      expected_to_send_document_by: expectedDocumentDate,
      document_list: documentListFormatted,
      remark: remark,
      file_number: formData.file_number
    };

    try {
      await axios.post(`${baseurl}/createdesposition/${formData.file_number}`, payload);
      // Handle success (e.g., show a message or redirect)
      resetForm(); // Reset the form after successful submission
    } catch (error) {
      console.error("Error creating disposition", error);
      // Handle error (e.g., show an error message)
    }
  };

  // Function to reset the form fields
  const resetForm = () => {
    setCallStatus('');
    setDisposition('');
    setSelectedDocuments([]);
    setExpectedDocumentDate('');
    setRemark('');
    setFileNumber('');
  };

  return (
    <div className="tab-pane active">
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <div className="col-md-6">
            <label htmlFor="callStatus" className="form-label fw-bold">Call Status</label>
            <select className="form-select" id="callStatus" value={callStatus} onChange={handleCallStatusChange}>
              <option value="">Select</option>
              <option value="connected">Connected</option>
              <option value="not_connected">Not Connected</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="disposition" className="form-label fw-bold">Disposition</label>
            <select className="form-select" id="disposition" value={disposition} onChange={handleDispositionChange}>
              <option value="">Select</option>
              {callStatus === 'not_connected' ? (
                <>
                  <option value="busy">Busy</option>
                  <option value="rnr">RNR</option>
                  <option value="call_drop">Call Drop</option>
                  <option value="switched_off">Switched Off</option>
                </>
              ) : (
                <>
                  <option value="Asked to share documents">Asked to share documents</option>
                  <option value="Asked to share additional documents">Asked to share additional documents</option>
                  <option value="Follow-up">Follow-up</option>
                  <option value="Document shared">Document shared</option>
                  <option value="Do not want to share">Do not want to share</option>
                  <option value="Don’t have document">Don’t have document/will share later</option>
                </>
              )}
            </select>
          </div>
          {(disposition === 'Asked to share documents' || disposition === 'Asked to share additional documents' || disposition === 'follow-up' || disposition === 'Don’t have document') && (
            <div className="col-md-6">
              <label htmlFor="expectedDocumentDate" className="form-label fw-bold">Expected to send document by</label>
              <input type="date" className="form-control" id="expectedDocumentDate" value={expectedDocumentDate} onChange={handleExpectedDocumentDateChange} />
            </div>
          )}
          {(disposition === 'Asked to share additional documents' || disposition === 'Document shared' || disposition === 'Asked to share documents') && (
            <div className="col-md-6">
              <label htmlFor="documentList" className="form-label fw-bold">Document List</label>
              <div
                id="documentList"
                style={{
                  maxHeight: '200px',
                  overflowY: 'scroll',
                  border: '1px solid #ccc',
                  padding: '10px',
                  borderRadius: '5px',
                }}
              >
                {documentList.map((doc, index) => (
                  <div key={index} className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={`doc-${index}`}
                      value={doc}
                      checked={selectedDocuments.includes(doc)}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor={`doc-${index}`}>
                      {doc}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}
          {(disposition !== 'Asked to share additional documents' && disposition !== 'Document shared') && disposition && (
            <div className="col-md-6">
              <label htmlFor="remark" className="form-label fw-bold">Reason</label>
              <textarea type="text" className="form-control" id="remark" placeholder="Enter remark" value={remark} onChange={handleRemarkChange} />
            </div>
          )}
          <div className="col-md-6">
            <label htmlFor="fileStatus" className="form-label fw-bold">File Status</label>
            <select className="form-select" id="fileStatus">
              <option value="">Select</option>
              <option value="process_to_tvr">Process to TVR</option>
              <option value="process_to_cdr">Process to CDR</option>
              <option value="process_to_login_team">Process to Login Team</option>
            </select>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default Disposition;
