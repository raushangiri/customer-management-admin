import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ViewDisposition = () => {
  const [dispositionData, setDispositionData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseurl = process.env.REACT_APP_API_BASE_URL;
  const { _id } = useParams(); // Get the loan file ID from the URL

  useEffect(() => {
    const fetchDispositionData = async () => {
      try {
        const response = await axios.get(`${baseurl}/getDispositionById/${_id}`);
        if (response.data && response.data.data) {
          setDispositionData(response.data.data); // Accessing the data object from response
        } else {
          setError('No data found.');
        }
      } catch (err) {
        setError('Failed to fetch disposition data.');
      } finally {
        setLoading(false); // Stop loading after the request is complete
      }
    };

    fetchDispositionData();
  }, [_id, baseurl]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mt-4">
      <h2 className='text-center'>Disposition Details</h2>

      {dispositionData ? (
        <div>
          <section className="mb-4">
            <h4>Disposition Details</h4>
            <hr></hr>
            <p><strong>File Number:</strong> {dispositionData.file_number}</p>
            <p><strong>User ID:</strong> {dispositionData.userId}</p>
            <p><strong>Username:</strong> {dispositionData.username}</p>
            <p><strong>Role:</strong> {dispositionData.role}</p>
            <p><strong>Department:</strong> {dispositionData.department}</p>
            <p><strong>Call Status:</strong> {dispositionData.call_status}</p>
            <p><strong>Is Interested:</strong> {dispositionData.is_interested}</p>
            <p><strong>Disposition:</strong> {dispositionData.disposition}</p>
            <p><strong>Expected Document Date:</strong> {new Date(dispositionData.expected_document_date).toLocaleDateString()}</p>
            <p><strong>Not Interested Reason:</strong> {dispositionData.not_interested_reason || 'N/A'}</p>
            <p><strong>Remarks:</strong> {dispositionData.remarks || 'N/A'}</p>
            <p><strong>File Status:</strong> {dispositionData.file_status}</p>
            <p><strong>Date & Time:</strong> {new Date(dispositionData.createdAt).toLocaleString()}</p>
          </section>

          {dispositionData.selected_documents && dispositionData.selected_documents.length > 0 && (
            <section className="mb-4">
              <h4>Documents List</h4>
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th scope="col">Serial No</th>
                    <th scope="col">Document Name</th>
                   
                  </tr>
                </thead>
                <tbody>
                  {dispositionData.selected_documents.map((doc, index) => (
                    <tr key={doc._id}>
                      <td>{index + 1}</td>
                      <td>{doc.document_name}</td>
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {/* <section className="mb-4">
            <h4>Additional Details</h4>
            
          </section> */}
        </div>
      ) : (
        <div>No disposition data found.</div>
      )}
    </div>
  );
};

export default ViewDisposition;
