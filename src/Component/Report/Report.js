import React, { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios';
import { saveAs } from 'file-saver'; // Library to save files

// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Report = ({ onApplyFilter, onDownloadCSV }) => {
  const [loanData, setLoanData] = useState([]);
  const [pendingData, setPendingData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseurl = process.env.REACT_APP_API_BASE_URL;


  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startDateCDR, setStartDateCDR] = useState('');
  const [endDateCDR, setEndDateCDR] = useState('');
  // Function to handle CSV download
  const handleDownloadCSV = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    try {
      // Make API call to fetch data based on date filters
      const response = await axios.get(`${baseurl}/tvrreport`, {
        params: {
          startDate,
          endDate,
        },
      });

      if (response.data && response.data.success) {
        // Prepare CSV content
        const csvData = convertToCSV(response.data.data);

        // Create a Blob object and trigger download
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'tvr_report.csv');
      } else {
        alert('No data available for the selected date range.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error downloading the report. Please try again later.');
    }
  };

  // Function to convert data to CSV format
  const convertToCSV = (data) => {
    const header = ['TVR Assigned Date','Time', 'Team Leader ID', 'Team Leader Name','TVR Agent ID', 'TVR Agent Name', 'TVR Status','Customer Name', 'Mobile Number'];
    const csvRows = data.map((row) => [
      row.tvr_assign_date,
      row.time,
      row.teamleaderid || '', // Use empty string if no team leader ID
      row.teamleadername || '', // Use empty string if no team leader name
      row.tvr_agent_id,
      row.tvr_agent_name,
      row.tvr_status,
      row.customer_name,
      row.customer_mobile_number,
    ]);

    // Join the header and rows into a CSV string
    const csvContent = [header.join(','), ...csvRows.map((row) => row.join(','))].join('\n');
    return csvContent;
  };

  const handleCDRDownloadCSV = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }

    try {
      // Make API call to fetch data based on date filters
      const response = await axios.get(`${baseurl}/cdrreport`, {
        params: {
          startDate:startDateCDR,
          endDate:endDateCDR,
        },
      });

      if (response.data && response.data.success) {
        // Prepare CSV content
        const csvData = CDRconvertToCSV(response.data.data);

        // Create a Blob object and trigger download
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'cdr_report.csv');
      } else {
        alert('No data available for the selected date range.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error downloading the report. Please try again later.');
    }
  };

  const CDRconvertToCSV = (data) => {
    const header = ['Assigned Date','Time', 'Team Leader ID', 'Team Leader Name','CDR Agent ID', 'CDR Agent Name', 'CDR Status','Customer Name', 'Mobile Number'];
    const csvRows = data.map((row) => [
      row.cdr_assign_date|| '',
      row.time|| '',
      row.teamleaderid || '', // Use empty string if no team leader ID
      row.teamleadername || '', // Use empty string if no team leader name
      row.cdr_agent_id|| '',
      row.cdr_agent_name|| '',
      row.cdr_status|| '',
      row.customer_name|| '',
      row.customer_mobile_number|| '',
    ]);

    // Join the header and rows into a CSV string
    const csvContent = [header.join(','), ...csvRows.map((row) => row.join(','))].join('\n');
    return csvContent;
  };

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

    const fetchPendingCounts = async () => {
      try {
        const response = await axios.get(`${baseurl}/pendingcount`);
        if (response.data && response.data.status === 200) {
          setPendingData(response.data.data); // Set the response data for the pie chart
        } else {
          console.error('No pending counts found');
        }
      } catch (error) {
        console.error('Error fetching pending counts:', error);
      }
    };


    fetchLoanData();
    fetchPendingCounts();
  }, []);

  // Prepare data for the Pie chart based on API response
  const pieChartData = {

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
    labels: loanData.map(loan => loan.type_of_loan || 'Unknown'),
  };

  const PendingpieChartData = {

    datasets: [
      {
        label: 'Count',
        data: pendingData.map(loan => loan.count),
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
    labels: pendingData.map(loan => loan.data || 'Unknown'),
  };
  const chartStyle = {
    maxWidth: '400px',
    minWidth: '400px',
    maxHeight: '400px',
    minHeight: '400px',
    margin: '0 auto',
  };
  

  const handleApplyFilter = () => {
    onApplyFilter(startDate, endDate); // Pass selected date filters to parent component
  };

  // const handleDownloadCSV = () => {
  //   onDownloadCSV(startDate, endDate); // Trigger CSV download with current date filters
  // };
  // Render loading or error states
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;



  return (
    <>
      <h3 className="text-center">Reports</h3>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5 className='text-center'>Report as per Loan Type</h5>
            <div style={chartStyle}>
              <Pie data={pieChartData} />
            </div>
          </div>
          <div className="col-md-6">
            <h5 className='text-center'>Interested Vs Pending Report</h5>
            <div style={chartStyle}>
              <Pie data={PendingpieChartData} />
            </div>
          </div>

          {/* <div className="col-md-6">
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
          </div> */}

          <div className="col-md-6 mt-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Disposition Report</h5>

                <div className='row'>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>

                  <div className="col-md-12 mb-3">
                    <button
                      className="btn btn-success w-100"
                      onClick={handleDownloadCSV}
                    >
                      Download CSV
                    </button>

                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-4">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">TVR Report</h5>

          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="startDate">Start Date:</label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="endDate">End Date:</label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <div className="col-md-12 mb-3">
              <button
                className="btn btn-success w-100"
                onClick={handleDownloadCSV}
              >
                Download CSV
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
          <div className="col-md-6 mt-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">CDR Report</h5>

                <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="startDateCDR">Start Date:</label>
              <input
                type="date"
                className="form-control"
                id="startDateCDR"
                value={startDateCDR}
                onChange={(e) => setStartDateCDR(e.target.value)}
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="endDateCDR">End Date:</label>
              <input
                type="date"
                className="form-control"
                id="endDateCDR"
                value={endDateCDR}
                onChange={(e) => setEndDateCDR(e.target.value)}
              />
            </div>

            <div className="col-md-12 mb-3">
              <button
                className="btn btn-success w-100"
                onClick={handleCDRDownloadCSV}
              >
                Download CSV
              </button>
            </div>
          </div>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Login Report</h5>

                <div className='row'>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="startDate">Start Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="startDate"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="endDate">End Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="endDate"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>

                  <div className="col-md-12 mb-3">
                    <button
                      className="btn btn-success w-100"
                      onClick={handleDownloadCSV}
                    >
                      Download CSV
                    </button>

                  </div>
                </div>
              </div>
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
