// import React, { useState } from 'react';
// import { useOverview } from '../ContentHook/OverviewContext';

// const LoanApproval = () => {
//   const [loanType, setLoanType] = useState('');
// const { formData } = useOverview();

//   const renderFields = () => {

// const fetchLoanData = async () => {
//   try {
//     const res = await fetch(`/api/loan/${fileNumber}`);
//     const data = await res.json();

//     if (data.success) {
//       setFormData(data.data);
//       setLoanType(data.data.loanType); // auto select type
//     }
//   } catch (err) {
//     console.error(err);
//   }
// };
// const handleChange = (e) => {
//   setFormData({
//     ...formData,
//     [e.target.name]: e.target.value,
//   });
// };

// const handleSubmit = async () => {
//   const payload = {
//     ...formData,
//     file_number: fileNumber,
//     loanType,
//   };

//   const res = await fetch("/api/loan", {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(payload),
//   });

//   const data = await res.json();

//   if (data.success) {
//     setFormData(data.data); // 🔥 auto refresh with saved data
//     alert("Saved successfully");
//   }
// };

//     switch (loanType) {
//       case 'Auto_loan':
//       case 'Personal_loan':
//         return (
//           <>
//             <div className="mb-3">
//               <label>Customer Name</label>
//               <input type="text" className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label>EMI Date</label>
//               <input type="date" className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label>Asset</label>
//               <input type="text" className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label>Basic Loan Amount</label>
//               <input type="text" className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label>Loan Suraksha</label>
//               <input type="text" className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label>P.F (Including G.S.T)</label>
//               <input type="text" className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label>Doc’S/Stamp/Valuation Charges</label>
//               <input type="text" className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label>Stamp Duty</label>
//               <input type="text" className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label>Emi Amount</label>
//               <input type="text" className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label>Tenure</label>
//               <input type="text" className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label>Deduct Fc</label>
//               <input type="text" className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label>Rto</label>
//               <input type="text" className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label>Net Disbursal Amount</label>
//               <input type="text" className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label>Customer Payment DD</label>
//               <input type="text" className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label>Hold Payment (Rc Updation)</label>
//               <input type="text" className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label>Doc Online</label>
//               <input type="text" className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label>Car Insurance</label>
//               <input type="text" className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label>Minus Fc Amount (Au)</label>
//               <input type="text" className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label>Pre. Emi</label>
//               <input type="text" className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label>ROI</label>
//               <select className="form-control">
//                 <option>Reducing</option>
//                 <option>Flat</option>
//               </select>
//             </div>
//             <div className="mb-3">
//               <label>Subjectivity</label>
//               <input type="text" className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label>Inhand Amount Customer</label>
//               <input type="text" className="form-control" />
//             </div>
//             <div className="mb-3">
//               <label>Remark</label>
//               <textarea className="form-control"></textarea>
//             </div>
//             <div className='text-center'>
//             <button type="button" class="btn btn-primary mx-2">Submit</button>
//             <button type="button" class="btn btn-secondary">Cancel</button>
//             </div>
//           </>
//         );
//       case 'Business Loan':
//       case 'Home_Loan':
//       case 'LAP':
//         return (
//           <>
//             <div className="mb-3">
//               <input type="text" className="form-control" placeholder="Field 1" />
//             </div>
//             <div className="mb-3">
//               <input type="text" className="form-control" placeholder="Field 2" />
//             </div>
//             <div className="mb-3">
//               <select className="form-control">
//                 <option>Select option</option>
//                 {/* Add options as needed */}
//               </select>
//             </div>
//             <div className="mb-3">
//               <input type="text" className="form-control" placeholder="Field 4" />
//             </div>
//             <div className="mb-3">
//               <input type="text" className="form-control" placeholder="Field 5" />
//             </div>
//             <div className="mb-3">
//               <input type="text" className="form-control" placeholder="Field 6" />
//             </div>
//             <div className="mb-3">
//               <textarea className="form-control" placeholder="Remark"></textarea>
//             </div>
//             <div className='text-center'>
//             <button type="button" class="btn btn-primary mx-2">Submit</button>
//             <button type="button" class="btn btn-secondary">Cancel</button>
//             </div>          </>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="container">
//       <div className="mb-3">
//         <label>Loan Type</label>
//         <select className="form-control" onChange={(e) => setLoanType(e.target.value)}>
//           <option>Select Loan Type</option>
//           <option value="Auto_loan">Auto Loan</option>
//           <option value="Personal_loan">Personal Loan</option>
//           <option value="Business Loan">Business Loan</option>
//           <option value="Home_Loan">Home Loan</option>
//           <option value="LAP">LAP</option>
//         </select>
//       </div>
//       {renderFields()}
//     </div>
//   );
// };

