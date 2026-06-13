import React from 'react';
import { Navigate } from 'react-router-dom';
import { useRole } from '../context/RoleContext';

// Props: allowedRole ('admin' | 'hod')
const RoleProtectedRoute = ({ allowedRole, children }) => {
  const { role } = useRole();
  if (!role) {
    // No role selected yet – go back to selection screen
    return <Navigate to="/select-role" replace />;
  }
  return role === allowedRole ? children : <Navigate to={allowedRole === 'admin' ? '/admin/dashboard' : '/dashboard'} replace />;
};

export default RoleProtectedRoute;
