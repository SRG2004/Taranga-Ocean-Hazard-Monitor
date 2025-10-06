
import React from 'react';
import DataVisualization from './DataVisualization';
import InteractiveGISMap from './InteractiveGISMap';
import SimulationTools from './SimulationTools';
import RealTimeDataFeed from './RealTimeDataFeed';
import AlertsNotifications from './AlertsNotifications';
import SavedViewsReports from './SavedViewsReports';

const ResearcherDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">Researcher Dashboard</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <DataVisualization />
        </div>
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <InteractiveGISMap />
        </div>
        <div className="col-span-1">
          <SimulationTools />
        </div>
        <div className="col-span-1">
          <RealTimeDataFeed />
        </div>
        <div className="col-span-1">
          <AlertsNotifications />
        </div>
        <div className="col-span-1">
          <SavedViewsReports />
        </div>
      </div>
    </div>
  );
};

export default ResearcherDashboard;
