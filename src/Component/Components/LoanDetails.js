import React, { useState, useEffect } from 'react';

import { statuses, bank_details } from '../../Component/Bank-login/Data'; // Adjust the path if necessary

const LoanDetails = () => {

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
      <label htmlFor="loanTerm" className="form-label fw-bold">Loan Term</label>
      <input
        type="text"
        className="form-control"
        id="loanTerm"
        value={loandetail.loanTerm}
        onChange={(e) => setloandetail({ ...loandetail, loanTerm: e.target.value })}
        placeholder="Enter mobile number"
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
      <label htmlFor="loan_end_date" className="form-label fw-bold">Loan End Date</label>
      <input
        type="date"
        className="form-control"
        id="loan_end_date"
        value={loandetail.loan_end_date}
        onChange={(e) => setloandetail({ ...loandetail, loan_end_date: e.target.value })}
        
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
      <select className="form-select" id="referenceAddress"value={loandetail.bouncesReason}
        onChange={(e) => setloandetail({ ...loandetail, bouncesReason: e.target.value })}>
          <option value="">Select Reason</option>
          <option value="insuffisent_funds">Insuffisent Funds</option>
          <option value="technical_issue">Technical issue</option>
          </select>
      {/* <input
        type="text"
        className="form-control"
        id="referenceAddress"
        value={loandetail.bouncesReason}
        onChange={(e) => setloandetail({ ...loandetail, bouncesReason: e.target.value })}
        placeholder="Enter address"
        required
      /> */}
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
    </>
  )
}

export default LoanDetails