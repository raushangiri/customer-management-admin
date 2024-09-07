import React, { useState } from 'react';
import logo from "./jbj-fintech-logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const baseurl = process.env.REACT_APP_API_BASE_URL;

function Login() {
    const [selectedRole, setSelectedRole] = useState("");
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // Handle role change
    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    // Handle input changes
    const handleUserIdChange = (e) => {
        setUserId(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Handle login
    const handleLogin = async () => {
        // Validation check
        if (!selectedRole || !userId || !password) {
            toast.error("All fields are required!", { position: "top-center" });
            return;
        }

        try {
            const response = await fetch(`${baseurl}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, password, role: selectedRole }),
            });

            const data = await response.json();

            if (data.status === 200) {
                const token = data.token;
                const decodedToken = jwtDecode(token);
                const userRole = decodedToken.role;
                const userId = decodedToken.userId;

                // Store the token and role in localStorage
                localStorage.setItem('authToken', token);
                localStorage.setItem('userRole', userRole);
                localStorage.setItem('userId', userId);

                // Show success toast
                toast.success("Login successful!", { position: "top-center" });

                // Navigate based on role
                setTimeout(() => {
                    if (userRole === "sales_team") {
                        navigate('/sales-dashboard');
                    } else if (userRole === "tvr_team") {
                        navigate('/tvr-dashboard');
                    } else if (userRole === "bank_login") {
                        navigate('/banklogin-dashboard');
                    } else if (userRole === "cdr_team") {
                        navigate('/CDRdashboard');
                    } else if (userRole === "admin") {
                        navigate('/dashboard');
                    } else if (userRole === "team_leader") {
                        navigate('/dashboard');
                    }
                }, 2000); // Delay navigation to show the toast message
            } else {
                toast.error(data.message, { position: "top-center" });
            }
        } catch (error) {
            console.error("Login error:", error);
            toast.error("An error occurred during login. Please try again.", { position: "top-center" });
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
                                <option value="admin">Admin</option>
                                <option value="team_leader">Team Leader</option>
                                <option value="sales_team">Sales Team</option>
                                <option value="tvr_team">TVR Team</option>
                                <option value="cdr_team">CDR Team</option>
                                <option value="bank_login">Bank Login Team</option>
                            </select>
                        </div>

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
                        {/* Password Field */}
                        <div className="mb-3">
                            <label htmlFor="floatingPassword" className="form-label">Enter Your Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="floatingPassword"
                                placeholder="********"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <Link to="/change-password"> <p>Change Password</p></Link>
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
