import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useOverview } from '../ContentHook/OverviewContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams to get the statement ID


const Edituploadedbankstatement = () => {
    const { formData } = useOverview();
    const { statementId } = useParams(); // Get the statement ID from URL params
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const baseurl = process.env.REACT_APP_API_BASE_URL;
  
    const months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];
  
    const [previous12Months, setPrevious12Months] = useState([]);
    const [bankAccountNumber, setBankAccountNumber] = useState('');
    const [totalAB, setTotalAB] = useState('');
    const [sixMonthABB, setSixMonthABB] = useState('');
    const [oneYearABB, setOneYearABB] = useState('');
    const [loading, setLoading] = useState(false);
  
    // Function to handle day value change and update totalAB and totalABB
    const handleDayValueChange = (monthIndex, dayIndex, value) => {
      const updatedMonths = [...previous12Months];
      updatedMonths[monthIndex].dayValues[dayIndex] = value;
  
      const dayValues = updatedMonths[monthIndex].dayValues.map(Number);
      const calculatedTotalAB = dayValues.reduce((sum, val) => sum + val, 0);
      updatedMonths[monthIndex].totalAB = calculatedTotalAB.toString();
      updatedMonths[monthIndex].totalABB = (calculatedTotalAB / 6).toString();
  
      setPrevious12Months(updatedMonths);
  
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
  
      setTotalAB(count > 0 ? (totalSumAB / count).toString() : '');
      setSixMonthABB(count > 0 ? (totalSumABB / count).toString() : '');
    };
  
    const fetchBankStatement = async (id) => {
      setLoading(true);
      try {
        const response = await axios.get(`${baseurl}/getbankStatementById/${id}`);
        const data = response.data;
  
        setBankAccountNumber(data.bankAccountNumber);
        setTotalAB(data.totalAB);
        setSixMonthABB(data.sixMonthABB);
        setOneYearABB(data.oneYearABB);
        setPrevious12Months(data.months);
      } catch (error) {
        setError('Error fetching bank statement data');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      if (statementId) {
        fetchBankStatement(statementId); // Fetch data based on the statement ID
      }
    }, [statementId]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      try {
        const updatedData = {
          bankAccountNumber,
          totalAB,
          totalABB: totalAB / 6,
          sixMonthABB,
          oneYearABB,
          months: previous12Months
        };
  
        await axios.put(`${baseurl}/updatebankStatement/${statementId}`, updatedData);
        navigate('/bankStatements'); // Navigate back after successful update
      } catch (error) {
        console.error('Error updating data', error);
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="container mt-5">
        <h3 className="text-center mb-4">Edit Bank Statement</h3>
  
        {error && <div className="alert alert-danger">{error}</div>}
  
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
                readOnly
              />
            </div>
  
            <div className="col-md-4">
              <label className="form-label">Six Month ABB</label>
              <input
                type="text"
                className="form-control"
                placeholder="Six Month ABB"
                value={sixMonthABB}
                readOnly
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
                        onChange={(e) => handleDayValueChange(monthIndex, dayIndex, e.target.value)}
                      />
                    </td>
                  ))}
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={monthData.totalAB}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      value={monthData.totalABB}
                      readOnly
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  
          <div className="text-center">
            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading ? 'Updating...' : 'Update Bank Statement'}
            </button>
          </div>
        </form>
      </div>
    );
  };
  

export default Edituploadedbankstatement