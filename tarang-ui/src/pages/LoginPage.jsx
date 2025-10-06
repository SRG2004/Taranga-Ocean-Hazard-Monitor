import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [notification, setNotification] = useState('');

  useEffect(() => {
    if (location.state?.fromSignup) {
      setNotification('Sign-up successful! Please check your email to confirm your account and then log in.');
    }
  }, [location.state]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { user, error } = await signIn(email, password);

      if (error) {
        throw new Error(error);
      }

      if (user) {
        const userRoles = user.roles || ['public'];
        const primaryRole = userRoles[0];

        switch (primaryRole) {
          case 'admin':
            navigate('/admin');
            break;
          case 'researcher':
            navigate('/researcher');
            break;
          case 'government':
            navigate('/government');
            break;
          case 'maritime':
            navigate('/maritime');
            break;
          default:
            navigate('/');
        }
      } else {
          setError('Login failed. Please try again.')
      }

    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
    }
  };

  return (
    <div className="auth-page">
      <motion.div 
        className="auth-card"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Login to Tarang</h2>
        {notification && <p className="success-message">{notification}</p>}
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="you@example.com" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn auth-btn">Login</button>
        </form>
        <div className="auth-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
