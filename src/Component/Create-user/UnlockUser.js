import React from 'react'

const UnlockUser = () => {
  return (
    <>
    <h3 className='text-center'>Reset User Password</h3>   
    <br/>
    <div className='container 'style={{ width: '40%',background:"#2c3e50" }}>
        
<div class="mb-3">
  <label for="exampleFormControlInput1" class="form-label text-light">Enter User ID</label>
  <input type="email" class="form-control" id="exampleFormControlInput1" />
</div>

<div class="d-flext text-center" >
<button type="button" class="btn btn-primary mb-3 mx-2">Reset Password</button>
<button type="button" class="btn btn-outline-light mb-3">Cancel</button>
</div>

</div>


    </>
    
  )
}

export default UnlockUser