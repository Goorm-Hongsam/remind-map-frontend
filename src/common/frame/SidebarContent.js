import React from 'react';
import Styles from './SidebarMenu.module.css';
import SearchTap from '../../tap/search/SearchTap';
import RankTap from '../../tap/rank/RankTap';
import FavTap from '../../tap/fav/FavTap';
import GroupTap from '../../tap/group/GroupTap';
import MarkerTap from '../../tap/marker/MarkerTap';
import RouteTap from '../../tap/route/RouteTap';

const SidebarContent = ({
  selectedTab,
  onEnableMarkerCreation,
  onSearchResults,
  selectedMarker,
  onPostClick,
  onDataFromSidebarContent,
}) => {
  const handleDataFromRouteTap = data => {
    onDataFromSidebarContent(data);
  };
  return (
    <div className={Styles.sidebarContent}>
      {selectedTab === '검색' && <SearchTap onSearchResults={onSearchResults} />}
      {selectedTab === '랭킹' && <RankTap />}
      {selectedTab === '찜' && <FavTap />}
      {selectedTab === '그룹' && <GroupTap />}
      {selectedTab === '마커' && (
        <MarkerTap
          onEnableMarkerCreation={onEnableMarkerCreation}
          onSearchResults={onSearchResults}
          selectedMarker={selectedMarker}
          onPostClick={onPostClick}
        />
      )}
      {selectedTab === '루트' && <RouteTap onDataFromRouteTap={handleDataFromRouteTap} />}
    </div>
  );
};

export default SidebarContent;
