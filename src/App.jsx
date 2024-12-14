import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  return (
    <div className="bg-dark text-white vh-100">
      <nav className="d-flex justify-content-end p-3">
        <Link to="/login" className="btn btn-outline-primary me-2">
          Login
        </Link>
        <Link to="/signup" className="btn btn-primary">
          Signup
        </Link>
      </nav>
      <div className="container text-center mt-5">
        <h1 className="display-4">Welcome to Finance Tracker</h1>
        <p className="lead mt-3">
          Easily track your income, expenses, and budgets all in one place.
        </p>
        <p>
          Organize your finances with ease, get detailed insights, and stay on
          top of your goals.
        </p>
      </div>
    </div>
  );
};

export default App;
