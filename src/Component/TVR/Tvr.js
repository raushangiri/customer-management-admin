// import React, { useState } from 'react';
// import PersonalDetails from '../Components/PersonalDetails';
// import ReferenceDetails from '../Components/ReferenceDetails';
// import LoanDetails from '../Components/LoanDetails';
// import Attachments from '../Components/Attachments';
// import OverviewDetails from '../Components/OverviewDetails';
// import Disposition from '../Components/Disposition';
// import Tvr_files from '../Components/Tvr_files';

// const Tvr = () => {

//   const [activeTab, setActiveTab] = useState('details');
  
 

//   return (
//     <div className="container mt-4">
//       <ul className="nav nav-tabs">
      

//       <li className="nav-item">
//           <button
//             className={`nav-link ${activeTab === 'tvr_file' ? 'active' : ''}`}
//             onClick={() => setActiveTab('tvr_file')}
//           >
//             TVR Files
//           </button>
//         </li>

//         <li className="nav-item">
//           <button
//             className={`nav-link ${activeTab === 'Previous Loan Details' ? 'active' : ''}`}
//             onClick={() => setActiveTab('Previous Loan Details')}
//           >
//             Overview
//           </button>
//         </li>
//         <li className="nav-item">
//           <button
//             className={`nav-link ${activeTab === 'Personal details' ? 'active' : ''}`}
//             onClick={() => setActiveTab('Personal details')}
//           >
//             Personal details
//           </button>
//         </li>
//         <li className="nav-item">
//           <button
//             className={`nav-link ${activeTab === 'references' ? 'active' : ''}`}
//             onClick={() => setActiveTab('references')}
//           >
//             Reference Details
//           </button>
//         </li>

//         <li className="nav-item">
//           <button
//             className={`nav-link ${activeTab === 'loan details' ? 'active' : ''}`}
//             onClick={() => setActiveTab('loan details')}
//           >
//             Loan details
//           </button>
//         </li>

//         <li className="nav-item">
//           <button
//             className={`nav-link ${activeTab === 'attachments' ? 'active' : ''}`}
//             onClick={() => setActiveTab('attachments')}
//           >
//             Attachments
//           </button>
//         </li>
//         <li className="nav-item">
//           <button
//             className={`nav-link ${activeTab === 'disposition' ? 'active' : ''}`}
//             onClick={() => setActiveTab('disposition')}
//           >
//             disposition
//           </button>
//         </li>

//       </ul>

//       <div className="tab-content mt-4">

//       {activeTab === 'tvr_file' && (
//           <Tvr_files/>
//         )}

//         {activeTab === 'Previous Loan Details' && (
//           <OverviewDetails/>
//         )}
//         {activeTab === 'Personal details' && (
//           <PersonalDetails/>
//         )}
//         {activeTab === 'references' && (
//           <ReferenceDetails/>
//         )}

//         {activeTab === 'loan details' && (
//           <LoanDetails/>
//         )}

// {activeTab === 'attachments' && (
//   <Attachments/>
// )}


//         {activeTab === 'disposition' && (
//           <Disposition/>

//         )}



//       </div>
//     </div>

//   )
// }

// export default Tvr

import React, { useState } from 'react';
import PersonalDetails from '../Components/PersonalDetails';
import ReferenceDetails from '../Components/ReferenceDetails';
import LoanDetails from '../Components/LoanDetails';
import Attachments from '../Components/Attachments';
import OverviewDetails from '../Components/OverviewDetails';
import Disposition from '../Components/Disposition';
import Tvr_files from '../Components/Tvr_files';
import FileOverviewdetails from '../Components/FileOverviewdetails';

const Tvr = () => {
  const [activeTab, setActiveTab] = useState('tvr_file');
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
            className={`nav-link ${activeTab === 'tvr_file' ? 'active' : ''}`}
            onClick={() => setActiveTab('tvr_file')}
          >
            TVR Files
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
        {activeTab === 'tvr_file' && (
          <Tvr_files onViewClick={handleViewClick} /> // Pass the callback function
        )}

        {activeTab === 'Previous Loan Details' && (
          // <OverviewDetails mobileNumber={selectedMobileNumber} /> // Pass mobile number to OverviewDetails
          <FileOverviewdetails/>
        )}

        {activeTab === 'Personal details' && <PersonalDetails />}

        {activeTab === 'references' && <ReferenceDetails />}

        {activeTab === 'loan details' && <LoanDetails />}

        {activeTab === 'attachments' && <Attachments />}

        {activeTab === 'disposition' && <Disposition />}
      </div>
    </div>
  );
};

export default Tvr;
