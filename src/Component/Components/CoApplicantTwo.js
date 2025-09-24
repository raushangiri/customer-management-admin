import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useOverview } from '../ContentHook/OverviewContext';

const CoApplicantTwo = () => {
 const { mobileNumber, setMobileNumber, formData, setFormData, fetchFileData, handleSubmit } = useOverview();
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isInterested, setIsInterested] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [notInterestedReason, setNotInterestedReason] = useState('');
    const [remarks, setRemarks] = useState('');
    const [selectedLoanType, setSelectedLoanType] = useState('');

    
    const loanMasterData = {
        'no information': ['no information'],
        'Auto Loan': ['External BT', 'Internal BT', 'Refinance', 'New Car', 'Sale Purchage', 'TopUp'],
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
        setFormData({ ...formData, is_interested: value });
        if (value === 'NotInterested') {
            setShowModal(true);
        } else {
            setShowModal(false);
        }
    };

    const handleModalSubmit = (e) => {
        e.preventDefault();
        setShowModal(false);
    };

    const handleLoanTypeChange = (e) => {
        setSelectedLoanType(e.target.value);
        setSelectedCategory(''); 
    };

    useEffect(() => {
        if (mobileNumber) {
            fetchFileData(mobileNumber);
        }
    }, [mobileNumber]);
    useEffect(() => {
        console.log(formData.is_interested, 'formData');
    }, [formData]);


    const [loading, setLoading] = useState(false); 
    const onSubmit = async (event) => {
        event.preventDefault();
        const formType = 'coapplicant2'; 
        setLoading(true);        
        try {
            await handleSubmit(formType);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
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
                    <div className="mb-3 row">
                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_type_of_loan" className="form-label fw-bold">Type of Loan</label>
                            <select
                                className="form-select"
                                id="coapplicant_two_type_of_loan"
                                value={formData.coapplicant_two_type_of_loan}
                                onChange={(e) => {
                                    const selectedType = e.target.value;
                                    setFormData({
                                        ...formData,
                                        coapplicant_two_type_of_loan: selectedType,
                                        selected_category: '' 
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
                            <label htmlFor="coapplicant_two_loan_category" className="form-label fw-bold">Loan Category</label>
                            <select
                                className="form-select"
                                id="coapplicant_two_loan_category"
                                value={formData.coapplicant_two_loan_category}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_loan_category: e.target.value })}
                                disabled={!formData.coapplicant_two_type_of_loan}
                            >
                                <option value="">Select category</option>
                                {formData.coapplicant_two_type_of_loan && loanMasterData[formData.coapplicant_two_type_of_loan]?.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </select>
                        </div>



                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_required_amount" className="form-label fw-bold">Required Amount</label>
                            <input type="text"
                                className="form-control"
                                id="coapplicant_two_required_amount"
                                value={formData.coapplicant_two_required_amount}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_required_amount: e.target.value })}
                                placeholder="Enter required amount" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_name" className="form-label fw-bold">Name</label>
                            <input type="text"
                                className="form-control"
                                value={formData.coapplicant_two_name}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_name: e.target.value })}
                                id="coapplicant_two_name"
                                placeholder="Enter name" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_mobile_number" className="form-label fw-bold">Mobile Number</label>
                            <input type="text" className="form-control"
                                value={formData.coapplicant_two_mobile_number}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_mobile_number: e.target.value })}
                                id="coapplicant_two_mobile_number"
                                placeholder="Enter mobile number" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_alternate_number" className="form-label fw-bold">Alternate Number</label>
                            <input type="text" className="form-control"
                                id="coapplicant_two_alternate_number"
                                name='coapplicant_two_alternate_number'
                                value={formData.coapplicant_two_alternate_number}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_alternate_number: e.target.value })}
                                placeholder="Enter alternate number" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_date_of_birth" className="form-label fw-bold">Date of Birth</label>
                            <input type="date" className="form-control" id="coapplicant_two_date_of_birth"
                                name='coapplicant_two_date_of_birth'
                                value={formData.coapplicant_two_date_of_birth}

                                onChange={(e) => setFormData({ ...formData, coapplicant_two_date_of_birth: e.target.value })}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_mother_name" className="form-label fw-bold">Mother's Name</label>
                            <input type="text"
                                name='coapplicant_two_mother_name'
                                value={formData.coapplicant_two_mother_name}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_mother_name: e.target.value })}
                                className="form-control" id="coapplicant_two_mother_name" placeholder="Enter mother's name" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_father_name" className="form-label fw-bold">Father's Name</label>
                            <input type="text"
                                name='coapplicant_two_father_name'
                                value={formData.coapplicant_two_father_name}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_father_name: e.target.value })}
                                className="form-control" id="coapplicant_two_father_name" placeholder="Enter father's name" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_marital_status" className="form-label fw-bold">Marital Status</label>
                            <select className="form-select" id="coapplicant_two_marital_status"
                                name='coapplicant_two_marital_status'
                                value={formData.coapplicant_two_marital_status}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_marital_status: e.target.value })}
                            >
                                <option value="">Select status</option>
                                <option value="single">Single</option>
                                <option value="married">Married</option>
                                <option value="other">Other</option>

                                {/* Add more options as needed */}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_spouse_name" className="form-label fw-bold">Spouse's Name</label>
                            <input type="text"
                                name='coapplicant_two_spouse_name'
                                value={formData.coapplicant_two_spouse_name}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_spouse_name: e.target.value })}
                                className="form-control" id="coapplicant_two_spouse_name" placeholder="Enter spouse's name" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_current_address" className="form-label fw-bold">Current Address</label>
                            <input type="text"
                                name='coapplicant_two_current_address'
                                value={formData.coapplicant_two_current_address}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_current_address: e.target.value })}
                                className="form-control" id="coapplicant_two_current_address" placeholder="Enter current address" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_permanent_address_landmark" className="form-label fw-bold">Current Address Landmark</label>
                            <input type="text"
                                value={formData.coapplicant_two_permanent_address_landmark}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_permanent_address_landmark: e.target.value })}
                                name='coapplicant_two_permanent_address_landmark'
                                className="form-control" id="coapplicant_two_permanent_address_landmark" placeholder="Enter landmark" />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_type_of_resident" className="form-label fw-bold">Type of Resident</label>
                            <select className="form-select" id="coapplicant_two_type_of_resident"
                                value={formData.coapplicant_two_type_of_resident}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_type_of_resident: e.target.value })}
                            >
                                <option value="">Select type</option>
                                <option value="rented">Rented</option>
                                <option value="owned">Owned</option>
                                <option value="government issued">Government Issued</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_years_at_current_residence" className="form-label fw-bold">Years at Current Residence</label>
                            <input type="text"
                                name='coapplicant_two_years_at_current_residence'
                                value={formData.coapplicant_two_years_at_current_residence}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_years_at_current_residence: e.target.value })}
                                className="form-control" id="coapplicant_two_years_at_current_residence" placeholder="Enter number of years" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_total_time_in_delhi" className="form-label fw-bold">Total Time In Delhi/ Delhi Ncr</label>
                            <input type="text"
                                name='coapplicant_two_total_time_in_delhi'
                                value={formData.coapplicant_two_total_time_in_delhi}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_total_time_in_delhi: e.target.value })}
                                className="form-control" id="coapplicant_two_total_time_in_delhi" placeholder="Enter Total Time at Current Address" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_permanent_address" className="form-label fw-bold" id='permanent_address'>Permanent Address</label>
                            <input type="text"
                                value={formData.coapplicant_two_permanent_address}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_permanent_address: e.target.value })}
                                className="form-control" id="coapplicant_two_permanent_address" name='coapplicant_two_permanent_address' placeholder="Enter permanent address" />
                        </div>
                        
                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_personal_email_id" className="form-label fw-bold">Personal Email ID</label>
                            <input type="email" className="form-control"
                                value={formData.coapplicant_two_personal_email_id}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_personal_email_id: e.target.value })}

                                id="coapplicant_two_personal_email_id" name='coapplicant_two_personal_email_id' placeholder="Enter personal email ID" />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_officialEmailId" className="form-label fw-bold">Official Email ID</label>
                            <input type="email" className="form-control"
                                value={formData.coapplicant_two_official_email_id}
                                name='coapplicant_two_official_email_id'
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_official_email_id: e.target.value })}

                                id="coapplicant_two_official_email_id" placeholder="Enter official email ID" />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_office_name" className="form-label fw-bold">Office Name</label>
                            <input type="text"
                                value={formData.coapplicant_two_office_name}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_office_name: e.target.value })}
                                className="form-control" id="coapplicant_two_office_name" name='coapplicant_two_office_name' placeholder="Enter office name" />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_office_address" className="form-label fw-bold">Office Address</label>
                            <input type="text"
                                name='coapplicant_two_office_address'
                                value={formData.coapplicant_two_office_address}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_office_address: e.target.value })}
                                className="form-control" id="coapplicant_two_office_address" placeholder="Enter office address" />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_office_address_landmark" className="form-label fw-bold">Office Address Landmark</label>
                            <input type="text"
                                name='coapplicant_two_office_address_landmark'
                                value={formData.coapplicant_two_office_address_landmark}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_office_address_landmark: e.target.value })}
                                className="form-control" id="coapplicant_two_office_address_landmark" placeholder="Enter landmark" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_nature_of_business" className="form-label fw-bold">Nature of Business / Designation</label>
                            <input
                                type="text"
                                className="form-control"
                                id="coapplicant_two_nature_of_business"
                                value={formData.coapplicant_two_nature_of_business}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_nature_of_business: e.target.value })}
                                placeholder="Enter Nature of Business / Designation"
                            />
                         
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_inhand_salary" className="form-label fw-bold">Salary</label>
                            <input type="text"
                                name='coapplicant_two_inhand_salary'
                                value={formData.coapplicant_two_inhand_salary}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_inhand_salary: e.target.value })}
                                className="form-control" id="coapplicant_two_inhand_salary" placeholder="Enter salary" />
                        </div>
                        
                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_years_at_current_organization" className="form-label fw-bold">Total working experience in Organization</label>
                            <input type="text"
                                name='coapplicant_two_years_at_current_organization'
                                value={formData.coapplicant_two_years_at_current_organization}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_years_at_current_organization: e.target.value })}
                                className="form-control" id="coapplicant_two_years_at_current_organization" placeholder="Enter number of years" />
                        </div>

                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_occupation_type" className="form-label fw-bold">Occupation Type</label>

                            <select className="form-select" id="coapplicant_two_occupation_type"
                                value={formData.coapplicant_two_occupation_type}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_occupation_type: e.target.value })}
                            >
                                <option value="">Select type</option>
                                <option value="Salaried Employee">Salaried</option>
                                <option value="Self-Employed">Self-Employed</option>
                                <option value="Rental Income">Rental Income</option>
                                <option value="Freelancer">Freelancer</option>
                                <option value="Government Employee">Government Employee</option>
                                <option value="Retired">Retired</option>
                                <option value="Student">Student</option>
                                <option value="Housewife/Homemaker">Housewife/Homemaker</option>
                                <option value="Agriculture/Farmer">Agriculture/Farmer</option>
                                <option value="Consultant">Consultant</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                      
                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_gst_itr_filed" className="form-label fw-bold">GST/ITR Filed</label>
                            <select className="form-select" id="coapplicant_two_gst_itr_filed"
                                name='coapplicant_two_gst_itr_filed'
                                value={formData.coapplicant_two_gst_itr_filed}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_gst_itr_filed: e.target.value })}
                            >
                                <option value="">Select</option>
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_gst_and_itr_income" className="form-label fw-bold">GST and ITR Vintage</label>
                            <input type="text"
                                name='coapplicant_two_gst_and_itr_income'
                                value={formData.coapplicant_two_gst_and_itr_income}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_gst_and_itr_income: e.target.value })}
                                className="form-control" id="coapplicant_two_gst_and_itr_income" placeholder="Enter vintage" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_service_type" className="form-label fw-bold">Car Odometer Reading/Fuel Type</label>
                            <input
                                type="text"
                                className="form-control"
                                id="coapplicant_two_service_type"
                                value={formData.coapplicant_two_service_type}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_service_type: e.target.value })}
                                placeholder="Enter Car Odometer Reading/Fuel Type"
                            />
                        </div>
                        
                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_other_income" className="form-label fw-bold">Other Income</label>
                            <input type="text"
                                name='coapplicant_two_other_income'
                                value={formData.coapplicant_two_other_income}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_other_income: e.target.value })}
                                className="form-control" id="coapplicant_two_other_income" placeholder="Enter other income" />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="coapplicant_two_note" className="form-label fw-bold">Note</label>
                            <input type="textarea"
                                name='coapplicant_two_note'
                                value={formData.coapplicant_two_note}
                                onChange={(e) => setFormData({ ...formData, coapplicant_two_note: e.target.value })}
                                className="form-control" id="coapplicant_two_note" placeholder="Enter Note" />
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

export default CoApplicantTwo;
