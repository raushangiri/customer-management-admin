import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { statuses, bank_details } from '../../Component/Bank-login/Data'; // Adjust the path if necessary



const Disbursal = () => {
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
    
    </>
  )
}

export default Disbursal