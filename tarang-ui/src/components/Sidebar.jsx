import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = ({ isOpen, toggleSidebar, handleLogout }) => {
    const { user, isAuthenticated } = useAuth();
    const userRoles = user?.roles || [];

    // Define role-based navigation links
    const getRoleBasedLinks = () => {
        const isAdmin = userRoles.includes('admin');
        const isResearcher = userRoles.includes('researcher');
        const isGovernment = userRoles.includes('government');
        const isCitizen = !isAdmin && !isResearcher && !isGovernment;

        const links = [
            { path: '/', label: 'Home', public: true },
            { path: '/donations', label: 'Donations', public: true },
        ];

        if (!isAuthenticated) return links;

        if (isAdmin) {
            // Admin navigation
            links.push(
                { path: '/dashboard', label: 'User Management' },
                { path: '/reports', label: 'Reports Management' },
                { path: '/analytics', label: 'System Analytics' },
                { path: '/settings', label: 'Settings' },
                { path: '/support', label: 'Data Export / Backup' }
            );
        } else if (isResearcher) {
            // Researcher navigation
            links.push(
                { path: '/analytics', label: 'Data Analytics' },
                { path: '/map', label: 'Map Visualization' },
                { path: '/hazard-analysis', label: 'AI/NLP Insights' },
                { path: '/reports', label: 'Compare & Export' }
            );
        } else if (isGovernment) {
            // Government official navigation
            links.push(
                { path: '/dashboard', label: 'Incident Overview' },
                { path: '/map', label: 'Live Map' },
                { path: '/official', label: 'Alerts & Notifications' },
                { path: '/reports', label: 'Response Coordination' },
                { path: '/analytics', label: 'Reports' }
            );
        } else {
            // Citizen/Fisherman navigation
            links.push(
                { path: '/report-hazard', label: 'Submit Report' },
                { path: '/reports', label: 'My Reports' },
                { path: '/map', label: 'Nearby Hazards' },
                { path: '/social-posts', label: 'Safety Alerts' },
                { path: '/support', label: 'Awareness & Tips' }
            );
        }

        return links;
    };

    const finalLinks = getRoleBasedLinks();

    return (
        <nav className={`sidebar ${isOpen ? 'open' : ''}`}>
            <div className="logo">
                <NavLink to="/" onClick={toggleSidebar}>Tarang</NavLink>
            </div>
            {isAuthenticated && user && (
                <div className="user-info">
                    <div className="user-name">{user.email}</div>
                    <div className="user-role">Role: {userRoles.length > 0 ? userRoles.join(', ') : 'Citizen'}</div>
                </div>
            )}
            <div className="nav-menu">
                {finalLinks.map((link, index) => (
                    <NavLink key={index} to={link.path} className="nav-link" onClick={toggleSidebar}>
                        {link.label}
                    </NavLink>
                ))}
            </div>

        </nav>
    );
};

export default Sidebar;
