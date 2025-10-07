import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const SignupPage = () => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [country, setCountry] = useState('');
  const [role, setRole] = useState('citizen');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const { error } = await signUp(email, password, {
        firstName,
        lastName,
        phone,
        country,
        roles: [role],
      });

      if (error) {
        throw new Error(error.message);
      }

      // User is now signed in and profile created, navigate to dashboard
      navigate('/');

    } catch (err) {
      setError(err.message || 'Failed to sign up. Please try again later.');
    }
  };

  return (
    <div className="page-content page-content-home">
      <motion.div
        className="hero-section"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Join Tarang</h1>
        <p>Create your account to access comprehensive ocean hazard monitoring and early warning systems</p>
      </motion.div>

      <motion.div
        className="auth-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h2>Create an Account</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>First Name</label>
            <input type="text" placeholder="John" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input type="text" placeholder="Doe" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="+1234567890" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Country</label>
            <input type="text" placeholder="Your Country" value={country} onChange={(e) => setCountry(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="citizen">Citizen</option>
              <option value="researcher">Researcher/Analyst</option>
              <option value="government">Government Official</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <button type="submit" className="btn auth-btn">Sign Up</button>
        </form>
        <div className="auth-links">
          <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
