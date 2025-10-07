import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const Settings = () => {
  const [profile, setProfile] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    country: 'India',
    notifications: true,
    theme: localStorage.getItem('theme') || 'light'
  });

  useEffect(() => {
    const theme = localStorage.getItem('theme') || 'light';
    setProfile(prev => ({ ...prev, theme }));
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setProfile({
      ...profile,
      [name]: newValue
    });
    if (name === 'theme') {
      localStorage.setItem('theme', newValue);
      document.body.classList.toggle('dark', newValue === 'dark');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Profile updated successfully!');
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your account settings and preferences</p>
      </div>
      <div className="dashboard-grid">
        <motion.div
          className="dashboard-card"
          style={{gridColumn: 'span 2'}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Profile Information</h2>
          <form onSubmit={handleSubmit}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px'}}>
              <div>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>First Name</label>
                <motion.input
                  type="text"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleInputChange}
                  style={{width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px'}}
                  whileFocus={{ scale: 1.02, borderColor: 'var(--primary-color)' }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>Last Name</label>
                <motion.input
                  type="text"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleInputChange}
                  style={{width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px'}}
                  whileFocus={{ scale: 1.02, borderColor: 'var(--primary-color)' }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>Email</label>
                <motion.input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  style={{width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px'}}
                  whileFocus={{ scale: 1.02, borderColor: 'var(--primary-color)' }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>Phone</label>
                <motion.input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  style={{width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px'}}
                  whileFocus={{ scale: 1.02, borderColor: 'var(--primary-color)' }}
                  transition={{ duration: 0.2 }}
                />
              </div>
              <div style={{gridColumn: 'span 2'}}>
                <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>Country</label>
                <motion.select
                  name="country"
                  value={profile.country}
                  onChange={handleInputChange}
                  style={{width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px'}}
                  whileFocus={{ scale: 1.02, borderColor: 'var(--primary-color)' }}
                  transition={{ duration: 0.2 }}
                >
                  <option value="India">India</option>
                  <option value="USA">USA</option>
                  <option value="UK">UK</option>
                  <option value="Australia">Australia</option>
                </motion.select>
              </div>
            </div>
            <motion.button
              type="submit"
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                marginTop: '20px',
                fontSize: '16px'
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Update Profile
            </motion.button>
          </form>
        </motion.div>
        <motion.div
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2>Preferences</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            <div>
              <label style={{display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer'}}>
                <motion.input
                  type="checkbox"
                  name="notifications"
                  checked={profile.notifications}
                  onChange={handleInputChange}
                  style={{width: '18px', height: '18px'}}
                  whileTap={{ scale: 0.9 }}
                />
                <span>Enable email notifications</span>
              </label>
            </div>
            <div>
              <label style={{display: 'block', marginBottom: '8px', fontWeight: '600'}}>Theme</label>
              <motion.select
                name="theme"
                value={profile.theme}
                onChange={handleInputChange}
                style={{width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '6px'}}
                whileFocus={{ scale: 1.02, borderColor: 'var(--primary-color)' }}
                transition={{ duration: 0.2 }}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="auto">Auto</option>
              </motion.select>
            </div>
          </div>
        </motion.div>
        <motion.div
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2>Account Actions</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
            <motion.button
              style={{
                padding: '12px',
                backgroundColor: '#ffc107',
                color: '#212529',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Change Password
            </motion.button>
            <motion.button
              style={{
                padding: '12px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Delete Account
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Settings;
