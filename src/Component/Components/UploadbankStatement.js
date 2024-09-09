import React, { useState,  } from 'react';
// import { bank_details } from '../../Component/Bank-login/Data'; // Adjust the path if necessary

const UploadbankStatement = () => {


    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ];

    const getPrevious12Months = () => {
        const previous12Months = [];
        const currentDate = new Date();
        let currentMonth = currentDate.getMonth();
        let currentYear = currentDate.getFullYear();

        for (let i = 0; i < 12; i++) {
            const monthName = months[currentMonth];
            previous12Months.push({
                month: monthName,
                year: currentYear,
                dayValues: Array(6).fill('') // Initialize with empty strings for days 5, 10, 15, 20, 25, 30
            });

            currentMonth = (currentMonth - 1 + 12) % 12;
            if (currentMonth === 11) {
                currentYear--;
            }
        }
        return previous12Months.reverse();
    };
    const [previous12Months, setPrevious12Months] = useState(getPrevious12Months());

    const handleDayValueChange = (monthIndex, dayIndex, value) => {
        const updatedMonths = [...previous12Months];
        updatedMonths[monthIndex].dayValues[dayIndex] = value;
        setPrevious12Months(updatedMonths);
    };

    const calculateTotalAB = (dayValues) => {
        return dayValues.reduce((total, value) => total + (parseFloat(value) || 0), 0);
    };

    const calculateTotalABB = (totalAB) => {
        return totalAB / 6;
    };

  return (
    <>
    <div className="tab-pane active">
                        <div className="container mt-4">
                            <div className="row">
                <div className="col-md-12 text-center">
                  <h3 className="mb-4">Bank Statement Update Form</h3>
                </div>
                
                  <div className="col-md-4 mb-4">
                    <label className="form-label">Total AB</label>
                    <input type="text" className="form-control" placeholder="0" />
                  </div>
                  <div className="col-md-4 mb-4">
                    <label className="form-label">Six Months ABB</label>
                    <input type="text" className="form-control" placeholder="0" />
                  </div>
                  <div className="col-md-4 mb-4">
                    <label className="form-label">One Year ABB</label>
                    <input type="text" className="form-control" placeholder="0" />
                  </div>
              </div>
                            <form>
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
                                        {previous12Months.map((monthData, monthIndex) => {
                                            const totalAB = calculateTotalAB(monthData.dayValues);
                                            const totalABB = calculateTotalABB(totalAB);

                                            return (
                                                <tr key={monthIndex}>
                                                    <td>{`${monthData.month}-${monthData.year.toString().slice(-2)}`}</td>
                                                    {monthData.dayValues.map((value, dayIndex) => (
                                                        <td key={dayIndex}>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                value={value}
                                                                onChange={(e) =>
                                                                    handleDayValueChange(monthIndex, dayIndex, e.target.value)
                                                                }
                                                            // placeholder={`Value for Day ${[5, 10, 15, 20, 25, 30][dayIndex]}`}
                                                            />
                                                        </td>
                                                    ))}
                                                    <td>{totalAB.toFixed(0)}</td>
                                                    <td>{totalABB.toFixed(0)}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                                <div className="text-center">
                                    <button type="submit" className="btn btn-primary">Update Bank Statement</button>
                                </div>
                            </form>
                 
                        </div>
                    </div>
    </>
  )
}

export default UploadbankStatement