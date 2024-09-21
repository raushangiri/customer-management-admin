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

const Tvrsearch = () => {


    const [activeTab, setActiveTab] = useState('Previous Loan Details');


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
                    <OverviewDetails />
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
                
                {activeTab === 'attachments' && (
                    <Attachments />
                )}
            
                {activeTab === 'disposition' && (
  <Disposition/>

)}
            </div>

            
        </div>
  )
}

export default Tvrsearch