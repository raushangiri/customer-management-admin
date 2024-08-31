import React, { useState, useEffect } from 'react';

const ReferenceDetails = () => {

    const [references, setReferences] = useState([]);
    const [newReference, setNewReference] = useState({ name: '', mobileNumber: '', address: '' });
 

    const handleAddReference = (e) => {
        e.preventDefault();
        setReferences([...references, newReference]);
        setNewReference({ name: '', mobileNumber: '', address: '' });
    };


  return (
    <>
    <div className="tab-pane active">
            <form onSubmit={handleAddReference} className="mb-4">
              <div className="mb-3 row">
                <div className="col-md-4">
                  <label htmlFor="referenceName" className="form-label fw-bold">Reference Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="referenceName"
                    value={newReference.name}
                    onChange={(e) => setNewReference({ ...newReference, name: e.target.value })}
                    placeholder="Enter name"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="referenceMobileNumber" className="form-label fw-bold">Reference Mobile Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="referenceMobileNumber"
                    value={newReference.mobileNumber}
                    onChange={(e) => setNewReference({ ...newReference, mobileNumber: e.target.value })}
                    placeholder="Enter mobile number"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="referenceOccupation" className="form-label fw-bold">Occupation Type</label>
                  <select
        className="form-select"
        id="referenceOccupation"
        
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
                    <label htmlFor="natureOfBusiness" className="form-label fw-bold">Nature of Business</label>
                    <select className="form-select" id="natureOfBusiness">
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
                    value={newReference.company_name}
                    onChange={(e) => setNewReference({ ...newReference, company_name: e.target.value })}
                    placeholder="Enter Company Name"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="referenceAddress" className="form-label fw-bold">Reference Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="referenceAddress"
                    value={newReference.address}
                    onChange={(e) => setNewReference({ ...newReference, address: e.target.value })}
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