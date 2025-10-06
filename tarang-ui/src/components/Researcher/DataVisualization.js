
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const DataVisualization = () => {
  const lineChartRef = useRef(null);
  const barChartRef = useRef(null);
  const heatmapRef = useRef(null);

  useEffect(() => {
    // Line Chart
    const lineCtx = lineChartRef.current.getContext('2d');
    new Chart(lineCtx, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Sea Temperature',
            data: [65, 59, 80, 81, 56, 55, 40],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1,
          },
        ],
      },
    });

    // Bar Chart
    const barCtx = barChartRef.current.getContext('2d');
    new Chart(barCtx, {
      type: 'bar',
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024'],
        datasets: [
          {
            label: 'Frequency of Hazards',
            data: [12, 19, 3, 5, 2],
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1,
          },
        ],
      },
    });
  }, []);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="mb-4 text-xl font-semibold">Data Visualization</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-lg font-semibold">Sea Temperature Trends</h3>
          <canvas ref={lineChartRef}></canvas>
        </div>
        <div>
          <h3 className="mb-2 text-lg font-semibold">Frequency of Hazards</h3>
          <canvas ref={barChartRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default DataVisualization;
