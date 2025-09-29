import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import Sidebar from './components/Sidebar';
import Header from './components/Header';

import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import ResearcherDashboard from './pages/ResearcherDashboard';
import GovernmentDashboard from './pages/GovernmentDashboard';
import PublicDashboard from './pages/PublicDashboard';
import MaritimeDashboard from './pages/MaritimeDashboard';
import MapView from './pages/MapView';
import VolunteerRegistration from './pages/VolunteerRegistration';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import Donations from './pages/Donations';

import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const handleLogin = () => setIsAuthenticated(true);
  const handleLogout = () => setIsAuthenticated(false);
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  const showLayout = !['/login', '/signup', '/forgot-password'].includes(location.pathname);

  return (
      <div className={`app-container ${isSidebarOpen && showLayout ? 'sidebar-open' : ''} ${showLayout ? '' : 'no-sidebar'}`}>
        {showLayout && <Header toggleSidebar={toggleSidebar} isAuthenticated={isAuthenticated} handleLogout={handleLogout} />}
        {showLayout && <Sidebar />}
        <main className="main-content">
          <AppRoutes handleLogin={handleLogin} />
        </main>
      </div>
  );
}

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
)

function AppRoutes({ handleLogin }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/profile" element={<PageWrapper><ProfilePage /></PageWrapper>} />
        <Route path="/donations" element={<PageWrapper><Donations /></PageWrapper>} />
        <Route path="/admin" element={<PageWrapper><AdminDashboard /></PageWrapper>} />
        <Route path="/researcher" element={<PageWrapper><ResearcherDashboard /></PageWrapper>} />
        <Route path="/government" element={<PageWrapper><GovernmentDashboard /></PageWrapper>} />
        <Route path="/public" element={<PageWrapper><PublicDashboard /></PageWrapper>} />
        <Route path="/maritime" element={<PageWrapper><MaritimeDashboard /></PageWrapper>} />
        <Route path="/map" element={<PageWrapper><MapView /></PageWrapper>} />
        <Route path="/volunteer" element={<PageWrapper><VolunteerRegistration /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
}

const PageWrapper = ({ children }) => (
  <motion.div
    initial="initial"
    animate="in"
    exit="out"
    variants={{
        initial: { opacity: 0, y: 20 },
        in: { opacity: 1, y: 0 },
        out: { opacity: 0, y: -20 }
    }}
    transition={{ duration: 0.5, ease: 'easeInOut' }}
  >
    {children}
  </motion.div>
);

export default AppWrapper;