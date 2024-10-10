import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useOverview } from '../ContentHook/OverviewContext';

const PersonalDetails = () => {
    const { mobileNumber, setMobileNumber, formData, setFormData ,fetchFileData,handleSubmit} = useOverview();

    // const [selectedLoanType, setSelectedLoanType] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isInterested, setIsInterested] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [notInterestedReason, setNotInterestedReason] = useState('');
    const [remarks, setRemarks] = useState('');
    const [selectedLoanType, setSelectedLoanType] = useState('');

    const loanMasterData = {
        'Auto Loan': ['External BT', 'Internal BT', 'Refinance', 'New Car', 'Sale Purchage'],
        'Business Loan': ['Proprietorship', 'Partnership', 'Pvt Ltd Firm'],
        'Land and Property Loan': ['Proprietorship', 'Partnership', 'Pvt Ltd Firm'],
        'Home Loan': ['Proprietorship', 'Partnership', 'Pvt Ltd Firm'],
        'Personal Loan': ['Personal Loan'],
        'Education Loan': ['Education Loan'],
        'Insurance': ['Insurance'],
        'Working Capital Loan': ['Working Capital Loan'],
        'Small Business Loan': ['Small Business Loan'],
        'Drop Down OD': ['Drop Down OD']
    };

    const NotInterestedOptions = {
        notInterested: [
            'No need Loan',
            'Need after 1 Month',
            'Abuse on Call',
            'Do not want to provide details',
            'Threat to complain',
            'Asked not to call again',
        ]
    };
    const handleInterestChange = (e) => {
        const value = e.target.value;
        
        // Update formData based on selected value
        setFormData({ ...formData, is_interested: value });
        
        // Show modal if "NotInterested" is selected
        if (value === 'NotInterested') {
          setShowModal(true);
        } else {
          setShowModal(false);
        }
      };

    const handleModalSubmit = (e) => {
        e.preventDefault();
        // Handle form submission inside the modal
        // console.log('Reason:', notInterestedReason);
        // console.log('Remarks:', remarks);
        setShowModal(false);
    };

    const handleLoanTypeChange = (e) => {
        setSelectedLoanType(e.target.value);
        setSelectedCategory(''); // Reset category when loan type changes
    };

    useEffect(() => {
        if (mobileNumber) {
          fetchFileData(mobileNumber);
        }
      }, [mobileNumber]);
    
      // Log formData whenever it updates
      useEffect(() => {
        console.log(formData.is_interested, 'formData');
      }, [formData]);


      const [loading, setLoading] = useState(false);    // State to track loading

      const onSubmit = async (event) => {
        event.preventDefault();
        const formType = 'personal'; // Assuming you're submitting personal details
        setLoading(true); // Start loader when form submission begins
    
        try {
          // Call handleSubmit from context and wait for it to complete
          await handleSubmit(formType);
          // Handle success if needed (e.g., display success message)
        } catch (error) {
          // Handle error if the form submission fails
          console.error('Error submitting form:', error);
        } finally {
          // Stop loader once form submission is done
          setLoading(false);
        }
      };
    return (
        <>
            <div className="position-relative tab-pane active">
            {loading && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center bg-light bg-opacity-75"
          style={{ zIndex: 1050 }}
        >
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
                <form onSubmit={onSubmit}>
                    <h4 className='text-end'><Link to="https://emicalculator.net/" target="_blank"> Loan EMI calculator</Link></h4>
                    <div className="mb-3 row">
                       
                        {/* <div className="col-md-6">
                            <label htmlFor="type_of_loan" className="form-label fw-bold">Type of Loan</label>
                            <select
                                className="form-select"
                                id="type_of_loan"
                                value={formData.type_of_loan}
                                onChange={(e) => {
                                    const selectedType = e.target.value;
                                    setFormData({
                                        ...formData,
                                        type_of_loan: selectedType,
                                        selected_category: '' // Reset selected category when loan type changes
                                    });
                                }}
                            >
                                <option value="">Select loan type</option>
                                {Object.keys(loanMasterData).map((loanType) => (
                                    <option key={loanType} value={loanType}>
                                        {loanType}
                                    </option>
                                ))}
                            </select>
                        </div> */}
                        <div className="col-md-6">
    <label htmlFor="type_of_loan" className="form-label fw-bold">Type of Loan</label>
    <select
        className="form-select"
        id="type_of_loan"
        value={formData.type_of_loan}
        onChange={(e) => {
            const selectedType = e.target.value;
            setFormData({
                ...formData,
                type_of_loan: selectedType,
                selected_category: '' // Reset selected category or other related fields when loan type changes
            });
        }}
    >
        <option value="">Select loan type</option>
        {Object.keys(loanMasterData).map((loanType) => (
            <option key={loanType} value={loanType}>
                {loanType}
            </option>
        ))}
    </select>
</div>


<div className="col-md-6">
                <label htmlFor="loan_category" className="form-label fw-bold">Loan Category</label>
                <select
                    className="form-select"
                    id="loan_category"
                    value={formData.loan_category}
                    onChange={(e) => setFormData({ ...formData, loan_category: e.target.value })}
                    disabled={!formData.type_of_loan} // Disable if no loan type is selected
                >
                    <option value="">Select category</option>
                    {formData.type_of_loan && loanMasterData[formData.type_of_loan]?.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>



                        <div className="col-md-6">
                            <label htmlFor="required_amount" className="form-label fw-bold">Required Amount</label>
                            <input type="text"
                                className="form-control"
                                id="required_amount"
                                value={formData.required_amount}
                                onChange={(e) => setFormData({ ...formData, required_amount: e.target.value })}
                                placeholder="Enter required amount" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="mobileNumber" className="form-label fw-bold">Mobile Number</label>
                            <input type="text" className="form-control"
                                value={formData.mobileNumber}
                                onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                                id="mobileNumber"
                                placeholder="Enter mobile number" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="name" className="form-label fw-bold">Name</label>
                            <input type="text"
                                className="form-control"
                                value={formData.customerName}
                                onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                                id="name"
                                placeholder="Enter name" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="occupation_type" className="form-label fw-bold">Occupation Type</label>
                            <input
    type="text"
    className="form-control"
    id="occupation_type"
    value={formData.occupation_type}
    onChange={(e) => setFormData({ ...formData, occupation_type: e.target.value })}
    placeholder="Enter Occupation Type"
  />
                            {/* <select className="form-select" id="occupation_type"
                                value={formData.occupation_type}
                                onChange={(e) => setFormData({ ...formData, occupation_type: e.target.value })}
                            >
                                <option value="">Select type</option>
                                <option value="Salaried Employee">Salaried Employee</option>
                                <option value="Self-Employed">Self-Employed</option>
                                <option value="Business Owner">Business Owner</option>
                                <option value="Freelancer">Freelancer</option>
                                <option value="Government Employee">Government Employee</option>
                                <option value="Retired">Retired</option>
                                <option value="Student">Student</option>
                                <option value="Housewife/Homemaker">Housewife/Homemaker</option>
                                <option value="Agriculture/Farmer">Agriculture/Farmer</option>
                                <option value="Consultant">Consultant</option>
                                <option value="Other">Other</option>
                            </select> */}
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="nature_of_business" className="form-label fw-bold">Nature of Business</label>
                            <input
    type="text"
    className="form-control"
    id="nature_of_business"
    value={formData.nature_of_business}
    onChange={(e) => setFormData({ ...formData, nature_of_business: e.target.value })}
    placeholder="Enter Nature of Business"
  />
                            {/* <select className="form-select" id="nature_of_business"
                                value={formData.nature_of_business}
                                onChange={(e) => setFormData({ ...formData, nature_of_business: e.target.value })}
                            >
                                <option value="">Select nature</option>
                                <option value="manufacturing">Manufacturing</option>
                                <option value="Trading">Trading</option>
                                <option value="Retail">Retail</option>
                                <option value="Wholesale">Wholesale</option>
                                <option value="Information Technology">Information Technology</option>
                                <option value="Finance and Banking">Finance and Banking</option>
                                <option value="Real Estate and Construction">Real Estate and Construction</option>
                                <option value="Hospitality">Hospitality</option>
                                <option value="Healthcare">Healthcare</option>
                                <option value="Education and Training">Education and Training</option>
                                <option value="Transportation and Logistics">Transportation and Logistics</option>
                                <option value="Agriculture and Farming">Agriculture and Farming</option>
                                <option value="Import/Export">Import/Export</option>
                                <option value="Media and Entertainment">Media and Entertainment</option>
                                <option value="Other">Other</option>
                            </select> */}
                        </div>
                        {/* <div className="col-md-6">
                            <label htmlFor="service_type" className="form-label fw-bold">Service Type</label>
                            <select className="form-select" id="service_type"
                                value={formData.service_type}
                                onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
                            >
                                <option value="">Select type</option>
                                <option value="it_services">9540384205</option>
                                <option value="financial_services">Financial Services</option>
                                <option value="legal_services">Legal Services</option>
                                <option value="healthcare_services">Healthcare Services</option>
                                <option value="educational_services">Educational Services</option>
                                <option value="transportation_services">Transportation Services</option>
                                <option value="hospitality_services">Hospitality Services</option>
                                <option value="consultancy_services">Consultancy Services</option>
                                <option value="retail_services">Retail Services</option>
                                <option value="utility_services">Utility Services (Electricity, Water, etc.)</option>
                                <option value="maintenance_repair_services">Maintenance and Repair Services</option>
                                <option value="marketing_advertising_services">Marketing and Advertising Services</option>
                                <option value="other">Other</option>
                            </select>
                        </div> */}

<div className="col-md-6">
  <label htmlFor="service_type" className="form-label fw-bold">Service Type</label>
  <input
    type="text"
    className="form-control"
    id="service_type"
    value={formData.service_type}
    onChange={(e) => setFormData({ ...formData, service_type: e.target.value })}
    placeholder="Enter Service Type"
  />
</div>
                        <div className="col-md-6">
                            <label htmlFor="type_of_resident" className="form-label fw-bold">Type of Resident</label>
                            <select className="form-select" id="type_of_resident"
                                value={formData.type_of_resident}
                                onChange={(e) => setFormData({ ...formData, type_of_resident: e.target.value })}
                            >
                                <option value="">Select type</option>
                                <option value="rented">Rented</option>
                                <option value="owned">Owned</option>
                                <option value="government issued">Government Issued</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="permanent_address" className="form-label fw-bold" id='permanent_address'>Permanent Address</label>
                            <input type="text"
                                value={formData.permanent_address}
                                onChange={(e) => setFormData({ ...formData, permanent_address: e.target.value })}
                                className="form-control" id="permanent_address" name='permanent_address' placeholder="Enter permanent address" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="permanent_address_landmark" className="form-label fw-bold">Permanent Address Landmark</label>
                            <input type="text"
                                value={formData.permanent_address_landmark}
                                onChange={(e) => setFormData({ ...formData, permanent_address_landmark: e.target.value })}
                                name='permanent_address_landmark'
                                className="form-control" id="permanent_address_landmark" placeholder="Enter landmark" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="personal_email_id" className="form-label fw-bold">Personal Email ID</label>
                            <input type="email" className="form-control"
                                value={formData.personal_email_id}
                                onChange={(e) => setFormData({ ...formData, personal_email_id: e.target.value })}

                                id="personal_email_id" name='personal_email_id' placeholder="Enter personal email ID" />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="officialEmailId" className="form-label fw-bold">Official Email ID</label>
                            <input type="email" className="form-control"
                                value={formData.official_email_id}
                                name='official_email_id'
                                onChange={(e) => setFormData({ ...formData, official_email_id: e.target.value })}

                                id="official_email_id" placeholder="Enter official email ID" />
                        </div>
                        
                        <div className="col-md-6">
                            <label htmlFor="office_name" className="form-label fw-bold">Office Name</label>
                            <input type="text"
                                value={formData.office_name}
                                onChange={(e) => setFormData({ ...formData, office_name: e.target.value })}
                                className="form-control" id="office_name" name='office_name' placeholder="Enter office name" />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="office_address" className="form-label fw-bold">Office Address</label>
                            <input type="text"
                                name='office_address'
                                value={formData.office_address}
                                onChange={(e) => setFormData({ ...formData, office_address: e.target.value })}
                                className="form-control" id="office_address" placeholder="Enter office address" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="office_address_landmark" className="form-label fw-bold">Office Address Landmark</label>
                            <input type="text"
                                name='office_address_landmark'
                                value={formData.office_address_landmark}
                                onChange={(e) => setFormData({ ...formData, office_address_landmark: e.target.value })}
                                className="form-control" id="office_address_landmark" placeholder="Enter landmark" />
                        </div>



                        <div className="col-md-6">
                            <label htmlFor="date_of_birth" className="form-label fw-bold">Date of Birth</label>
                            <input type="date" className="form-control" id="dateOfBirth"
                                name='date_of_birth'
                                value={formData.date_of_birth}

                                onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="alternate_number" className="form-label fw-bold">Alternate Number</label>
                            <input type="text" className="form-control"
                                id="alternate_number"
                                name='alternate_number'
                                value={formData.alternate_number}
                                onChange={(e) => setFormData({ ...formData, alternate_number: e.target.value })}
                                placeholder="Enter alternate number" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="mother_name" className="form-label fw-bold">Mother's Name</label>
                            <input type="text"
                                name='mother_name'
                                value={formData.mother_name}
                                onChange={(e) => setFormData({ ...formData, mother_name: e.target.value })}
                                className="form-control" id="mother_name" placeholder="Enter mother's name" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="father_name" className="form-label fw-bold">Father's Name</label>
                            <input type="text"
                                name='father_name'
                                value={formData.father_name}
                                onChange={(e) => setFormData({ ...formData, father_name: e.target.value })}
                                className="form-control" id="father_name" placeholder="Enter father's name" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="marital_status" className="form-label fw-bold">Marital Status</label>
                            <select className="form-select" id="marital_status"
                                name='marital_status'
                                value={formData.marital_status}
                                onChange={(e) => setFormData({ ...formData, marital_status: e.target.value })}
                            >
                                <option value="">Select status</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="other">Other</option>

                                {/* Add more options as needed */}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="spouse_name" className="form-label fw-bold">Spouse's Name</label>
                            <input type="text"
                                name='spouse_name'
                                value={formData.spouse_name}
                                onChange={(e) => setFormData({ ...formData, spouse_name: e.target.value })}
                                className="form-control" id="spouseName" placeholder="Enter spouse's name" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="current_address" className="form-label fw-bold">Current Address</label>
                            <input type="text"
                                name='current_address'
                                value={formData.current_address}
                                onChange={(e) => setFormData({ ...formData, current_address: e.target.value })}
                                className="form-control" id="currentAddress" placeholder="Enter current address" />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="years_at_current_residence" className="form-label fw-bold">Years at Current Residence</label>
                            <input type="text"
                                name='years_at_current_residence'
                                value={formData.years_at_current_residence}
                                onChange={(e) => setFormData({ ...formData, years_at_current_residence: e.target.value })}
                                className="form-control" id="years_at_current_residence" placeholder="Enter number of years" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="total_time_in_delhi" className="form-label fw-bold">Total Time at Current Address</label>
                            <input type="text"
                                name='total_time_in_delhi'
                                value={formData.total_time_in_delhi}
                                onChange={(e) => setFormData({ ...formData, total_time_in_delhi: e.target.value })}
                                className="form-control" id="total_time_in_delhi" placeholder="Enter Total Time at Current Address" />
                        </div>



                        
                        <div className="col-md-6">
                            <label htmlFor="years_at_current_organization" className="form-label fw-bold">Total working experience in Organization</label>
                            <input type="text"
                                name='years_at_current_organization'
                                value={formData.years_at_current_organization}
                                onChange={(e) => setFormData({ ...formData, years_at_current_organization: e.target.value })}
                                className="form-control" id="years_at_current_organization" placeholder="Enter number of years" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="gst_itr_filed" className="form-label fw-bold">GST/ITR Filed</label>
                            <select className="form-select" id="gst_itr_filed"
                                name='gst_itr_filed'
                                value={formData.gst_itr_filed}
                                onChange={(e) => setFormData({ ...formData, gst_itr_filed: e.target.value })}
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="gst_and_itr_income" className="form-label fw-bold">GST and ITR Income</label>
                            <input type="text"
                                name='gst_and_itr_income'
                                value={formData.gst_and_itr_income}
                                onChange={(e) => setFormData({ ...formData, gst_and_itr_income: e.target.value })}
                                className="form-control" id="gstAndItrIncome" placeholder="Enter income" />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="inhand_salary" className="form-label fw-bold">Salary</label>
                            <input type="text"
                                name='inhand_salary'
                                value={formData.inhand_salary}
                                onChange={(e) => setFormData({ ...formData, inhand_salary: e.target.value })}
                                className="form-control" id="inhand_salary" placeholder="Enter salary" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="other_income" className="form-label fw-bold">Other Income</label>
                            <input type="text"
                                name='other_income'
                                value={formData.other_income}
                                onChange={(e) => setFormData({ ...formData, other_income: e.target.value })}
                                className="form-control" id="other_income" placeholder="Enter other income" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="note" className="form-label fw-bold">Note</label>
                            <input type="textarea"
                                name='note'
                                value={formData.note}
                                onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                                className="form-control" id="note" placeholder="Enter Note" />
                        </div>
                    </div>


                    
                    <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
                </form>
            </div>
        </>
    )
}

export default PersonalDetails



