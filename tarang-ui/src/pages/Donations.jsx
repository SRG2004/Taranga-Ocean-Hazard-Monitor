import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const Donations = () => {
  const [donationAmount, setDonationAmount] = useState('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${donorName} for your donation of $${donationAmount}!`);
    setDonationAmount('');
    setDonorName('');
    setDonorEmail('');
  };

  const recentDonations = [
    { name: 'Anonymous', amount: 500, date: '2023-10-01' },
    { name: 'John Doe', amount: 250, date: '2023-09-28' },
    { name: 'Jane Smith', amount: 1000, date: '2023-09-25' },
    { name: 'Bob Johnson', amount: 150, date: '2023-09-22' },
  ];

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Support Our Mission</h1>
        <p>Your donations help us maintain and improve our ocean hazard monitoring systems</p>
      </div>
      <div className="dashboard-grid">
        <motion.div
          className="dashboard-card"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Donation Stats</h2>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
            <motion.div
              className="support-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h3>$25,000</h3>
              <p>Total Raised</p>
            </motion.div>
            <motion.div
              className="support-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h3>150</h3>
              <p>Donors</p>
            </motion.div>
            <motion.div
              className="support-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h3>$167</h3>
              <p>Average Donation</p>
            </motion.div>
            <motion.div
              className="support-card"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <h3>85%</h3>
              <p>Funds Used</p>
            </motion.div>
          </div>
        </motion.div>
        <motion.div
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2>Make a Donation</h2>
          <form onSubmit={handleSubmit}>
            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Name</label>
              <input
                type="text"
                value={donorName}
                onChange={(e) => setDonorName(e.target.value)}
                style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px'}}
                required
              />
            </div>
            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Email</label>
              <input
                type="email"
                value={donorEmail}
                onChange={(e) => setDonorEmail(e.target.value)}
                style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px'}}
                required
              />
            </div>
            <div style={{marginBottom: '15px'}}>
              <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Donation Amount ($)</label>
              <input
                type="number"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                placeholder="Enter amount"
                style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px'}}
                min="1"
                required
              />
            </div>
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '15px',
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              Donate Now
            </button>
          </form>
        </motion.div>
        <motion.div
          className="dashboard-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h2>Recent Donations</h2>
          <ul style={{listStyle: 'none', padding: 0}}>
            {recentDonations.map((donation, index) => (
              <motion.li
                key={index}
                style={{
                  padding: '10px 0',
                  borderBottom: '1px solid #eee',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 + 0.6, duration: 0.5 }}
              >
                <div>
                  <strong>{donation.name}</strong>
                  <br />
                  <small style={{color: '#666'}}>{donation.date}</small>
                </div>
                <span style={{fontWeight: 'bold', color: 'var(--primary-color)'}}>${donation.amount}</span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  );
};

export default Donations;
