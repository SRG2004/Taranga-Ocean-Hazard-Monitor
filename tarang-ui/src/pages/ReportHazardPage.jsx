import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useAuth } from '../context/AuthContext';

const ReportHazardPage = () => {
  const { currentUser } = useAuth();
  const [hazardDetails, setHazardDetails] = useState({
    type: 'tsunami',
    severity: 'medium',
    description: '',
    location: '',
    lat: null,
    lng: null,
    media: []
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setHazardDetails(prev => ({
            ...prev,
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            location: `${position.coords.latitude}, ${position.coords.longitude}`
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHazardDetails({ ...hazardDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setHazardDetails(prev => ({
      ...prev,
      media: [...prev.media, ...files]
    }));
  };

  const removeMedia = (index) => {
    setHazardDetails(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

  const uploadMedia = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `hazard-reports/${fileName}`;

    const { error } = await supabase.storage
      .from('media')
      .upload(filePath, file);

    if (error) throw error;

    const { data } = supabase.storage
      .from('media')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // Upload media files
      const mediaUrls = [];
      for (const file of hazardDetails.media) {
        const url = await uploadMedia(file);
        mediaUrls.push(url);
      }

      // Submit hazard report
      const { error } = await supabase
        .from('hazards')
        .insert({
          type: hazardDetails.type,
          severity: hazardDetails.severity,
          description: hazardDetails.description,
          location: hazardDetails.location,
          lat: hazardDetails.lat,
          lng: hazardDetails.lng,
          media_urls: mediaUrls,
          reported_by: currentUser.id,
          status: 'pending'
        });

      if (error) throw error;

      setMessage('Hazard reported successfully!');
      setHazardDetails({
        type: 'tsunami',
        severity: 'medium',
        description: '',
        location: '',
        lat: null,
        lng: null,
        media: []
      });
    } catch (error) {
      console.error('Error reporting hazard:', error);
      setMessage('Failed to report hazard. Please try again.');
    }

    setLoading(false);
  };

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Report a Hazard</h1>
        <p>Submit detailed information about ocean hazards you observe</p>
      </div>
      <div className="dashboard-grid">
        <div className="dashboard-card" style={{gridColumn: 'span 2'}}>
          {message && (
            <div className={`message ${message.includes('successfully') ? 'success' : 'error'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Hazard Type</label>
                <select name="type" value={hazardDetails.type} onChange={handleInputChange} required>
                  <option value="tsunami">Tsunami</option>
                  <option value="storm">Storm Surge</option>
                  <option value="flood">Flood</option>
                  <option value="high_waves">High Waves</option>
                  <option value="coastal_current">Coastal Current</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Severity</label>
                <select name="severity" value={hazardDetails.severity} onChange={handleInputChange} required>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                  <option value="critical">Critical</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                name="description"
                value={hazardDetails.description}
                onChange={handleInputChange}
                rows="4"
                placeholder="Describe what you observed..."
                required
              />
            </div>

            <div className="form-group">
              <label>Location</label>
              <input
                type="text"
                name="location"
                value={hazardDetails.location}
                onChange={handleInputChange}
                placeholder="Address or GPS coordinates"
                required
              />
              {hazardDetails.lat && hazardDetails.lng && (
                <small>Current location: {hazardDetails.lat.toFixed(6)}, {hazardDetails.lng.toFixed(6)}</small>
              )}
            </div>

            <div className="form-group">
              <label>Media (Photos/Videos)</label>
              <input
                type="file"
                multiple
                accept="image/*,video/*"
                onChange={handleFileChange}
              />
              {hazardDetails.media.length > 0 && (
                <div className="media-preview">
                  {hazardDetails.media.map((file, index) => (
                    <div key={index} className="media-item">
                      {file.type.startsWith('image/') ? (
                        <img src={URL.createObjectURL(file)} alt={`Media ${index + 1}`} />
                      ) : (
                        <video src={URL.createObjectURL(file)} controls />
                      )}
                      <button type="button" onClick={() => removeMedia(index)}>Remove</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary"
              style={{width: '100%', padding: '12px'}}
            >
              {loading ? 'Submitting...' : 'Submit Report'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportHazardPage;
