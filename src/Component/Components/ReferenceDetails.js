// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useOverview } from '../ContentHook/OverviewContext';
// const baseurl = process.env.REACT_APP_API_BASE_URL;

// const ReferenceDetails = () => {
//   const [references, setReferences] = useState([]);
//   const { mobileNumber, fetchFileData, formData, setFormData, handleSubmit } = useOverview();
//   // const baseurl = "http://your-api-url"; // Set your base API URL
//   const [localFormData, setLocalFormData] = useState({
//     reference_name: '',
//     reference_mobile_number: '',
//     reference_address: '',
//     reference_occupation_type: '',
//     reference_nature_of_business: '',
//     company_name: ''
//   });
  
//   // Fetch reference details from the API
//   const fetchReferences = async () => {
//     try {
//       const response = await axios.get(`${baseurl}/getreferencedetail/${formData.file_number}`);
//       setReferences(Array.isArray(response.data.data) ? response.data.data : [response.data.data]);
//     } catch (error) {
//       console.error("Error fetching references", error);
//     }
//   };
  
//   // console.log(references,"references")
//   const [loading, setLoading] = useState(false);
//   const handleAddReference = async (e) => {
//     e.preventDefault(); // Prevent form's default behavior
  
//     try {
//       setLoading(true);

//       // Post the local form data to the API
//       await axios.post(`${baseurl}/createreferencedetail/${formData.file_number}`, localFormData);
  
//       // Reset the local form after submission
//       setLocalFormData({
//         reference_name: '',
//         reference_mobile_number: '',
//         reference_address: '',
//         reference_occupation_type: '',
//         reference_nature_of_business: '',
//         company_name: ''
//       });
  
//       // Safely update the global context formData
//       setFormData((prevFormData) => ({
//         ...prevFormData,
//         references: [...(prevFormData.references || []), localFormData]  // Ensure references is iterable
//       }));
  
//       // Fetch the updated list of references
//       fetchReferences();
  
//     } catch (error) {
//       console.error("Error adding reference", error);
//     }finally {
//       // Stop loader once form submission is done
//       setLoading(false);
//     }
//   };
  
  

//   useEffect(() => {
//     if (mobileNumber) {
//       fetchFileData(mobileNumber);
//     }
//   }, [mobileNumber]);

//   useEffect(() => {
//     if (formData.file_number) {
//       fetchReferences();
//     }
//   }, [formData.file_number]);
//   useEffect(() => {
//     fetchReferences();
//   }, []); // Fetch references when the component is mounted
  
//   return (
//     <>
//       <div className="position-relative tab-pane active">
//       {loading && (
//         <div
//           className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-light bg-opacity-75"
//           style={{ zIndex: 1050 }}
//         >
//           <div className="spinner-border text-primary" role="status">
//             <span className="visually-hidden">Loading...</span>
//           </div>
//         </div>
//       )}
//       <form onSubmit={handleAddReference} className="mb-4">
//   <div className="mb-3 row">
//     <div className="col-md-4">
//       <label htmlFor="reference_name" className="form-label fw-bold">Reference Name</label>
//       <input
//         type="text"
//         className="form-control"
//         id="reference_name"
//         value={localFormData.reference_name}
//         onChange={(e) => setLocalFormData({ ...localFormData, reference_name: e.target.value })}
//         placeholder="Enter name"
//         required
//       />
//     </div>
//     <div className="col-md-4">
//       <label htmlFor="reference_mobile_number" className="form-label fw-bold">Reference Mobile Number</label>
//       <input
//         type="text"
//         className="form-control"
//         id="reference_mobile_number"
//         value={localFormData.reference_mobile_number}
//         onChange={(e) => setLocalFormData({ ...localFormData, reference_mobile_number: e.target.value })}
//         placeholder="Enter mobile number"
//         required
//       />
//     </div>
//     <div className="col-md-4">
//       <label htmlFor="reference_occupation_type" className="form-label fw-bold">Occupation Type</label>
//       <select
//         className="form-select"
//         id="reference_occupation_type"
//         value={localFormData.reference_occupation_type}
//         onChange={(e) => setLocalFormData({ ...localFormData, reference_occupation_type: e.target.value })}
//       >
//         <option value="">Select</option>
//         <option value="Salaried Employee">Salaried Employee</option>
//         <option value="Self-Employed">Self-Employed</option>
//         <option value="Business Owner">Business Owner</option>
//         <option value="Freelancer">Freelancer</option>
//         <option value="Government Employee">Government Employee</option>
//         <option value="Retired">Retired</option>
//         <option value="Student">Student</option>
//         <option value="Housewife/Homemaker">Housewife/Homemaker</option>
//         <option value="Agriculture/Farmer">Agriculture/Farmer</option>
//         <option value="Consultant">Consultant</option>
//       </select>
//     </div>
//     <div className="col-md-4">
//       <label htmlFor="reference_nature_of_business" className="form-label fw-bold">Nature of Business</label>
//       <select
//         className="form-select"
//         id="reference_nature_of_business"
//         value={localFormData.reference_nature_of_business}
//         onChange={(e) => setLocalFormData({ ...localFormData, reference_nature_of_business: e.target.value })}
//       >
//         <option value="">Select nature</option>
//         <option value="manufacturing">Manufacturing</option>
//         <option value="Trading">Trading</option>
//         <option value="Retail">Retail</option>
//         <option value="Wholesale">Wholesale</option>
//         <option value="Information Technology">Information Technology</option>
//         <option value="Finance and Banking">Finance and Banking</option>
//         <option value="Real Estate and Construction">Real Estate and Construction</option>
//         <option value="Hospitality">Hospitality</option>
//         <option value="Healthcare">Healthcare</option>
//         <option value="Education and Training">Education and Training</option>
//         <option value="Transportation and Logistics">Transportation and Logistics</option>
//         <option value="Agriculture and Farming">Agriculture and Farming</option>
//         <option value="Import/Export">Import/Export</option>
//         <option value="Media and Entertainment">Media and Entertainment</option>
//       </select>
//     </div>
//     <div className="col-md-4">
//       <label htmlFor="company_name" className="form-label fw-bold">Company Name</label>
//       <input
//         type="text"
//         className="form-control"
//         id="company_name"
//         value={localFormData.company_name}
//         onChange={(e) => setLocalFormData({ ...localFormData, company_name: e.target.value })}
//         placeholder="Enter company name"
//         required
//       />
//     </div>
//     <div className="col-md-4">
//       <label htmlFor="reference_address" className="form-label fw-bold">Reference Address</label>
//       <input
//         type="text"
//         className="form-control"
//         id="reference_address"
//         value={localFormData.reference_address}
//         onChange={(e) => setLocalFormData({ ...localFormData, reference_address: e.target.value })}
//         placeholder="Enter address"
//         required
//       />
//     </div>
//   </div>

