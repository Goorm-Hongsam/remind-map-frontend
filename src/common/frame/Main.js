import React from 'react';
import MainMap from './MainMap';

const Main = ({ searchResults }) => {
  return (
    <div>
      <MainMap searchResults={searchResults} />
    </div>
  );
};

export default Main;
