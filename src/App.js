import './App.css';
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './common/frame/Main';
import Header from './common/frame/Header';
import Sidebar from './common/frame/Sidebar';
import Redirect from './api/Redirect';
import GroupHome from './tap/group/GroupHome';
import { useEffect } from 'react';
import useGroup from './hooks/useGroup';
import useFriends from './hooks/useFriends';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [enableMarkerCreation, setEnableMarkerCreation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sidebarData, setSidebarData] = useState(null);
  const { getGroups } = useGroup();
  const { getGroupInvite } = useFriends();
  const handleDataFromSidebar = data => {
    setSidebarData(data);
  };
  useEffect(() => {
    getGroups();
    getGroupInvite();
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Routes>
          <Route
            path="/:tabName?/:type?/:groupId?"
            element={
              <>
                <Main
                  searchResults={searchResults}
                  onMarkerSelect={setSelectedMarker}
                  enableMarkerCreation={enableMarkerCreation}
                  selectedLocation={selectedLocation}
                  sidebarData={sidebarData}
                  setEnableMarkerCreation={setEnableMarkerCreation}
                />
                <Sidebar
                  onSearchResults={setSearchResults}
                  selectedMarker={selectedMarker}
                  onEnableMarkerCreation={setEnableMarkerCreation}
                  onPostClick={setSelectedLocation}
                  onDataFromSidebar={handleDataFromSidebar}
                />
              </>
            }
          />
          <Route path="/group/:type?/:groupId?" element={<GroupHome />} />
          <Route exact path="/kakao/callback" element={<Redirect />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
