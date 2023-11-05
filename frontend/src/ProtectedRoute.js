// ProtectedRoute.js

import React from 'react';
import { Route, useNavigate } from 'react-router-dom';

const checkUserRole = (role) => {
    const user = JSON.parse(localStorage.getItem('user'));
    return user && user.role === role;
};

const ProtectedRoute = ({ role, ...props }) => {
    const navigate = useNavigate();

    if (!checkUserRole(role)) {
        navigate('/unauthorized');
        return null;
    }

    return <Route {...props} />;
};

export default ProtectedRoute;