//   <button type="submit" className="btn btn-primary">Add Reference</button>
// </form>


//         <div className="mb-4">
//         {references && references.length > 0 ? (

//     <table className="table">
//       <thead>
//         <tr>
//           <th scope="col">#</th>
//           <th scope="col">Name</th>
//           <th scope="col">Mobile Number</th>
//           <th scope="col">Address</th>
//           <th scope="col">Occupation Type</th>
//           <th scope="col">Nature of Business</th>
//           <th scope="col">Company Name</th>
//         </tr>
//       </thead>
//       <tbody>
//         {references.map((reference, index) => (
//           <tr key={reference._id}>
//             <th scope="row">{index + 1}</th>
//             <td>{reference.reference_name}</td>
//             <td>{reference.reference_mobile_number}</td>
//             <td>{reference.reference_address}</td>
//             <td>{reference.reference_occupation_type}</td>
//             <td>{reference.reference_nature_of_business}</td>
//             <td>{reference.company_name}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   ) : (
//     <div className="alert alert-info" role="alert">
//       No references added yet.
//     </div>
//   )}
// </div>

//       </div>
//     </>
//   );
// };

// export default ReferenceDetails;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOverview } from '../ContentHook/OverviewContext';
const baseurl = process.env.REACT_APP_API_BASE_URL;

