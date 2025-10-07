import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchChartData, fetchHistoricalHazards } from '../utils/api';
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
  const [historicalHazards, setHistoricalHazards] = useState([]);
  const [simulationResult, setSimulationResult] = useState(null);

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

    const getHistorical = async () => {
      try {
        const data = await fetchHistoricalHazards();
        setHistoricalHazards(data);
      } catch (error) {
        console.error('Failed to fetch historical hazards:', error);
      }
    };
    getHistorical();
  }, []);

  return (
    <div className="page-content">
      <div className="page-header">
        <h1>Researcher/Analyst Dashboard</h1>
      </div>
      <div className="dashboard-grid">

        {/* Data Visualization Graphs */}
        <div className="dashboard-card" style={{gridColumn: 'span 2'}}>
          <h2>Data Visualization</h2>
          {chartData ? <Line data={chartData} /> : <p>Loading chart...</p>}
        </div>

        {/* Interactive GIS Map */}
        <div className="dashboard-card" style={{gridColumn: 'span 2'}}>
          <h2>Interactive GIS Map</h2>
          <HazardMap />
        </div>

        {/* Simulation Tools */}
        <div className="dashboard-card">
          <h2>Simulation Tools</h2>
          <form onSubmit={(e) => { e.preventDefault(); setSimulationResult('Simulation complete: High risk detected.'); }}>
            <input type="text" placeholder="Hazard Type" style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', marginBottom: '10px'}} required />
            <input type="text" placeholder="Location" style={{width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '6px', marginBottom: '10px'}} required />
            <button type="submit" style={{width: '100%', backgroundColor: 'var(--primary-color)', color: 'white', padding: '10px', border: 'none', borderRadius: '6px', cursor: 'pointer'}}>Run Simulation</button>
          </form>
          {simulationResult && <p style={{marginTop: '10px', color: '#28a745'}}>{simulationResult}</p>}
        </div>

        {/* Historical Data Access */}
        <div className="dashboard-card">
          <h2>Historical Data</h2>
          {historicalHazards.length > 0 ? (
            <ul>
              {historicalHazards.slice(0, 5).map(hazard => (
                <li key={hazard.id} style={{marginBottom: '10px'}}>
                  <strong>{hazard.type}</strong>: {hazard.description} - {hazard.date}
                </li>
              ))}
            </ul>
          ) : (
            <p>No historical data available.</p>
          )}
        </div>

      </div>
    </div>
  );
};

export default ResearcherDashboard;
