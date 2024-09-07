import React, { useState, useEffect } from 'react';
import { useOverview } from '../ContentHook/OverviewContext';

const ReferenceDetails = () => {

  const [references, setReferences] = useState([]);
  const [newReference, setNewReference] = useState({ name: '', mobileNumber: '', address: '' });
  const { mobileNumber, fetchFileData, formData, setFormData, fetchreferenceData, handleSubmit } = useOverview();


  const handleAddReference = (e) => {
    e.preventDefault();
    setReferences([...references, newReference]);
    setNewReference({ name: '', mobileNumber: '', address: '' });
  };
  useEffect(() => {
    if (mobileNumber) {
      fetchFileData(mobileNumber);
    }
  }, [mobileNumber]);



  const onSubmit = (event) => {
    event.preventDefault();
    const formType = 'reference'; // or 'personal', based on which part of the form is being submitted
    handleSubmit(formType);
  };
  return (
    <>
      <div className="tab-pane active">
        <form onSubmit={onSubmit} className="mb-4">
          <div className="mb-3 row">
            <div className="col-md-4">
              <label htmlFor="reference_name" className="form-label fw-bold">Reference Name</label>
              <input
                type="text"
                className="form-control"
                id="reference_name"
                value={formData.reference_name}
                onChange={(e) => setFormData({ ...formData, reference_name: e.target.value })}
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
                value={formData.reference_mobile_number}
                onChange={(e) => setFormData({ ...formData, reference_mobile_number: e.target.value })}
                placeholder="Enter mobile number"
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="reference_occupation_type" className="form-label fw-bold">Occupation Type</label>
              <select
                className="form-select"
                id="reference_occupation_type"
                value={formData.reference_occupation_type}
                onChange={(e) => {
                    const selectedType = e.target.value;
                    setFormData({
                        ...formData,
                        reference_occupation_type: selectedType,
                    });
                }}
              >
                <option value="">Select</option>
                <option value="salaried_employee">Salaried Employee</option>
                <option value="self_employed">Self-Employed</option>
                <option value="business_owner">Business Owner</option>
                <option value="freelancer">Freelancer</option>
                <option value="government_employee">Government Employee</option>
                <option value="retired">Retired</option>
                <option value="student">Student</option>
                <option value="housewife_homemaker">Housewife/Homemaker</option>
                <option value="agriculture_farmer">Agriculture/Farmer</option>
                <option value="consultant">Consultant</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="reference_nature_of_business" className="form-label fw-bold">Nature of Business</label>
              <select className="form-select" id="reference_nature_of_business"
              value={formData.reference_nature_of_business}
              onChange={(e) => {
                  const selectedType = e.target.value;
                  setFormData({
                      ...formData,
                      reference_nature_of_business: selectedType,
                  });
              }}
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
                value={formData.company_name}
                onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                placeholder="Enter Company Name"
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="reference_address" className="form-label fw-bold">Reference Address</label>
              <input
                type="text"
                className="form-control"
                id="reference_address"
                value={formData.reference_address}
                onChange={(e) => setFormData({ ...formData, reference_address: e.target.value })}
                placeholder="Enter address"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Add Reference</button>
        </form>

        <div className="mb-4">
          {/* <h5>Reference Details</h5> */}
          {references.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Mobile Number</th>
                  <th scope="col">Address</th>
                </tr>
              </thead>
              <tbody>
                {references.map((reference, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{reference.name}</td>
                    <td>{reference.mobileNumber}</td>
                    <td>{reference.address}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="alert alert-info" role="alert">
              No references added yet.
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ReferenceDetails