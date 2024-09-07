// LoanContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';

// Create the context
export const LoanContext = createContext();

// Provider component
export const LoanProvider = ({ children }) => {
  const [overviewData, setOverviewData] = useState({});
  const [personalData, setPersonalData] = useState({});
  const [referenceData, setReferenceData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLoanData = async (mobileNumber) => {
    setLoading(true);
    setError(null);
    try {
      // Example API calls for fetching data based on the mobile number
      const overviewResponse = await axios.get(`https://api.com/overview/${mobileNumber}`);
      const personalResponse = await axios.get(`https://api.com/personal/${mobileNumber}`);
      const referenceResponse = await axios.get(`https://api.com/reference/${mobileNumber}`);

      // Set the responses to the state
      setOverviewData(overviewResponse.data);
      setPersonalData(personalResponse.data);
      setReferenceData(referenceResponse.data);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoanContext.Provider value={{ overviewData, personalData, referenceData, fetchLoanData, loading, error }}>
      {children}
    </LoanContext.Provider>
  );
};
