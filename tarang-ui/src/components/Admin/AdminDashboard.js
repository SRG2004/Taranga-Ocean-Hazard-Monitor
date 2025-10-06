
import React from 'react';
import UserManagement from './UserManagement';
import RolePermissionManager from './RolePermissionManager';
import SystemActivityLogs from './SystemActivityLogs';
import NotificationsManager from './NotificationsManager';
import SystemHealthOverview from './SystemHealthOverview';
import ReportsSection from './ReportsSection';
import CustomizationSettings from './CustomizationSettings';

const AdminDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <UserManagement />
        </div>
        <div className="col-span-1">
          <RolePermissionManager />
        </div>
        <div className="col-span-1">
          <SystemActivityLogs />
        </div>
        <div className="col-span-1">
          <NotificationsManager />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <SystemHealthOverview />
        </div>
        <div className="col-span-1">
          <ReportsSection />
        </div>
        <div className="col-span-1">
          <CustomizationSettings />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