const ReferenceDetails = () => {
  const [references, setReferences] = useState([]);
  const { mobileNumber, fetchFileData, formData, setFormData } = useOverview();
  const [localFormData, setLocalFormData] = useState({
    reference_name: '',
    reference_mobile_number: '',
    reference_address: '',
    reference_occupation_type: '',
    reference_nature_of_business: '',
    company_name: ''
  });
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingReferenceId, setEditingReferenceId] = useState(null); // Track the editing reference ID

  // Fetch reference details from the API
  const fetchReferences = async () => {
    try {
      const response = await axios.get(`${baseurl}/getreferencedetail/${formData.file_number}`);
      setReferences(Array.isArray(response.data.data) ? response.data.data : [response.data.data]);
    } catch (error) {
      console.error("Error fetching references", error);
    }
  };

  const handleAddOrUpdateReference = async (e) => {
    e.preventDefault(); // Prevent form's default behavior

    try {
      setLoading(true);
      const url = isEditing 
        ? `${baseurl}/updatereferencedetail/${editingReferenceId}` // URL for updating
        : `${baseurl}/createreferencedetail/${formData.file_number}`; // URL for adding

      await axios.post(url, localFormData); // Post the local form data to the API

      // Reset the local form after submission
      setLocalFormData({
        reference_name: '',
        reference_mobile_number: '',
        reference_address: '',
        reference_occupation_type: '',
        reference_nature_of_business: '',
        company_name: ''
      });

      // Reset editing state
      setIsEditing(false);
      setEditingReferenceId(null);

      // Fetch the updated list of references
      fetchReferences();

    } catch (error) {
      console.error("Error adding/updating reference", error);
    } finally {
      setLoading(false); // Stop loader once form submission is done
    }
  };

  const handleEditClick = (reference) => {
    setLocalFormData(reference); // Fill form with selected reference data
    setIsEditing(true); // Set editing mode
    setEditingReferenceId(reference._id); // Save the ID of the reference being edited
  };

  useEffect(() => {
    if (mobileNumber) {
      fetchFileData(mobileNumber);
    }
  }, [mobileNumber]);

  useEffect(() => {
    if (formData.file_number) {
      fetchReferences();
    }
  }, [formData.file_number]);

  useEffect(() => {
    fetchReferences();
  }, []); // Fetch references when the component is mounted

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
        <form onSubmit={handleAddOrUpdateReference} className="mb-4">
          <div className="mb-3 row">
            <div className="col-md-4">
              <label htmlFor="reference_name" className="form-label fw-bold">Reference Name</label>
              <input
                type="text"
                className="form-control"
                id="reference_name"
                value={localFormData.reference_name}
                onChange={(e) => setLocalFormData({ ...localFormData, reference_name: e.target.value })}
                placeholder="Enter name"
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="reference_mobile_number" className="form-label fw-bold">Reference Mobile Number</label>
              <input
                type="text"
                className="form-control"
                id="reference_mobile_number"
                value={localFormData.reference_mobile_number}
                onChange={(e) => setLocalFormData({ ...localFormData, reference_mobile_number: e.target.value })}
                placeholder="Enter mobile number"
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="reference_occupation_type" className="form-label fw-bold">Occupation Type</label>
              <select
                className="form-select"
                id="reference_occupation_type"
                value={localFormData.reference_occupation_type}
                onChange={(e) => setLocalFormData({ ...localFormData, reference_occupation_type: e.target.value })}
              >
                <option value="">Select</option>
                <option value="Salaried Employee">Salaried Employee</option>
                <option value="Self-Employed">Self-Employed</option>
                <option value="Business Owner">Business Owner</option>
                <option value="Freelancer">Freelancer</option>
                <option value="Government Employee">Government Employee</option>
                <option value="Retired">Retired</option>
                <option value="Student">Student</option>
                <option value="Housewife/Homemaker">Housewife/Homemaker</option>
                <option value="Agriculture/Farmer">Agriculture/Farmer</option>
                <option value="Consultant">Consultant</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="reference_nature_of_business" className="form-label fw-bold">Nature of Business</label>
              <select
                className="form-select"
                id="reference_nature_of_business"
                value={localFormData.reference_nature_of_business}
                onChange={(e) => setLocalFormData({ ...localFormData, reference_nature_of_business: e.target.value })}
              >
                <option value="">Select nature</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="Trading">Trading</option>
                <option value="Retail">Retail</option>
                <option value="Wholesale">Wholesale</option>
                <option value="Information Technology">Information Technology</option>
                <option value="Finance and Banking">Finance and Banking</option>
                <option value="Real Estate and Construction">Real Estate and Construction</option>
                <option value="Hospitality">Hospitality</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Education and Training">Education and Training</option>
                <option value="Transportation and Logistics">Transportation and Logistics</option>
                <option value="Agriculture and Farming">Agriculture and Farming</option>
                <option value="Import/Export">Import/Export</option>
                <option value="Media and Entertainment">Media and Entertainment</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="company_name" className="form-label fw-bold">Company Name</label>
              <input
                type="text"
                className="form-control"
                id="company_name"
                value={localFormData.company_name}
                onChange={(e) => setLocalFormData({ ...localFormData, company_name: e.target.value })}
                placeholder="Enter company name"
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="reference_address" className="form-label fw-bold">Reference Address</label>
              <input
                type="text"
                className="form-control"
                id="reference_address"
                value={localFormData.reference_address}
                onChange={(e) => setLocalFormData({ ...localFormData, reference_address: e.target.value })}
                placeholder="Enter address"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">
            {isEditing ? 'Update Reference' : 'Add Reference'}
          </button>
        </form>

        <div className="mb-4">
          {references && references.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Mobile Number</th>
                  <th scope="col">Address</th>
                  <th scope="col">Occupation Type</th>
                  <th scope="col">Nature of Business</th>
                  <th scope="col">Company Name</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {references.map((reference, index) => (
                  <tr key={reference._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{reference.reference_name}</td>
                    <td>{reference.reference_mobile_number}</td>
                    <td>{reference.reference_address}</td>
                    <td>{reference.reference_occupation_type}</td>
                    <td>{reference.reference_nature_of_business}</td>
                    <td>{reference.company_name}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning"
                        onClick={() => handleEditClick(reference)}
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No references found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ReferenceDetails;
