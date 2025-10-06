
import React from 'react';
import HazardMap from './HazardMap';
import EducationalContent from './EducationalContent';
import CommunityForum from './CommunityForum';
import HistoricalDataAccess from './HistoricalDataAccess';

const PublicDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold">Public Dashboard</h1>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="col-span-1 md:col-span-2">
          <HazardMap />
        </div>
        <div className="col-span-1">
          <EducationalContent />
        </div>
        <div className="col-span-1">
          <CommunityForum />
        </div>
        <div className="col-span-1 md:col-span-2">
          <HistoricalDataAccess />
        </div>
      </div>
    </div>
  );
};

export default PublicDashboard;
