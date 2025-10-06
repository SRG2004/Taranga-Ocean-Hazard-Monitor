import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar, handleLogout }) => {
    const { user, isAuthenticated } = useAuth();
    const userRoles = user?.roles || [];

    const links = [
        { path: '/', label: 'Home', public: true },
        { path: '/donations', label: 'Donations', public: true },
        { path: '/profile', label: 'Profile', public: false },
        { path: '/volunteer', label: 'Volunteer', public: false },
        { path: '/social', label: 'Social Monitoring', public: false },
        { path: '/admin', label: 'Admin Dashboard', roles: ['admin'] },
        { path: '/researcher', label: 'Researcher Dashboard', roles: ['researcher'] },
        { path: '/government', label: 'Government Dashboard', roles: ['government'] },
        { path: '/citizen', label: 'Citizen Dashboard', roles: ['citizen'] },
        { path: '/fisherman', label: 'Fisherman Dashboard', roles: ['citizen'] },
    ];

    const finalLinks = links.filter(link => {
        if (link.public) return true;
        if (!isAuthenticated) return false;
        if (link.roles) {
            return link.roles.some(role => userRoles.includes(role));
        }
        return true; // For authenticated links without specific roles
    });

    return (
        <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="logo">
                <NavLink to="/" onClick={toggleSidebar}>Tarang</NavLink>
            </div>
            <div className="nav-menu">
                {finalLinks.map((link, index) => (
                    <NavLink key={index} to={link.path} className="nav-link" onClick={toggleSidebar}>
                        {link.label}
                    </NavLink>
                ))}
            </div>
            <div className="auth-links">
                {isAuthenticated ? (
                    <button onClick={() => { handleLogout(); toggleSidebar(); }} className="nav-link">Logout</button>
                ) : (
                    <NavLink to="/login" className="nav-link" onClick={toggleSidebar}>Login</NavLink>
                )}
            </div>
        </nav>
    );
};

export default Sidebar;
