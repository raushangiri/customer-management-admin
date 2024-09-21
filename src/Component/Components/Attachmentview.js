import React, { useState,useEffect } from 'react';
import { useOverview } from '../ContentHook/OverviewContext';
import axios from 'axios';

const Attachmentview = () => {
  // Sample document data
  // const documents = [
  //   { id: 1, name: 'Document 1', url: '/path/to/document1.pdf' },
  //   { id: 2, name: 'Document 2', url: '/path/to/document2.pdf' },
  //   { id: 3, name: 'Document 3', url: '/path/to/document3.pdf' },
  // ];

  // State to manage modal visibility and selected document
  const [showModal, setShowModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documents, setDocuments] = useState([]);
  const { mobileNumber, setMobileNumber, formData, setFormData, fetchFileData } = useOverview();
  const baseurl = process.env.REACT_APP_API_BASE_URL;
  const [error, setError] = useState(null);
  // Function to handle opening the modal and setting the selected document
  const handleViewAttachment = (document) => {
    setSelectedDocument(document);
    setShowModal(true);
  };

  // Function to handle closing the modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDocument(null);
  };


  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get(`${baseurl}/getdocumentdata/${formData.file_number}`);
        setDocuments(response.data.attachments);
      } catch (err) {
        setError('Error fetching document data');
        // setLoading(false);
      }
    };

    fetchDocuments();
  }, [formData.file_number]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Attachment View</h2>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
          <th scope="col">#</th>
          <th>Document Type</th>
            <th>Document Name</th>
           
            <th>View Document</th>
            <th>Uploaded At</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc,index) => (
            <tr key={doc._id}>
              <th scope="row">{index + 1}</th>
              {/* <td>{doc.file_number}</td> */}
              <td>{doc.document_type}</td>
              <td>{doc.document_name}</td>
              {/* <td>
                <a href={doc.downloadUrl} target="_blank" rel="noopener noreferrer"type="button" class="btn btn-outline-secondary">
                  Download
                </a>
              </td> */}
              <td>
                <a href={doc.readUrl} target="_blank" rel="noopener noreferrer" type="button" class="btn btn-outline-secondary">
                  View
                </a>
              </td>
              <td>{new Date(doc.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal to display the document */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {selectedDocument ? selectedDocument.name : 'Attachment'}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                {selectedDocument ? (
                  <iframe
                    src={selectedDocument.url}
                    title={selectedDocument.name}
                    width="100%"
                    height="400px"
                  />
                ) : (
                  <p>No document selected.</p>
                )}
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Attachmentview;
