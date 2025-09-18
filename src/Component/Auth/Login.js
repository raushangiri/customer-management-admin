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
    // const handleLogin = async () => {
    //     // Validation check
    //     if (!selectedRole || !userId || !password) {
    //         toast.error("All fields are required!", { position: "top-center" });
    //         return;
    //     }

    //     try {
    //         const response = await fetch(`${baseurl}/login`, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ userId, password, role: selectedRole }),
    //         });

    //         const data = await response.json();

    //         if (data.status === 200) {
    //             const token = data.token;
    //             const decodedToken = jwtDecode(token);
    //             const userRole = decodedToken.role;
    //             const userId = decodedToken.userId;

    //             // Store the token and role in localStorage
    //             localStorage.setItem('authToken', token);
    //             localStorage.setItem('userRole', userRole);
    //             localStorage.setItem('userId', userId);

    //             // Show success toast
    //             toast.success("Login successful!", { position: "top-center" });

    //             // Navigate based on role
    //             setTimeout(() => {
    //                 if (userRole === "sales") {
    //                     navigate('/sales-dashboard');
    //                 } else if (userRole === "TVR") {
    //                     navigate('/tvr-dashboard');
    //                 } else if (userRole === "Bank login") {
    //                     navigate('/banklogin-dashboard');
    //                 } else if (userRole === "CDR") {
    //                     navigate('/CDRdashboard');
    //                 } else if (userRole === "admin") {
    //                     navigate('/dashboard');
    //                 } else if (userRole === "Team leader") {
    //                     navigate('/dashboard');
    //                 }
    //             }, 2000); // Delay navigation to show the toast message
    //         } else {
    //             toast.error(data.message, { position: "top-center" });
    //         }
    //     } catch (error) {
    //         console.error("Login error:", error);
    //         toast.error("An error occurred during login. Please try again.", { position: "top-center" });
    //     }
    // };

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
      // Case 1: Password expired
      if (data.message === "Password expired, please change your password") {
        toast.warning("Your password has expired. Please reset your password.", { position: "top-center" });
        
        // Redirect to change password page
        setTimeout(() => {
          navigate('/change-password');
        }, 3000);

        return;
      }

      // Case 2: First login, force password change
      if (data.message === "Password change required") {
        toast.info("You need to change your password before login.", { position: "top-center" });

        setTimeout(() => {
          navigate('/change-password');
        }, 3000);

        return;
      }

      // Case 3: Normal successful login
      const token = data.token;
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role;
      const userId = decodedToken.userId;

      // Store the token and role in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', userRole);
      localStorage.setItem('userId', userId);

      toast.success("Login successful!", { position: "top-center" });

      // Navigate based on role
      setTimeout(() => {
        if (userRole === "sales") {
          navigate('/sales-dashboard');
        } else if (userRole === "TVR") {
          navigate('/tvr-dashboard');
        } else if (userRole === "Bank login") {
          navigate('/banklogin-dashboard');
        } else if (userRole === "CDR") {
          navigate('/CDRdashboard');
        } else if (userRole === "admin" || userRole === "Team leader") {
          navigate('/dashboard');
        }
      }, 2000);
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
            <div className="d-flex vh-100">
  {/* Left Side - Logo Section */}
  <div
    className="d-flex justify-content-center align-items-center"
    style={{
      flex: 1,
      background: "linear-gradient(to bottom, #1e3c72, #2a5298)", // adjust colors
      color: "white",
    }}
  >
    <div className="text-center">
      <img src={logo} alt="logo" style={{ width: "250px" }} className="mb-3" />
      <h4 className="fw-bold">JBJ Fintech</h4>
      <p className="mb-0">A Professional Way For Funding</p>
    </div>
  </div>

  {/* Right Side - Login Form */}
  <div
    className="d-flex justify-content-center align-items-center"
    style={{ flex: 1, backgroundColor: "#f8f9fa" }}
  >
    <div
      className="p-4 shadow rounded bg-white"
      style={{ width: "350px", borderRadius: "12px" }}
    >
      <h5 className="text-center mb-4 fw-bold">
        Welcome to JBJ Fintech CS Dashboard
      </h5>

      {/* Select Role Field */}
      <div className="mb-3">
        <label htmlFor="selectRole" className="form-label">
          User Role
        </label>
        <select
          className="form-control"
          id="selectRole"
          value={selectedRole}
          onChange={handleRoleChange}
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="Team leader">Team Leader</option>
          <option value="sales">Sales Team</option>
          <option value="TVR">TVR Team</option>
          <option value="CDR">CDR Team</option>
          <option value="Bank login">Bank login</option>
        </select>
      </div>

      {/* User ID Field */}
      <div className="mb-3">
        <label htmlFor="floatingInput" className="form-label">
          User ID
        </label>
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
        <label htmlFor="floatingPassword" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="floatingPassword"
          placeholder="********"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>

      <Link to="/change-password">
        <p className="text-end small">Change Password</p>
      </Link>

      {/* Login Button */}
      <div className="text-center">
        <button
          type="button"
          className="btn btn-primary"
          style={{
            width: "100%",
            background: "linear-gradient(to right, #1e3c72, #2a5298)",
            border: "none",
          }}
          onClick={handleLogin}
        >
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
