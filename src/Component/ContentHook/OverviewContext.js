import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';
const baseurl = process.env.REACT_APP_API_BASE_URL;

// Create Context
const OverviewContext = createContext();

// Create Provider Component
export const OverviewProvider = ({ children }) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [error1, setError1] = useState(''); // State to track error message

  const [formData, setFormData] = useState({
    file_number: '',
    mobileNumber: '',
    customerName: '',
    loan_bank_name: '',
    previousLoanType: '',
    previousProductModel: '',
    loan_amount: '',
    previousLoanSanctionDate: '',
    previousLoanInsuranceValue: '',
    is_interested: '',
    type_of_loan: '',
    loan_category: '',
    required_amount: '',
    mobile_number: '',
    name: '',
    occupation_type: '',
    nature_of_business: '',
    service_type: '',
    type_of_resident: '',
    permanent_address: '',
    permanent_address_landmark: '',
    official_email_id: '',
    personal_email_id: '',
    office_name: '',
    date_of_birth: '',
    alternate_number: '',
    mother_name: '',
    father_name: '',
    marital_status: '',
    spouse_name: '',
    current_address: '',
    years_at_current_residence: '',
    total_time_in_delhi: '',
    office_address: '',
    office_address_landmark: '',
    years_at_current_organization: '',
    gst_itr_filed: '',
    gst_and_itr_income: '',
    inhand_salary: '',
    other_income: '',
reference_name: '',
reference_mobile_number: '',
reference_occupation_type: '',
reference_nature_of_business: '',
company_name: '',
reference_address: '',

  });

  // Function to reset formData
  const resetFormData = () => {
    setFormData({
      file_number: '',
      mobileNumber: '',
      customerName: '',
      loan_bank_name: '',
      previousLoanType: '',
      previousProductModel: '',
      loan_amount: '',
      previousLoanSanctionDate: '',
      previousLoanInsuranceValue: '',
      is_interested: '',
      type_of_loan: '',
      loan_category: '',
      required_amount: '',
      mobile_number: '',
      name: '',
      occupation_type: '',
      nature_of_business: '',
      service_type: '',
      type_of_resident: '',
      permanent_address: '',
      permanent_address_landmark: '',
      official_email_id: '',
      personal_email_id: '',
      office_name: '',
      date_of_birth: '',
      alternate_number: '',
      mother_name: '',
      father_name: '',
      marital_status: '',
      spouse_name: '',
      current_address: '',
      years_at_current_residence: '',
      total_time_in_delhi: '',
      office_address: '',
      office_address_landmark: '',
      years_at_current_organization: '',
      gst_itr_filed: '',
      gst_and_itr_income: '',
      inhand_salary: '',
      other_income: '',
      reference_name: '',
reference_mobile_number: '',
reference_occupation_type: '',
reference_nature_of_business: '',
company_name: '',
reference_address: '',
    });
    setError1('');
  };

  const fetchFileData = async (mobileNumber) => {
    try {
      // Reset form data before fetching new data
      resetFormData();

      const response = await axios.get(`${baseurl}/getfiledata/${mobileNumber}`);
      
      const data = response.data;
      if (!data) {
        setError1('There is no file with this Number'); // Set error message if no data
        return;
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        file_number: data.file_number || '',
        mobileNumber: mobileNumber || '',
        customerName: data.customer_name || '',
        loan_bank_name: data.previous_loan_bank_name || '',
        previousLoanType: data.previous_loan_type || '',
        previousProductModel: data.previous_product_model || '',
        loan_amount: data.previous_loan_amount || '',
        previousLoanSanctionDate: data.previous_loan_sanction_date || '',
        previousLoanInsuranceValue: data.previous_loan_insurance_value || '',
      }));

      // Fetch personal data using the fetched file number
      fetchpersonalData(data.file_number);
      fetchreferenceData(data.file_number);
    } catch (error) {
      console.error('Error fetching file data:', error);
    }
  };

  const fetchpersonalData = async (file_number) => {
    try {
      const response = await axios.get(`${baseurl}/getpersonadetails/${file_number}`);
      const data = response.data.data;

      setFormData((prevFormData) => ({
        ...prevFormData,
        is_interested: data.is_interested || '',
        type_of_loan: data.type_of_loan || '',
        loan_category: data.loan_category || '',
        required_amount: data.required_amount || '',
        mobile_number: mobileNumber || '',
        name: formData.name || '',
        occupation_type: data.occupation_type || '',
        nature_of_business: data.nature_of_business || '',
        service_type: data.service_type || '',
        type_of_resident: data.type_of_resident || '',
        permanent_address: data.permanent_address || '',
        permanent_address_landmark: data.permanent_address_landmark || '',
        official_email_id: data.official_email_id || '',
        personal_email_id: data.personal_email_id || '',
        office_name: data.office_name || '',
        date_of_birth: data.date_of_birth || '',
        alternate_number: data.alternate_number || '',
        mother_name: data.mother_name || '',
        father_name: data.father_name || '',
        marital_status: data.marital_status || '',
        spouse_name: data.spouse_name || '',
        current_address: data.current_address || '',
        years_at_current_residence: data.years_at_current_residence || '',
        total_time_in_delhi: data.total_time_in_delhi || '',
        office_address: data.office_address || '',
        office_address_landmark: data.office_address_landmark || '',
        years_at_current_organization: data.years_at_current_organization || '',
        gst_itr_filed: data.gst_itr_filed || '',
        gst_and_itr_income: data.gst_and_itr_income || '',
        inhand_salary: data.inhand_salary || '',
        other_income: data.other_income || '',
      }));
    } catch (error) {
      console.error('Error fetching personal data:', error);
    }
  };

  const fetchreferenceData = async (file_number) => {
    try {
      const response = await axios.get(`${baseurl}/getreferencedetail/${file_number}`);
      const data = response.data.data;

      setFormData((prevFormData) => ({
        ...prevFormData,
        reference_name: data.reference_name||'',
        reference_mobile_number: data.reference_mobile_number||'',
        reference_occupation_type: data.occupation_type||'',
        reference_nature_of_business: data.nature_of_business||'',
        company_name: data.company_name||'',
        reference_address: data.reference_address||'',
      }));
    } catch (error) {
      console.error('Error fetching personal data:', error);
    }
  };







  const handleSubmit = async (formType) => {
    try {
      if (formType === 'overview') {
        // Update overview data
        await axios.post(`${baseurl}/createpersonaldetails/${formData.file_number}`, formData);
      } else if (formType === 'personal') {
        // Update personal data
        await axios.post(`${baseurl}/createpersonaldetails/${formData.file_number}`, formData);
        resetFormData();
      }
      else if (formType === 'reference') {
        // Update personal data
        await axios.post(`${baseurl}/createreferencedetail/${formData.file_number}`, formData);
        resetFormData();
      }
      
      // Optionally, you can fetch updated data to reflect changes
      fetchFileData(formData.mobileNumber);
    } catch (error) {
      console.error('Error updating data:', error);
      // Handle error accordingly
    }
  };

  return (
    <OverviewContext.Provider value={{ mobileNumber,
      handleSubmit, 
      setMobileNumber, 
      formData, 
      setFormData,error1 ,
     fetchFileData,
     fetchpersonalData,
     fetchreferenceData 
     
     }}>
      {children}
    </OverviewContext.Provider>
  );
};

// Custom Hook
export const useOverview = () => useContext(OverviewContext);
