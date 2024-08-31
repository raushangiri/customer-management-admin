import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { statuses, bank_details } from '../../Component/Bank-login/Data'; // Adjust the path if necessary
import { Link } from "react-router-dom";
const PersonalDetails = () => {
    const [activeTab, setActiveTab] = useState('details');
    const [references, setReferences] = useState([]);
    const [newReference, setNewReference] = useState({ name: '', mobileNumber: '', address: '' });
    const [loandetail, setloandetail] = useState({ bankName: '', emiAmount: '', emiDate: '', loanstartDate: '', noofemiBounces: '', bouncesReason: '', carDetails: '' });
    const [newloandetail, setNewloandetail] = useState([]);
    // const [selectedLoanType, setSelectedLoanType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isInterested, setIsInterested] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [notInterestedReason, setNotInterestedReason] = useState('');
    const [remarks, setRemarks] = useState('');
    const [selectedDocumentType, setSelectedDocumentType] = useState('');
    const [uploadedDocuments, setUploadedDocuments] = useState([]);
    const [showModal1, setShowModal1] = useState(false);
    const [selectedDocumentFile, setSelectedDocumentFile] = useState(null);
    const [loginStatus, setLoginStatus] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [selectedBank, setSelectedBank] = useState('');
  const [bankDetail, setBankDetail] = useState({ "RM NAME": '', "RM CONTACT NO": '' });
  const [selectedLoanType, setSelectedLoanType] = useState('');

  // Filter bank details based on selectedLoanType
  const filteredBanks = bank_details.filter(bank => bank["Loan Type"] === selectedLoanType);

  // Helper function to get bank details
  const getBankDetails = (bankName) => {
    return filteredBanks.find(bank => bank["BANK NAME"] === bankName) || {};
  };

  useEffect(() => {
    setBankDetail(getBankDetails(selectedBank));
  }, [selectedBank]);

  const handleLoginStatusChange = (event) => {
    setLoginStatus(event.target.value);
    if (event.target.value === 'Yes') {
      setSelectedStatus('');
      setSelectedReason('');
      setSelectedBank('');
      setBankDetail({ "RM NAME": '', "RM CONTACT NO": '' }); // Reset bank details
    }
  };

  const handleStatusChange = (event) => {
    const status = event.target.value;
    setSelectedStatus(status);
    setSelectedReason('');
  };

  const handleReasonChange = (event) => {
    setSelectedReason(event.target.value);
  };

  const handleBankChange = (event) => {
    const bankName = event.target.value;
    setSelectedBank(bankName);
  };

  const filteredReasons = statuses.find(status => status.login_status === selectedStatus)?.reasons || [];
  const bankOptions = filteredBanks.map(bank => bank["BANK NAME"]);




    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const getPrevious12Months = () => {
        const previous12Months = [];
        const currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();

        for (let i = 0; i < 12; i++) {
            const monthName = months[currentMonth];
            previous12Months.push({
                month: monthName,
                year: currentYear,
                dayValues: Array(6).fill('') // Initialize with empty strings for days 5, 10, 15, 20, 25, 30
            });

            currentMonth = (currentMonth - 1 + 12) % 12;
            if (currentMonth === 11) {
                currentYear--;
            }
        }
        return previous12Months.reverse();
    };

    const [previous12Months, setPrevious12Months] = useState(getPrevious12Months());

    const handleDayValueChange = (monthIndex, dayIndex, value) => {
        const updatedMonths = [...previous12Months];
        updatedMonths[monthIndex].dayValues[dayIndex] = value;
        setPrevious12Months(updatedMonths);
    };

    const calculateTotalAB = (dayValues) => {
        return dayValues.reduce((total, value) => total + (parseFloat(value) || 0), 0);
    };

    const calculateTotalABB = (totalAB) => {
        return totalAB / 6;
    };

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


    const handleAddloanDetails = (e) => {
        e.preventDefault();
        setNewloandetail([...newloandetail, loandetail]);
        setloandetail({ bankName: '', emiAmount: '', emiDate: '', loanstartDate: '', noofemiBounces: '', bouncesReason: '', carDetails: '' });
    };

    const loanMasterData = {
        'Auto Loan': ['External Bt', 'Internal Bt', 'Refinance', 'New Car', 'Sale Purchage'],
        'Business Loan': ['Proprietorship', 'Partnership', 'Pvt Ltd Firm'],
        'LAP Loan': ['Proprietorship', 'Partnership', 'Pvt Ltd Firm'],
        'Home Loan': ['Proprietorship', 'Partnership', 'Pvt Ltd Firm'],
        'Personal Loan': ['Personal Loan'],
        'Education Loan': ['Education Loan'],
        'Insurance': ['Insurance'],
        'Working capital Loan': ['Working capital Loan'],
        'Small Business Loan':['small business loan'],
        'Drop Down OD':['Drop Down OD']
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
    <>
     <div className="tab-pane active">
                        <form>
<h4 className='text-end'><Link to="https://emicalculator.net/" target="_blank"> Loan EMI calculator</Link></h4>
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
                                    <input type="text" className="form-control" id="requiredAmount" placeholder="Enter required amount" />
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
                                        <option value="other">Other</option>
                                    </select>
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
                                        <option value="Other">Other</option>
                                    </select>
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
                                        <option value="other">Other</option>
                                    </select>
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
                                    <label htmlFor="totalNumberOfYearsAtCurrentResidence" className="form-label fw-bold">Years at Current Residence</label>
                                    <input type="text" className="form-control" id="totalNumberOfYearsAtCurrentResidence" placeholder="Enter number of years" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="totalTimeInDelhi" className="form-label fw-bold">Total Time in Delhi</label>
                                    <input type="text" className="form-control" id="totalTimeInDelhi" placeholder="Enter total time in Delhi" />
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
                                    <input type="text" className="form-control" id="noOfYearsAtCurrentOrganization" placeholder="Enter number of years" />
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
                                    <input type="text" className="form-control" id="gstAndItrIncome" placeholder="Enter income" />
                                </div>
                               
                                <div className="col-md-6">
                                    <label htmlFor="inHandSalary" className="form-label fw-bold">In-Hand Salary</label>
                                    <input type="text" className="form-control" id="inHandSalary" placeholder="Enter salary" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="otherIncome" className="form-label fw-bold">Other Income</label>
                                    <input type="text" className="form-control" id="otherIncome" placeholder="Enter other income" />
                                </div>
                            </div>


                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>

                        </form>
                    </div>
    </>
  )
}

export default PersonalDetails