import React from 'react';
import { motion } from 'framer-motion';
import '../App.css';

const supportContacts = [
    { name: 'National Emergency Response System', number: '112' },
    { name: 'National Disaster Management Authority', number: '108' },
    { name: 'Coast Guard Helpline', number: '1916' },
    { name: 'Tarang Support Desk', number: '1800-123-4567' },
];

const SupportCard = ({ name, number }) => (
    <motion.div 
        className="support-card" 
        whileHover={{ scale: 1.05 }} 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <h4>{name}</h4>
        <p className="support-number">{number}</p>
    </motion.div>
);

const Support = () => (
    <div className="support-container with-background">
        <div className="support-content">
            <h2>Helpline & Support</h2>
            <div className="support-grid">
                {supportContacts.map((contact, index) => (
                    <SupportCard key={index} name={contact.name} number={contact.number} />
                ))}
            </div>
        </div>
    </div>
);

export default Support;
