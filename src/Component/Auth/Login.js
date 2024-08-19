import React, { useState } from 'react';
import logo from "./jbj-fintech-logo.webp";
import { Link, useNavigate } from "react-router-dom";

function Login() {
    const [selectedRole, setSelectedRole] = useState("");
    const navigate = useNavigate();

    // Handle role change
    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    // Handle login
    const handleLogin = () => {
        // Store the selected role in localStorage
        localStorage.setItem('userRole', selectedRole);

        if(selectedRole==="Sales")
            {
                navigate('/sales-dashboard');
            }
           else if(selectedRole==="TVR")
                {
                    navigate('/tvr-dashboard');
                }
                else if(selectedRole==="bank-login")
                    {
                        navigate('/banklogin-dashboard');
                    }
                    else if(selectedRole==="CDR")
                        {
                            navigate('/CDRdashboard');
                        }
                        else if(selectedRole==="Admin")
                            {
                                navigate('/dashboard');
                            }
                        
        // // Navigate to the dashboard
        // navigate('/dashboard');
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className='container login' style={{ width: '50%' }}>
                    <div className="d-flex justify-content-center mt-3">
                        <img src={logo} alt='logo' style={{ width: '15%' }} className='img1' />
                    </div>
                    <h4 className='mt-3 text-center'>Welcome to JBJ Fintech CS Dashboard Admin</h4>
                    <div className='row'>
                        {/* Select Role Field */}
                        <div className="mb-3">
                            <label htmlFor="selectRole" className="form-label">Select Role</label>
                            <select
                                className="form-control"
                                id="selectRole"
                                placeholder="select role"
                                value={selectedRole}
                                onChange={handleRoleChange}
                            >
                                <option value="">Select Role</option>
                                <option value="Admin">Admin</option>
                                <option value="Sales">Sales team</option>
                                <option value="TVR">TVR team</option>
                                <option value="CDR">CDR team</option>
                                <option value="bank-login">Bank login team</option>
                                {/* <option value="Bank">Bank login team</option> */}
                            </select>
                        </div>
                        
                        
                        {/* User ID Field */}
                        <div className="mb-3">
                            <label htmlFor="floatingInput" className="form-label">Enter Your User ID</label>
                            <input type="email" className="form-control" id="floatingInput" placeholder="Enter Your User ID" />
                        </div>
                        {/* Password Field */}
                        <div className="mb-3">
                            <label htmlFor="floatingPassword" className="form-label">Enter Your Password</label>
                            <input type="password" className="form-control" id="floatingPassword" placeholder="********" />
                        </div>
                        {/* Login Button */}
                        <div className='text-center mb-3'>
                            <button type="button" className="btn btn-primary loginButton" style={{ width: '25%' }} onClick={handleLogin}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
