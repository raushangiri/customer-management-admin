import React, { useState } from 'react';
import logo from "./jbj-fintech-logo.webp";
import { Link,useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const baseurl = process.env.REACT_APP_API_BASE_URL;

function ChangePassword() {
    const [userId, setUserId] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    // Handle input changes
    const handleUserIdChange = (e) => {
        setUserId(e.target.value);
    };

    const handleCurrentPasswordChange = (e) => {
        setCurrentPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    // Handle password change
    const handleChangePassword = async () => {
        // Validation check
        if (!userId || !currentPassword || !newPassword) {
            toast.error("All fields are required!", { position: "top-center" });
            return;
        }

        try {
            const response = await fetch(`${baseurl}/changePassword`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, password:currentPassword, newPassword }),
            });

            const data = await response.json();

            if (data.status === 200) {
                toast.success("Password changed successfully!", { position: "top-center" });

                // Navigate to login page
                setTimeout(() => {
                    navigate('/');
                }, 2000); // Delay navigation to show the toast message
            } else {
                toast.error(data.message, { position: "top-center" });
            }
        } catch (error) {
            console.error("Change password error:", error);
            toast.error("An error occurred while changing the password. Please try again.", { position: "top-center" });
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className='container login' style={{ width: '50%' }}>
                    <div className="d-flex justify-content-center mt-3">
                        <img src={logo} alt='logo' style={{ width: '15%' }} className='img1' />
                    </div>
                    <h4 className='mt-3 text-center'>Reset Your Password</h4>
                    <div className='row'>
                        {/* User ID Field */}
                        <div className="mb-3">
                            <label htmlFor="floatingInput" className="form-label">Enter Your User ID</label>
                            <input
                                type="text"
                                className="form-control"
                                id="floatingInput"
                                placeholder="Enter Your User ID"
                                value={userId}
                                onChange={handleUserIdChange}
                            />
                        </div>

                        {/* Current Password Field */}
                        <div className="mb-3">
                            <label htmlFor="currentPassword" className="form-label">Enter Your Current Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="currentPassword"
                                placeholder="Enter Your Current Password"
                                value={currentPassword}
                                onChange={handleCurrentPasswordChange}
                            />
                        </div>

                        {/* New Password Field */}
                        <div className="mb-3">
                            <label htmlFor="newPassword" className="form-label">Enter Your New Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="newPassword"
                                placeholder="Enter Your New Password"
                                value={newPassword}
                                onChange={handleNewPasswordChange}
                            />
                        </div>

                        {/* Change Password Button */}
                        <div className='text-center mb-3'>
                        <Link to="/" type="button" className="btn btn-primary loginButton mx-2" style={{ width: '25%' }} >
                                Login
                            </Link>
                            <button type="button" className="btn btn-primary loginButton" style={{ width: '25%' }} onClick={handleChangePassword}>
                                Change Password
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChangePassword;
