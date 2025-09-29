
import React from 'react';
import { NavLink } from 'react-router-dom';
import '../App.css';

const Sidebar = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Admin Dashboard', path: '/admin' },
    { name: 'Researcher Dashboard', path: '/researcher' },
    { name: 'Government Dashboard', path: '/government' },
    { name: 'Public Dashboard', path: '/public' },
    { name: 'Fishermen Dashboard', path: '/maritime' },
    { name: 'Map View', path: '/map' },
    { name: 'Volunteer', path: '/volunteer' },
  ];

  return (
    <nav className="sidebar">
      <div className="sidebar-header">
        <h2>Tarang</h2>
      </div>
      <ul>
        {navItems.map((item) => (
          <li key={item.name}>
            <NavLink to={item.path} className={({ isActive }) => (isActive ? 'active' : '')}>
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
