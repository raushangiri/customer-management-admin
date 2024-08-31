import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { statuses, bank_details } from '../../Component/Bank-login/Data'; // Adjust the path if necessary

const Disposition = () => {
    const [activeTab, setActiveTab] = useState('details');
    const [references, setReferences] = useState([]);
    const [newReference, setNewReference] = useState({ name: '', mobileNumber: '', address: '' });
    const [loandetail, setloandetail] = useState({ bankName: '', emiAmount: '', emiDate: '', loanstartDate: '', noofemiBounces: '', bouncesReason: '', carDetails: '' });
  
    const [selectedLoanType, setSelectedLoanType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isInterested, setIsInterested] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [notInterestedReason, setNotInterestedReason] = useState('');
    const [remarks, setRemarks] = useState('');
    const [selectedDocumentType, setSelectedDocumentType] = useState('');
    const [uploadedDocuments, setUploadedDocuments] = useState([]);
    const [showModal1, setShowModal1] = useState(false);
    const [selectedDocumentFile, setSelectedDocumentFile] = useState(null);
    const [callStatus, setCallStatus] = useState('');
    const [disposition, setDisposition] = useState('');
    const [selectedDocuments, setSelectedDocuments] = useState([]);
  
  
    const documentTypes = [
      { value: 'photo_document', label: 'Photo Document' },
      { value: 'pan_card_document', label: 'PAN Card Document' },
      { value: 'aadhaar_card_document', label: 'Aadhaar Card Document' },
      // Add other document types as needed
    ];
  
    // Handle checkbox change
    const handleCheckboxChange = (e) => {
      const { value, checked } = e.target;
      if (checked) {
        // Add document to the selected list
        setSelectedDocuments((prev) => [...prev, value]);
      } else {
        // Remove document from the selected list
        setSelectedDocuments((prev) => prev.filter((doc) => doc !== value));
      }
    };
  
    // Handle changes in Call Status
    const handleCallStatusChange = (e) => {
      setCallStatus(e.target.value);
      setDisposition(''); // Reset disposition when call status changes
    };
  
    // Handle changes in Disposition
    const handleDispositionChange = (e) => {
      setDisposition(e.target.value);
    };
  
  
    const handleDocumentTypeChange = (event) => {
      setSelectedDocumentType(event.target.value);
    };
  
    // Handle file input change
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        setUploadedDocuments([...uploadedDocuments, { type: selectedDocumentType, file }]);
      }
    };
  
    // Handle document upload (submit)
    const handleDocumentUpload = (event) => {
      event.preventDefault();
      // You can add additional logic here if needed.
      // For now, it just resets the form fields.
      setSelectedDocumentType('');
    };
  
    // Handle view document
    const handleViewDocument = (doc) => {
      const fileURL = URL.createObjectURL(doc.file);
      setSelectedDocumentFile(fileURL);
      setShowModal1(true);
    };
  
    // Handle delete document
    const handleDeleteDocument = (index) => {
      const updatedDocuments = uploadedDocuments.filter((_, i) => i !== index);
      setUploadedDocuments(updatedDocuments);
    };
  
  
    const handleAddReference = (e) => {
      e.preventDefault();
      setReferences([...references, newReference]);
      setNewReference({ name: '', mobileNumber: '', address: '' });
    };
  
  
    const loanMasterData = {
      'Auto Loan': ['External Bt', 'Internal Bt', 'Refinance', 'New Car', 'Sale Purchage'],
      'Business Loan': ['Proprietorship', 'Partnership', 'Pvt Ltd Firm'],
      'LAP Loan': ['Proprietorship', 'Partnership', 'Pvt Ltd Firm'],
      'Home Loan': ['Proprietorship', 'Partnership', 'Pvt Ltd Firm'],
      'Personal Loan': ['Personal Loan'],
      'Education Loan': ['Education Loan'],
      'Insurance': ['Insurance'],
      'Working capital Loan': ['Working capital Loan'],
      'Small Business Loan':['small business loan'],
      'Drop Down OD':['Drop Down OD']
    };
  
    const NotInterestedOptions = {
      notInterested: [
        'No need Loan',
        'Need after 1 Month',
        'Abuse on Call',
        'Do not want to provide details',
        'Threat to complain',
        'Asked not to call again',
      ]
    };
    const handleInterestChange = (e) => {
      const value = e.target.value;
      setIsInterested(value);
      if (value === 'NotIntrested') {
        setShowModal(true);
      } else {
        setShowModal(false);
      }
    };
  
    const handleModalSubmit = (e) => {
      e.preventDefault();
      // Handle form submission inside the modal
      console.log('Reason:', notInterestedReason);
      console.log('Remarks:', remarks);
      setShowModal(false);
    };
  
    // const handleLoanTypeChange = (e) => {
    //   setSelectedLoanType(e.target.value);
    //   setSelectedCategory(''); // Reset category when loan type changes
    // };
  
    // const [selectedLoanType, setSelectedLoanType] = useState('');
    // const [selectedCategory, setSelectedCategory] = useState('');
    const [documentList, setDocumentList] = useState([]);
  
    const handleLoanTypeChange = (event) => {
      setSelectedLoanType(event.target.value);
      setSelectedCategory('');
      setDocumentList([]);
    };
  
    const handleCategoryChange = (event) => {
      const category = event.target.value;
      setSelectedCategory(category);
      const documents = documentsByLoanType[selectedLoanType][category] || [];
      setDocumentList(documents);
    };
  
  
    const documentsByLoanType = {
      "Home loan": {
        "PROPRIETORSHIP": [
          "PAN CARD",
          "AADHAAR CARD",
          "PHOTO",
          "GST CERTIFICATE",
          "MSME AND UDYAM",
          "OWNERSHIP PROOF",
          "2 YEAR FINANCIALS REQUIRED COMPANY (ITR, COI, PROFIT AND LOSS, BALANCE SHEET)",
          "1 YEAR GST RETURN 3B",
          "1 YEAR CURRENT ACCOUNT BANKING",
          "1 YEAR SAVING ACCOUNT BANKING",
          "LOAN SCHEDULE (IF ANY)",
          "CO-APP DOCS - PAN CARD, ADHAR CARD & photo",
          "COMPLETE PROPERTY PAPER WITH CHAIN",
          "Other Documents"
        ],
        "PARTNERSHIP": [
          "AADHAAR CARD (ALL PARTNERS)",
          "PHOTO (ALL PARTNERS)",
          "GST CERTIFICATE AND PARTNERSHIP DEED",
          "PAN CARD (ALL PARTNERS)",
          "OWNERSHIP PROOF",
          "2 YEAR FINANCIALS REQUIRED COMPANY (ITR, COI, PROFIT AND LOSS, BALANCE SHEET)",
          "1 YEAR GST RETURN 3B",
          "1 YEAR CURRENT ACCOUNT BANKING",
          "1 YEAR SAVING ACCOUNT BANKING (ALL PARTNERS)",
          "LOAN SCHEDULE (IF ANY)",
          "INDIVIDUAL ITR, COI ALL PARTNERS",
          "COMPLETE PROPERTY PAPER WITH CHAIN",
          "Other Documents"
        ],
        "PVT LTD FIRM": [
          "PAN CARD (ALL DIRECTORS)",
          "AADHAAR CARD (ALL DIRECTORS)",
          "PHOTO (ALL DIRECTORS)",
          "OWNERSHIP PROOF (ELECTRICITY BILL)",
          "COMPANY KYC (PAN, TAN, COI, LOD AND LOS, MOA AND AOA, GST CERTIFICATE, MSME)",
          "2 YEAR CA ATTESTED FINANCIALS REQUIRED COMPANY (ITR, COI, PROFIT AND LOSS, BALANCE SHEET, INDIPENDENT REPORT, DIRECTOR REPORT, 3CA 3CD)",
          "2 YEAR FORM 26AS (ALL DIRECTORS AND COMPANY)",
          "2 YEAR INDIVIDUAL FINANCIALS (ITR AND COI ALL DIRECTORS)",
          "1 YEAR ALL CURRENT ACCOUNT BANKING",
          "1 YEAR SAVING ACCOUNT BANKING (ALL DIRECTORS)",
          "COMPLETE PROPERTY PAPER WITH CHAIN",
          "Other Documents"
        ],
      },
      "Auto loan": {
        "External BT": [
          "PHOTO",
          "PAN CARD",
          "AADHAAR CARD",
          "RC BOTH SIDE",
          "INSURANCE",
          "LOAN TRACK",
          "LATEST 6 MONTHS EMI DEBIT BANKING REQD",
          "INCOME DOCS",
          "E-BILL",
          "IF RENTED REQD RENT AGREEMENT WITH OWNER E-BILL",
          "Other Documents"
        ],
        "Internal BT": [
          "PHOTO",
          "PAN CARD",
          "AADHAAR CARD",
          "RC BOTH SIDE",
          "INSURANCE",
          "LATEST 6 MONTHS EMI DEBIT BANKING REQD",
          "INCOME DOCS",
          "E-BILL",
          "IF RENTED REQD RENT AGREEMENT WITH OWNER E-BILL",
          "Other Documents"
        ],
        "Refinance": [
          "PHOTO",
          "PAN CARD",
          "AADHAAR CARD",
          "RC BOTH SIDE",
          "INSURANCE",
          "LATEST 6 MONTHS EMI DEBIT BANKING REQD",
          "INCOME DOCS",
          "E-BILL",
          "IF RENTED REQD RENT AGREEMENT WITH OWNER E-BILL",
          "Other Documents"
        ],
        "New Car": [
          "PHOTO",
          "PAN CARD",
          "AADHAAR CARD"
        ]
      }
    };
  return (
    <>
     <div className="tab-pane active">
            <form>
              {/* Call Status */}
              <div className="mb-3 row">
                <div className="col-md-6">
                  <label htmlFor="callStatus" className="form-label fw-bold">Call Status</label>
                  <select className="form-select" id="callStatus" value={callStatus} onChange={handleCallStatusChange}>
                    <option value="">Select</option>
                    <option value="connected">Connected</option>
                    <option value="not_connected">Not Connected</option>
                  </select>
                </div>

                {/* Disposition */}
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
                        <option value="share_documents">Asked to share documents</option>
                        <option value="additional_documents">Asked to share additional documents</option>
                        <option value="follow_up">Follow-up</option>
                        <option value="document_shared">Document shared</option>
                        <option value="no_share">Do not want to share</option>
                        <option value="no_document">Don’t have document/will share later</option>
                      </>
                    )}
                  </select>
                </div>

                {(disposition === 'share_documents' || disposition === 'additional_documents' || disposition === 'follow_up' || disposition === 'no_document') && (
                  <div className="col-md-6">
                    <label htmlFor="expectedDocumentDate" className="form-label fw-bold">Expected to send document by</label>
                    <input type="date" className="form-control" id="expectedDocumentDate" />
                  </div>
                )}
                {/* Document List */}
                {(disposition === 'additional_documents' || disposition === 'document_shared' || disposition === 'share_documents') && (

                  <div className="col-md-6">
                    <label htmlFor="documentList" className="form-label fw-bold">Document List</label>
                    <div
                      id="documentList"
                      style={{
                        maxHeight: '200px',
                        overflowY: 'scroll', // Add a vertical scrollbar if the content exceeds the max height
                        border: '1px solid #ccc', // Optional: Add a border for better visibility
                        padding: '10px',
                        borderRadius: '5px',
                      }}
                    >
                      {documentTypes.map((doc) => (
                        <div key={doc.value} className="form-check">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={doc.value}
                            value={doc.value}
                            checked={selectedDocuments.includes(doc.value)}
                            onChange={handleCheckboxChange}
                          />
                          <label className="form-check-label" htmlFor={doc.value}>
                            {doc.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                )}

                {/* Remark Field */}
                {(disposition !== 'additional_documents' && disposition !== 'document_shared') && disposition && (

                  <div className="col-md-6">
                    <label htmlFor="remark" className="form-label fw-bold">Reason</label>
                    <textarea type="text" className="form-control" id="remark" placeholder="Enter remark" />
                  </div>

                )}

                {/* File Status */}

                <div className="col-md-6">
                  <label htmlFor="fileStatus" className="form-label fw-bold">File Status</label>
                  <select className="form-select" id="fileStatus">
                    <option value="">Select</option>
                    <option value="process_to_tvr">Process to TVR</option>
                    <option value="process_to_cdr">Process to CDR</option>
                    <option value="process_to_login_team">Process to Login Team</option>
                  </select>
                </div>

                {/* Date Picker for Expected Document Date */}


              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
    </>
  )
}

export default Disposition