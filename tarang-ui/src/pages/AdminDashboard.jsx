import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchUsers } from '../utils/api';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [roles, setRoles] = useState(['admin', 'researcher', 'government', 'citizen']);
  const [permissions, setPermissions] = useState({
    admin: ['read', 'write', 'delete'],
    researcher: ['read', 'write'],
    government: ['read', 'write'],
    citizen: ['read']
  });
  const [notifications, setNotifications] = useState({
    admin: true,
    researcher: true,
    government: true,
    citizen: false
  });
  const [systemHealth, setSystemHealth] = useState({
    dataFeed: 'Active',
    apiStatus: 'Online',
    storageUsage: '45%'
  });

  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await fetchUsers();
        setUsers(userData);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    };
    getUsers();
  }, []);

  const handleRoleChange = (userId, newRole) => {
    setUsers(users.map(user => user.id === userId ? { ...user, roles: [newRole] } : user));
  };

  const handleNotificationToggle = (role) => {
    setNotifications({ ...notifications, [role]: !notifications[role] });
  };

  const exportReport = (format) => {
    alert(`Exporting report in ${format} format`);
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Admin Dashboard</h1>
        <p>Manage users, roles, and system settings</p>
      </div>
      <div className="dashboard-grid">

        {/* User Management Panel */}
        <motion.div className="dashboard-card" style={{gridColumn: 'span 2'}} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h2>User Management Panel</h2>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr>
                <th style={{padding: '10px', border: '1px solid #ddd'}}>Name</th>
                <th style={{padding: '10px', border: '1px solid #ddd'}}>Role</th>
                <th style={{padding: '10px', border: '1px solid #ddd'}}>Status</th>
                <th style={{padding: '10px', border: '1px solid #ddd'}}>Last Login</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td style={{padding: '10px', border: '1px solid #ddd'}}>{user.name}</td>
                  <td style={{padding: '10px', border: '1px solid #ddd'}}>
                    <select value={user.roles[0]} onChange={(e) => handleRoleChange(user.id, e.target.value)}>
                      {roles.map(role => <option key={role} value={role}>{role}</option>)}
                    </select>
                  </td>
                  <td style={{padding: '10px', border: '1px solid #ddd'}}>Active</td>
                  <td style={{padding: '10px', border: '1px solid #ddd'}}>2023-10-01</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Role & Permission Manager */}
        <motion.div className="dashboard-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}>
          <h2>Role & Permission Manager</h2>
          {roles.map(role => (
            <div key={role} style={{marginBottom: '10px'}}>
              <h4>{role}</h4>
              {permissions[role].map(perm => (
                <label key={perm} style={{display: 'block', marginLeft: '10px'}}>
                  <input type="checkbox" defaultChecked /> {perm}
                </label>
              ))}
            </div>
          ))}
        </motion.div>

        {/* System Activity Logs */}
        <motion.div className="dashboard-card" style={{gridColumn: 'span 2'}} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}>
          <h2>System Activity Logs</h2>
          <div style={{marginBottom: '10px'}}>
            <select style={{marginRight: '10px'}}>
              <option>All Users</option>
              <option>Admin</option>
              <option>Researcher</option>
            </select>
            <select>
              <option>All Actions</option>
              <option>Login</option>
              <option>Update</option>
            </select>
          </div>
          <table style={{width: '100%', borderCollapse: 'collapse'}}>
            <thead>
              <tr>
                <th style={{padding: '5px', border: '1px solid #ddd'}}>User</th>
                <th style={{padding: '5px', border: '1px solid #ddd'}}>Action</th>
                <th style={{padding: '5px', border: '1px solid #ddd'}}>Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{padding: '5px', border: '1px solid #ddd'}}>John Doe</td>
                <td style={{padding: '5px', border: '1px solid #ddd'}}>Login</td>
                <td style={{padding: '5px', border: '1px solid #ddd'}}>2023-10-01 10:00</td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        {/* Notifications Manager */}
        <motion.div className="dashboard-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.5 }}>
          <h2>Notifications Manager</h2>
          {Object.keys(notifications).map(role => (
            <div key={role} style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
              <span>{role}</span>
              <label>
                <input type="checkbox" checked={notifications[role]} onChange={() => handleNotificationToggle(role)} />
              </label>
            </div>
          ))}
        </motion.div>

        {/* System Health Overview */}
        <motion.div className="dashboard-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.5 }}>
          <h2>System Health Overview</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <div>Data Feed: <span style={{color: systemHealth.dataFeed === 'Active' ? 'green' : 'red'}}>{systemHealth.dataFeed}</span></div>
            <div>API Status: <span style={{color: 'green'}}>{systemHealth.apiStatus}</span></div>
            <div>Storage Usage: {systemHealth.storageUsage}</div>
          </div>
        </motion.div>

        {/* Reports Section */}
        <motion.div className="dashboard-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0, duration: 0.5 }}>
          <h2>Reports Section</h2>
          <div style={{display: 'flex', gap: '10px'}}>
            <button onClick={() => exportReport('CSV')} style={{backgroundColor: 'var(--primary-color)', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Export CSV</button>
            <button onClick={() => exportReport('PDF')} style={{backgroundColor: 'var(--primary-color)', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Export PDF</button>
            <button onClick={() => exportReport('Excel')} style={{backgroundColor: 'var(--primary-color)', color: 'white', padding: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer'}}>Export Excel</button>
          </div>
        </motion.div>

        {/* Customization Settings */}
        <motion.div className="dashboard-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.5 }}>
          <h2>Customization Settings</h2>
          <div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <div>Theme: Light/Dark</div>
            <div>Layout: Default</div>
            <div>Dashboard Widgets: Enabled</div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AdminDashboard;
