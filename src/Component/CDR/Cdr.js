
import React, { useState } from 'react';
import PersonalDetails from '../Components/PersonalDetails';
import ReferenceDetails from '../Components/ReferenceDetails';
import LoanDetails from '../Components/LoanDetails';
import Attachments from '../Components/Attachments';
import OverviewDetails from '../Components/OverviewDetails';
import Disposition from '../Components/Disposition';
import BankLogin from '../Components/BankLogin';
import UploadbankStatement from '../Components/UploadbankStatement';

const Cdr = () => {

  const [activeTab, setActiveTab] = useState('details');
  const [references, setReferences] = useState([]);
  const [newReference, setNewReference] = useState({ name: '', mobileNumber: '', address: '' });
  const [loandetail, setloandetail] = useState({ bankName: '', emiAmount: '', emiDate: '', loanstartDate: '', noofemiBounces: '', bouncesReason: '', carDetails: '' });
  const [newloandetail, setNewloandetail] = useState([]);
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
  const [callStatus, setCallStatus] = useState('');
  const [disposition, setDisposition] = useState('');
  const [selectedDocuments, setSelectedDocuments] = useState([]);


  const documentTypes = [
    { value: 'photo_document', label: 'Photo Document' },
    { value: 'pan_card_document', label: 'PAN Card Document' },
    { value: 'aadhaar_card_document', label: 'Aadhaar Card Document' },
    // Add other document types as needed
  ];

  // Handle checkbox change
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      // Add document to the selected list
      setSelectedDocuments((prev) => [...prev, value]);
    } else {
      // Remove document from the selected list
      setSelectedDocuments((prev) => prev.filter((doc) => doc !== value));
    }
  };

  // Handle changes in Call Status
  const handleCallStatusChange = (e) => {
    setCallStatus(e.target.value);
    setDisposition(''); // Reset disposition when call status changes
  };

  // Handle changes in Disposition
  const handleDispositionChange = (e) => {
    setDisposition(e.target.value);
  };


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
    'Insurance': ['Car Insurance'],
    'Working capital Loan': ['OD','CC Limit','MSME CGT'],
    'Small Business Loan':['Proprietorship', 'Partnership', 'Pvt Ltd Firm'],
    'Drop Down OD':['Proprietorship', 'Partnership', 'Pvt Ltd Firm']
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
    // console.log('Reason:', notInterestedReason);
    // console.log('Remarks:', remarks);
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
            className={`nav-link ${activeTab === 'bank statement' ? 'active' : ''}`}
            onClick={() => setActiveTab('bank statement')}
          >
            Bank statement details
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
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'disposition' ? 'active' : ''}`}
            onClick={() => setActiveTab('disposition')}
          >
            disposition
          </button>
        </li>

      </ul>

      <div className="tab-content mt-4">



        {activeTab === 'Previous Loan Details' && (
         <OverviewDetails/>
        )}
        {activeTab === 'Personal details' && (
         <PersonalDetails/>
        )}
        {activeTab === 'references' && (
          <ReferenceDetails/>
        )}

{activeTab === 'loan details' && (
          <LoanDetails/>
        )}

        {activeTab === 'bank statement' && (
          <UploadbankStatement/>
      )
}
      {activeTab === 'attachments' && (
        <Attachments/>
      )}

      {activeTab === 'disposition' && (
        <Disposition/>

      )}



    </div>
    </div >

  )


}

export default Cdr