// import React from 'react'

// const UploadCsv = () => {
//   return (
//     <>
//     <h3 className='text-center'>Upload File CSV</h3>   
//     <br/>
//     <div className='container 'style={{ width: '40%',background:"#2c3e50" }}>
        
//     <div className="mb-3">
//   <label for="formFile" className="form-label text-light">Select File to upload</label>
//   <input className="form-control" type="file" id="formFile"/>
// </div>

// <div className="d-flext text-center" >
// <button type="button" className="btn btn-primary mb-3 mx-2">Upload CSV</button>
// <button type="button" className="btn btn-outline-light mb-3">Cancel</button>
// </div>

// </div>
//     </>  
//   )
// }

// export default UploadCsv

import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const UploadCsv = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      setError("Please select a file first.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fileToData(file);
      const chunkedData = chunkArray(data, 100); // Split data into chunks of 100
      await sendChunksToApi(chunkedData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("An error occurred while processing the file.");
      console.error(error);
    }
  };

  const fileToData = async (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const workbook = XLSX.read(e.target.result, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(sheet);
          resolve(json);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsBinaryString(file);
    });
  };

  const chunkArray = (data, chunkSize) => {
    const chunks = [];
    for (let i = 0; i < data.length; i += chunkSize) {
      chunks.push(data.slice(i, i + chunkSize));
    }
    return chunks;
  };

  const sendChunksToApi = async (chunks) => {
    const baseurl = process.env.REACT_APP_API_BASE_URL;

    for (let i = 0; i < chunks.length; i++) {
      try {
        await axios.post(`${baseurl}/uploadData`, chunks[i]);
        console.log(`Uploaded chunk ${i + 1} successfully!`);
      } catch (error) {
        throw new Error(`Failed to send chunk ${i + 1} to the API.`);
      }
    }

    alert("All data uploaded successfully!");
  };

  return (
    <>
      <h3 className='text-center'>Upload File CSV</h3>   
      <br/>
      <div className='container' style={{ width: '40%', background: "#2c3e50" }}>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label text-light">Select File to upload</label>
          <input 
            className="form-control" 
            accept=".xlsx, .xls" 
            onChange={handleFileChange} 
            type="file" 
            id="formFile"
            disabled={loading}  // Disable file input while uploading
          />
          <button 
            onClick={handleFileUpload} 
            disabled={loading} 
            type="button" 
            className="btn btn-primary mb-3 mx-2"
          >
            {loading ? "Uploading..." : "Upload CSV"}
          </button>
          <button 
            type="button" 
            className="btn btn-outline-light mb-3" 
            disabled={loading}  // Disable Cancel button during loading
            onClick={() => setFile(null)}
          >
            Cancel
          </button>
          {loading && <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
      </div>
    </>
  );
};

export default UploadCsv;

