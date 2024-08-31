import React, { useState } from 'react';

const LoanApproval = () => {
  const [loanType, setLoanType] = useState('');

  const renderFields = () => {
    switch (loanType) {
      case 'Auto_loan':
      case 'Personal_loan':
        return (
          <>
            <div className="mb-3">
              <label>Customer Name</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label>EMI Date</label>
              <input type="date" className="form-control" />
            </div>
            <div className="mb-3">
              <label>Asset</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label>Basic Loan Amount</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label>Loan Suraksha</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label>P.F (Including G.S.T)</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label>Doc’S/Stamp/Valuation Charges</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label>Stamp Duty</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label>Emi Amount</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label>Tenure</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label>Deduct Fc</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label>Rto</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label>Net Disbursal Amount</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label>Customer Payment DD</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label>Hold Payment (Rc Updation)</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label>Doc Online</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label>Car Insurance</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label>Minus Fc Amount (Au)</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label>Pre. Emi</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label>ROI</label>
              <select className="form-control">
                <option>Reducing</option>
                <option>Flat</option>
              </select>
            </div>
            <div className="mb-3">
              <label>Subjectivity</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label>Inhand Amount Customer</label>
              <input type="text" className="form-control" />
            </div>
            <div className="mb-3">
              <label>Remark</label>
              <textarea className="form-control"></textarea>
            </div>
          </>
        );
      case 'Business Loan':
      case 'Home_Loan':
      case 'LAP':
        return (
          <>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Field 1" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Field 2" />
            </div>
            <div className="mb-3">
              <select className="form-control">
                <option>Select option</option>
                {/* Add options as needed */}
              </select>
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Field 4" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Field 5" />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control" placeholder="Field 6" />
            </div>
            <div className="mb-3">
              <textarea className="form-control" placeholder="Remark"></textarea>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="mb-3">
        <label>Loan Type</label>
        <select className="form-control" onChange={(e) => setLoanType(e.target.value)}>
          <option>Select Loan Type</option>
          <option value="Auto_loan">Auto Loan</option>
          <option value="Personal_loan">Personal Loan</option>
          <option value="Business Loan">Business Loan</option>
          <option value="Home_Loan">Home Loan</option>
          <option value="LAP">LAP</option>
        </select>
      </div>
      {renderFields()}
    </div>
  );
};

export default LoanApproval;
