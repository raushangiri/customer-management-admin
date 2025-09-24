import React, { useState } from 'react';
import PersonalDetails from '../Components/PersonalDetails';
import ReferenceDetails from '../Components/ReferenceDetails';
import LoanDetails from '../Components/LoanDetails';
import Attachments from '../Components/Attachments';
import OverviewDetails from '../Components/OverviewDetails';
import Disposition from '../Components/Disposition';
import BankLogin from '../Components/BankLogin';
import UploadbankStatement from '../Components/UploadbankStatement';
import Cdr_files from '../Components/Cdr_files';
import FileOverviewdetails from '../Components/FileOverviewdetails';
import Applicant_coapplicant from './Applicant_coapplicant';

const CDRsearch = () => {
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
                <OverviewDetails />
            )}
             {activeTab === 'Personal details' && (
         <Applicant_coapplicant/>
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

        
    </div>
    );
  };

export default CDRsearch