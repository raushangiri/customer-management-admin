import React, { useState } from 'react';
import axios from 'axios';  // Make sure to import axios for API calls

const UnlockUser = () => {
  // State to hold the entered user ID and loading state
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);
  const baseurl = process.env.REACT_APP_API_BASE_URL;

  // Function to handle the password reset
  const handleResetPassword = async () => {
    // Basic validation to check if userId is provided
    if (!userId) {
      alert('Please enter a User ID.');
      return;
    }

    setLoading(true);  // Start loading spinner

    try {
      // Call the reset password API
      const response = await axios.put(`${baseurl}/resetPassword/${userId}`);

      if (response.status === 200) {
        // If successful, show success message
        alert('Password has been reset successfully.');
      }
    } catch (error) {
      // Handle errors and show error messages
      console.error('Error resetting password:', error);
      alert('Failed to reset password. Please try again.');
    } finally {
      setLoading(false);  // Stop loading spinner
    }
  };

  return (
    <>
      <h3 className="text-center">Reset User Password</h3>
      <br />
      <div className="container" style={{ width: '40%', background: '#2c3e50' }}>
        <div className="mb-3">
          <label htmlFor="userIdInput" className="form-label text-light">Enter User ID</label>
          <input 
            type="text" 
            className="form-control" 
            id="userIdInput"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}  // Update the userId state
          />
        </div>

        <div className="d-flex justify-content-center">
          <button 
            type="button" 
            className="btn btn-primary mb-3 mx-2"
            onClick={handleResetPassword}
            disabled={loading}  // Disable the button while loading
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
          <button 
            type="button" 
            className="btn btn-outline-light mb-3"
            onClick={() => setUserId('')}  // Reset the input field on cancel
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default UnlockUser;
