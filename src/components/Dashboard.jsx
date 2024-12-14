import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the token from localStorage
    localStorage.removeItem("authToken");
    // Redirect to login page
    navigate("/login");
  };

  return (
    <div className="vh-100 bg-dark text-white">
      <div className="d-flex justify-content-between align-items-center p-3">
        <h1 className="text-primary">Dashboard</h1>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="container mt-5">
        <h2 className="text-center text-primary mb-4">Welcome to the Dashboard</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          bibendum, libero nec suscipit tempus, ex justo pretium risus, non
          fermentum eros neque ut velit. Quisque vel justo lacus. Integer
          fringilla arcu nec sagittis mattis. Suspendisse potenti.
        </p>
        <p>
          Mauris in massa vel ligula lacinia consequat. Nulla facilisi. Nullam
          sed quam a elit viverra vestibulum. Donec efficitur tellus id diam
          elementum, id dictum eros luctus. Suspendisse euismod risus non nisl
          placerat aliquet.
        </p>
        <p>
          Integer vitae volutpat purus. Morbi sit amet tortor venenatis,
          fringilla orci in, suscipit quam. Integer vitae scelerisque justo, id
          convallis odio. Ut ut metus ex. Donec tempus elit vel nulla gravida
          convallis.
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
