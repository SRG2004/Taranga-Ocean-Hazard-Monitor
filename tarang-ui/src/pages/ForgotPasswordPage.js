
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../App.css';

const ForgotPasswordPage = () => {
  return (
    <div className="login-page">
      <motion.div 
        className="login-container"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Forgot Password</h2>
        <p>Enter your email and we'll send you a reset link.</p>
        <form>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>
          <button type="submit" className="btn login-btn">Send Reset Link</button>
        </form>
        <div className="login-links">
          <Link to="/login">Back to Login</Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPasswordPage;
