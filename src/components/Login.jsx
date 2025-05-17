import React, { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { authContext } from "../context/authcontext";

const Login = () => {
  const { setIsAuthenticated } = useContext(authContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(""); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault(); 
    setError(""); 

    try {
      
      const response = await axios.post("http://localhost:3000/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200 && response.data.status === "success") {
        localStorage.setItem("authToken", response.data.token);
        setIsAuthenticated(true)
        navigate("/dashboard"); 
      } else {
        setError(response.data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err.message);
      setError(err.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-white">
      <div className="card p-4 shadow-lg" style={{ width: "24rem" }}>
        <h2 className="text-center text-primary mb-4">Login</h2>
        {error && <div className="alert alert-danger text-center">{error}</div>} {/* Error message */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
        <div className="text-center mt-3">
          <p>
            New user?{" "}
            <Link to="/signup" className="text-primary">
              Click here to sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
