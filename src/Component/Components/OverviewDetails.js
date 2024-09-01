import React, { useState } from 'react';
import axios from 'axios';
const baseurl = process.env.REACT_APP_API_BASE_URL;

const OverviewDetails = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    previousLoanBankName: '',
    previousLoanType: '',
    previousProductModel: '',
    previousLoanAmount: '',
    previousLoanSanctionDate: '',
    previousLoanInsuranceValue: ''
  });

  // Function to fetch data based on mobile number
  const fetchData = async (mobileNumber) => {
    try {
      const customerNumber = mobileNumber;
      const response = await axios.get(`${baseurl}/getfiledata?customerNumber=${customerNumber}`);
      if (response.data) {
        const data = response.data;
        setFormData({
          name: data.customerName || '',
          previousLoanBankName: data.bankName || '',
          previousLoanType: data.loanType || '', // Assuming loanType is part of the response
          previousProductModel: data.model || '',
          previousLoanAmount: data.loanAmount || '',
          previousLoanSanctionDate: data.sanctionDate || '', // Assuming sanctionDate is part of the response
          previousLoanInsuranceValue: data.insurance || ''
        });
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

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
    <>
      <div className="tab-pane active">
        <form className='mb-5'>
          <div className="mb-3 row">
            <div className="col-md-6">
              <label htmlFor="customerNumber" className="form-label fw-bold">Mobile Number</label>
              <input
                type="text"
                className="form-control"
                id="customerNumber"
                placeholder="Enter mobile number"
                value={mobileNumber}
                onChange={handleMobileNumberChange}
                onBlur={handleMobileNumberBlur} // Fetch data on blur event
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="name" className="form-label fw-bold">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter name"
                value={formData.name || ''}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="previousLoanBankName" className="form-label fw-bold">Previous Loan Bank Name</label>
              <input
                type="text"
                className="form-control"
                id="previousLoanBankName"
                placeholder="Enter previous loan bank name"
                value={formData.previousLoanBankName || ''}
                onChange={(e) => setFormData({ ...formData, previousLoanBankName: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="previousLoanType" className="form-label fw-bold">Previous Loan Type</label>
              <input
                type="text"
                className="form-control"
                id="previousLoanType"
                placeholder="Enter previous loan type"
                value={formData.previousLoanType || ''}
                onChange={(e) => setFormData({ ...formData, previousLoanType: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="previousProductModel" className="form-label fw-bold">Previous Product Model</label>
              <input
                type="text"
                className="form-control"
                id="previousProductModel"
                placeholder="Enter previous product model"
                value={formData.previousProductModel || ''}
                onChange={(e) => setFormData({ ...formData, previousProductModel: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="previousLoanAmount" className="form-label fw-bold">Previous Loan Amount</label>
              <input
                type="text"
                className="form-control"
                id="previousLoanAmount"
                placeholder="Enter previous loan amount"
                value={formData.previousLoanAmount || ''}
                onChange={(e) => setFormData({ ...formData, previousLoanAmount: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="previousLoanSanctionDate" className="form-label fw-bold">Previous Loan Sanction Date</label>
              <input
                type="text"
                className="form-control"
                id="previousLoanSanctionDate"
                placeholder="Enter previous loan sanction date"
                value={formData.previousLoanSanctionDate || ''}
                onChange={(e) => setFormData({ ...formData, previousLoanSanctionDate: e.target.value })}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="previousLoanInsuranceValue" className="form-label fw-bold">Previous Loan Insurance Value</label>
              <input
                type="text"
                className="form-control"
                id="previousLoanInsuranceValue"
                placeholder="Enter previous loan insurance value"
                value={formData.previousLoanInsuranceValue || ''}
                onChange={(e) => setFormData({ ...formData, previousLoanInsuranceValue: e.target.value })}
              />
            </div>
          </div>
        </form>
        <div>
          <h3>File Disposition History</h3>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Date</th>
                <th scope="col">User Name</th>
                <th scope="col">Loan Type</th>
                <th scope="col">Category</th>
                <th scope="col">Disposition</th>
                <th scope="col">Remark</th>
              </tr>
            </thead>
            <tbody>
              {/* Example data */}
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default OverviewDetails;
