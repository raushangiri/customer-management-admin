import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { statuses, bank_details } from '../../Component/Bank-login/Data'; // Adjust the path if necessary


const Attachments = () => {
    
    const [selectedDocumentType, setSelectedDocumentType] = useState('');
    const [uploadedDocuments, setUploadedDocuments] = useState([]);
    const [showModal1, setShowModal1] = useState(false);
    const [selectedDocumentFile, setSelectedDocumentFile] = useState(null);

   

    const handleDocumentTypeChange = (event) => {
        setSelectedDocumentType(event.target.value);
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setUploadedDocuments([...uploadedDocuments, { type: selectedDocumentType, file }]);
        }
    };
    const handleDocumentUpload = (event) => {
        event.preventDefault();
        setSelectedDocumentType('');
    };

    const handleViewDocument = (doc) => {
        const fileURL = URL.createObjectURL(doc.file);
        setSelectedDocumentFile(fileURL);
        setShowModal1(true);
    };

    const handleDeleteDocument = (index) => {
        const updatedDocuments = uploadedDocuments.filter((_, i) => i !== index);
        setUploadedDocuments(updatedDocuments);
    };

  return (
    <>
    <div className="tab-pane active">
                        <form onSubmit={handleDocumentUpload}>
                            <div className="mb-3 row">
                                <div className="col-md-6">
                                    <label htmlFor="documentType" className="form-label fw-bold">Select Document Type</label>
                                    <select className="form-select" id="documentType" value={selectedDocumentType} onChange={handleDocumentTypeChange}>
                                        <option value="">Select</option>
                                        <option value="photo_document">Photo Document</option>
                                        <option value="pan_card_document">PAN Card Document</option>
                                        <option value="aadhaar_card_document">Aadhaar Card Document</option>
                                        <option value="rc_document">RC Document</option>
                                        <option value="insurance_document">Insurance Document</option>
                                        <option value="loan_track_document">Loan Track Document</option>
                                        <option value="emi_debit_banking_document">Latest Six Months EMI Debit Banking Document</option>
                                        <option value="income_docs">Income Documents</option>
                                        <option value="e_bill_document">E-Bill Document</option>
                                        <option value="rent_agreement_document">Rent Agreement with Owner E-Bill (if rented)</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="documentFile" className="form-label fw-bold">Upload Document</label>
                                    <input type="file" className="form-control" id="documentFile" onChange={handleFileChange} multiple />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary">
                                Upload
                            </button>
                        </form>

                        <div className="mt-4">
                            <h5 className="fw-bold">Uploaded Documents</h5>
                            <ul className="list-group">
                                {uploadedDocuments.map((doc, index) => (
                                    <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                        {doc.type}
                                        <div>
                                            <button className="btn btn-outline-primary btn-sm me-2" onClick={() => handleViewDocument(doc)}>
                                                <i className="bi bi-eye"></i> View
                                            </button>
                                            <button className="btn btn-outline-danger btn-sm" onClick={() => handleDeleteDocument(index)}>
                                                <i className="bi bi-trash"></i> Delete
                                            </button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {showModal1 && (
                            <div className="modal fade show" style={{ display: 'block' }}>
                                <div className="modal-dialog modal-lg">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title">View Document</h5>
                                            <button
                                                type="button"
                                                className="btn-close"
                                                onClick={() => setShowModal1(false)}
                                            ></button>
                                        </div>
                                        <div className="modal-body">
                                            <embed src={selectedDocumentFile} width="100%" height="500px" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
    </>
  )
}

export default Attachments