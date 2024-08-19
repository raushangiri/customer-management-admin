import React, { useState } from 'react';

const Tvr = () => {
    
    const [activeTab, setActiveTab] = useState('details');
  const [references, setReferences] = useState([]);
  const [newReference, setNewReference] = useState({ name: '', mobileNumber: '', address: '' });
  const [loandetail, setloandetail] = useState({ bankName: '', emiAmount: '', emiDate: '',loanstartDate:'',noofemiBounces:'',bouncesReason:'',carDetails:'' });

  const [selectedLoanType, setSelectedLoanType] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isInterested, setIsInterested] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [notInterestedReason, setNotInterestedReason] = useState('');
  const [remarks, setRemarks] = useState('');
  const [selectedDocumentType, setSelectedDocumentType] = useState('');
  const [uploadedDocuments, setUploadedDocuments] = useState([]);
  const [showModal1, setShowModal1] = useState(false);
  const [selectedDocumentFile, setSelectedDocumentFile] = useState(null);

  const handleDocumentTypeChange = (event) => {
    setSelectedDocumentType(event.target.value);
  };

  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadedDocuments([...uploadedDocuments, { type: selectedDocumentType, file }]);
    }
  };

  // Handle document upload (submit)
  const handleDocumentUpload = (event) => {
    event.preventDefault();
    // You can add additional logic here if needed.
    // For now, it just resets the form fields.
    setSelectedDocumentType('');
  };

  // Handle view document
  const handleViewDocument = (doc) => {
    const fileURL = URL.createObjectURL(doc.file);
    setSelectedDocumentFile(fileURL);
    setShowModal1(true);
  };

  // Handle delete document
  const handleDeleteDocument = (index) => {
    const updatedDocuments = uploadedDocuments.filter((_, i) => i !== index);
    setUploadedDocuments(updatedDocuments);
  };


  const handleAddReference = (e) => {
    e.preventDefault();
    setReferences([...references, newReference]);
    setNewReference({ name: '', mobileNumber: '', address: '' });
  };


  const loanMasterData = {
    'Auto Loan': ['External Bt', 'Internal Bt', 'Refinance', 'New Car', 'Sale Purchage'],
    'Business Loan': ['Proprietorship', 'Partnership', 'Pvt Ltd Firm'],
    'LAP Loan': ['Proprietorship', 'Partnership', 'Pvt Ltd Firm'],
    'Home Loan': ['Proprietorship', 'Partnership', 'Pvt Ltd Firm'],
    'Personal Loan': ['Personal Loan']
  };

  const NotInterestedOptions = {
    notInterested: [
      'No need Loan',
      'Need after 1 Month',
      'Abuse on Call',
      'Do not want to provide details',
      'Threat to complain',
      'Asked not to call again',
    ]
  };
  const handleInterestChange = (e) => {
    const value = e.target.value;
    setIsInterested(value);
    if (value === 'NotIntrested') {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    // Handle form submission inside the modal
    console.log('Reason:', notInterestedReason);
    console.log('Remarks:', remarks);
    setShowModal(false);
  };

  const handleLoanTypeChange = (e) => {
    setSelectedLoanType(e.target.value);
    setSelectedCategory(''); // Reset category when loan type changes
  };

  return (
    <div className="container mt-4">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'Previous Loan Details' ? 'active' : ''}`}
            onClick={() => setActiveTab('Previous Loan Details')}
          >
            Overview
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'Personal details' ? 'active' : ''}`}
            onClick={() => setActiveTab('Personal details')}
          >
            Personal details
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'references' ? 'active' : ''}`}
            onClick={() => setActiveTab('references')}
          >
            Reference Details
          </button>
        </li>

        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'loan details' ? 'active' : ''}`}
            onClick={() => setActiveTab('loan details')}
          >
            Loan details
          </button>
        </li>
      
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'attachments' ? 'active' : ''}`}
            onClick={() => setActiveTab('attachments')}
          >
            Attachments
          </button>
        </li>

      </ul>

      <div className="tab-content mt-4">



        {activeTab === 'Previous Loan Details' && (
          <div className="tab-pane active">
            <form className='mb-5'>
              <div className="mb-3 row">
                <div className="col-md-6">
                  <label htmlFor="mobileNumber" className="form-label fw-bold">Mobile Number</label>
                  <input type="text" className="form-control" id="mobileNumber" placeholder="Enter mobile number" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label fw-bold">Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Enter name" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label fw-bold">Previous Loan Bank Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Enter name" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="previous_loan_type" className="form-label fw-bold">Previous Loan Type</label>
                  <input type="text" className="form-control" id="previous_loan_type" placeholder="Enter name" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="previous_loan_type" className="form-label fw-bold">Previous Product Model</label>
                  <input type="text" className="form-control" id="previous_loan_type" placeholder="Enter name" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="previous_loan_type" className="form-label fw-bold">Previous Loan Amount</label>
                  <input type="text" className="form-control" id="previous_loan_type" placeholder="Enter name" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="previous_loan_type" className="form-label fw-bold">Previous Loan sanction date</label>
                  <input type="text" className="form-control" id="previous_loan_type" placeholder="Enter name" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="previous_loan_type" className="form-label fw-bold">Previous Loan Insurance Value</label>
                  <input type="text" className="form-control" id="previous_loan_type" placeholder="Enter name" />
                </div>
              </div>
              
            </form>
<div>
<div>
  <h3> File Disposition History</h3>
  <table class="table">
  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">User Name</th>
      <th scope="col">Loan Type</th>
      <th scope="col">Category</th>
      <th scope="col">Disposition</th>
      <th scope="col">Remark</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>
          </div>
            </div>
          </div>
        )}
        {activeTab === 'Personal details' && (
          <div className="tab-pane active">
            <form>

              <div className="mb-3 row">
              <div className="col-md-6">
      <label htmlFor="maritalStatus" className="form-label fw-bold">Is Interested?</label>
      <select
        className="form-select"
        id="maritalStatus"
        value={isInterested}
        onChange={handleInterestChange}
      >
        <option value="">Select</option>
        <option value="Intrested">Interested</option>
        <option value="NotIntrested">Not Interested</option>
      </select>

      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Reason for Not Interested</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleModalSubmit}>
                  <div className="mb-3">
                    <label htmlFor="notInterestedReason" className="form-label">Select Reason</label>
                    <select
                      className="form-select"
                      id="notInterestedReason"
                      value={notInterestedReason}
                      onChange={(e) => setNotInterestedReason(e.target.value)}
                    >
                      <option value="">Select Reason</option>
                      {NotInterestedOptions.notInterested.map((reason, index) => (
                        <option key={index} value={reason}>{reason}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="remarks" className="form-label">Remarks</label>
                    <textarea 
                      type="textarea"
                      className="form-control"
                      id="remarks"
                      value={remarks}
                      onChange={(e) => setRemarks(e.target.value)}
                      placeholder="Enter remarks"
                    />
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          {/* <div className="modal-backdrop fade show"></div> */}
        </div>
      )}
    </div>
                  <div className="col-md-6">
                  <label htmlFor="typeOfLoan" className="form-label fw-bold">Type of Loan</label>
                  <select
                    className="form-select"
                    id="typeOfLoan"
                    value={selectedLoanType}
                    onChange={handleLoanTypeChange}
                  >
                    <option value="">Select loan type</option>
                    {Object.keys(loanMasterData).map((loanType) => (
                      <option key={loanType} value={loanType}>
                        {loanType}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-md-6">
                  <label htmlFor="loanCategory" className="form-label fw-bold">Loan Category</label>
                  <select
                    className="form-select"
                    id="loanCategory"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    disabled={!selectedLoanType} // Disable if no loan type is selected
                  >
                    <option value="">Select category</option>
                    {selectedLoanType &&
                      loanMasterData[selectedLoanType].map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="requiredAmount" className="form-label fw-bold">Required Amount</label>
                  <input type="number" className="form-control" id="requiredAmount" placeholder="Enter required amount" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="mobileNumber" className="form-label fw-bold">Mobile Number</label>
                  <input type="text" className="form-control" id="mobileNumber" placeholder="Enter mobile number" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label fw-bold">Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Enter name" />
                </div>

                <div className="col-md-6">
                  <label htmlFor="permanentAddress" className="form-label fw-bold">Permanent Address</label>
                  <input type="text" className="form-control" id="permanentAddress" placeholder="Enter permanent address" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="permanentAddressLandmark" className="form-label fw-bold">Permanent Address Landmark</label>
                  <input type="text" className="form-control" id="permanentAddressLandmark" placeholder="Enter landmark" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="officialEmailId" className="form-label fw-bold">Official Email ID</label>
                  <input type="email" className="form-control" id="officialEmailId" placeholder="Enter official email ID" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="personalEmailId" className="form-label fw-bold">Personal Email ID</label>
                  <input type="email" className="form-control" id="personalEmailId" placeholder="Enter personal email ID" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="officeName" className="form-label fw-bold">Office Name</label>
                  <input type="text" className="form-control" id="officeName" placeholder="Enter office name" />
                </div>


                <div className="col-md-6">
                  <label htmlFor="dateOfBirth" className="form-label fw-bold">Date of Birth</label>
                  <input type="date" className="form-control" id="dateOfBirth" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="alternateNumber" className="form-label fw-bold">Alternate Number</label>
                  <input type="text" className="form-control" id="alternateNumber" placeholder="Enter alternate number" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="motherName" className="form-label fw-bold">Mother's Name</label>
                  <input type="text" className="form-control" id="motherName" placeholder="Enter mother's name" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="fatherName" className="form-label fw-bold">Father's Name</label>
                  <input type="text" className="form-control" id="fatherName" placeholder="Enter father's name" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="maritalStatus" className="form-label fw-bold">Marital Status</label>
                  <select className="form-select" id="maritalStatus">
                    <option value="">Select status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="other">Other</option>

                    {/* Add more options as needed */}
                  </select>
                </div>
                <div className="col-md-6">
                  <label htmlFor="spouseName" className="form-label fw-bold">Spouse's Name</label>
                  <input type="text" className="form-control" id="spouseName" placeholder="Enter spouse's name" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="currentAddress" className="form-label fw-bold">Current Address</label>
                  <input type="text" className="form-control" id="currentAddress" placeholder="Enter current address" />
                </div>
                <div className="col-md-6">
                  <label htmlFor="typeOfResident" className="form-label fw-bold">Type of Resident</label>
                  <select className="form-select" id="typeOfResident">
                    <option value="">Select type</option>
                    <option value="rented">Rented</option>
                    <option value="owned">Owned</option>
                    {/* Add more options as needed */}
                  </select>
                </div>
                  <div className="col-md-6">
                    <label htmlFor="totalNumberOfYearsAtCurrentResidence" className="form-label fw-bold">Years at Current Residence</label>
                    <input type="number" className="form-control" id="totalNumberOfYearsAtCurrentResidence" placeholder="Enter number of years" />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="totalTimeInDelhi" className="form-label fw-bold">Total Time in Delhi</label>
                    <input type="text" className="form-control" id="totalTimeInDelhi" placeholder="Enter total time in Delhi" />
                  </div>

                  <div className="col-md-6">
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
                    <div className="col-md-6">
                      <label htmlFor="occupationType" className="form-label fw-bold">Occupation Type</label>
                      <select className="form-select" id="occupationType">
                        <option value="">Select type</option>
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
                    <div className="col-md-6">
                      <label htmlFor="officeAddress" className="form-label fw-bold">Office Address</label>
                      <input type="text" className="form-control" id="officeAddress" placeholder="Enter office address" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="officeAddressLandmark" className="form-label fw-bold">Office Address Landmark</label>
                      <input type="text" className="form-control" id="officeAddressLandmark" placeholder="Enter landmark" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="noOfYearsAtCurrentOrganization" className="form-label fw-bold">Years at Current Organization</label>
                      <input type="number" className="form-control" id="noOfYearsAtCurrentOrganization" placeholder="Enter number of years" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="gstItrFiled" className="form-label fw-bold">GST/ITR Filed</label>
                      <select className="form-select" id="gstItrFiled">
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="gstAndItrIncome" className="form-label fw-bold">GST and ITR Income</label>
                      <input type="number" className="form-control" id="gstAndItrIncome" placeholder="Enter income" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="serviceType" className="form-label fw-bold">Service Type</label>
                      <select className="form-select" id="serviceType">
                        <option value="">Select type</option>
                        <option value="it_services">IT Services</option>
                        <option value="financial_services">Financial Services</option>
                        <option value="legal_services">Legal Services</option>
                        <option value="healthcare_services">Healthcare Services</option>
                        <option value="educational_services">Educational Services</option>
                        <option value="transportation_services">Transportation Services</option>
                        <option value="hospitality_services">Hospitality Services</option>
                        <option value="consultancy_services">Consultancy Services</option>
                        <option value="retail_services">Retail Services</option>
                        <option value="utility_services">Utility Services (Electricity, Water, etc.)</option>
                        <option value="maintenance_repair_services">Maintenance and Repair Services</option>
                        <option value="marketing_advertising_services">Marketing and Advertising Services</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="inHandSalary" className="form-label fw-bold">In-Hand Salary</label>
                      <input type="number" className="form-control" id="inHandSalary" placeholder="Enter salary" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="otherIncome" className="form-label fw-bold">Other Income</label>
                      <input type="number" className="form-control" id="otherIncome" placeholder="Enter other income" />
                    </div>
                  </div>
               

                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
                
            </form>
          </div>
        )}
        {activeTab === 'references' && (
          <div className="tab-pane active">


            {/* Reference List */}



            {/* Add Reference Form */}
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
        )}

{activeTab === 'loan details' && (
          <div className="tab-pane active">


            {/* Reference List */}



            {/* Add Reference Form */}
            <form onSubmit={handleAddReference} className="mb-4">
              <div className="mb-3 row">
                <div className="col-md-4">
                  <label htmlFor="referenceName" className="form-label fw-bold">Bank Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="referenceName"
                    value={loandetail.bankName}
                    onChange={(e) => setloandetail({ ...loandetail, bankName: e.target.value })}
                    placeholder="Enter name"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="emiAmount" className="form-label fw-bold">EMI Amount</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emiAmount"
                    value={loandetail.emiAmount}
                    onChange={(e) => setloandetail({ ...loandetail, emiAmount: e.target.value })}
                    placeholder="Enter mobile number"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="emi_date" className="form-label fw-bold">EMI Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="emi_date"
                    value={loandetail.emiDate}
                    onChange={(e) => setloandetail({ ...loandetail, emiDate: e.target.value })}
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="loan_start_date" className="form-label fw-bold">Loan Start Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="loan_start_date"
                    value={loandetail.loanstartDate}
                    onChange={(e) => setloandetail({ ...loandetail, loanstartDate: e.target.value })}
                    placeholder="Enter mobile number"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="referenceAddress" className="form-label fw-bold">No of EMI Bounces</label>
                  <input
                    type="text"
                    className="form-control"
                    id="referenceAddress"
                    value={loandetail.address}
                    onChange={(e) => setloandetail({ ...loandetail, noofemiBounces: e.target.value })}
                    placeholder="Enter address"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="referenceAddress" className="form-label fw-bold">Bounces Reason</label>
                  <input
                    type="text"
                    className="form-control"
                    id="referenceAddress"
                    value={loandetail.bouncesReason}
                    onChange={(e) => setloandetail({ ...loandetail, bouncesReason: e.target.value })}
                    placeholder="Enter address"
                    required
                  />
                </div>
                <div className="col-md-4">
                  <label htmlFor="referenceAddress" className="form-label fw-bold">Car Details</label>
                  <input
                    type="text"
                    className="form-control"
                    id="referenceAddress"
                    value={loandetail.carDetails}
                    onChange={(e) => setloandetail({ ...loandetail, carDetails: e.target.value })}
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
        )}





        {activeTab === 'attachments' && (
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

    {/* Document List with View and Delete Options */}
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

    {/* Bootstrap Modal for Viewing Document */}
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
        {/* <div className="modal-backdrop fade show"></div> */}
      </div>
    )}
  </div>
)}





      </div>
    </div>

  )
}

export default Tvr