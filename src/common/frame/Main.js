import React from 'react';
import MainMap from './MainMap';

const Main = ({
  sidebarData,
  selectedLocation,
  searchResults,
  onMarkerSelect,
  enableMarkerCreation,
  setEnableMarkerCreation,
}) => {
  return (
    <div>
      <MainMap
        enableMarkerCreation={enableMarkerCreation}
        searchResults={searchResults}
        onMarkerSelect={onMarkerSelect}
        selectedLocation={selectedLocation}
        sidebarData={sidebarData}
        setEnableMarkerCreation={setEnableMarkerCreation}
      />
    </div>
  );
};

export default Main;
