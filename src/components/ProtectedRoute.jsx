import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { authContext } from "../context/authcontext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(authContext);

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
