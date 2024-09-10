import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOverview } from '../ContentHook/OverviewContext';

const Disposition = () => {
  const [callStatus, setCallStatus] = useState('');
  const [isInterested, setIsInterested] = useState('');
  const [disposition, setDisposition] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [documentList, setDocumentList] = useState([]);
  const [expectedDocumentDate, setExpectedDocumentDate] = useState('');
  const [remark, setRemark] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [notInterestedReason, setNotInterestedReason] = useState('');
  const [remarks, setRemarks] = useState('');
  const [fileStatus, setFileStatus] = useState('');
  const [modalFileStatus, setModalFileStatus] = useState('');

  const baseurl = process.env.REACT_APP_API_BASE_URL;
  const { mobileNumber, fetchFileData, formData, setFormData } = useOverview();

  const fileNumber = formData.file_number;

  const fetchDocumentList = async () => {
    try {
      const response = await axios.post(`${baseurl}/getdocuments`, {
        type_of_loan: formData.type_of_loan,
        loan_category: formData.loan_category,
      });
      setDocumentList(Array.isArray(response.data.documents) ? response.data.documents : [response.data.documents]);
    } catch (error) {
      console.error('Error fetching document list', error);
    }
  };

  const NotInterestedOptions = [
    'No need Loan',
    'Need after 1 Month',
    'Abuse on Call',
    'Do not want to provide details',
    'Threat to complain',
    'Asked not to call again',
  ];

  useEffect(() => {
    fetchDocumentList();
  }, []);

  const handleInterestChange = (e) => {
    const value = e.target.value;
    setIsInterested(value);

    if (value === 'NotInterested') {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedDocuments((prev) => (checked ? [...prev, value] : prev.filter((doc) => doc !== value)));
  };

  const handleCallStatusChange = (e) => {
    setCallStatus(e.target.value);
    setIsInterested('');
    setDisposition('');
  };

  const handleDispositionChange = (e) => {
    setDisposition(e.target.value);
  };

  const handleRemarkChange = (e) => {
    setRemark(e.target.value);
  };

  const handleFileStatusChange = (e) => {
    setFileStatus(e.target.value);
  };

  const handleModalFileStatusChange = (e) => {
    setModalFileStatus(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const documentListFormatted = selectedDocuments.map((doc) => ({
      document_name: doc,
      document_url: '', // Placeholder
    }));

    const userId = localStorage.getItem('userId');
    const userRole = localStorage.getItem('userRole');

    const payload = {
      userId: userId,
      role: userRole,
      call_status: callStatus,
      is_interested: isInterested,
      disposition,
      selected_documents: documentListFormatted,
      expected_document_date: expectedDocumentDate,
      not_interested_reason: notInterestedReason,
      remarks,
      file_status: isInterested === 'NotInterested' ? modalFileStatus : fileStatus,
      file_number: fileNumber,
    };

    try {
      await axios.post(`${baseurl}/createdesposition`, payload);
      resetForm();
    } catch (error) {
      console.error('Error creating disposition', error);
    }
  };

  const resetForm = () => {
    setCallStatus('');
    setIsInterested('');
    setDisposition('');
    setSelectedDocuments([]);
    setExpectedDocumentDate('');
    setRemark('');
    setFileStatus('');
    setModalFileStatus('');
  };

  return (
    <div className="tab-pane active">
      <form onSubmit={handleSubmit}>
        <div className="mb-3 row">
          <div className="col-md-6">
            <label htmlFor="callStatus" className="form-label fw-bold">Call Status</label>
            <select className="form-select" id="callStatus" value={callStatus} onChange={handleCallStatusChange}>
              <option value="">Select</option>
              <option value="Connected">Connected</option>
              <option value="Not Connected">Not Connected</option>
            </select>
          </div>

          {callStatus === 'Connected' && (
            <>
              <div className="col-md-6">
                <label htmlFor="isInterested" className="form-label fw-bold">Is Interested?</label>
                <select
                  className="form-select"
                  id="isInterested"
                  value={isInterested}
                  onChange={handleInterestChange}
                >
                  <option value="">Select</option>
                  <option value="Interested">Interested</option>
                  <option value="NotInterested">Not Interested</option>
                </select>
              </div>

              {isInterested === 'NotInterested' && showModal && (
                <div className="modal fade show" style={{ display: 'block' }}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Reason for Not Interested</h5>
                        <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                          <div className="mb-3">
                            <label htmlFor="notInterestedReason" className="form-label">Select Reason</label>
                            <select
                              className="form-select"
                              id="notInterestedReason"
                              value={notInterestedReason}
                              onChange={(e) => setNotInterestedReason(e.target.value)}
                            >
                              <option value="">Select Reason</option>
                              {NotInterestedOptions.map((reason, index) => (
                                <option key={index} value={reason}>{reason}</option>
                              ))}
                            </select>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="modalFileStatus" className="form-label">File Status</label>
                            <select
                              className="form-select"
                              id="modalFileStatus"
                              value={modalFileStatus}
                              onChange={handleModalFileStatusChange}
                            >
                              <option value="">Select</option>
                              <option value="details_not_completed">Details not completed</option>
                              <option value="ready_to_tvr">Ready to TVR</option>
                              <option value="tvr_rejected">TVR Rejected</option>
                              <option value="reassigned_to_salesagent">Reassign to Sales Team</option>
                              <option value="process_to_cdr">Process to CDR</option>
                              <option value="cdr_rejected">CDR Rejected</option>
                              <option value="process_to_login_team">Process to Login Team</option>
                              <option value="bank_login_rejected">Bank Login Rejected</option>
                            </select>
                          </div>
                          <div className="mb-3">
                            <label htmlFor="remarks" className="form-label">Remarks</label>
                            <textarea
                              className="form-control"
                              id="remarks"
                              value={remarks}
                              onChange={(e) => setRemarks(e.target.value)}
                              placeholder="Enter remarks"
                              required
                            />
                          </div>
                          <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Submit</button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}

{isInterested === 'Interested' && (
  <>
    <div className="col-md-6">
      <label htmlFor="disposition" className="form-label fw-bold">Disposition</label>
      <select
        className="form-select"
        id="disposition"
        value={disposition}
        onChange={handleDispositionChange}
      >
        <option value="">Select</option>
        <option value="Asked to share documents">Asked to share documents</option>
        <option value="Asked to share additional documents">Asked to share additional documents</option>
        <option value="Document shared">Document shared</option>
        <option value="Follow-up">Follow-up</option>
        <option value="Do not want to share">Do not want to share</option>
      </select>
    </div>

    {/* Display document list if disposition requires documents */}
    {disposition === 'Asked to share documents' || disposition === 'Asked to share additional documents' || disposition === 'Document shared' ? (
      <>
        <div className="col-md-6">
          <label className="form-label fw-bold">Documents</label>
          <div className="form-check">
            {documentList.map((doc, index) => (
              <div key={index} className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id={`document-${index}`}
                  value={doc}
                  checked={selectedDocuments.includes(doc)}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor={`document-${index}`}>
                  {doc}
                </label>
              </div>
            ))}
          </div>
        </div>

        <div className="col-md-6">
          <label htmlFor="expectedDocumentDate" className="form-label fw-bold">Expected Document Date</label>
          <input
            type="date"
            className="form-control"
            id="expectedDocumentDate"
            value={expectedDocumentDate}
            onChange={(e) => setExpectedDocumentDate(e.target.value)}
            required
          />
        </div>
        <div className="col-md-6">
              <label htmlFor="remark" className="form-label fw-bold">Remarks</label>
              <textarea
                className="form-control"
                id="remark"
                value={remark}
                onChange={handleRemarkChange}
                placeholder="Enter remarks"
                required
              />
            </div>
      </>
    ) : null}
  </>
)}

            </>
          )}

          {callStatus === 'Not Connected' && (
            <div className="col-md-6">
              <label htmlFor="remark" className="form-label fw-bold">Remarks</label>
              <textarea
                className="form-control"
                id="remark"
                value={remark}
                onChange={handleRemarkChange}
                placeholder="Enter remarks"
                required
              />
            </div>
          )}

          <div className="col-md-6">
            <label htmlFor="fileStatus" className="form-label fw-bold">File Status</label>
            <select className="form-select" id="fileStatus" value={fileStatus} onChange={handleFileStatusChange}>
              <option value="">Select</option>
              <option value="details_not_completed">Details not completed</option>
              <option value="ready_to_tvr">Ready to TVR</option>
              <option value="tvr_rejected">TVR Rejected</option>
              <option value="reassigned_to_salesagent">Reassign to Sales Team</option>
              <option value="process_to_cdr">Process to CDR</option>
              <option value="cdr_rejected">CDR Rejected</option>
              <option value="process_to_login_team">Process to Login Team</option>
              <option value="bank_login_rejected">Bank Login Rejected</option>
            </select>
          </div>
        </div>

        <div className="mt-3">
          <button type="submit" className="btn btn-primary">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Disposition;
