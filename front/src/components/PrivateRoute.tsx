import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import api from '../api/api';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    const token = localStorage.getItem('access');

    if (!token) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    try {
      const decodedToken: { exp: number } = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decodedToken.exp < currentTime) {
        const refreshResponse = await api.refreshToken();
        localStorage.setItem('access', refreshResponse.access_token);
        localStorage.setItem('refresh', refreshResponse.refresh_token);

        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  if (loading) return <div>Loading...</div>;

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
