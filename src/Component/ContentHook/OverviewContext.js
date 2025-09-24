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
    model_number:'',
    carNumber:'',
    carName:'',
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
note:'',
is_coapplicant: '',
coapplicant_one_type_of_loan: '',
coapplicant_one_loan_category: '',
coapplicant_one_required_amount: '',
coapplicant_one_mobile_number: '',
coapplicant_one_name: '',
coapplicant_one_occupation_type: '',
coapplicant_one_nature_of_business: '',
coapplicant_one_service_type: '',
coapplicant_one_type_of_resident: '',
coapplicant_one_permanent_address: '',
coapplicant_one_permanent_address_landmark: '',
coapplicant_one_official_email_id: '',
coapplicant_one_personal_email_id: '',
coapplicant_one_office_name: '',
coapplicant_one_date_of_birth: '',
coapplicant_one_alternate_number: '',
coapplicant_one_mother_name: '',
coapplicant_one_father_name: '',
coapplicant_one_marital_status: '',
coapplicant_one_spouse_name: '',
coapplicant_one_current_address: '',
coapplicant_one_years_at_current_residence: '',
coapplicant_one_total_time_in_delhi: '',
coapplicant_one_office_address: '',
coapplicant_one_office_address_landmark: '',
coapplicant_one_years_at_current_organization: '',
coapplicant_one_gst_itr_filed: '',
coapplicant_one_gst_and_itr_income: '',
coapplicant_one_inhand_salary: '',
coapplicant_one_other_income: '',
coapplicant_one_note:'',
coapplicant_two_type_of_loan: '',
coapplicant_two_loan_category: '',
coapplicant_two_required_amount: '',
coapplicant_two_mobile_number: '',
coapplicant_two_name: '',
coapplicant_two_occupation_type: '',  
coapplicant_two_nature_of_business: '',
coapplicant_two_service_type: '',
coapplicant_two_type_of_resident: '',
coapplicant_two_permanent_address: '',
coapplicant_two_permanent_address_landmark: '',
coapplicant_two_official_email_id: '',
coapplicant_two_personal_email_id: '',
coapplicant_two_office_name: '',
coapplicant_two_date_of_birth: '',
coapplicant_two_alternate_number: '',
coapplicant_two_mother_name: '',
coapplicant_two_father_name: '',
coapplicant_two_marital_status: '',
coapplicant_two_spouse_name: '',
coapplicant_two_current_address: '',
coapplicant_two_years_at_current_residence: '',
coapplicant_two_total_time_in_delhi: '',
coapplicant_two_office_address: '',
coapplicant_two_office_address_landmark: '',
coapplicant_two_years_at_current_organization: '',
coapplicant_two_gst_itr_filed: '',
coapplicant_two_gst_and_itr_income: '',
coapplicant_two_inhand_salary: '',
coapplicant_two_other_income: '',
coapplicant_two_note:''
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
      model_number:'',
      carNumber:'',
      carName:'',
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
      note:'',
      is_coapplicant: '',
