import React, { useState } from 'react';

import PersonalDetails from '../Components/PersonalDetails';
import ReferenceDetails from '../Components/ReferenceDetails';
import LoanDetails from '../Components/LoanDetails';
import UploadbankStatement from '../Components/UploadbankStatement';
import Attachments from '../Components/Attachments';
import BankLogin from '../Components/BankLogin';
import OverviewDetails from '../Components/OverviewDetails';
import Disposition from '../Components/Disposition';
import LoanApproval from '../Components/LoanApproval';
import Bank_Login from '../Components/BankLogin';
import FileOverviewdetails from '../Components/FileOverviewdetails';
import BankLogincomponent from '../Components/BankLogincomponent';

const Bank_login = () => {
    const [activeTab, setActiveTab] = useState('bank_login_file');
    const [selectedMobileNumber, setSelectedMobileNumber] = useState(null); // State for selected mobile number

    const handleViewClick = (mobileNumber) => {
        setSelectedMobileNumber(mobileNumber); // Set the selected mobile number
        setActiveTab('Previous Loan Details'); // Automatically switch to 'Overview' tab when View is clicked
      };
    return (
        <div className="container mt-4">
            <ul className="nav nav-tabs">
            <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'bank_login_file' ? 'active' : ''}`}
                        onClick={() => setActiveTab('bank_login_file')}
                    >
                        Bank Login File
                    </button>
                </li>
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
                        className={`nav-link ${activeTab === 'bank_login_details' ? 'active' : ''}`}
                        onClick={() => setActiveTab('bank_login_details')}
                    >
                        Bank Login Details
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'approval_details' ? 'active' : ''}`}
                        onClick={() => setActiveTab('approval_details')}
                    >
                        Approval Details
                    </button>
                </li>
                <li className="nav-item">
                    <button
                        className={`nav-link ${activeTab === 'disbursal_details' ? 'active' : ''}`}
                        onClick={() => setActiveTab('disbursal_details')}
                    >
                        Disbursal Details
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
            {activeTab === 'bank_login_file' && (
                <Bank_Login onViewClick={handleViewClick}/>
            )}
                {activeTab === 'Previous Loan Details' && (
                    <FileOverviewdetails/>
                )}
                {activeTab === 'Personal details' && (
                    <PersonalDetails />
                )}
                {activeTab === 'references' && (
                    <ReferenceDetails />
                )}
                {activeTab === 'loan details' && (
                    <LoanDetails />
                )}
                {activeTab === 'bank statement' && (
                    <UploadbankStatement />
                )
                }
                {activeTab === 'attachments' && (
                    <Attachments />
                )}
                {activeTab === 'bank_login_details' && (
                    <>
                    <BankLogincomponent />
                    
                    </>
                )}
                {activeTab === 'approval_details' && (
                    <LoanApproval />
                )}
                {activeTab === 'disposition' && (
  <Disposition/>

)}
            </div>

            
        </div>

    )


}
export default Bank_login