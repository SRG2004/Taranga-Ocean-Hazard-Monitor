import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const LoginPage = ({ handleLogin }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin();
    navigate('/'); // Redirect to home after login
  };

  return (
    <div className="login-page">
      <motion.div 
        className="login-container"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Login to Tarang</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <button type="submit" className="btn login-btn">Login</button>
        </form>
        <div className="login-links">
          <Link to="/forgot-password">Forgot Password?</Link>
          <Link to="/signup">Sign Up</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;