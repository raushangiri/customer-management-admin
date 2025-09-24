import React, { useState } from "react";
import PersonalDetails from '../Components/PersonalDetails';
import CoApplicantOne from "./CoApplicantOne";     // Co-applicant 1 form
import CoApplicantTwo from "./CoApplicantTwo";     // Co-applicant 2 form

const LoanApplication = () => {
  const [activeTab, setActiveTab] = useState("applicant");

  return (
    <div className="container mt-3">
      {/* Tabs Header */}
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "applicant" ? "active" : ""}`}
            onClick={() => setActiveTab("applicant")}
          >
            Applicant
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "coapplicant1" ? "active" : ""}`}
            onClick={() => setActiveTab("coapplicant1")}
          >
            Co-Applicant 1
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === "coapplicant2" ? "active" : ""}`}
            onClick={() => setActiveTab("coapplicant2")}
          >
            Co-Applicant 2
          </button>
        </li>
      </ul>

      {/* Tab Content */}
      <div className="tab-content mt-3">
        {activeTab === "applicant" && (
          <div className="tab-pane active">
            <PersonalDetails />
          </div>
        )}

        {activeTab === "coapplicant1" && (
          <div className="tab-pane active">
            <CoApplicantOne />
          </div>
        )}

        {activeTab === "coapplicant2" && (
          <div className="tab-pane active">
            <CoApplicantTwo />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoanApplication;
