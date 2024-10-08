// import React, { useState,useEffect } from 'react';
// import axios from 'axios'; // For making HTTP requests
// import { useOverview } from '../ContentHook/OverviewContext';

// const UploadbankStatement = () => {
//   const months = [
//     'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//     'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
//   ];
//   const { setMobileNumber, formData, setFormData, fetchFileData } = useOverview();
//   const [error, setError] = useState(null);

//   const file_number=formData.file_number;
//   const baseurl = process.env.REACT_APP_API_BASE_URL;

//   const getPrevious12Months = () => {
//     const previous12Months = [];
//     const currentDate = new Date();
//     let currentMonth = currentDate.getMonth() - 1; // Skip the current month
//     let currentYear = currentDate.getFullYear();

//     for (let i = 0; i < 12; i++) {
//       const monthName = months[currentMonth];
//       previous12Months.push({
//         month: monthName,
//         year: currentYear,
//         dayValues: Array(6).fill(''), // Initialize with empty strings for days 5, 10, 15, 20, 25, 30
//         totalAB: '0', // Initialize totalAB
//         totalABB: '0' // Initialize totalABB
//       });

//       currentMonth = (currentMonth - 1 + 12) % 12;
//       if (currentMonth === 11) {
//         currentYear--;
//       }
//     }
//     return previous12Months.reverse();
//   };

//   const [previous12Months, setPrevious12Months] = useState(getPrevious12Months());
//   const [bankAccountNumber, setBankAccountNumber] = useState('');
//   const [totalAB, setTotalAB] = useState('');
//   const [totalABB, setTotalABB] = useState('');

//   const [sixMonthABB, setSixMonthABB] = useState('');
//   const [oneYearABB, setOneYearABB] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [submittedData, setSubmittedData] = useState([]);

//   const handleDayValueChange = (monthIndex, dayIndex, value) => {
//     const updatedMonths = [...previous12Months];
//     updatedMonths[monthIndex].dayValues[dayIndex] = value;
    
//     // Calculate totalAB
//     const dayValues = updatedMonths[monthIndex].dayValues.map(Number);
//     const calculatedTotalAB = dayValues.reduce((sum, val) => sum + val, 0);
//     updatedMonths[monthIndex].totalAB = calculatedTotalAB.toString(); // Convert to string for input

//     // Calculate totalABB as totalAB divided by 6
//     updatedMonths[monthIndex].totalABB = (calculatedTotalAB / 6).toString(); // Convert to string for input

//     setPrevious12Months(updatedMonths);
//   };

//   const handleMonthFieldChange = (monthIndex, field, value) => {
//     const updatedMonths = [...previous12Months];
//     updatedMonths[monthIndex][field] = value;
//     setPrevious12Months(updatedMonths);
//     // setTotalABB(updatedMonths.totalABB)

