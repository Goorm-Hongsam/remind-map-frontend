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
  const [selectedMarker, setSelectedMarker] = useState('');
  const { getGroups } = useGroup();
  const { getGroupInvite } = useFriends();
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
                <Main searchResults={searchResults} onMarkerSelect={setSelectedMarker} />
                <Sidebar onSearchResults={setSearchResults} selectedMarker={selectedMarker} />
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
