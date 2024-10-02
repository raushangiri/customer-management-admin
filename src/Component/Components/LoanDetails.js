import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { useOverview } from '../ContentHook/OverviewContext';

const LoanDetails = () => {
  const [Loandetails, setLoandetails] = useState([]);
  const baseurl = process.env.REACT_APP_API_BASE_URL;

  
  const [loandetail, setloandetail] = useState({
    bank_name: '',
    emi_amount: '',
    emi_date: '',
    loan_start_date: '',
    loan_end_date: '',
    no_of_emi_bounces: '',
    bounces_reason: '',
    car_details: '',
    other_bank_name: '' 
  });

  const [bankOptions, setBankOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLoanType, setSelectedLoanType] = useState('');
  const [fileNumber, setFileNumber] = useState(''); // Update this with the actual file number you need
  const { mobileNumber, fetchFileData, formData, setFormData, handleSubmit } = useOverview();
  const [isOtherSelected, setIsOtherSelected] = useState(false); // Track if "Other" is selected
  const [otherBankName, setOtherBankName] = useState(''); // Store the entered bank name

  // Fetch bank list from API
  useEffect(() => {
    const fetchBankList = async () => {
      try {
        const response = await axios.get(`${baseurl}/getlist`);
        const banks = response.data.bankNames.map(bank => ({
          value: bank,  // Use the bank name as the value
          label: bank   // Use the bank name as the label
        }));
        
        // Add "Other" option to the bank list
        banks.push({ value: 'other', label: 'Other' });

        setBankOptions(banks);
        
      } catch (error) {
        console.error('Error fetching bank list:', error);
        
      }
    };
    fetchBankList();
  }, []);

  // Handle selection of bank from dropdown
  const handleBankSelect = (selectedOption) => {
    if (selectedOption.value === 'other') {
      setIsOtherSelected(true); // Show input field for custom bank name
      setloandetail({ ...loandetail, bank_name: '' }); // Clear bank_name field
    } else {
      setIsOtherSelected(false); // Hide input field for custom bank name
      setloandetail({ ...loandetail, bank_name: selectedOption.value });
    }
  };

  const fetchLoanDetails = async (fileNumber, setLoandetails) => {
    try {
        const response = await axios.get(`${baseurl}/getLoandetails/${fileNumber}`);

        // Directly set the response data if it's an array
        if (Array.isArray(response.data.data)) {
            setLoandetails(response.data.data); // Set the array of loan details
            console.log(response.data.data, "data"); // Log the data array
        } 
    } catch (error) {
        console.error('Error fetching loan details:', error);
    }
};

useEffect(() => {
  if (formData.file_number) {
    fetchLoanDetails(formData.file_number, setLoandetails);
  }
}, [formData.file_number]);

const handleAddReference = async (e) => {
  e.preventDefault();

  // If 'Other' is selected, use the other_bank_name field value as bank_name
  const updatedLoanDetail = {
    ...loandetail,
    bank_name: isOtherSelected ? loandetail.other_bank_name : loandetail.bank_name,
  };

  try {
    // Post loan details to the API
    setLoading(true);
    const response = await axios.post(`${baseurl}/createLoandetails/${formData.file_number}`, updatedLoanDetail);
    if (response.status === 200) {
      alert('Loan details added successfully!');
      fetchLoanDetails(formData.file_number, setLoandetails);
    } else {
      alert('Failed to save loan details');
    }
  } catch (error) {
    console.error('Error saving loan details:', error);
    alert('Error saving loan details');
  }finally {
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
        <form onSubmit={handleAddReference} className="mb-4">
          <div className="mb-3 row">
          <div className="col-md-4">
              <label htmlFor="bank_name" className="form-label fw-bold">Bank Name</label>
              {
                <Select
                  id="bank_name"
                  options={bankOptions}
                  value={bankOptions.find(option => option.value === loandetail.bank_name || option.value === 'other')}
                  onChange={handleBankSelect}
                  placeholder="Select a bank"
                  isSearchable={true}
                  required
                />
             }
            </div>

            {isOtherSelected && (
              <div className="col-md-4">
                <label htmlFor="other_bank_name" className="form-label fw-bold">Enter Bank Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="other_bank_name"
                  value={loandetail.other_bank_name}
                  onChange={(e) => setloandetail({ ...loandetail, other_bank_name: e.target.value })}
                  placeholder="Enter custom bank name"
                  required
                />
              </div>
            )}
            
            

            <div className="col-md-4">
              <label htmlFor="emi_amount" className="form-label fw-bold">EMI Amount</label>
              <input
                type="number"
                className="form-control"
                id="emi_amount"
                value={loandetail.emi_amount}
                onChange={(e) => setloandetail({ ...loandetail, emi_amount: e.target.value })}
                placeholder="Enter EMI Amount"
                
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="loan_term" className="form-label fw-bold">Loan Term</label>
              <input
                type="text"
                className="form-control"
                id="loan_term"
                value={loandetail.loan_term}
                onChange={(e) => setloandetail({ ...loandetail, loan_term: e.target.value })}
                placeholder="Enter Loan Term"
                
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="loan_start_date" className="form-label fw-bold">Loan Start Date</label>
              <input
                type="date"
                className="form-control"
                id="loan_start_date"
                value={loandetail.loan_start_date}
                onChange={(e) => setloandetail({ ...loandetail, loan_start_date: e.target.value })}
                
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="loan_end_date" className="form-label fw-bold">Loan End Date</label>
              <input
                type="date"
                className="form-control"
                id="loan_end_date"
                value={loandetail.loan_end_date}
                onChange={(e) => setloandetail({ ...loandetail, loan_end_date: e.target.value })}
                
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="emi_amount" className="form-label fw-bold">EMI Date</label>
              <input
                type="date"
                className="form-control"
                id="emi_amount"
                value={loandetail.emi_date}
                onChange={(e) => setloandetail({ ...loandetail, emi_date: e.target.value })}
                
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="no_of_emi_bounces" className="form-label fw-bold">No of EMI Bounces</label>
              <input
                type="number"
                className="form-control"
                id="no_of_emi_bounces"
                value={loandetail.no_of_emi_bounces}
                onChange={(e) => setloandetail({ ...loandetail, no_of_emi_bounces: e.target.value })}
                placeholder="Enter No of EMI Bounces"
                
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="bounces_reason" className="form-label fw-bold">Bounces Reason</label>
              <select
                className="form-select"
                id="bounces_reason"
                value={loandetail.bounces_reason}
                onChange={(e) => setloandetail({ ...loandetail, bounces_reason: e.target.value })}
                
              >
                <option value="">Select Reason</option>
                <option value="insufficient_funds">Insufficient Funds</option>
                <option value="technical_issue">Technical Issue</option>
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="car_details" className="form-label fw-bold">Car Details</label>
              <input
                type="text"
                className="form-control"
                id="car_details"
                value={loandetail.car_details}
                onChange={(e) => setloandetail({ ...loandetail, car_details: e.target.value })}
                placeholder="Enter Car Details"
                
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Add Loan Deatils</button>
        </form>

        <div className="mb-4">
        {Loandetails.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Bank Name</th>
                  <th scope="col">EMI Amount</th>
                  <th scope="col">Loan Term</th>
                  <th scope="col">Loan Start Date</th>
                  <th scope="col">Loan End Date</th>
                  <th scope="col">EMI Date</th>
                  <th scope="col">No of EMI Bounces</th>
                  <th scope="col">Bounces Reason</th>
                  <th scope="col">Car Details</th>
                </tr>
              </thead>
              <tbody>
                {Loandetails.map((reference, index) => (
                  <tr key={reference._id}>
                    <th scope="row">{index + 1}</th>
                    <td>{reference.bank_name}</td>
                    <td>{reference.emi_amount}</td>
                    <td>{reference.loan_term}</td>
                    <td>{reference.loan_start_date}</td>
                    <td>{reference.loan_end_date}</td>
                    <td>{reference.emi_date}</td>
                    <td>{reference.no_of_emi_bounces}</td>
                    <td>{reference.bounces_reason}</td>
                    <td>{reference.car_details}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="alert alert-info" role="alert">
              No loan details found.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default LoanDetails;