coapplicant_one_type_of_loan: '',
coapplicant_one_loan_category: '',
coapplicant_one_required_amount: '',
coapplicant_one_mobile_number: '',
coapplicant_one_name: '',
coapplicant_one_occupation_type: '',
coapplicant_one_nature_of_business: '',
coapplicant_one_service_type: '',
coapplicant_one_type_of_resident: '',
coapplicant_one_permanent_address: '',
coapplicant_one_permanent_address_landmark: '',
coapplicant_one_official_email_id: '',
coapplicant_one_personal_email_id: '',
coapplicant_one_office_name: '',
coapplicant_one_date_of_birth: '',
coapplicant_one_alternate_number: '',
coapplicant_one_mother_name: '',
coapplicant_one_father_name: '',
coapplicant_one_marital_status: '',
coapplicant_one_spouse_name: '',
coapplicant_one_current_address: '',
coapplicant_one_years_at_current_residence: '',
coapplicant_one_total_time_in_delhi: '',
coapplicant_one_office_address: '',
coapplicant_one_office_address_landmark: '',
coapplicant_one_years_at_current_organization: '',
coapplicant_one_gst_itr_filed: '',
coapplicant_one_gst_and_itr_income: '',
coapplicant_one_inhand_salary: '',
coapplicant_one_other_income: '',
coapplicant_one_note:'',
coapplicant_two_type_of_loan: '',
coapplicant_two_loan_category: '',
coapplicant_two_required_amount: '',
coapplicant_two_mobile_number: '',
coapplicant_two_name: '',
coapplicant_two_occupation_type: '',  
coapplicant_two_nature_of_business: '',
coapplicant_two_service_type: '',
coapplicant_two_type_of_resident: '',
coapplicant_two_permanent_address: '',
coapplicant_two_permanent_address_landmark: '',
coapplicant_two_official_email_id: '',
coapplicant_two_personal_email_id: '',
coapplicant_two_office_name: '',
coapplicant_two_date_of_birth: '',
coapplicant_two_alternate_number: '',
coapplicant_two_mother_name: '',
coapplicant_two_father_name: '',
coapplicant_two_marital_status: '',
coapplicant_two_spouse_name: '',
coapplicant_two_current_address: '',
coapplicant_two_years_at_current_residence: '',
coapplicant_two_total_time_in_delhi: '',
coapplicant_two_office_address: '',
coapplicant_two_office_address_landmark: '',
coapplicant_two_years_at_current_organization: '',
coapplicant_two_gst_itr_filed: '',
coapplicant_two_gst_and_itr_income: '',
coapplicant_two_inhand_salary: '',
coapplicant_two_other_income: '',
coapplicant_two_note:'',
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
        model_number:data.model||'',
        carNumber:data.carNumber||'',
        carName:data.carName||'',
      }));

      // Fetch personal data using the fetched file number
      fetchpersonalData(data.file_number);
      fetchreferenceData(data.file_number);
      fetchcoapplicantOnePersonalData(data.file_number);
      fetchcoapplicantTwoPersonalData(data.file_number);

      setError1(''); // Clear any previous error message
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
        mobile_number: formData.mobileNumber || '',
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
        note:data.note||'',
        is_coapplicant: data.is_coapplicant || ''
      }));
    } catch (error) {
      console.error('Error fetching personal data:', error);
    }
  };

  const fetchcoapplicantOnePersonalData = async (file_number) => {
    try {
      const response = await axios.get(`${baseurl}/getcoapplicantonedetails/${file_number}`);
      const data = response.data.data;

      setFormData((prevFormData) => ({
        ...prevFormData,
        coapplicant_one_type_of_loan: data.coapplicant_one_type_of_loan || '',
        coapplicant_one_loan_category: data.coapplicant_one_loan_category || '',
        coapplicant_one_required_amount: data.coapplicant_one_required_amount || '',
        coapplicant_one_mobile_number: data.coapplicant_one_mobile_number || '',
        coapplicant_one_name: data.coapplicant_one_name || '',
        coapplicant_one_occupation_type: data.coapplicant_one_occupation_type || '',
        coapplicant_one_nature_of_business: data.coapplicant_one_nature_of_business || '',
        coapplicant_one_service_type: data.coapplicant_one_service_type || '',
        coapplicant_one_type_of_resident: data.coapplicant_one_type_of_resident || '',
        coapplicant_one_permanent_address: data.coapplicant_one_permanent_address || '',
        coapplicant_one_permanent_address_landmark: data.coapplicant_one_permanent_address_landmark || '',
        coapplicant_one_official_email_id: data.coapplicant_one_official_email_id || '',
        coapplicant_one_personal_email_id: data.coapplicant_one_personal_email_id || '',
        coapplicant_one_office_name: data.coapplicant_one_office_name || '',
        coapplicant_one_date_of_birth: data.coapplicant_one_date_of_birth || '',
        coapplicant_one_alternate_number: data.coapplicant_one_alternate_number || '',
        coapplicant_one_mother_name: data.coapplicant_one_mother_name || '',
        coapplicant_one_father_name: data.coapplicant_one_father_name || '',
        coapplicant_one_marital_status: data.coapplicant_one_marital_status || '',
        coapplicant_one_spouse_name: data.coapplicant_one_spouse_name || '',
        coapplicant_one_current_address: data.coapplicant_one_current_address || '',
        coapplicant_one_years_at_current_residence: data.coapplicant_one_years_at_current_residence || '',
        coapplicant_one_total_time_in_delhi: data.coapplicant_one_total_time_in_delhi || '',
        coapplicant_one_office_address: data.coapplicant_one_office_address || '',
        coapplicant_one_office_address_landmark: data.coapplicant_one_office_address_landmark || '',
        coapplicant_one_years_at_current_organization: data.coapplicant_one_years_at_current_organization || '',
        coapplicant_one_gst_itr_filed: data.coapplicant_one_gst_itr_filed || '',
        coapplicant_one_gst_and_itr_income: data.coapplicant_one_gst_and_itr_income || '',
        coapplicant_one_inhand_salary: data.coapplicant_one_inhand_salary || '',
        coapplicant_one_other_income: data.coapplicant_one_other_income || '',
        coapplicant_one_note: data.coapplicant_one_note || '',

      }));
    } catch (error) {
      console.error('Error fetching personal data:', error);
    }
  };

  const fetchcoapplicantTwoPersonalData = async (file_number) => {
    try {
      const response = await axios.get(`${baseurl}/getcoapplicanttwopersonadetails/${file_number}`);
      const data = response.data.data;
      setFormData((prevFormData) => ({
        ...prevFormData,
        coapplicant_two_type_of_loan: data.coapplicant_two_type_of_loan || '',
        coapplicant_two_loan_category: data.coapplicant_two_loan_category || '',
        coapplicant_two_required_amount: data.coapplicant_two_required_amount || '',
        coapplicant_two_mobile_number: data.coapplicant_two_mobile_number || '',
        coapplicant_two_name: data.coapplicant_two_name || '',
        coapplicant_two_occupation_type: data.coapplicant_two_occupation_type || '',
        coapplicant_two_nature_of_business: data.coapplicant_two_nature_of_business || '',
        coapplicant_two_service_type: data.coapplicant_two_service_type || '',
        coapplicant_two_type_of_resident: data.coapplicant_two_type_of_resident || '',
        coapplicant_two_permanent_address: data.coapplicant_two_permanent_address || '',
        coapplicant_two_permanent_address_landmark: data.coapplicant_two_permanent_address_landmark || '',
        coapplicant_two_official_email_id: data.coapplicant_two_official_email_id || '',
        coapplicant_two_personal_email_id: data.coapplicant_two_personal_email_id || '',
        coapplicant_two_office_name: data.coapplicant_two_office_name || '',
        coapplicant_two_date_of_birth: data.coapplicant_two_date_of_birth || '',
        coapplicant_two_alternate_number: data.coapplicant_two_alternate_number || '',
        coapplicant_two_mother_name: data.coapplicant_two_mother_name || '',
        coapplicant_two_father_name: data.coapplicant_two_father_name || '',
        coapplicant_two_marital_status: data.coapplicant_two_marital_status || '',
        coapplicant_two_spouse_name: data.coapplicant_two_spouse_name || '',
        coapplicant_two_current_address: data.coapplicant_two_current_address || '',
        coapplicant_two_years_at_current_residence: data.coapplicant_two_years_at_current_residence || '',
        coapplicant_two_total_time_in_delhi: data.coapplicant_two_total_time_in_delhi || '',
        coapplicant_two_office_address: data.coapplicant_two_office_address || '',
        coapplicant_two_office_address_landmark: data.coapplicant_two_office_address_landmark || '',
        coapplicant_two_years_at_current_organization: data.coapplicant_two_years_at_current_organization || '',
        coapplicant_two_gst_itr_filed: data.coapplicant_two_gst_itr_filed || '',
        coapplicant_two_gst_and_itr_income: data.coapplicant_two_gst_and_itr_income || '',
        coapplicant_two_inhand_salary: data.coapplicant_two_inhand_salary || '',
        coapplicant_two_other_income: data.coapplicant_two_other_income || '',
        coapplicant_two_note: data.coapplicant_two_note || '',

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
        
        await axios.post(`${baseurl}/createpersonaldetails/${formData.file_number}`, formData);
      } 
      else if (formType === 'personal') {
        
        // Update personal data
        await axios.post(`${baseurl}/createpersonaldetails/${formData.file_number}`, formData);
      
        resetFormData();
      } 
 else if (formType === 'coapplicant1') {

        await axios.post(`${baseurl}/createcoapplicantonepersonadetails/${formData.file_number}`, formData);
        resetFormData();
      } 

      else if (formType === 'coapplicant2') {

        await axios.post(`${baseurl}/createcoapplicanttwopersonadetails/${formData.file_number}`, formData);
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
     fetchreferenceData,
     fetchcoapplicantOnePersonalData,
     fetchcoapplicantTwoPersonalData,
    
     
     }}>
      {children}
    </OverviewContext.Provider>
  );
};

// Custom Hook
export const useOverview = () => useContext(OverviewContext);
