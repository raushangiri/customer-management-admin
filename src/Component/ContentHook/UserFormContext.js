import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const UserFormContext = createContext();

export const UserFormProvider = ({ children }) => {
  // State to manage mobile number and file number
  const [mobileNumber, setMobileNumber] = useState("");
  const [fileNumber, setFileNumber] = useState("");

  // State to manage data from both schemas
  const [personalData, setPersonalData] = useState({});
  const [fileData, setFileData] = useState({});

  const baseurl = process.env.REACT_APP_API_BASE_URL;

  // Fetch data based on mobile number
  const fetchPersonalData = useCallback(async (mobileNumber) => {
    try {
      const response = await axios.get(`${baseurl}/api/personal?mobileNumber=${mobileNumber}`);
      console.log('Personal data response:', response.data);

      setPersonalData(response.data || {});
    } catch (error) {
      console.error('Error fetching personal data:', error);
      setPersonalData({});
    }
  }, [baseurl]);

  // Fetch data based on file number
  const fetchFileData = useCallback(async (fileNumber) => {
    try {
      const response = await axios.get(`${baseurl}/api/file/${fileNumber}`);
      console.log('File data response:', response.data);

      setFileData(response.data || {});
    } catch (error) {
      console.error('Error fetching file data:', error);
      setFileData({});
    }
  }, [baseurl]);

  // Handle change in mobile number
  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  // Handle change in file number
  const handleFileNumberChange = (e) => {
    setFileNumber(e.target.value);
  };

  // Handle blur event to fetch data when focus leaves the input field
  const handleMobileNumberBlur = () => {
    if (mobileNumber) {
      fetchPersonalData(mobileNumber);
    }
  };

  const handleFileNumberBlur = () => {
    if (fileNumber) {
      fetchFileData(fileNumber);
    }
  };

  return (
    <UserFormContext.Provider
      value={{
        mobileNumber,
        fileNumber,
        personalData,
        fileData,
        handleMobileNumberChange,
        handleFileNumberChange,
        handleMobileNumberBlur,
        handleFileNumberBlur,
        setPersonalData,
        setFileData,
      }}
    >
      {children}
    </UserFormContext.Provider>
  );
};