//   };
// console.log(previous12Months,"previous12Months")
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const dataToSubmit = {
//         file_number,
//         bankAccountNumber,
//         totalAB,
//         totalABB:(totalAB/6),
//         sixMonthABB,
//         oneYearABB,
//         months: previous12Months
//       };

//       await axios.post(`${baseurl}/createbankStatement`, dataToSubmit);
      
//       // Reset the form values
//       setBankAccountNumber('');
//       setTotalAB('');
//       setSixMonthABB('');
//       setOneYearABB('');
//       setPrevious12Months(getPrevious12Months());
//     } catch (error) {
//       console.error('Error submitting data', error);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const fetchBankStatementData = async (file_number) => {
//     try {
//       const response = await axios.get(`${baseurl}/getbankStatement/${file_number}`);
//       setSubmittedData(response.data); // Set the whole array of bank statements
//     } catch (err) {
//       setError('Error fetching bank statement data');
//       console.error('Error fetching data:', err);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   console.log(submittedData,"submittedData")

//   useEffect(() => {
//     fetchBankStatementData(file_number); // Fetch data for the specified file number
//   }, [file_number]);

  
//   return (
//     <div className="container mt-5">
//       <h3 className="text-center mb-4">Bank Statement Update Form</h3>

//       <form onSubmit={handleSubmit}>
//         <div className="row mb-3">
//           <div className="col-md-4">
//             <label className="form-label">Bank Account Number</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Bank Account Number"
//               value={bankAccountNumber}
//               onChange={(e) => setBankAccountNumber(e.target.value)}
//             />
//           </div>
//           <div className="col-md-4">
//             <label className="form-label">Total AB</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Total AB"
//               value={totalAB}
//               onChange={(e) => setTotalAB(e.target.value)}
//             />
//           </div>
//           <div className="col-md-4">
//             <label className="form-label">Six Month ABB</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Six Month ABB"
//               value={sixMonthABB}
//               onChange={(e) => setSixMonthABB(e.target.value)}
//             />
//           </div>
//         </div>

//         <div className="row mb-4">
//           <div className="col-md-4">
//             <label className="form-label">One Year ABB</label>
//             <input
//               type="text"
//               className="form-control"
//               placeholder="One Year ABB"
//               value={oneYearABB}
//               onChange={(e) => setOneYearABB(e.target.value)}
//             />
//           </div>
//         </div>

//         <table className="table table-bordered">
//           <thead>
//             <tr>
//               <th>Month</th>
//               <th>Day 5</th>
//               <th>Day 10</th>
//               <th>Day 15</th>
//               <th>Day 20</th>
//               <th>Day 25</th>
//               <th>Day 30</th>
//               <th>Total AB</th>
//               <th>Total ABB</th>
//             </tr>
//           </thead>
//           <tbody>
//             {previous12Months.map((monthData, monthIndex) => (
//               <tr key={monthIndex}>
//                 <td>{`${monthData.month}-${monthData.year}`}</td>
//                 {monthData.dayValues.map((value, dayIndex) => (
//                   <td key={dayIndex}>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value={value}
//                       onChange={(e) =>
//                         handleDayValueChange(monthIndex, dayIndex, e.target.value)
//                       }
//                     />
//                   </td>
//                 ))}
//                 <td>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={monthData.totalAB} // Auto-calculated
//                     readOnly // Make it read-only
//                   />
//                 </td>
//                 <td>
//                   <input
//                     type="text"
//                     className="form-control"
//                     value={monthData.totalABB} // Auto-calculated
//                     readOnly // Make it read-only
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         <div className="text-center">
//           <button type="submit" className="btn btn-primary" disabled={loading}>
//             {loading ? 'Updating...' : 'Update Bank Statement'}
//           </button>
//         </div>
//       </form>
//       <h3 className='mt-2 '>Bank Statement List</h3>
//       {submittedData && submittedData.length > 0 ? (
//   <div>
//     <h3>Bank Statements</h3>
//     <table className="table table-bordered">
//       <thead>
//         <tr>
//           <th>Serial No</th>
//           <th>Bank Account No</th>
//           <th>Total AB</th>
//           <th>Total ABB</th>
//           <th>One Year ABB</th>
//           <th>Six Months ABB</th>
//         </tr>
//       </thead>
//       <tbody>
//         {submittedData.map((statement, index) => (
//           <tr key={statement._id}>
//             <td>{index + 1}</td> {/* Serial number for each statement */}
//             <td>{statement.bankAccountNumber}</td>
//             <td>{statement.totalAB}</td>
//             <td>{statement.totalABB}</td>
//             <td>{statement.oneYearABB}</td>
//             <td>{statement.sixMonthABB}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// ) : (
//   <p>No data available</p>
// )}

//     </div>
//   );
// };

// export default UploadbankStatement;



import React, { useState, useEffect } from 'react';
import axios from 'axios'; // For making HTTP requests
import { useOverview } from '../ContentHook/OverviewContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const UploadbankStatement = () => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const { formData } = useOverview();
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const file_number = formData.file_number;
  const baseurl = process.env.REACT_APP_API_BASE_URL;

  const getPrevious12Months = () => {
    const previous12Months = [];
    const currentDate = new Date();
    let currentMonth = currentDate.getMonth() - 1; // Skip the current month
    let currentYear = currentDate.getFullYear();

    for (let i = 0; i < 12; i++) {
      const monthName = months[currentMonth];
      previous12Months.push({
        month: monthName,
        year: currentYear,
        dayValues: Array(6).fill(''), // Initialize with empty strings for days 5, 10, 15, 20, 25, 30
        totalAB: '0', // Initialize totalAB
        totalABB: '0' // Initialize totalABB
      });

      currentMonth = (currentMonth - 1 + 12) % 12;
      if (currentMonth === 11) {
        currentYear--;
      }
    }
    return previous12Months.reverse();
  };

  const [previous12Months, setPrevious12Months] = useState(getPrevious12Months());
  const [bankAccountNumber, setBankAccountNumber] = useState('');
  const [totalAB, setTotalAB] = useState('');
  const [sixMonthABB, setSixMonthABB] = useState('');
  const [oneYearABB, setOneYearABB] = useState('');
  const [loading, setLoading] = useState(false);
  const [submittedData, setSubmittedData] = useState([]);

  // Function to handle day value change and update totalAB and totalABB
  const handleDayValueChange = (monthIndex, dayIndex, value) => {
    const updatedMonths = [...previous12Months];
    updatedMonths[monthIndex].dayValues[dayIndex] = value;

    // Calculate totalAB for the current month
    const dayValues = updatedMonths[monthIndex].dayValues.map(Number);
    const calculatedTotalAB = dayValues.reduce((sum, val) => sum + val, 0);
    updatedMonths[monthIndex].totalAB = calculatedTotalAB.toString(); // Convert to string for input

    // Calculate totalABB for the current month as totalAB divided by 6
    updatedMonths[monthIndex].totalABB = (calculatedTotalAB / 6).toString(); // Convert to string for input

    // Set the updated months
    setPrevious12Months(updatedMonths);

    // Calculate overall totalAB and totalABB across all months with entered values
    let totalSumAB = 0;
    let totalSumABB = 0;
    let count = 0;

    updatedMonths.forEach((month) => {
      const monthTotalAB = parseFloat(month.totalAB) || 0;
      const monthTotalABB = parseFloat(month.totalABB) || 0;

      if (monthTotalAB > 0) {
        totalSumAB += monthTotalAB;
        totalSumABB += monthTotalABB;
        count++;
      }
    });

    // Update the overall totalAB (average) and sixMonthABB (average)
    setTotalAB(count > 0 ? (totalSumAB / count).toString() : '');
    setSixMonthABB(count > 0 ? (totalSumABB / count).toString() : '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const dataToSubmit = {
        file_number,
        bankAccountNumber,
        totalAB,
        totalABB: totalAB / 6,
        sixMonthABB,
        oneYearABB,
        months: previous12Months
      };

      await axios.post(`${baseurl}/createbankStatement`, dataToSubmit);
      fetchBankStatementData(file_number);
      // Reset the form values
      setBankAccountNumber('');
      setTotalAB('');
      setSixMonthABB('');
      setOneYearABB('');
      setPrevious12Months(getPrevious12Months());
    } catch (error) {
      console.error('Error submitting data', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBankStatementData = async (file_number) => {
    try {
      const response = await axios.get(`${baseurl}/getbankStatement/${file_number}`);
      setSubmittedData(response.data); // Set the whole array of bank statements
    } catch (err) {
      setError('Error fetching bank statement data');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBankStatementData(file_number); // Fetch data for the specified file number
  }, [file_number]);

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">Bank Statement Update Form</h3>

      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Bank Account Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Bank Account Number"
              value={bankAccountNumber}
              onChange={(e) => setBankAccountNumber(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <label className="form-label">Total AB</label>
            <input
              type="text"
              className="form-control"
              placeholder="Total AB"
              value={totalAB}
              readOnly // Make it read-only as it is auto-calculated
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Six Month ABB</label>
            <input
              type="text"
              className="form-control"
              placeholder="Six Month ABB"
              value={sixMonthABB}
              readOnly // Make it read-only as it is auto-calculated
            />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-md-4">
            <label className="form-label">One Year ABB</label>
            <input
              type="text"
              className="form-control"
              placeholder="One Year ABB"
              value={oneYearABB}
              onChange={(e) => setOneYearABB(e.target.value)}
            />
          </div>
        </div>

        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Month</th>
              <th>Day 5</th>
              <th>Day 10</th>
              <th>Day 15</th>
              <th>Day 20</th>
              <th>Day 25</th>
              <th>Day 30</th>
              <th>Total AB</th>
              <th>Total ABB</th>
            </tr>
          </thead>
          <tbody>
            {previous12Months.map((monthData, monthIndex) => (
              <tr key={monthIndex}>
                <td>{`${monthData.month}-${monthData.year}`}</td>
                {monthData.dayValues.map((value, dayIndex) => (
                  <td key={dayIndex}>
                    <input
                      type="text"
                      className="form-control"
                      value={value}
                      onChange={(e) =>
                        handleDayValueChange(monthIndex, dayIndex, e.target.value)
                      }
                    />
                  </td>
                ))}
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={monthData.totalAB} // Auto-calculated
                    readOnly // Make it read-only
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={monthData.totalABB} // Auto-calculated
                    readOnly // Make it read-only
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-center">
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Updating...' : 'Update Bank Statement'}
          </button>
        </div>
      </form>
           <h3>Bank Statements</h3>
     <table className="table table-bordered">
       <thead>
         <tr>
           <th>Serial No</th>
           <th>Bank Account No</th>
           <th>Total AB</th>
           <th>Total ABB</th>
           <th>One Year ABB</th>
           <th>Six Months ABB</th>
         </tr>
       </thead>
       <tbody>
         {submittedData.map((statement, index) => (
           <tr key={statement._id}>
             <td>{index + 1}</td> {/* Serial number for each statement */}
             <td>{statement.bankAccountNumber}</td>
             <td>{statement.totalAB}</td>
             <td>{statement.totalABB}</td>
             <td>{statement.oneYearABB}</td>
             <td>{statement.sixMonthABB}</td>
             <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate(`/viewbankstatement/${statement._id}`)}               >
                    <FontAwesomeIcon icon={faEye} /> View Details
                  </button>
                </td>
           </tr>
         ))}
       </tbody>
     </table>
    </div>
  );
};

export default UploadbankStatement;

