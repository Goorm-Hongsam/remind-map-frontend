import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from 'react';
import './App.css';
import Main from './common/frame/Main';
import Header from './common/frame/Header';
import Sidebar from './common/frame/Sidebar';
import Redirect from './api/Redirect';
import { RecoilRoot } from 'recoil';

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [enableMarkerCreation, setEnableMarkerCreation] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sidebarData, setSidebarData] = useState(null);
  const handleDataFromSidebar = data => {
    setSidebarData(data);
  };
  return (
    <BrowserRouter>
      <RecoilRoot>
        <div className="App">
          <Header />
          <Routes>
            <Route
              path="/"
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
            <Route exact path="/kakao/callback" element={<Redirect />} />
          </Routes>
          {/*<PostingModal />*/}
        </div>
      </RecoilRoot>
    </BrowserRouter>
  );
}

export default App;
