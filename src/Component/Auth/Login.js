// import React, { useState } from 'react';
// import logo from "./jbj-fintech-logo.webp";
// import { Link, useNavigate } from "react-router-dom";
// import { jwtDecode } from 'jwt-decode';
// function Login() {
//     const [selectedRole, setSelectedRole] = useState("");
//     const [userId, setUserId] = useState("");
//     const [password, setPassword] = useState("");
//     const navigate = useNavigate();

//     // Handle role change
//     const handleRoleChange = (e) => {
//         setSelectedRole(e.target.value);
//     };

//     // Handle input changes
//     const handleUserIdChange = (e) => {
//         setUserId(e.target.value);
//     };

//     const handlePasswordChange = (e) => {
//         setPassword(e.target.value);
//     };

//     // Handle login
//     const handleLogin = async () => {
//         try {
//             const response = await fetch('http://localhost:3007/api/v1/login', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ userId, password }),
//             });

//             const data = await response.json();

//             if (data.status === 200) {
//                 const token = data.token;

//                 // Decode the token to extract the role
//                 const decodedToken = jwtDecode(token);
//                 const userRole = decodedToken.role;

//                 // Store the token and role in localStorage
//                 localStorage.setItem('authToken', token);
//                 localStorage.setItem('userRole', userRole);

//                 // Navigate based on role
//                 if (userRole === "Sales") {
//                     navigate('/sales-dashboard');
//                 } else if (userRole === "TVR") {
//                     navigate('/tvr-dashboard');
//                 } else if (userRole === "bank-login") {
//                     navigate('/banklogin-dashboard');
//                 } else if (userRole === "CDR") {
//                     navigate('/CDRdashboard');
//                 } else if (userRole === "admin") {
//                     navigate('/dashboard');
//                 } else if (userRole === "Team-leader") {
//                     navigate('/dashboard');
//                 }
//             } else {
//                 alert(data.message);
//             }
//         } catch (error) {
//             console.error("Login error:", error);
//             alert("An error occurred during login. Please try again.");
//         }
//     };

//     return (
//         <>
//             <div className="d-flex justify-content-center align-items-center vh-100">
//                 <div className='container login' style={{ width: '50%' }}>
//                     <div className="d-flex justify-content-center mt-3">
//                         <img src={logo} alt='logo' style={{ width: '15%' }} className='img1' />
//                     </div>
//                     <h4 className='mt-3 text-center'>Welcome to JBJ Fintech CS Dashboard Admin</h4>
//                     <div className='row'>
//                         {/* Select Role Field */}
//                         <div className="mb-3">
//                             <label htmlFor="selectRole" className="form-label">Select Role</label>
//                             <select
//                                 className="form-control"
//                                 id="selectRole"
//                                 placeholder="select role"
//                                 value={selectedRole}
//                                 onChange={handleRoleChange}
//                             >
//                                 <option value="">Select Role</option>
//                                 <option value="Admin">Admin</option>
//                                 <option value="Team-leader">Team Leader</option>
//                                 <option value="Sales">Sales team</option>
//                                 <option value="TVR">TVR team</option>
//                                 <option value="CDR">CDR team</option>
//                                 <option value="bank-login">Bank login team</option>
//                             </select>
//                         </div>

//                         {/* User ID Field */}
//                         <div className="mb-3">
//                             <label htmlFor="floatingInput" className="form-label">Enter Your User ID</label>
//                             <input
//                                 type="text"
//                                 className="form-control"
//                                 id="floatingInput"
//                                 placeholder="Enter Your User ID"
//                                 value={userId}
//                                 onChange={handleUserIdChange}
//                             />
//                         </div>
//                         {/* Password Field */}
//                         <div className="mb-3">
//                             <label htmlFor="floatingPassword" className="form-label">Enter Your Password</label>
//                             <input
//                                 type="password"
//                                 className="form-control"
//                                 id="floatingPassword"
//                                 placeholder="********"
//                                 value={password}
//                                 onChange={handlePasswordChange}
//                             />
//                         </div>
//                         {/* Login Button */}
//                         <div className='text-center mb-3'>
//                             <button type="button" className="btn btn-primary loginButton" style={{ width: '25%' }} onClick={handleLogin}>
//                                 Login
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     );
// }

// export default Login;
import React, { useState } from 'react';
import logo from "./jbj-fintech-logo.webp";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

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
        console.log("Login button clicked");
        try {
            console.log("Making API call to login...");
            const response = await fetch('https://jbjcsdashboard-backend.onrender.com/api/v1/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, password, role: selectedRole }),
            });
    
            const data = await response.json();
            console.log(data); // Log the response data
    
            if (data.status === 200) {
                const token = data.token;
    
                // Decode the token to extract the role (assuming the role is stored in the token payload)
                // const decodedToken = JSON.parse(atob(token.split('.')[1]));
                // const userRole = decodedToken.role;
                const decodedToken = jwtDecode(token);
               const userRole = decodedToken.role;
               console.log(userRole,"userRole")
                // Store the token and role in localStorage
                localStorage.setItem('authToken', token);
                localStorage.setItem('userRole', userRole);
    
                // Navigate based on role
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
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Login error:", error);
            alert("An error occurred during login. Please try again.");
        }
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
                                <option value="admin">Admin</option>
                                <option value="Team-leader">Team Leader</option>
                                <option value="Sales">Sales team</option>
                                <option value="TVR">TVR team</option>
                                <option value="CDR">CDR team</option>
                                <option value="bank_login">Bank login team</option>
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
