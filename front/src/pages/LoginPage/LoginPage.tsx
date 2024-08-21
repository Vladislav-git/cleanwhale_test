import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../api/api';
import { isEmailValid, isPasswordValid } from '../../validators';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isPasswordValid(password) && isEmailValid(email)) {
        const response = await api.login(email, password);
        localStorage.setItem('access', response.access_token);
        localStorage.setItem('refresh', response.refresh_token);
        navigate('/welcome');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Failed to sign in. Please try again.');
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
        <div className="auth-switch">
          <p>Don't have an account?</p>
          <Link to="/signup" className="switch-link">Sign Up</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;