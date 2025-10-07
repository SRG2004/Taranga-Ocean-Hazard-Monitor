import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute.jsx';

import Sidebar from './components/Sidebar.jsx';
import MobileMenuIcon from './components/MobileMenuIcon.jsx';
import ProfileDropdown from './components/ProfileDropdown.jsx';
import Home from './pages/Home.jsx';
import Dashboard from './pages/Dashboard.jsx';
import VolunteerRegistration from './pages/VolunteerRegistration.jsx';
import LoginPage from './pages/LoginPage.jsx';
import SignupPage from './pages/SignupPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import Donations from './pages/Donations.jsx';
import SocialMonitoring from './pages/SocialMonitoring.jsx';
import SocialPosts from './pages/SocialPosts.jsx';
import ReportHazardPage from './pages/ReportHazardPage.jsx';
import Reports from './pages/Reports.jsx';
import Support from './pages/Support.jsx';
import Analytics from './pages/Analytics.jsx';
import HazardAnalysis from './pages/HazardAnalysis.jsx';
import MapView from './pages/MapView.jsx';
import Settings from './pages/Settings.jsx';
import Official from './pages/Official.jsx';
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
    const navigate = useNavigate();
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const { isAuthenticated, signOut: handleLogout } = useAuth();

    const toggleSidebar = () => {
        if (window.innerWidth < 768) { // Only toggle on mobile
            setSidebarOpen(!isSidebarOpen);
        }
    };

    const showSidebar = location.pathname !== '/unauthorized';

    useEffect(() => {
        const theme = localStorage.getItem('theme') || 'light';
        document.body.classList.toggle('dark', theme === 'dark');
    }, []);

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
            <div className="main-layout">
                <header className="app-header">
                    <div className="header-content">
                        <div className="header-title">
                            <h1>Tarang Ocean Hazard Monitor</h1>
                        </div>
                        {isAuthenticated ? (
                            <ProfileDropdown handleLogout={handleLogout} />
                        ) : (
                            <div className="auth-buttons">
                                <button
                                    onClick={() => navigate('/login')}
                                    className="btn-primary"
                                >
                                    Login
                                </button>
                            </div>
                        )}
                    </div>
                </header>
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
                            <Route path="/social-posts" element={<ProtectedRoute><PageWrapper><SocialPosts /></PageWrapper></ProtectedRoute>} />
                            <Route path="/report-hazard" element={<ProtectedRoute><PageWrapper><ReportHazardPage /></PageWrapper></ProtectedRoute>} />
                            <Route path="/reports" element={<ProtectedRoute><PageWrapper><Reports /></PageWrapper></ProtectedRoute>} />
                            <Route path="/support" element={<ProtectedRoute><PageWrapper><Support /></PageWrapper></ProtectedRoute>} />
                            <Route path="/analytics" element={<ProtectedRoute><PageWrapper><Analytics /></PageWrapper></ProtectedRoute>} />
                            <Route path="/hazard-analysis" element={<ProtectedRoute><PageWrapper><HazardAnalysis /></PageWrapper></ProtectedRoute>} />
                            <Route path="/map" element={<ProtectedRoute><PageWrapper><MapView /></PageWrapper></ProtectedRoute>} />
                            <Route path="/settings" element={<ProtectedRoute><PageWrapper><Settings /></PageWrapper></ProtectedRoute>} />
                            <Route path="/official" element={<ProtectedRoute roles={['government', 'admin']}><PageWrapper><Official /></PageWrapper></ProtectedRoute>} />

                            {/* Role-Based Protected Routes */}
                            <Route path="/dashboard" element={<ProtectedRoute><PageWrapper><Dashboard /></PageWrapper></ProtectedRoute>} />
                        </Routes>
                    </AnimatePresence>
                </main>
            </div>
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
