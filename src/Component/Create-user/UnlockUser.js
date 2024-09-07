import React from 'react'

const UnlockUser = () => {
  return (
    <>
    <h3 className='text-center'>Reset User Password</h3>   
    <br/>
    <div className='container 'style={{ width: '40%',background:"#2c3e50" }}>
        
<div className="mb-3">
  <label for="exampleFormControlInput1" className="form-label text-light">Enter User ID</label>
  <input type="email" className="form-control" id="exampleFormControlInput1" />
</div>

<div className="d-flext text-center" >
<button type="button" className="btn btn-primary mb-3 mx-2">Reset Password</button>
<button type="button" className="btn btn-outline-light mb-3">Cancel</button>
</div>

</div>


    </>
    
  )
}

export default UnlockUser