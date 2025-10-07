import React, { useState } from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const VolunteerRegistration = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    skills: '',
    availability: '',
    experience: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Volunteer registration:', formData);
    alert('Thank you for registering as a volunteer!');
    setFormData({
      name: '',
      email: '',
      phone: '',
      skills: '',
      availability: '',
      experience: ''
    });
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Volunteer Registration</h1>
        <p>Join our community of dedicated volunteers helping to monitor and respond to ocean hazards.</p>
      </div>
      <motion.div
        className="dashboard-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="dashboard-card"
          style={{gridColumn: 'span 2'}}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h2>Register as a Volunteer</h2>
          <form onSubmit={handleSubmit}>
            <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px'}}>
              <div>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px'}}
                  required
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px'}}
                  required
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px'}}
                  required
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Skills/Expertise</label>
                <input
                  type="text"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g., First Aid, Navigation, Communication"
                  style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px'}}
                />
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Availability</label>
                <select
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px'}}
                  required
                >
                  <option value="">Select Availability</option>
                  <option value="full-time">Full Time</option>
                  <option value="part-time">Part Time</option>
                  <option value="weekends">Weekends Only</option>
                  <option value="emergency">Emergency Response Only</option>
                </select>
              </div>
              <div>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Experience Level</label>
                <select
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px'}}
                  required
                >
                  <option value="">Select Experience</option>
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
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
                marginTop: '20px',
                fontSize: '16px'
              }}
            >
              Register as Volunteer
            </button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default VolunteerRegistration;
