
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../App.css';

const SignUpPage = () => {
  return (
    <div className="login-page">
      <motion.div 
        className="login-container"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Create an Account</h2>
        <form>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="John Doe" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" placeholder="••••••••" />
          </div>
          <button type="submit" className="btn login-btn">Sign Up</button>
        </form>
        <div className="login-links">
          <span>Already have an account? <Link to="/login">Login</Link></span>
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpPage;
