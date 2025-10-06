import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>; // Or a spinner component
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    const userRoles = user?.roles || ['public'];

    if (roles && !roles.some(role => userRoles.includes(role))) {
        return <Navigate to="/unauthorized" />; // Or a custom unauthorized page
    }

    return children;
};

export default ProtectedRoute;
