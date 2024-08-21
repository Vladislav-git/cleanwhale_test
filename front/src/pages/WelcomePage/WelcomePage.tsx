import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import {jwtDecode} from 'jwt-decode';
import { DecodedToken } from '../../types/types';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access');

  const [email, setEmail] = useState<string>('');

  const handleLogout = async() => {
    try {
      await api.logout()
    } catch (e) {
      console.log(e)
    }
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/login');
  };

  useEffect(() => {
    if (token) {
      const data: DecodedToken = jwtDecode(token)
      setEmail(data.email)
    }
  }, [token])

  return (
    <div className="welcome-page">
      {email !== '' ? (
        <>
          <h1>Hello, {email}</h1>
          <button style={{marginTop: 20}} onClick={handleLogout}>Logout</button>
        </>
      ) : null}
      
    </div>
  );
};

export default Welcome;