import React, { useState } from 'react';

const Attachmentview = () => {
  // Sample document data
  const documents = [
    { id: 1, name: 'Document 1', url: '/path/to/document1.pdf' },
    { id: 2, name: 'Document 2', url: '/path/to/document2.pdf' },
    { id: 3, name: 'Document 3', url: '/path/to/document3.pdf' },
  ];

  // State to manage modal visibility and selected document
  const [showModal, setShowModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

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

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Attachment View</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">S No</th>
            <th scope="col">Document Name</th>
            <th scope="col">View Attachment</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((document, index) => (
            <tr key={document.id}>
              <td>{index + 1}</td>
              <td>{document.name}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleViewAttachment(document)}
                >
                  View Attachment
                </button>
              </td>
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
