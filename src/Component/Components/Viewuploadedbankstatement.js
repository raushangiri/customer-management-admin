import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams,useNavigate  } from 'react-router-dom';

const Viewuploadedbankstatement = () => {
    const [bankAccountNumber, setBankAccountNumber] = useState("");
    const [totalAB, setTotalAB] = useState("");
    const [sixMonthABB, setSixMonthABB] = useState("");
    const [oneYearABB, setOneYearABB] = useState("");
    const [previous12Months, setPrevious12Months] = useState([]);
  
    const [loading, setLoading] = useState(false);
    const baseurl = process.env.REACT_APP_API_BASE_URL;
    const { _id } = useParams(); // Get the loan file ID from the URL
    const navigate = useNavigate();
    
    useEffect(() => {
      // Simulate fetching data from the backend
      const fetchData = async () => {
        try {
          setLoading(true);
          const response = await axios.get(`${baseurl}/viewbankStatement/${_id}`); // Update with your API endpoint
          const data = response.data;
  
          setBankAccountNumber(data.bankAccountNumber);
          setTotalAB(data.totalAB);
          setSixMonthABB(data.sixMonthABB);
          setOneYearABB(data.oneYearABB);
          setPrevious12Months(
            data.months.map((monthData) => ({
              ...monthData,
              dayValues: monthData.dayValues || ["", "", "", "", "", ""],
            }))
          );
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <form>
        <div className="row mb-3">
          <div className="col-md-4">
            <label className="form-label">Bank Account Number</label>
            <input
              type="text"
              className="form-control"
              placeholder="Bank Account Number"
              value={bankAccountNumber}
              readOnly
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
              readOnly
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
                      readOnly
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
          <button type="button" className="btn btn-primary" onClick={() => navigate(-1)}>
           Back
          </button>
        </div>
      </form>
    );
  };

export default Viewuploadedbankstatement