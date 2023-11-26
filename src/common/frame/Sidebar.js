import React, { useState } from 'react';
import Styles from './Sidebar.module.css';
import SidebarMenu from './SidebarMenu';
import SidebarContent from './SidebarContent';
import { useNavigate } from 'react-router-dom';
import { seletGroupIdState } from '../../recoil/groupAtoms';
import { useRecoilValue } from 'recoil';

const OpenBtn = ({ handleSidebarToggle, isSidebarOpen }) => {
  return (
    <div>
      <button
        className={`${Styles.openBtn} ${isSidebarOpen ? '' : Styles.close} `}
        onClick={handleSidebarToggle}
      >
        {isSidebarOpen ? '◀' : '▶'}
      </button>
    </div>
  );
};

const Sidebar = ({
  onDataFromSidebar,
  onSearchResults,
  selectedMarker,
  onEnableMarkerCreation,
  onPostClick,
}) => {
  const seletGroupId = useRecoilValue(seletGroupIdState);
  const navigator = useNavigate();
  const [selectedTab, setSelectedTab] = useState('검색');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTabChange = tab => {
    setSelectedTab(tab);

    if (tab === '그룹') {
      console.log('그룹');
      navigator(`/grouptab/all/${seletGroupId}`);
    } else {
      navigator('/');
    }
  };
  const handleDataFromSidebarContent = data => {
    onDataFromSidebar(data);
  };
  return (
    <div>
      <div className={Styles.sidebarContainer}>
        <div className={`${Styles.sidebar} ${isSidebarOpen ? '' : Styles.close} `}>
          <SidebarMenu handleTabChange={handleTabChange} selectedTab={selectedTab} />
          <SidebarContent
            selectedTab={selectedTab}
            onSearchResults={onSearchResults}
            selectedMarker={selectedMarker}
            onEnableMarkerCreation={onEnableMarkerCreation}
            onPostClick={onPostClick}
            onDataFromSidebarContent={handleDataFromSidebarContent}
          />
        </div>
        <OpenBtn handleSidebarToggle={handleSidebarToggle} isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default Sidebar;
