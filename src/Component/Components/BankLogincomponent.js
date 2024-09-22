import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { statuses } from '../../Component/Bank-login/Data'; // Adjust the path if necessary
import { useOverview } from '../ContentHook/OverviewContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons'; // Import the correct icon
import { Link } from 'react-router-dom';

const BankLogincomponent = () => {
    const [loginStatus, setLoginStatus] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [selectedReason, setSelectedReason] = useState('');
    const [selectedBank, setSelectedBank] = useState('');
    const [bankDetail, setBankDetail] = useState({ "RM NAME": '', "RM CONTACT NO": '' });
    const [bankNames, setBankNames] = useState([]);
    const [remarks, setRemarks] = useState('');
    const [email1, setEmail1] = useState('');
    const [email2, setEmail2] = useState('');
    const [documentStatus, setDocumentStatus] = useState('');
    const baseurl = process.env.REACT_APP_API_BASE_URL;
    const { formData, handleSubmit } = useOverview();
    const userId = localStorage.getItem('userId');
    const [bankLoginDetails, setBankLoginDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
        const fetchBankLoginDetails = async () => {
          try {
            const response = await axios.get(`${baseurl}/getbanklogindetails/${formData.file_number}`);
            setBankLoginDetails(response.data);
            setLoading(false);
          } catch (error) {
            setError('Error fetching data');
            setLoading(false);
          }
        };
    
        fetchBankLoginDetails();
      }, [userId]);
  
 

    // Fetch bank names from the API
    useEffect(() => {
        const loanType = "Auto Loan";  // Example loan type
        axios.post(`${baseurl}/getBankNames`, { Loan_Type: loanType })
            .then(response => {
                if (response.data.success) {
                    setBankNames(response.data.bankNames);
                }
            })
            .catch(error => {
                console.error("Error fetching bank names:", error);
            });
    }, []);



    // if (loading) {
    //     return (
    //       <div className="d-flex justify-content-center">
    //         <div className="spinner-border" role="status">
    //           <span className="sr-only">Loading...</span>
    //         </div>
    //       </div>
    //     );
    //   }
    
    //   if (error) {
    //     return <div className="alert alert-danger">{error}</div>;
    //   }
  
    const handleLoginStatusChange = (event) => {
        setLoginStatus(event.target.value);
        setSelectedStatus('');
        setSelectedReason('');
        setSelectedBank('');
        setBankDetail({ "rm1_name": '', "rm1_contact_number": '',"email_1":"" });
    };

    const handleStatusChange = (event) => {
        setSelectedStatus(event.target.value);
        setSelectedReason('');
    };

    const handleBankChange = async (event) => {
        const bankName = event.target.value;
        setSelectedBank(bankName);

        if (bankName && formData.type_of_loan) {
            // Fetch RM details based on loan type and selected bank
            try {
                const response = await axios.post(`${baseurl}/getrmDetails`, {
                    loan_type: formData.type_of_loan,  // Assuming formData contains the type_of_loan
                    bank_name: bankName
                });
                if (response.data.bankDetail) {
                    setBankDetail(response.data.bankDetail);
                }
            } catch (error) {
                console.error("Error fetching RM details:", error);
            }
        }
    };
    const handleSubmitForm = async () => {
        const payload = {
            userId:userId,
            file_number: formData.file_number,
            bank_login_status: loginStatus,
            call_status: selectedStatus,
            reason_for_notlogin: selectedReason,
            loan_type: formData.type_of_loan,  // Use loan_type from formData
            bank_name: selectedBank,
            rm1_name: bankDetail['rm1_name'],
            rm1_contact_number: bankDetail["rm1_contact_number"],
            email_1: bankDetail["email_1"],
            email_2: email2,
            document_status: documentStatus,
            remarks: remarks,
        };

        try {
            const response = await axios.post(`${baseurl}/createBankDetail`, payload);
            if (response.data.message) {
                alert("Bank details saved successfully!");
            }
        } catch (error) {
            alert(error.response?.data?.error || "Error saving bank details");
        }
    };

    const filteredReasons = statuses.find(status => status.login_status === selectedStatus)?.reasons || [];


    const handleShareWithRM = (detail) => {
        // Logic to share the document with RM
        alert(`Document shared with RM for ${detail.file_name}`);
        // You can add your API call here to share the document
      };
      
    return (
        <div className="container mt-4">
            <div className="row-md-6">
                <div className="col-md-6"> 
                    <div className="form-group">
                        <label htmlFor="loginStatus">Check Login Status:</label>
                        <select id="loginStatus" className="form-control" value={loginStatus} onChange={handleLoginStatusChange}>
                            <option value="">Select</option>
                            <option value="Yes">Yes</option>
                            <option value="No">No</option>
                        </select>
                    </div>
                </div>
            </div>

            {loginStatus === 'No' && (
                <>
                    <div className="form-group mt-3">
                        <label htmlFor="status">Status:</label>
                        <select id="status" className="form-control" value={selectedStatus} onChange={handleStatusChange}>
                            <option value="">Select</option>
                            {statuses.map(status => (
                                <option key={status.login_status} value={status.login_status}>
                                    {status.login_status}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedStatus && (
                        <div className="form-group mt-3">
                            <label htmlFor="reason">Reason:</label>
                            <select id="reason" className="form-control" value={selectedReason} onChange={(e) => setSelectedReason(e.target.value)}>
                                <option value="">Select</option>
                                {filteredReasons.map(reason => (
                                    <option key={reason} value={reason}>
                                        {reason}
                                    </option>
                                ))}
                            </select>
                            <label htmlFor="remark">Remark:</label>
                            <textarea
                                className="form-control"
                                id="remarks"
                                placeholder="Enter remarks"
                                value={remarks}
                                onChange={(e) => setRemarks(e.target.value)}
                            />
                        </div>
                    )}
                </>
            )}

            {loginStatus === 'Yes' && (
                <>
                    <div className="row">
                        <div className="col-md-6">                            
                            <div className="form-group mt-3">
                                <label htmlFor="bankName">Bank Name:</label>
                                <select id="bankName" className="form-control" value={selectedBank} onChange={handleBankChange}>
                                    <option value="">Select</option>
                                    {bankNames.map((bank, index) => (
                                        <option key={index} value={bank}>
                                            {bank}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        {selectedBank && (
                            <>
                                <div className="col-md-6 form-group mt-3">
                                    <label htmlFor="rm1_name">RM Name:</label>
                                    <input
                                        id="rm1_name"
                                        type="text"
                                        className="form-control"
                                        value={bankDetail.rm1_name || ''}
                                        onChange={(e) => setBankDetail(prev => ({ ...prev, "rm1_name": e.target.value }))}
                                    />
                                </div>

                                <div className="col-md-6 form-group mt-3">
                                    <label htmlFor="rm1_contact_number">RM Contact No:</label>
                                    <input
                                        id="rm1_contact_number"
                                        type="text"
                                        className="form-control"
                                        value={bankDetail.rm1_contact_number || ''}
                                        onChange={(e) => setBankDetail(prev => ({ ...prev, "rm1_contact_number": e.target.value }))}
                                    />
                                </div>

                                <div className="col-md-6 form-group mt-3">
                                    <label htmlFor="email_1">Email 1:</label>
                                    <input
                                        id="email_1"
                                        type="email"
                                        className="form-control"
                                        value={bankDetail.email_1}
                                        onChange={(e) => setBankDetail(prev => ({ ...prev, "email_1": e.target.value }))}
                                    />
                                </div>

                                <div className="col-md-6 form-group mt-3">
                                    <label htmlFor="email2">Email 2:</label>
                                    <input
                                        id="email2"
                                        type="email"
                                        className="form-control"
                                        value={email2}
                                        onChange={(e) => setEmail2(e.target.value)}
                                    />
                                </div>
                                
                                <div className="col-md-6 form-group mt-3">
                                    <label htmlFor="documentStatus">Select Document Status</label>
                                    <select id="documentStatus" className="form-control mb-3" value={documentStatus} onChange={(e) => setDocumentStatus(e.target.value)}>
                                        <option value="">Select</option>
                                        <option value="Ready to share">Ready to share</option>
                                        <option value="Not Ready">File is not ready</option>
                                    </select>
                                </div>
                                
                                <div className="col-md-6 form-group">
                                    <label htmlFor="remark">Remark:</label>
                                    <textarea
                                        className="form-control"
                                        id="remarks"
                                        placeholder="Enter remarks"
                                        value={remarks}
                                        onChange={(e) => setRemarks(e.target.value)}
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}

            <button type="submit" className="btn btn-primary mt-3" onClick={handleSubmitForm}>
                Submit
            </button>

<hr className='mt-4'></hr>
            <h3 className='mb-5'>Bank login disposition history</h3>
            <table className="table table-striped table-bordered table-hover">
        <thead className="thead-dark">
          <tr>
            <th>User ID</th>
            <th>Bank Login Status</th>
            <th>Loan Type</th>
            <th>Bank Name</th>
            <th>RM Name</th>
            <th>RM Contact Number</th>
            <th>RM Email</th>
            <th>Document Status</th>
            <th>Remarks</th>
            <th scope="col"className="text-center">View Deatils</th>
          </tr>
        </thead>
        <tbody>
          {bankLoginDetails.map((detail) => (
            <tr key={detail._id}>
              <td>{detail.userId}</td>
              <td>{detail.bank_login_status}</td>
              <td>{detail.loan_type}</td>
              <td>{detail.bank_name}</td>
              <td>{detail.rm1_name}</td>
              <td>{detail.rm1_contact_number}</td>
              <td>{detail.email_1}</td>
              <td>
  {detail.document_status === "Ready to share" ? (
    <Link className="btn btn-primary"  to={`/Banklogindetails`}>
      Share with RM
    </Link>
  ) : (
    detail.document_status
  )}
</td>

              <td>{detail.remarks}</td>
              <td className="text-center">
                  {/* <Link to={`/view-filedetails/${detail._id}`}> */}
                  <Link to={`/Banklogindetails`}>

                    <FontAwesomeIcon icon={faEye} />
                  </Link>
                </td>
            </tr>
          ))}
        </tbody>
      </table>

        </div>
    );
};

export default BankLogincomponent;