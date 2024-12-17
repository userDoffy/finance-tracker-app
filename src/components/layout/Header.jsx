import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authContext } from "../../context/authcontext";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(authContext);
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        {/* Logo */}
        <Link to="/" className="navbar-brand">
          Finance Tracker Website
        </Link>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className="btn btn-outline-primary me-2">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="btn btn-primary">
                    Signup
                  </Link>
                </li>
              </>
            ) : (
              <>
                {/* Links for Authenticated Users */}
                <li className="nav-item">
                  <Link to="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/transactions" className="nav-link">
                    Transactions
                  </Link>
                </li>
                <li className="nav-item mx-2">
                  <button onClick={handleLogout} className="btn btn-danger">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
