
import React from 'react';
import { motion } from 'framer-motion';
import '../App.css';

// Mock Data
const users = [
  { id: 1, name: 'John Doe', role: 'Researcher', status: 'Active', lastLogin: '2025-09-28 10:30 AM' },
  { id: 2, name: 'Jane Smith', role: 'Government', status: 'Inactive', lastLogin: '2025-09-27 05:45 PM' },
  { id: 3, name: 'Peter Jones', role: 'Admin', status: 'Active', lastLogin: '2025-09-28 11:00 AM' },
];

const activityLogs = [
  { id: 1, user: 'Peter Jones', action: 'Updated user roles', timestamp: '2025-09-28 11:02 AM' },
  { id: 2, user: 'John Doe', action: 'Ran a simulation', timestamp: '2025-09-28 10:45 AM' },
];

const roles = ['Admin', 'Researcher', 'Government', 'Public', 'Fishermen'];
const permissions = ['Read Data', 'Write Data', 'Delete Data', 'Manage Users'];

const donations = [
    { donor: 'Ravi Kumar', type: 'Monetary', amount: '₹5,000', date: '2025-09-28' },
    { donor: 'Priya Sharma', type: 'Resource', amount: '100 Blankets', date: '2025-09-28' },
];

const volunteers = [
    { name: 'Sunita Patil', area: 'Mumbai', status: 'Available' },
    { name: 'Anil Mehta', area: 'Pune', status: 'Assigned' },
];

const AdminDashboard = () => {
  const sectionVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="page-content">
      <h1>Admin Dashboard</h1>

      <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>

        <motion.section className="dashboard-section" variants={sectionVariants}>
          <h2>System Health Overview</h2>
          {/* ... existing content ... */}
        </motion.section>

        <motion.section className="dashboard-section" variants={sectionVariants}>
          <h2>User Management</h2>
          {/* ... existing content ... */}
        </motion.section>

        <div className="admin-grid">
            <motion.section className="dashboard-section" variants={sectionVariants}>
                <h2>Donation Management</h2>
                <div className="table-container">
                    <table>
                        <thead><tr><th>Donor</th><th>Type</th><th>Amount/Item</th><th>Date</th></tr></thead>
                        <tbody>
                            {donations.map((d, i) => <tr key={i}><td>{d.donor}</td><td>{d.type}</td><td>{d.amount}</td><td>{d.date}</td></tr>)}
                        </tbody>
                    </table>
                </div>
            </motion.section>

            <motion.section className="dashboard-section" variants={sectionVariants}>
                <h2>Volunteer Management</h2>
                <div className="table-container">
                    <table>
                        <thead><tr><th>Name</th><th>Area</th><th>Status</th></tr></thead>
                        <tbody>
                            {volunteers.map((v, i) => <tr key={i}><td>{v.name}</td><td>{v.area}</td><td>{v.status}</td></tr>)}
                        </tbody>
                    </table>
                </div>
            </motion.section>
        </div>

        <motion.section className="dashboard-section" variants={sectionVariants}>
          <h2>System Activity Logs</h2>
          {/* ... existing content ... */}
        </motion.section>

      </motion.div>
    </div>
  );
};

export default AdminDashboard;
