import React, { useState } from 'react';


const OverviewDetails = () => {

  const [selectedLoanType, setSelectedLoanType] = useState('');


  return (
    <>
    <div className="tab-pane active">
                        <form className='mb-5'>
                            <div className="mb-3 row">
                                <div className="col-md-6">
                                    <label htmlFor="mobileNumber" className="form-label fw-bold">Mobile Number</label>
                                    <input type="text" className="form-control" id="mobileNumber" placeholder="Enter mobile number" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="name" className="form-label fw-bold">Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Enter name" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="name" className="form-label fw-bold">Previous Loan Bank Name</label>
                                    <input type="text" className="form-control" id="name" placeholder="Enter name" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="previous_loan_type" className="form-label fw-bold">Previous Loan Type</label>
                                    <input type="text" className="form-control" id="previous_loan_type" placeholder="Enter name" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="previous_loan_type" className="form-label fw-bold">Previous Product Model</label>
                                    <input type="text" className="form-control" id="previous_loan_type" placeholder="Enter name" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="previous_loan_type" className="form-label fw-bold">Previous Loan Amount</label>
                                    <input type="text" className="form-control" id="previous_loan_type" placeholder="Enter name" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="previous_loan_type" className="form-label fw-bold">Previous Loan sanction date</label>
                                    <input type="text" className="form-control" id="previous_loan_type" placeholder="Enter name" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="previous_loan_type" className="form-label fw-bold">Previous Loan Insurance Value</label>
                                    <input type="text" className="form-control" id="previous_loan_type" placeholder="Enter name" />
                                </div>
                            </div>

                        </form>
                        <div>
                            <div>
                                <h3> File Disposition History</h3>
                                <table class="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Date</th>
                                            <th scope="col">User Name</th>
                                            <th scope="col">Loan Type</th>
                                            <th scope="col">Category</th>
                                            <th scope="col">Disposition</th>
                                            <th scope="col">Remark</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Jacob</td>
                                            <td>Thornton</td>
                                            <td>@fat</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td colspan="2">Larry the Bird</td>
                                            <td>@twitter</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
    </>
  )
}

export default OverviewDetails