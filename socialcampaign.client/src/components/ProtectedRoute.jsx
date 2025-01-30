import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../components/context/AuthContext';  // Import the AuthContext

// PrivateRoute component that checks authentication
const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);  // Get isLoggedIn from context

    // If not logged in, redirect to login page
    if (!isLoggedIn) {
        return <Navigate to="/" />;
    }

    // Otherwise, render the children (protected route)
    return children;
};

export default ProtectedRoute;
