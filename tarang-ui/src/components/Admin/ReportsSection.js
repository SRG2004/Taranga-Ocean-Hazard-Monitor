
import React from 'react';

const ReportsSection = () => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Reports Section</h2>
      <div className="flex space-x-4">
        <button className="px-4 py-2 text-white bg-blue-500 rounded-lg">Export as CSV</button>
        <button className="px-4 py-2 text-white bg-blue-500 rounded-lg">Export as PDF</button>
        <button className="px-4 py-2 text-white bg-blue-500 rounded-lg">Export as Excel</button>
      </div>
    </div>
  );
};

export default ReportsSection;
