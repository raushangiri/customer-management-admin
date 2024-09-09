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
  const { formData, setFormData } = useOverview();
  const [showModal, setShowModal] = useState(false);
  const [notInterestedReason, setNotInterestedReason] = useState('');
  const [remarks, setRemarks] = useState('');
  const baseurl = process.env.REACT_APP_API_BASE_URL;

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

  const userId = localStorage.getItem('userId');

  const NotInterestedOptions = {
    notInterested: [
      'No need Loan',
      'Need after 1 Month',
      'Abuse on Call',
      'Do not want to provide details',
      'Threat to complain',
      'Asked not to call again',
    ],
  };

  const handleInterestChange = (e) => {
    const value = e.target.value;
    setIsInterested(value);
    setFormData({ ...formData, is_interested: value });

    if (value === 'NotInterested') {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    setShowModal(false);
  };

  useEffect(() => {
    if (formData) {
      fetchDocumentList();
    }
  }, [formData]);

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setSelectedDocuments((prev) => (checked ? [...prev, value] : prev.filter((doc) => doc !== value)));
  };

  const handleCallStatusChange = (e) => {
    setCallStatus(e.target.value);
    setDisposition('');
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

    const documentListFormatted = selectedDocuments.map((doc) => ({
      document_name: doc,
      document_url: '', // Placeholder
    }));

    const payload = {
      call_status: callStatus,
      disposition,
      user_id: userId,
      expected_to_send_document_by: expectedDocumentDate,
      document_list: documentListFormatted,
      remark,
      file_number: formData.file_number,
    };

    try {
      await axios.post(`${baseurl}/createdesposition/${formData.file_number}`, payload);
      resetForm();
    } catch (error) {
      console.error('Error creating disposition', error);
    }
  };

  const resetForm = () => {
    setCallStatus('');
    setDisposition('');
    setSelectedDocuments([]);
    setExpectedDocumentDate('');
    setRemark('');
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

          {callStatus === 'connected' && (
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

              {showModal && (
                <div className="modal fade show" style={{ display: 'block' }}>
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title">Reason for Not Interested</h5>
                        <button
                          type="button"
                          className="btn-close"
                          onClick={() => setShowModal(false)}
                        ></button>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={handleModalSubmit}>
                          <div className="mb-3">
                            <label htmlFor="notInterestedReason" className="form-label">Select Reason</label>
                            <select
                              className="form-select"
                              id="notInterestedReason"
                              value={notInterestedReason}
                              onChange={(e) => setNotInterestedReason(e.target.value)}
                            >
                              <option value="">Select Reason</option>
                              {NotInterestedOptions.notInterested.map((reason, index) => (
                                <option key={index} value={reason}>
                                  {reason}
                                </option>
                              ))}
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
                            <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                              Close
                            </button>
                            <button type="submit" className="btn btn-primary">
                              Submit
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              )}
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
                  <option value="Follow-up">Follow-up</option>
                  <option value="Document shared">Document shared</option>
                  <option value="Do not want to share">Do not want to share</option>
                  <option value="Don’t have document">Don’t have document/will share later</option>
                </select>
              </div>

              {(disposition === 'Asked to share documents' || disposition === 'Asked to share additional documents') && (
                <div className="col-md-6">
                  <label htmlFor="expectedDocumentDate" className="form-label fw-bold">Expected to send document by</label>
                  <input
                    type="date"
                    className="form-control"
                    id="expectedDocumentDate"
                    value={expectedDocumentDate}
                    onChange={handleExpectedDocumentDateChange}
                  />
                </div>
              )}

              {(disposition === 'Asked to share additional documents' || disposition === 'Document shared') && (
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
                          value={doc.document_name}
                          id={`document_${index}`}
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor={`document_${index}`}>
                          {doc.document_name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="col-md-12">
                <label htmlFor="remark" className="form-label fw-bold">Remark</label>
                <textarea
                  className="form-control"
                  id="remark"
                  value={remark}
                  onChange={handleRemarkChange}
                  placeholder="Enter remark"
                  required
                />
              </div>
            </>
          )}
        </div>

        <div className="mb-3 row">
          <div className="col-md-12">
            <button type="submit" className="btn btn-primary">Submit</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Disposition;
