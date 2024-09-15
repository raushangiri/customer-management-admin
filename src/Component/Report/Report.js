import React, { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Report = () => {
  const [loanData, setLoanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseurl = process.env.REACT_APP_API_BASE_URL;

  // Fetch loan data from the API
  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        const response = await fetch(`${baseurl}/gettypeofloanreport`); // Replace with your actual API URL
        if (!response.ok) {
          throw new Error('Failed to fetch loan data');
        }
        const data = await response.json();
        setLoanData(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchLoanData();
  }, []);

  // Prepare data for the Pie chart based on API response
  const pieChartData = {
    labels: loanData.map(loan => loan.type_of_loan || 'Unknown'),
    datasets: [
      {
        label: 'Count',
        data: loanData.map(loan => loan.count),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const chartStyle = {
    maxWidth: '400px',
    maxHeight: '400px',
    margin: '0 auto',
  };

  // Render loading or error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h3 className="text-center">Reports</h3>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Sales Over Time</h5>
            <div style={chartStyle}>
              <Line data={lineChartData} />
            </div>
          </div>
          <div className="col-md-6">
            <h5>Report as per Loan Type</h5>
            <div style={chartStyle}>
              <Pie data={pieChartData} />
            </div>
          </div>
          <div className="col-md-6">
            <h5>Sales Over Time</h5>
            <div style={chartStyle}>
              <Line data={lineChartData} />
            </div>
          </div>
          <div className="col-md-6">
            <h5>Sales Over Time</h5>
            <div style={chartStyle}>
              <Line data={lineChartData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Data for the Line chart (remains unchanged)
const lineChartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sales',
      data: [65, 59, 80, 81, 56, 55, 40],
      fill: false,
      borderColor: 'rgb(75, 192, 192)',
      tension: 0.1,
    },
  ],
};

export default Report;
