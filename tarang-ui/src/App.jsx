import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import Sidebar from './components/Sidebar.jsx';
import MobileMenuIcon from './components/MobileMenuIcon.jsx';
import Home from './pages/Home.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import ResearcherDashboard from './pages/ResearcherDashboard.jsx';
import GovernmentDashboard from './pages/GovernmentDashboard.jsx';
import CitizenDashboard from './pages/CitizenDashboard.jsx';
import FishermanDashboard from './pages/FishermanDashboard.jsx';
import VolunteerRegistration from './pages/VolunteerRegistration.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import Donations from './pages/Donations.jsx';
import SocialMonitoring from './pages/SocialMonitoring.jsx';
import ReportHazardPage from './pages/ReportHazardPage.jsx';
import Unauthorized from './pages/Unauthorized.jsx';
import 'leaflet/dist/leaflet.css';

import './App.css';

const PageWrapper = ({ children }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="page-content"
    >
      {children}
    </motion.div>
);

function AppContent() {
    const location = useLocation();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { isAuthenticated, signOut: handleLogout } = useAuth();
    
    const toggleSidebar = () => {
        if (window.innerWidth < 768) { // Only toggle on mobile
            setSidebarOpen(!isSidebarOpen);
        }
    };

    const showSidebar = location.pathname !== '/unauthorized';

    return (
        <div className="app-container">
            {showSidebar && (
                <>
                    <MobileMenuIcon isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
                    <Sidebar 
                        isAuthenticated={isAuthenticated} 
                        handleLogout={handleLogout} 
                        isOpen={isSidebarOpen} 
                        toggleSidebar={toggleSidebar} 
                    />
                </>
            )}
            <main className="main-content">
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        {/* Public Routes */}
                        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                        <Route path="/login" element={<PageWrapper><LoginPage /></PageWrapper>} />
                        <Route path="/signup" element={<PageWrapper><SignupPage /></PageWrapper>} />
                        <Route path="/forgot-password" element={<PageWrapper><ForgotPasswordPage /></PageWrapper>} />
                        <Route path="/donations" element={<PageWrapper><Donations /></PageWrapper>} />
                        <Route path="/unauthorized" element={<Unauthorized />} />

                        {/* Protected Routes for any logged-in user */}
                        <Route path="/profile" element={<ProtectedRoute><PageWrapper><ProfilePage /></PageWrapper></ProtectedRoute>} />
                        <Route path="/volunteer" element={<ProtectedRoute><PageWrapper><VolunteerRegistration /></PageWrapper></ProtectedRoute>} />
                        <Route path="/social" element={<ProtectedRoute><PageWrapper><SocialMonitoring /></PageWrapper></ProtectedRoute>} />
                        <Route path="/report-hazard" element={<ProtectedRoute><PageWrapper><ReportHazardPage /></PageWrapper></ProtectedRoute>} />

                        {/* Role-Based Protected Routes */}
                        <Route path="/admin" element={<ProtectedRoute roles={['admin']}><PageWrapper><AdminDashboard /></PageWrapper></ProtectedRoute>} />
                        <Route path="/researcher" element={<ProtectedRoute roles={['researcher']}><PageWrapper><ResearcherDashboard /></PageWrapper></ProtectedRoute>} />
                        <Route path="/government" element={<ProtectedRoute roles={['government']}><PageWrapper><GovernmentDashboard /></PageWrapper></ProtectedRoute>} />
                        <Route path="/citizen" element={<ProtectedRoute roles={['citizen']}><PageWrapper><CitizenDashboard /></PageWrapper></ProtectedRoute>} />
                        <Route path="/fisherman" element={<ProtectedRoute roles={['citizen']}><PageWrapper><FishermanDashboard /></PageWrapper></ProtectedRoute>} />
                    </Routes>
                </AnimatePresence>
            </main>
        </div>
    );
}

function AppWrapper() {
    return (
        <Router>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </Router>
    );
}

export default AppWrapper;
