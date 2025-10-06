import React from 'react';
import '../App.css';

const MobileMenuIcon = ({ isOpen, toggleSidebar }) => (
    <div className={`mobile-menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleSidebar}>
        <div></div>
        <div></div>
        <div></div>
    </div>
);

export default MobileMenuIcon;
