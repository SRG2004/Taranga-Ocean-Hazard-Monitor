import React from 'react';
import { Link } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';
import '../App.css';

const Header = ({ toggleSidebar, isAuthenticated, handleLogout }) => {
  return (
    <header className="header">
        <div className="header-left">
            <button className="sidebar-toggle" onClick={toggleSidebar}>
                ☰
            </button>
            <div className="header-title">Tarang</div>
        </div>
        <div className="header-right">
            {isAuthenticated ? (
                <ProfileDropdown handleLogout={handleLogout} />
            ) : (
                <Link to="/login" className="btn login-nav-btn">Login</Link>
            )}
        </div>
    </header>
  );
};

export default Header;