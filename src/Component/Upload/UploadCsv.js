

// import React, { useState } from 'react';
// import * as XLSX from 'xlsx';
// import axios from 'axios';
// const baseurl = process.env.REACT_APP_API_BASE_URL;

// const UploadCsv = () => {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleFileUpload = async () => {
//     if (!file) {
//       setError("Please select a file first.");
//       return;
//     }

//     setLoading(true);
//     setError(null);

//     try {
//       const data = await fileToData(file);
//       await sendDataToApi(data);
//       setLoading(false);
//     } catch (error) {
//       setLoading(false);
//       setError("An error occurred while processing the file.");
//       console.error(error);
//     }
//   };

//   const fileToData = async (file) => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.onload = (e) => {
//         try {
//           const workbook = XLSX.read(e.target.result, { type: 'binary' });
//           const sheetName = workbook.SheetNames[0];
//           const sheet = workbook.Sheets[sheetName];
//           const json = XLSX.utils.sheet_to_json(sheet);
//           resolve(json);
//         } catch (error) {
//           reject(error);
//         }
//       };
//       reader.onerror = reject;
//       reader.readAsBinaryString(file);
//     });
//   };

//   const sendDataToApi = async (data) => {
//     const baseurl = process.env.REACT_APP_API_BASE_URL;
    
//     try {
//       await axios.post(`${baseurl}/uploadData`, data);
//       alert("Data uploaded successfully!");
//     } catch (error) {
//       throw new Error("Failed to send data to the API.");
//     }
//   };

//   return (
//     <>
//     <h3 className='text-center'>Upload File CSV</h3>   
//         <br/>
//         <div className='container 'style={{ width: '40%',background:"#2c3e50" }}>
            
//         <div className="mb-3">
//       <label for="formFile" className="form-label text-light">Select File to upload</label>
//   <input className="form-control" accept=".xlsx, .xls" onChange={handleFileChange} type="file" id="formFile"/>
//       <button onClick={handleFileUpload} disabled={loading} type="button" className="btn btn-primary mb-3 mx-2">{loading ? "Uploading..." : "Upload CSV"}</button>
//       <button type="button" className="btn btn-outline-light mb-3">Cancel</button>
      
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//     </div>
    
//     </>
//   );
// };

// export default UploadCsv;


import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const UploadCsv = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0); // For tracking upload progress

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError(null); // Reset error on file change
    setProgress(0); // Reset progress on file change
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
      await uploadDataInChunks(data, 100); // Process data in chunks of 100 rows
      setLoading(false);
      alert("Data uploaded successfully!");
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

  // Function to split data and send it in chunks
  const uploadDataInChunks = async (data, chunkSize) => {
    const totalChunks = Math.ceil(data.length / chunkSize);

    for (let i = 0; i < totalChunks; i++) {
      const chunk = data.slice(i * chunkSize, (i + 1) * chunkSize);

      // Send each chunk to the API
      await sendDataToApi(chunk);

      // Update progress
      setProgress(((i + 1) / totalChunks) * 100);
    }
  };

  const sendDataToApi = async (chunk) => {
    const baseurl = process.env.REACT_APP_API_BASE_URL;

    try {
      await axios.post(`${baseurl}/uploadData`, chunk);
    } catch (error) {
      throw new Error("Failed to send data to the API.");
    }
  };

  return (
    <>
      <h3 className='text-center'>Upload File CSV</h3>
      <br />
      <div className='container' style={{ width: '40%', background: "#2c3e50" }}>
        <div className="mb-3">
          <label htmlFor="formFile" className="form-label text-light">Select File to upload</label>
          <input
            className="form-control"
            accept=".xlsx, .xls"
            onChange={handleFileChange}
            type="file"
            id="formFile"
          />
          <button
            onClick={handleFileUpload}
            disabled={loading}
            type="button"
            className="btn btn-primary mb-3 mx-2"
          >
            {loading ? `Uploading... ${progress.toFixed(2)}%` : "Upload CSV"}
          </button>
          <button type="button" className="btn btn-outline-light mb-3">Cancel</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>

        {loading && <div className="progress mb-3">
          <div
            className="progress-bar"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {progress.toFixed(2)}%
          </div>
        </div>}
      </div>
    </>
  );
};

export default UploadCsv;
