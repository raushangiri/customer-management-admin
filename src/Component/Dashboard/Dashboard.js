import React from 'react'
import Navbar from "../Navbar/Navbar"
const Dashboard = () => {
  return (
    <>
    {/* <Navbar/> */}
    <p>Welcome back Admin</p>
    <div class="row">
  <div class="col-sm-4 mb-3 mb-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">MTD- Total Intrested</h5>
        <p className='fs-4'>10</p>
      </div>
    </div>
  </div>
  <div class="col-sm-4 mb-3 mb-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">MTD- Total Not-Intrested</h5>
        <p className='fs-4'>10</p>

      </div>
    </div>
  </div>
  <div class="col-sm-4 mb-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">MTD-Total Pending TVR</h5>
        <p className='fs-4'>10</p>

      </div>
    </div>
  </div>
  <div class="col-sm-4 mb-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">MTD-Total Completed TVR</h5>
        <p className='fs-4'>10</p>

      </div>
    </div>
  </div>
  <div class="col-sm-4 mb-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">MTD-Total Rejected TVR</h5>
        <p className='fs-4'>10</p>

      </div>
    </div>
  </div>
  <div class="col-sm-4 mb-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">MTD-Total Pending CDR</h5>
        <p className='fs-4'>10</p>

      </div>
    </div>
  </div>
  <div class="col-sm-4 mb-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">MTD-Total Completed CDR</h5>
        <p className='fs-4'>10</p>

      </div>
    </div>
  </div>
  <div class="col-sm-4 mb-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">MTD-Total Rejected CDR</h5>
        <p className='fs-4'>10</p>

      </div>
    </div>
  </div>
  <div class="col-sm-4 mb-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">MTD-Total Bank logged-in</h5>
        <p className='fs-4'>10</p>

      </div>
    </div>
  </div>
  <div class="col-sm-4 mb-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">MTD-Total Approved Bank logged-in</h5>
        <p className='fs-4'>10</p>

      </div>
    </div>
  </div>
  <div class="col-sm-4 mb-3">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">MTD-Total Rejected Bank logged-in</h5>
        <p className='fs-4'>10</p>

      </div>
    </div>
  </div>
</div>
    
    </>
  )
}

export default Dashboard