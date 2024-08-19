import React from 'react'

const UploadCsv = () => {
  return (
    <>
    <h3 className='text-center'>Upload File CSV</h3>   
    <br/>
    <div className='container 'style={{ width: '40%',background:"#2c3e50" }}>
        
    <div class="mb-3">
  <label for="formFile" class="form-label text-light">Select File to upload</label>
  <input class="form-control" type="file" id="formFile"/>
</div>

<div class="d-flext text-center" >
<button type="button" class="btn btn-primary mb-3 mx-2">Upload CSV</button>
<button type="button" class="btn btn-outline-light mb-3">Cancel</button>
</div>

</div>
    </>  
  )
}

export default UploadCsv