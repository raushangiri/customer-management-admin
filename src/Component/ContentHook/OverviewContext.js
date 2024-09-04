import React, { createContext, useState, useCallback } from 'react';
import axios from 'axios';

export const UserFormContext  = createContext();

export const UserFormProvider  = ({ children }) => {
  // State to manage mobile number
  const [mobileNumber, setMobileNumber] = useState("");

  // State to manage all form data
  const [formData, setFormData] = useState({
    mobileNumber:'',
    loan_bank_name:"",
product_model:"",
loan_amount:"",
loan_sanction_date:"",
loan_insurance_value:"",
loan_end_date:"",
    name: '',
    is_interested: '',
    type_of_loan: '',
    loan_category: '',
    required_amount: '',
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
    in_hand_salary: '',
    other_income: '',
    reference_name: '',
    reference_mobile_number: '',
    company_name: '',
    reference_address: '',
    bank_name: '',
    emi_amount: '',
    loan_term: '',
    loan_start_date: '',
    loan_end_date: '',
    emi_date: '',
    no_of_emi_bounces: '',
    bounces_reason: '',
    car_details: '',
  });

  const baseurl = process.env.REACT_APP_API_BASE_URL;

  // Fetch data based on mobile number
  const fetchData = useCallback(async (mobileNumber) => {
    try {
      const response = await axios.get(`${baseurl}/getfiledata?customerNumber=${mobileNumber}`);
      console.log('API response:', response.data);
  
      if (response.data && Object.keys(response.data).length > 0) {
        const data = response.data;
        setFormData({
            
            mobileNumber:mobileNumber,
            loan_bank_name:data.bankName || "",
            product_model: data.model || "",
            loan_amount:data.loanAmount || "",
            loan_sanction_date:data.loan_sanction_date || "",
            loan_insurance_value:data.insurance||"",
            loan_end_date:data.loan_end_date||"",
          name: data.customerName || '',
          is_interested: data.is_interested || '',
          type_of_loan: data.type_of_loan || '',
          loan_category: data.loan_category || '',
          required_amount: data.required_amount || '',
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
          in_hand_salary: data.in_hand_salary || '',
          other_income: data.other_income || '',
          reference_name: data.reference_name || '',
          reference_mobile_number: data.reference_mobile_number || '',
          company_name: data.company_name || '',
          reference_address: data.reference_address || '',
          bank_name: data.bank_name || '',
          emi_amount: data.emi_amount || '',
          loan_term: data.loan_term || '',
          loan_start_date: data.loan_start_date || '',
          loan_end_date: data.loan_end_date || '',
          emi_date: data.emi_date || '',
          no_of_emi_bounces: data.no_of_emi_bounces || '',
          bounces_reason: data.bounces_reason || '',
          car_details: data.car_details || '',
        });
      } else {
        // Reset formData to initial values if no data is found
        setFormData({
          name: '',
          is_interested: '',
          type_of_loan: '',
          loan_category: '',
          required_amount: '',
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
          in_hand_salary: '',
          other_income: '',
          reference_name: '',
          reference_mobile_number: '',
          company_name: '',
          reference_address: '',
          bank_name: '',
          emi_amount: '',
          loan_term: '',
          loan_start_date: '',
          loan_end_date: '',
          emi_date: '',
          no_of_emi_bounces: '',
          bounces_reason: '',
          car_details: '',
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Optionally reset formData on error as well
      setFormData({
        name: '',
        is_interested: '',
        type_of_loan: '',
        loan_category: '',
        required_amount: '',
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
        in_hand_salary: '',
        other_income: '',
        reference_name: '',
        reference_mobile_number: '',
        company_name: '',
        reference_address: '',
        bank_name: '',
        emi_amount: '',
        loan_term: '',
        loan_start_date: '',
        loan_end_date: '',
        emi_date: '',
        no_of_emi_bounces: '',
        bounces_reason: '',
        car_details: '',
      });
    }
  }, [baseurl]);
  
  

  // Handle change in mobile number
  const handleMobileNumberChange = (e) => {
    setMobileNumber(e.target.value);
  };

  // Handle blur event to fetch data when focus leaves the input field
  const handleMobileNumberBlur = () => {
    if (mobileNumber) {
      fetchData(mobileNumber);
    }
  };

  return (
    <UserFormContext.Provider
      value={{
        mobileNumber,
        formData,
        handleMobileNumberChange,
        handleMobileNumberBlur,
        setFormData,
      }}
    >
      {children}
    </UserFormContext.Provider>
  );
};