// export default LoanApproval;




import React, { useState, useEffect } from "react";
import { useOverview } from "../ContentHook/OverviewContext";

/* ✅ OUTSIDE COMPONENT (VERY IMPORTANT) */
const InputField = ({ label, name, type = "text", value, onChange }) => (
  <div className="mb-3">
    <label>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="form-control"
    />
  </div>
);

const LoanApproval = () => {
  const { formData, setFormData } = useOverview();

  const [loanType, setLoanType] = useState("");
  const [localFormData, setLocalFormData] = useState({});

  const baseurl = process.env.REACT_APP_API_BASE_URL;
  const fileNumber = formData?.file_number;

  /* ✅ Allowed fields */
  const allowedFields = [
    "customerName",
    "bankName",
    "emiDate",
    "asset",
    "basicLoanAmount",
    "loanSuraksha",
    "pfCharges",
    "docCharges",
    "stampDuty",
    "emiAmount",
    "tenure",
    "deductFc",
    "rto",
    "netDisbursalAmount",
    "customerPaymentDD",
    "holdPayment",
    "docOnline",
    "carInsurance",
    "minusFcAmount",
    "preEmi",
    "roiType",
    "subjectivity",
    "inhandAmountCustomer",
    "remark",
  ];

  const numberFields = [
    "basicLoanAmount",
    "loanSuraksha",
    "pfCharges",
    "docCharges",
    "stampDuty",
    "emiAmount",
    "tenure",
    "deductFc",
    "rto",
    "netDisbursalAmount",
    "customerPaymentDD",
    "holdPayment",
    "docOnline",
    "carInsurance",
    "minusFcAmount",
    "preEmi",
    "inhandAmountCustomer",
  ];

  /* ✅ FETCH DATA */
  useEffect(() => {
    if (fileNumber) {
      fetchLoanData();
    }
  }, [fileNumber]);

  const fetchLoanData = async () => {
    try {
      const res = await fetch(`${baseurl}/getloanapproval/${fileNumber}`);
      const data = await res.json();

      if (data.success) {
        setLocalFormData(data.data || {});
        setFormData((prev) => ({
          ...prev,
          ...data.data,
        }));
        setLoanType(data.data.loanType || "");
      }
    } catch (err) {
      console.error(err);
    }
  };

  /* ✅ HANDLE CHANGE (LOCAL ONLY) */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setLocalFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* ✅ SUBMIT */
  const handleSubmit = async () => {
    try {
      let filteredData = {};

      allowedFields.forEach((key) => {
        if (localFormData[key] !== undefined) {
          filteredData[key] = localFormData[key];
        }
      });

      numberFields.forEach((key) => {
        if (filteredData[key] !== "" && filteredData[key] !== undefined) {
          filteredData[key] = Number(filteredData[key]);
        }
      });

      const payload = {
        file_number: fileNumber,
        loanType,
        ...filteredData,
      };

      const res = await fetch(`${baseurl}/loanapproval`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (data.success) {
        setLocalFormData(data.data);
        setFormData((prev) => ({
          ...prev,
          ...data.data,
        }));

        alert("Saved / Updated successfully");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">

      {/* Loan Type */}
      <div className="mb-3">
        <label>Loan Type</label>
        <select
          className="form-control"
          value={loanType}
          onChange={(e) => setLoanType(e.target.value)}
        >
          <option value="">Select Loan Type</option>
          <option value="Auto_loan">Auto Loan</option>
          <option value="Personal_loan">Personal Loan</option>
          <option value="Business Loan">Business Loan</option>
          <option value="Home_Loan">Home Loan</option>
          <option value="LAP">LAP</option>
        </select>
      </div>

      {/* ✅ INLINE RENDER (NO FUNCTION RE-CREATION) */}
      {(loanType === "Auto_loan" || loanType === "Personal_loan") && (
        <>
          <InputField label="Customer Name" name="customerName" value={localFormData.customerName || ""} onChange={handleChange} />
          <InputField label="Bank Name" name="bankName" value={localFormData.bankName || ""} onChange={handleChange} />
          <InputField label="EMI Date" name="emiDate" type="date" value={localFormData.emiDate || ""} onChange={handleChange} />
          <InputField label="Asset" name="asset" value={localFormData.asset || ""} onChange={handleChange} />
          <InputField label="Basic Loan Amount" name="basicLoanAmount" value={localFormData.basicLoanAmount || ""} onChange={handleChange} />
          <InputField label="Loan Suraksha" name="loanSuraksha" value={localFormData.loanSuraksha || ""} onChange={handleChange} />
          <InputField label="P.F Charges" name="pfCharges" value={localFormData.pfCharges || ""} onChange={handleChange} />
          <InputField label="Doc Charges" name="docCharges" value={localFormData.docCharges || ""} onChange={handleChange} />
          <InputField label="Stamp Duty" name="stampDuty" value={localFormData.stampDuty || ""} onChange={handleChange} />
          <InputField label="EMI Amount" name="emiAmount" value={localFormData.emiAmount || ""} onChange={handleChange} />
          <InputField label="Tenure" name="tenure" value={localFormData.tenure || ""} onChange={handleChange} />
          <InputField label="Deduct Fc" name="deductFc" value={localFormData.deductFc || ""} onChange={handleChange} />
          <InputField label="RTO" name="rto" value={localFormData.rto || ""} onChange={handleChange} />
          <InputField label="Net Disbursal Amount" name="netDisbursalAmount" value={localFormData.netDisbursalAmount || ""} onChange={handleChange} />
          <InputField label="Customer Payment DD" name="customerPaymentDD" value={localFormData.customerPaymentDD || ""} onChange={handleChange} />
          <InputField label="Hold Payment" name="holdPayment" value={localFormData.holdPayment || ""} onChange={handleChange} />
          <InputField label="Doc Online" name="docOnline" value={localFormData.docOnline || ""} onChange={handleChange} />
          <InputField label="Car Insurance" name="carInsurance" value={localFormData.carInsurance || ""} onChange={handleChange} />
          <InputField label="Minus Fc Amount" name="minusFcAmount" value={localFormData.minusFcAmount || ""} onChange={handleChange} />
          <InputField label="Pre EMI" name="preEmi" value={localFormData.preEmi || ""} onChange={handleChange} />

          <div className="mb-3">
            <label>ROI</label>
            <select
              name="roiType"
              value={localFormData.roiType || ""}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Select</option>
              <option value="Reducing">Reducing</option>
              <option value="Flat">Flat</option>
            </select>
          </div>

          <InputField label="Subjectivity" name="subjectivity" value={localFormData.subjectivity || ""} onChange={handleChange} />
          <InputField label="Inhand Amount Customer" name="inhandAmountCustomer" value={localFormData.inhandAmountCustomer || ""} onChange={handleChange} />

          <div className="mb-3">
            <label>Remark</label>
            <textarea
              name="remark"
              value={localFormData.remark || ""}
              onChange={handleChange}
              className="form-control"
            />
          </div>
        </>
      )}

      {/* Submit */}
      {loanType && (
        <div className="text-center mt-3">
          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit / Update
          </button>
        </div>
      )}
    </div>
  );
};

export default LoanApproval;