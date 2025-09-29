
import React from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const VolunteerRegistration = () => {
  return (
    <div className="page-content">
      <h1>Volunteer Registration</h1>
      <p>Join our team of volunteers and help us make a difference.</p>
      <motion.form 
        className="volunteer-form" 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input type="tel" id="phone" name="phone" />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location / City</label>
          <input type="text" id="location" name="location" required />
        </div>
        <div className="form-group">
          <label htmlFor="skills">Skills and Experience</label>
          <textarea id="skills" name="skills" rows="4"></textarea>
        </div>
        <motion.button 
          type="submit" 
          className="submit-btn" 
          whileHover={{ scale: 1.05 }} 
          whileTap={{ scale: 0.95 }}
        >
          Register
        </motion.button>
      </motion.form>
    </div>
  );
};

export default VolunteerRegistration;
