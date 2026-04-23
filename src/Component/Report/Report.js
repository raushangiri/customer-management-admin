import React, { useEffect, useState } from 'react';
import { Line, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios';
import { saveAs } from 'file-saver'; // Library to save files
import Papa from 'papaparse';
// Register required components for Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const Report = ({ onApplyFilter, onDownloadCSV }) => {
  const [loanData, setLoanData] = useState([]);
  const [pendingData, setPendingData] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const baseurl = process.env.REACT_APP_API_BASE_URL;


  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [startDateCDR, setStartDateCDR] = useState('');
  const [endDateCDR, setEndDateCDR] = useState('');
  const [startDatebanklogin, setStartDatebanklogin] = useState('');
const [endDatebanklogin, setEndDatebanklogin] = useState('');

const [startDateAux, setStartDateAux] = useState('');
const [endDateAux, setEndDateAux] = useState('');

// Function to handle CSV download
const fetchAndDownloadReport = async () => {
  if (!startDatebanklogin || !endDatebanklogin) {
    alert('Please select a start and end date');
    return;
  }

  try {
    setLoading(true);
    const response = await axios.get(`${baseurl}/loginreport`, {
      params: {
        startDate: startDatebanklogin,
        endDate: endDatebanklogin,
      },
    });

    if (response.data.success) {
      // Transform data for better readability
      const formattedData = response.data.data.map((row) => ({
        "Assign Date": row.banklogin_assign_date,
        "Time": row.time,
        "Customer Name": row.customer_name,
        "Customer Mobile": row.customer_mobile_number,
        "Team Leader ID": row.teamleaderid,
        "Team Leader Name": row.teamleadername,
        "Agent ID": row.banklogin_agent_id,
        "Agent Name": row.banklogin_agent_name,
        "Login Status": row.banklogin_status.replace(/_/g, ' ').toUpperCase(),
        
        
      }));

      // Convert transformed data to CSV
      const csv = Papa.unparse(formattedData);

      // Create a blob from the CSV data and download it
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      saveAs(blob, `LoginReport_${startDatebanklogin}_to_${endDatebanklogin}.csv`);
    } else {
      alert('Failed to fetch data');
    }
  } catch (error) {
    console.error('Error fetching report:', error);
    alert('Failed to fetch data');
  } finally {
    setLoading(false);
  }
};

  const handleDownloadCSV = async () => {
    if (!startDate || !endDate) {
      alert('Please select both start and end dates.');
      return;
    }
    try {
      const response = await axios.get(`${baseurl}/dispositionReport`, {
        params: {
          startDate,
          endDate,
        },
      });

      if (response.data && response.data.success) {
        const csvData = convertToCSV(response.data.data);
        const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, 'disposition_report.csv');
      } else {
        alert('No data available for the selected date range.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Error downloading the report. Please try again later.');
    }
  };
  const convertToCSV = (data) => {
   const header = [
  'File Number',
  'User ID',
  
  'User Name',
  'Role',
  'Call Status',
  'Interested Status',
  'Disposition',
  'Not Interested Reason',
  'Remarks',
  'File Status',
  'Date',
  'Time'
];
  const csvRows = data.map((row) => [
      row.file_number,
row.userId,

row.username,
row.role,
row.call_status,
row.is_interested,
row.disposition,
row.not_interested_reason || '',
row.remarks || '',
row.file_status,
row.date,
row.time
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

  const fetchAuxReport = async () => {
  if (!startDateAux || !endDateAux) {
    alert('Please select start and end date');
    return;
  }

  try {
    setLoading(true);

    const response = await axios.get(`${baseurl}/auxReport`, {
      params: {
        startDate: startDateAux,
        endDate: endDateAux
      }
    });

    if (response.data.success) {
      const formattedData = response.data.data.map((row) => ({
        "User ID": row.userId,
        "Name": row.name,
        "Role": row.role,
        "Login Time": row.LoginTime,
        "Available": row.Available,
        "Meeting": row.Meeting,
        "Break": row.Break,
        "Training": row.Training,
        "Offline": row.Offline
      }));

      const csv = Papa.unparse(formattedData);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });

      saveAs(blob, `Employee_Login_Report_${startDateAux}_to_${endDateAux}.csv`);
    } else {
      alert('No data found');
    }
  } catch (error) {
    console.error(error);
    alert('Error fetching report');
  } finally {
    setLoading(false);
  }
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

  const handleApplyFilter = () => {
    onApplyFilter(startDate, endDate); 
  };
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <h3 className="text-center">Reports</h3>
      <div className="container">
        <div className="row">
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
      <h5 className="card-title">Employee Login & AUX Report</h5>

      <div className="row">
        <div className="col-md-6 mb-3">
          <label>Start Date:</label>
          <input
            type="date"
            className="form-control"
            value={startDateAux}
            onChange={(e) => setStartDateAux(e.target.value)}
          />
        </div>

        <div className="col-md-6 mb-3">
          <label>End Date:</label>
          <input
            type="date"
            className="form-control"
            value={endDateAux}
            onChange={(e) => setEndDateAux(e.target.value)}
          />
        </div>

        <div className="col-md-12">
          <button
            className="btn btn-success w-100"
            onClick={fetchAuxReport}
            disabled={loading}
          >
            {loading ? "Downloading..." : "Download Employee Report"}
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
                    <label htmlFor="startDatebanklogin">Start Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="startDatebanklogin"
                      value={startDatebanklogin}
                      onChange={(e) => setStartDatebanklogin(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="endDatebanklogin">End Date:</label>
                    <input
                      type="date"
                      className="form-control"
                      id="endDatebanklogin"
                      value={endDatebanklogin}
                      onChange={(e) => setEndDatebanklogin(e.target.value)}
                    />
                  </div>

                  <div className="col-md-12 mb-3">
                  <button onClick={fetchAndDownloadReport} disabled={loading}>
        {loading ? 'Downloading...' : 'Download Login Report'}
      </button>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 mt-4">
 
</div>
        </div>
      </div>

    </>
  );
};


export default Report;
