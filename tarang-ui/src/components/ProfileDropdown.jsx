
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUserCircle, FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import '../App.css';

const ProfileDropdown = ({ handleLogout }) => {
    const [isOpen, setIsOpen] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleMenuClick = (path) => {
        setIsOpen(false);
        navigate(path);
    };

    const handleLogoutClick = () => {
        setIsOpen(false);
        handleLogout();
    };

    return (
        <div className="profile-dropdown">
            <div className="profile-trigger" onClick={() => setIsOpen(!isOpen)}>
                <FaUserCircle className="profile-icon" />
                <span className="profile-name">{user?.email?.split('@')[0] || 'User'}</span>
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="dropdown-menu"
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <div className="dropdown-header">
                            <div className="user-info-dropdown">
                                <FaUserCircle className="user-avatar" />
                                <div className="user-details">
                                    <div className="user-name">{user?.email?.split('@')[0] || 'User'}</div>
                                    <div className="user-email">{user?.email}</div>
                                </div>
                            </div>
                        </div>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item" onClick={() => handleMenuClick('/profile')}>
                            <FaUser className="dropdown-icon" />
                            Profile Settings
                        </button>
                        <button className="dropdown-item" onClick={() => handleMenuClick('/settings')}>
                            <FaCog className="dropdown-icon" />
                            System Settings
                        </button>
                        <div className="dropdown-divider"></div>
                        <button className="dropdown-item logout" onClick={handleLogoutClick}>
                            <FaSignOutAlt className="dropdown-icon" />
                            Logout
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ProfileDropdown;
