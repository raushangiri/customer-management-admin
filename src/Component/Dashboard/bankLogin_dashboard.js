
import React from 'react'
import Navbar from "../Navbar/Navbar"
const Banklogindashboard = () => {
  return (
    <>
    {/* <Navbar/> */}
    <p>Welcome back Admin</p>
    <div className="row">
  
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

export default Banklogindashboard