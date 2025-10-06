import React from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const VolunteerRegistration = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    alert('Thank you for registering as a volunteer!');
  };

  return (
    <div className="page-content">
      <motion.div 
        className="volunteer-form-container" 
        initial={{ opacity: 0, y: -50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
      >
        <h2>Volunteer Registration</h2>
        <p>Join us in making a difference. Register as a volunteer to help during emergencies.</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" placeholder="Your Full Name" />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" placeholder="Your Email" />
          </div>
           <div className="form-group">
            <label>Phone Number</label>
            <input type="tel" placeholder="Your Phone Number" />
          </div>
          <div className="form-group">
            <label>Skills</label>
            <textarea placeholder="List any relevant skills (e.g., first aid, driving)"></textarea>
          </div>
          <button type="submit" className="btn">Register</button>
        </form>
      </motion.div>
    </div>
  );
};

export default VolunteerRegistration;
