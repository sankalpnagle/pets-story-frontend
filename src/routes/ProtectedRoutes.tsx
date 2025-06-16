import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  roles: string[];
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ roles, children }) => {
  // Get the user's role from localStorage (or sessionStorage)
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");
  // If no userRole or role doesn't match, redirect to unauthorized

  if (!token) {
    return <Navigate to="/" />;
  }

  if (!roles.includes(userRole!)) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
