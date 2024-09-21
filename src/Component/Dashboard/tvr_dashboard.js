
import React from 'react'
import Navbar from "../Navbar/Navbar"
const tvr_dashboard = () => {
  return (
    <>
      <p>Welcome back TVR Team</p>
      <div className="row">
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">MTD-Total Pending TVR</h5>
              <p className='fs-4'>10</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">MTD-Total Completed TVR</h5>
              <p className='fs-4'>10</p>
            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">MTD-Total Rejected TVR</h5>
              <p className='fs-4'>10</p>

            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">MTD-Total Pending CDR</h5>
              <p className='fs-4'>10</p>

            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">MTD-Total Completed CDR</h5>
              <p className='fs-4'>10</p>

            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">MTD-Total Rejected CDR</h5>
              <p className='fs-4'>10</p>

            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">MTD-Total Bank logged-in</h5>
              <p className='fs-4'>10</p>

            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">MTD-Total Approved Bank logged-in</h5>
              <p className='fs-4'>10</p>

            </div>
          </div>
        </div>
        <div className="col-sm-4 mb-3">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">MTD-Total Rejected Bank logged-in</h5>
              <p className='fs-4'>10</p>

            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default tvr_dashboard