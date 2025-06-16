import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteTokenProps {
    children: React.ReactNode;

}

const ProtectedRouteToken: React.FC<ProtectedRouteTokenProps> = ({ children }) => {
    // Get the user's role from localStorage (or sessionStorage)
    const token = localStorage.getItem('token')
    if (!token) {
        return <Navigate to="/" />;
    }
    return <>{children}</>;
};

export default ProtectedRouteToken;
