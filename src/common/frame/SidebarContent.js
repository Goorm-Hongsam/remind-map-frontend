import React from 'react';
import Styles from './SidebarMenu.module.css';
import SearchTap from '../../tap/search/SearchTap';
import RankTap from '../../tap/rank/RankTap';
import FavTap from '../../tap/fav/FavTap';
import GroupTap from '../../tap/group/GroupTap';
import MarkerTap from '../../tap/marker/MarkerTap';
import RouteTap from '../../tap/route/RouteTap';

const SidebarContent = ({ selectedTab, onSearchResults }) => {
  return (
    <div className={Styles.sidebarContent}>
      {selectedTab === '검색' && <SearchTap onSearchResults={onSearchResults} />}
      {selectedTab === '랭킹' && <RankTap />}
      {selectedTab === '찜' && <FavTap />}
      {selectedTab === '그룹' && <GroupTap />}
      {selectedTab === '마커' && <MarkerTap />}
      {selectedTab === '루트' && <RouteTap />}
    </div>
  );
};

export default SidebarContent;
