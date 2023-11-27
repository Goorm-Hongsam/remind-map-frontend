import React, { useEffect, useState } from 'react';
import MarkerModal from './ui_components/MarkerModal';
import SearchInput from '../../common/input/SearchInput';
import styles from './MarkerTap.module.css';
import Posting from './ui_components/Posting';
import GroupSelect from './ui_components/GroupSelect';
import GroupPosting from './ui_components/GroupPosting';
import Seleter from '../group/components/atom-components/Seleter';

import { instance } from '../../api/customAxios';
import { useRecoilValue } from 'recoil';
import { groupMarkersState, groupState, groupsState } from '../../recoil/groupAtoms';

const MarkerTap = ({ onPostClick, onSearchResults, selectedMarker, onEnableMarkerCreation }) => {
  const [place, setPlace] = useState('');
  const [savedSearchResults, setSavedSearchResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [enableMarkerCreation, setEnableMarkerCreation] = useState(false);
  const [receivedFormData, setReceivedFormData] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState([]);

  //경규
  const group = useRecoilValue(groupState); //하나의 그룹만 갖고 있음
  const groups = useRecoilValue(groupsState); //groups 모든 그룹의 정보 갖고있고,
  const groupMarkers = useRecoilValue(groupMarkersState); //그룹에 포함되어있는 마커

  const test = e => {
    e.preventDefault();
    console.log(group);
    console.log(groups);
    console.log(groupMarkers);
  };

  const searchPlaces = () => {
    if (!place.trim()) {
      alert('검색어를 입력해주세요');
      return;
    }
    const ps = new window.kakao.maps.services.Places();
    ps.keywordSearch(place, (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        onSearchResults(data);
        setSavedSearchResults(data);
      } else {
        alert('검색 결과가 없습니다.');
        setSavedSearchResults([]);
        onSearchResults([]);
      }
    });
  };
  const handleInputChange = e => {
    setPlace(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    searchPlaces();
  };
  // 모달 보여주는 부분
  useEffect(() => {
    if (selectedMarker) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [selectedMarker]);
  const closeModal = () => {
    setModalVisible(false);
  };
  // 마커 클릭부분
  const handleMarkerCreation = e => {
    if (!enableMarkerCreation) {
      setEnableMarkerCreation(true);
      onEnableMarkerCreation(true);
    } else {
      setEnableMarkerCreation(false);
      onEnableMarkerCreation(false);
    }
  };

  const handlePostClick = marker => {
    onPostClick(marker);
  };
  const hasSearchResults = savedSearchResults.length > 0;

  //이부분;
  const handleGroupSelect = async () => {
    setSelectedGroup(group);
    console.log(group.groupId);
    try {
      const response = await instance.get(`/marker/group/${group.groupId}`);
      setSelectedGroup(response.data); // Assuming response.data contains the array of markers
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching group markers:', error);
      // Handle error (e.g., updating state to show an error message to the user)
    }
  };
  //리셋버튼;
  const handleSearchReset = () => {
    setSavedSearchResults([]);
  };
  const handleFormData = formData => {
    setReceivedFormData(formData);
    console.log(formData);
  };
  // selectedGroup -> group.groupId
  return (
    <>
      <div className={styles.markerTap}>
        <GroupSelect
          onSelect={handleGroupSelect}
          /* groups={groups} */
        />
        <Seleter />
        <div className={styles.SearchInputContainer}>
          <form onSubmit={handleSubmit}>
            <SearchInput
              value={place}
              onChange={handleInputChange}
              placeholder="장소를 입력하세요"
              className={styles.searchInput}
            />
          </form>
          <button className={styles.searchReset} onClick={handleSearchReset}>
            리셋
          </button>
          <button onClick={test}>버튼</button>
        </div>
        <div className={styles.createMarker}>
          {hasSearchResults
            ? savedSearchResults.map((result, index) => <Posting key={index} {...result} />)
            : groupMarkers.map((marker, index) => (
                <GroupPosting
                  key={index}
                  latitude={marker.latitude}
                  longitude={marker.longitude}
                  onPostClick={() => handlePostClick(marker)}
                  title={marker.title}
                  date={marker.date}
                  writer={marker.writer}
                />
              ))}
          <div>
            <button onClick={handleMarkerCreation}>마커 생성하기</button>
          </div>
        </div>{' '}
      </div>
      <div>
        {modalVisible && (
          <MarkerModal
            data={selectedMarker}
            groupId={group.groupId}
            onClose={closeModal}
            onFormData={handleFormData}
          />
        )}
      </div>
    </>
  );
};

export default MarkerTap;

/*  
  import { useParams } from 'react-router';
  import { useRecoilValue } from 'recoil';
  import { groupsState, groupState } from '../../recoil/groupAtoms';
  import Selecter from '../group/components/atom-components/Seleter';
  import useGroup from '../../hooks/useGroup';
  const { groupId } = useParams();
  const group = useRecoilValue(groupState);
  const groups = useRecoilValue(groupsState);
  const { getGroup, getGroups } = useGroup();
  console.log('group', group);
  console.log('groupId', group.groupId);
  console.log('useparams', groupId);
  console.log('groups', groups); 
*/
