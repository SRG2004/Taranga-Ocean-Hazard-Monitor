
import React from 'react';

const SavedViewsReports = () => {
  const savedItems = [
    { name: 'Quarterly Sea Level Report', date: '2024-07-01' },
    { name: 'Coastal Erosion Study', date: '2024-06-15' },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Saved Views/Reports</h2>
      <ul className="space-y-2">
        {savedItems.map((item, index) => (
          <li key={index} className="p-2 bg-gray-100 rounded-lg">
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm">Date: {item.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SavedViewsReports;
