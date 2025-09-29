import React from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const recentDonors = [
    { name: 'Ravi Kumar', amount: '₹5,000' },
    { name: 'Priya Sharma', amount: '100 Blankets' },
    { name: 'Amit Singh', amount: '₹2,500' },
];

const Donations = () => {
  const sectionVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="page-content">
      <h1>Make a Donation</h1>
      <p>Your contribution can make a huge difference in our efforts to keep communities safe.</p>

      <motion.section className="dashboard-section" variants={sectionVariants}>
        <h2>Donations Received</h2>
        <div className="donation-tracker">
            <div className="progress-bar">
                <motion.div className="progress" initial={{width: 0}} animate={{width: '65%'}} transition={{duration: 1, ease: 'easeInOut'}}></motion.div>
            </div>
            <p>₹6,50,000 of ₹10,00,000 raised</p>
        </div>
      </motion.section>

      <div className="donation-forms-grid">
        <motion.section className="dashboard-section" variants={sectionVariants}>
            <h3>Monetary Donation</h3>
            <form>
                <div className="form-group">
                    <label>Amount (₹)</label>
                    <input type="number" placeholder="5000" />
                </div>
                <button className="btn">Donate Now</button>
            </form>
        </motion.section>

        <motion.section className="dashboard-section" variants={sectionVariants}>
            <h3>Pledge Resources</h3>
            <form>
                <div className="form-group">
                    <label>Item (e.g., Blankets, Water Bottles)</label>
                    <input type="text" />
                </div>
                 <div className="form-group">
                    <label>Quantity</label>
                    <input type="number" />
                </div>
                <button className="btn">Pledge Now</button>
            </form>
        </motion.section>
      </div>

      <motion.section className="dashboard-section" variants={sectionVariants}>
        <h2>Recent Donors</h2>
        <div className="table-container">
            <table>
                <thead><tr><th>Name</th><th>Contribution</th></tr></thead>
                <tbody>
                    {recentDonors.map((donor, index) => (
                        <tr key={index}><td>{donor.name}</td><td>{donor.amount}</td></tr>
                    ))}
                </tbody>
            </table>
        </div>
      </motion.section>

    </div>
  );
};

export default Donations;