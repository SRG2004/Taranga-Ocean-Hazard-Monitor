
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';
import '../App.css';

const ProfileDropdown = ({ handleLogout }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="profile-dropdown">
            <FaUserCircle 
                className="profile-icon"
                onClick={() => setIsOpen(!isOpen)}
            />
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        className="dropdown-menu"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                    >
                        <Link to="/profile">Profile</Link>
                        <Link to="/login" onClick={handleLogout}>Logout</Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfileDropdown;
