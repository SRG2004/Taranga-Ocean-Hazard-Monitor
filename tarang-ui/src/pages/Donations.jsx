
import React from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const Donations = () => {
  return (
    <div className="page-content">
      <motion.div 
        className="hero-section" 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        <h1>Support Our Cause</h1>
        <p>Your contribution helps us to continue our mission of providing early warnings for ocean-related hazards.</p>
      </motion.div>

      <motion.div 
        className="about-section" 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <h2>How Your Donation Helps</h2>
        <p>
          Your support allows us to maintain and improve our technology, expand our reach to more communities, and provide educational resources to those in need. Every donation, no matter how small, makes a difference.
        </p>
        <button className="btn" style={{marginTop: '20px'}}>Donate Now</button>
      </motion.div>
    </div>
  );
};

export default Donations;
