import React, {useRef , useState,useEffect } from 'react';
import axios from 'axios';
import { useOverview } from '../ContentHook/OverviewContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons'; // Import the correct icon
import { Link } from 'react-router-dom'

const Attachments = () => {
  const [selectedDocumentType, setSelectedDocumentType] = useState('');
  const [documentName, setDocumentName] = useState(''); // For custom document name if "Other" is selected
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [showModal1, setShowModal1] = useState(false);
  const [selectedDocumentFile, setSelectedDocumentFile] = useState(null);
  const baseurl = process.env.REACT_APP_API_BASE_URL;
  const  formData1=useOverview().formData;
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // console.log(formData1.file_number,"formData1")
  const allowedFileTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
  const maxFileSize = 5 * 1024 * 1024; // 5 MB

  const handleDocumentTypeChange = (event) => {
    setSelectedDocumentType(event.target.value);
    if (event.target.value !== 'other') {
      setDocumentName('');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > maxFileSize) {
        alert('File size exceeds the 5MB limit.');
        return;
      }

      if (!allowedFileTypes.includes(file.type)) {
        alert('Unsupported file format. Please upload JPG, PNG, or PDF files.');
        return;
      }

      setSelectedFile(file);
    }
  };

//   const handleDocumentUpload = async (event) => {
//      event.preventDefault();

//     if (!selectedFile || !selectedDocumentType ) {
//       alert('Please select a file to upload.');
//       return;
//     }
//     else if (selectedFile && !formData1.file_number) {
//       alert('Please search file first');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', selectedFile);
//     formData.append('documentType', selectedDocumentType === 'other' ? documentName : selectedDocumentType);

//     try {
//       setLoading(true);
//       // Upload the file to the server (API endpoint: http://localhost:3007/api/v1/upload)
//       const response = await axios.post(`${baseurl}/upload`, formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
// if(response.status=200){
//   alert('Document uploaded successfully');
//   setSelectedFile('');
// } 
//       // Extract the file URLs from the response
//       const { downloadUrl, readUrl } = response.data;

//       // After successful upload, update the document details using another API
//       const updateDocumentData = {
//         file_number: formData1.file_number, // Example: using timestamp as a unique file number
//         document_type: selectedDocumentType,
//         document_name: selectedDocumentType === 'other' ? documentName : selectedDocumentType,
//         downloadUrl,
//         readUrl,
//       };

//       // Call the update document API (replace '/api/update-document' with actual endpoint)
//       await axios.post(`${baseurl}/updatedocumentdata`, updateDocumentData);
      
