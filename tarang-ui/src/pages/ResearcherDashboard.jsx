import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchChartData } from '../utils/api';
import HazardMap from '../components/HazardMap'; // Import the map component
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ResearcherDashboard = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const getChartData = async () => {
      try {
        const data = await fetchChartData();
        setChartData(data);
      } catch (error) {
        console.error('Failed to fetch chart data:', error);
      }
    };
    getChartData();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Researcher/Analyst Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {/* Data Visualization Graphs */}
        <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Data Visualization</h2>
          {chartData ? <Line data={chartData} /> : <p>Loading chart...</p>}
        </div>

        {/* Interactive GIS Map */}
        <div className="bg-white p-4 rounded-lg shadow col-span-1 md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Interactive GIS Map</h2>
          <HazardMap />
        </div>

        {/* Simulation Tools */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Simulation Tools</h2>
          <p>Simulation tools will be here.</p>
        </div>

        {/* Historical Data Access */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-2">Historical Data</h2>
          <p>Historical data access tools will be here.</p>
        </div>

      </div>
    </div>
  );
};

export default ResearcherDashboard;
