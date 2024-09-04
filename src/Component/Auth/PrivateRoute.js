import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const authToken = localStorage.getItem('authToken'); // or however you're storing the token

  return authToken ? children : <Navigate to="/" />;
};

export default PrivateRoute;