//       // Add the uploaded document to the state
//       setUploadedDocuments([...uploadedDocuments, { ...updateDocumentData, file: selectedFile }]);
//       await fetchDocuments();
//       // Reset form fields
//       setSelectedFile('');
//       setSelectedDocumentType('');
//       setDocumentName('');
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       alert('Failed to upload the document. Please try again.');
//     }finally {
//       // Stop loader once form submission is done
//       setLoading(false);
//     }
//   };

  const handleDocumentUpload = async (event) => {
    event.preventDefault();
  
    if (!selectedFile || !selectedDocumentType) {
      alert('Please select a file to upload.');
      return;
    } else if (selectedFile && !formData1.file_number) {
      alert('Please search file first');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
    formData.append('documentType', selectedDocumentType === 'other' ? documentName : selectedDocumentType);
  
    try {
      setLoading(true);
      
      // Upload the file to the server (API endpoint: http://localhost:3007/api/v1/upload)
      const response = await axios.post(`${baseurl}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 200) {
        alert('Document uploaded successfully');
        // Clear file input field using ref
        if (fileInputRef.current) {
          fileInputRef.current.value = '';  // Reset the file input field
        }
      }
  
      // Extract the file URLs from the response
      const { downloadUrl, readUrl } = response.data;
  
      // Update document details using another API
      const updateDocumentData = {
        file_number: formData1.file_number,
        document_type: selectedDocumentType,
        document_name: selectedDocumentType === 'other' ? documentName : selectedDocumentType,
        downloadUrl,
        readUrl,
      };
  
      // Call the update document API
      await axios.post(`${baseurl}/updatedocumentdata`, updateDocumentData);
  
      // Add the uploaded document to the state
      setUploadedDocuments([...uploadedDocuments, { ...updateDocumentData, file: selectedFile }]);
      await fetchDocuments();
  
      // Reset other form fields
      setSelectedDocumentType('');
      setDocumentName('');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload the document. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Using a ref for the file input field
  const fileInputRef = useRef(null);


  const deleteFile = async (fileId, id) => {
    setLoading(true);  // Start loader
    try {
      // Step 1: Delete from Firebase
      try {
        const firebaseDeleteResponse = await axios({
          method: 'delete',
          url: `${baseurl}/delete`,  // Ensure this points to Firebase delete route
          data: { documentUrl: fileId },  // Pass fileId in body correctly
        });
      } catch (firebaseError) {
        // If file doesn't exist on Firebase, log and proceed
        console.error('Error deleting file');
      }
  
      // Step 2: Now, delete the document entry from the backend
      try {
        await axios.delete(`${baseurl}/deleteDocument/${id}`);
      } catch (backendError) {
        // Log backend deletion error
        throw new Error('Failed to delete document');
      }
      
      alert('File deleted successfully');
    } catch (error) {
      // Handle any other error
      console.error('Error deleting file or document:', error.message);
      alert('Failed to delete file or document. Please try again.');
    } finally {
      fetchDocuments();
      // Step 4: Stop loader regardless of success or failure
      setLoading(false);
    }
  };


  
  // const deleteFile = async (fileId,id) => {
  //   console.log(fileId,"fileId")
  //   try {
  //     setLoading(true);
  //     const response = await axios.delete(`${baseurl}/delete`, {
  //       data: { documentUrl: fileId }, // If deleting from FTP
  //     });

  //     await axios.delete(`${baseurl}/deleteDocument/${id}`);
  //     await fetchDocuments();
  //     setLoading(false);
  //     alert('File deleted successfully');
 
  //   } catch (error) {
  //     console.error('Error deleting file:', error);
  //     alert('Failed to delete file');
  //   }
  // };
  // const deleteFile = async (fileId, id) => {
  //   console.log(fileId, "fileId");
  //   try {
  //     setLoading(true);
  
  //     // Send the DELETE request with documentUrl in the body
  //     const response = await axios({
  //       method: 'delete',
  //       url: `${baseurl}/delete`,
  //       data: { documentUrl: fileId }, // Pass data here correctly
  //     });
  
  //     // Delete the document entry by id
  //     await axios.delete(`${baseurl}/deleteDocument/${id}`);
  
  //     // Fetch the updated documents list
  //     await fetchDocuments();
  
  //     alert('File deleted successfully');
  //   } catch (error) {
  //     console.error('Error deleting file:', error);
  //     alert('Failed to delete file');
  //     setLoading(false);
  //   } finally {
  //     // Ensure that setLoading is always called, even on error
  //     setLoading(false);
  //   }
  // };

  const fetchDocuments = async () => {
    try {
      const response = await axios.get(`${baseurl}/getdocumentdata/${formData1.file_number}`);
      setDocuments(response.data.attachments);
    } catch (err) {
      setError('Error fetching document data');
    }
  };

  // useEffect(() => {
  //   const fetchDocuments = async () => {
  //     try {
  //       const response = await axios.get(`${baseurl}/getdocumentdata/${formData1.file_number}`);
  //       setDocuments(response.data.attachments);
  //     } catch (err) {
  //       setError('Error fetching document data');
  //     }
  //   };

  //   fetchDocuments();
  // }, [formData1.file_number]);

  useEffect(() => {
    if (formData1.file_number) {
      fetchDocuments();
    }
  }, [formData1.file_number]);

  return (
    <>
      <div className="position-relative tab-pane active">

      {loading && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-light bg-opacity-75"
          style={{ zIndex: 1050 }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}

        <form onSubmit={handleDocumentUpload}>
          <div className="mb-3 row">
            <div className="col-md-6">
              <label htmlFor="documentType" className="form-label fw-bold">
                Select Document Type
              </label>
              <select
                className="form-select"
                id="documentType"
                value={selectedDocumentType}
                onChange={handleDocumentTypeChange}
              >
                <option value="">Select</option>
                <option value="photo_document">Photo Document</option>
                <option value="pan_card_document">PAN Card Document</option>
                <option value="aadhaar_card_document">Aadhaar Card Document</option>
                <option value="rc_document">RC Document</option>
                <option value="insurance_document">Insurance Document</option>
                <option value="loan_track_document">Loan Track Document</option>
                <option value="emi_debit_banking_document">
                  Latest Six Months EMI Debit Banking Document
                </option>
                <option value="income_docs">Income Documents</option>
                <option value="e_bill_document">E-Bill Document</option>
                <option value="rent_agreement_document">
                  Rent Agreement with Owner E-Bill (if rented)
                </option>
                <option value="other">Other</option>
              </select>
            </div>

            {selectedDocumentType === 'other' && (
              <div className="col-md-6">
                <label htmlFor="documentName" className="form-label fw-bold">
                  Document Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="documentName"
                  value={documentName}
                  onChange={(e) => setDocumentName(e.target.value)}
                  placeholder="Enter document name"
                />
              </div>
            )}

            <div className="col-md-6 mt-3">
              <label htmlFor="documentFile" className="form-label fw-bold">
                Upload Document
              </label>
              <input type="file" className="form-control" ref={fileInputRef} id="documentFile" onChange={handleFileChange} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Upload
          </button>
        </form>

        {showModal1 && (
          <div className="modal fade show" style={{ display: 'block' }}>
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">View Document</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal1(false)}></button>
                </div>
                <div className="modal-body">
                  <embed src={selectedDocumentFile} width="100%" height="500px" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>


      <h4 className='mt-4'>Document List for File Number: {formData1.file_number}</h4>
      <table className="table table-striped table-bordered">
        <thead className="thead-dark">
          <tr>
          <th>Serial No</th>
            <th>Date</th>
            <th>Document Type</th>
            <th>Document Name</th>
            <th>Download Document</th>
            <th>View Document</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((doc, index) => (
            <tr key={doc._id}>
              <td>{index + 1}</td>
              <td>
               {new Date(doc.createdAt).toLocaleDateString('en-GB')}<br />
               {new Date(doc.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
              </td>
              <td>{doc.document_type}</td>
              <td>{doc.document_name}</td>
              <td>
                <a href={doc.downloadUrl} target="_blank" rel="noopener noreferrer"type="button" class="btn btn-outline-secondary">
                  Download
                </a>
              </td>
              <td>
                <a href={doc.readUrl} target="_blank" rel="noopener noreferrer" type="button" class="btn btn-outline-secondary">
                  View
                </a>
              </td>
              <td>
              <Link to={ ``} onClick={(e) => { e.preventDefault(); deleteFile(doc.downloadUrl,doc._id); }}>
                <FontAwesomeIcon icon={faTrash}  />
              </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </>
  );
};

export default Attachments;
