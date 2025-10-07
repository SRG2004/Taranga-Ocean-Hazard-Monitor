
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../supabase';

const ProfilePage = () => {
  const { currentUser, signOut } = useAuth();
  const userRoles = currentUser?.roles || [];
  const isCitizen = !userRoles.includes('admin') && !userRoles.includes('researcher') && !userRoles.includes('government');

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    country: '',
    bio: '',
    avatar: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activity, setActivity] = useState([]);

  // Feedback/Support state for citizens
  const [feedback, setFeedback] = useState({
    subject: '',
    message: '',
    category: 'general'
  });
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    if (currentUser) {
      setProfile({
        firstName: currentUser.firstName || '',
        lastName: currentUser.lastName || '',
        phone: currentUser.phone || '',
        country: currentUser.country || '',
        bio: currentUser.bio || '',
        avatar: currentUser.avatar || null
      });

      // Fetch user activity (mock data for now)
      setActivity([
        { id: 1, action: 'Reported hazard', date: '2024-01-15', details: 'Tsunami warning in coastal area' },
        { id: 2, action: 'Updated profile', date: '2024-01-10', details: 'Changed contact information' },
        { id: 3, action: 'Viewed dashboard', date: '2024-01-08', details: 'Checked hazard statistics' },
      ]);
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          firstName: profile.firstName,
          lastName: profile.lastName,
          phone: profile.phone,
          country: profile.country,
          bio: profile.bio,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentUser.id);

      if (error) throw error;

      setMessage('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage('Error updating profile. Please try again.');
    }

    setLoading(false);
  };

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // In a real app, you'd upload to storage and get URL
      // For now, just set a placeholder
      setProfile(prev => ({ ...prev, avatar: URL.createObjectURL(file) }));
    }
  };

  // Feedback handlers for citizens
  const handleFeedbackChange = (e) => {
    const { name, value } = e.target;
    setFeedback(prev => ({ ...prev, [name]: value }));
  };

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    setFeedbackLoading(true);
    setFeedbackMessage('');

    try {
      // In a real app, this would submit to a feedback/support API
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call

      setFeedbackMessage('Thank you for your feedback! We\'ll get back to you soon.');
      setFeedback({
        subject: '',
        message: '',
        category: 'general'
      });
    } catch (error) {
      setFeedbackMessage('Error submitting feedback. Please try again.');
    }

    setFeedbackLoading(false);
  };

  if (!currentUser) {
    return <div className="page-content">Loading...</div>;
  }

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>My Profile</h1>
        <p>Manage your account information and preferences</p>
      </div>

      <div className="dashboard-grid">
        {/* Profile Header */}
        <motion.div
          className="profile-header"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="avatar-section">
            <div className="avatar">
              {profile.avatar ? (
                <img src={profile.avatar} alt="Profile" />
              ) : (
                <div className="avatar-placeholder">
                  {profile.firstName.charAt(0)}{profile.lastName.charAt(0)}
                </div>
              )}
            </div>
            {isEditing && (
              <label className="avatar-upload">
                <input type="file" accept="image/*" onChange={handleAvatarChange} />
                Change Photo
              </label>
            )}
          </div>
          <div className="profile-info">
            <h2>{profile.firstName} {profile.lastName}</h2>
            <p>{currentUser.email}</p>
            <p>Role: {currentUser.roles?.join(', ') || 'User'}</p>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="btn-secondary"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </motion.div>

        {/* Profile Form */}
        <motion.div
          className="profile-form"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h3>Personal Information</h3>
          {message && (
            <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}

          <div className="form-grid">
            <div className="form-group">
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                value={profile.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                value={profile.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={profile.phone}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={profile.country}
                onChange={handleInputChange}
                disabled={!isEditing}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Bio</label>
            <textarea
              name="bio"
              value={profile.bio}
              onChange={handleInputChange}
              disabled={!isEditing}
              rows="4"
              placeholder="Tell us about yourself..."
            />
          </div>

          {isEditing && (
            <div className="form-actions">
              <button
                onClick={handleSave}
                disabled={loading}
                className="btn-primary"
              >
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          )}
        </motion.div>

        {/* Activity Log */}
        <motion.div
          className="activity-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <h3>Recent Activity</h3>
          <div className="activity-list">
            {activity.map(item => (
              <div key={item.id} className="activity-item">
                <div className="activity-icon">📝</div>
                <div className="activity-content">
                  <h4>{item.action}</h4>
                  <p>{item.details}</p>
                  <span className="activity-date">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Account Actions */}
        <motion.div
          className="account-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <h3>Account Settings</h3>
          <div className="action-buttons">
            <button onClick={() => alert('Password reset email sent!')} className="btn-secondary">
              Change Password
            </button>
            <button onClick={() => alert('Account deletion requires confirmation. Contact support.')} className="btn-danger">
              Delete Account
            </button>
            <button onClick={signOut} className="btn-secondary">
              Sign Out
            </button>
          </div>
        </motion.div>

        {/* Feedback/Support Section for Citizens */}
        {isCitizen && (
          <motion.div
            className="account-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <h3>Feedback & Support</h3>
            {feedbackMessage && (
              <div className={`message ${feedbackMessage.includes('Error') ? 'error' : 'success'}`}>
                {feedbackMessage}
              </div>
            )}
            <form onSubmit={handleFeedbackSubmit}>
              <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Category</label>
                <select
                  name="category"
                  value={feedback.category}
                  onChange={handleFeedbackChange}
                  style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                >
                  <option value="general">General Feedback</option>
                  <option value="bug">Report a Bug</option>
                  <option value="feature">Feature Request</option>
                  <option value="support">Technical Support</option>
                </select>
              </div>
              <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={feedback.subject}
                  onChange={handleFeedbackChange}
                  placeholder="Brief description of your feedback"
                  style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px'}}
                  required
                />
              </div>
              <div style={{marginBottom: '15px'}}>
                <label style={{display: 'block', marginBottom: '5px', fontWeight: '600'}}>Message</label>
                <textarea
                  name="message"
                  value={feedback.message}
                  onChange={handleFeedbackChange}
                  placeholder="Please provide details about your feedback or issue"
                  rows="4"
                  style={{width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical'}}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={feedbackLoading}
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'var(--primary-color)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                {feedbackLoading ? 'Submitting...' : 'Submit Feedback'}
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
