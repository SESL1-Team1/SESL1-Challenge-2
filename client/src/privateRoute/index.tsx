import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }: any ) => {
  const isAuthenticated = localStorage.getItem('user_token') !== null;

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
