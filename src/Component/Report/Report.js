import React from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Report = () => {
  // Data for the Line chart
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

  // Data for the Pie chart
  const pieChartData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: '# of Votes',
        data: [100, 50, 100],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
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
            <h5>Distribution of Colors</h5>
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

export default Report;
