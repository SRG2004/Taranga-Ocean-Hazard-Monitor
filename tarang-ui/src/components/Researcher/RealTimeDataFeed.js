
import React from 'react';

const RealTimeDataFeed = () => {
  const data = [
    { parameter: 'Sea Level', value: '2.5m', timestamp: '2024-08-15 10:40 AM' },
    { parameter: 'Wave Height', value: '1.8m', timestamp: '2024-08-15 10:40 AM' },
  ];

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Real-time Data Feed</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Parameter</th>
            <th className="py-2">Value</th>
            <th className="py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="text-center">
              <td className="py-2">{item.parameter}</td>
              <td className="py-2">{item.value}</td>
              <td className="py-2">{item.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RealTimeDataFeed;
