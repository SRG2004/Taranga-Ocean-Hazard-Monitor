import React, { useState } from 'react';

const ReportHazardPage = () => {
  const [hazardDetails, setHazardDetails] = useState({ description: '', location: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHazardDetails({ ...hazardDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, this would submit the hazard report to the backend
    console.log('Submitting hazard report:', hazardDetails);
    // Reset form
    setHazardDetails({ description: '', location: '' });
    // Redirect or show a success message
    alert('Hazard reported successfully!');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Report a Hazard</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow">
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description of Hazard</label>
          <textarea name="description" id="description" value={hazardDetails.description} onChange={handleInputChange} rows="4" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location (e.g., address, cross streets, or GPS coordinates)</label>
          <input type="text" name="location" id="location" value={hazardDetails.location} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
        </div>
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Submit Report</button>
      </form>
    </div>
  );
};

export default ReportHazardPage;
