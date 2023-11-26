import React, { useEffect, useState } from 'react';
import MarkerModal from './ui_components/MarkerModal';
import SearchInput from '../../common/input/SearchInput';
import styles from './MarkerTap.module.css';
import Posting from './ui_components/Posting';
import GroupSelect from './ui_components/GroupSelect';
import GroupPosting from './ui_components/GroupPosting';
import { instance } from '../../api/customAxios';
import axios from 'axios';

const MarkerTap = ({ onPostClick, onSearchResults, selectedMarker, onEnableMarkerCreation }) => {
  const [place, setPlace] = useState('');
  const [savedSearchResults, setSavedSearchResults] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [enableMarkerCreation, setEnableMarkerCreation] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState([]);
  const [receivedFormData, setReceivedFormData] = useState(null);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  //  /marker/group/{groupId} 그룹을 클릭햇을때 groupId를 받고, 그룹 내 마커 조회 api를 이용하여 GET
  //  /marker/group/{groupId} Modal을 통해서 그룹내 마커 생성 POST
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
  const handleInputChange = e => {
    setPlace(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    searchPlaces();
  };
  const handleMarkerCreation = e => {
    if (!enableMarkerCreation) {
      setEnableMarkerCreation(true);
      onEnableMarkerCreation(true);
    } else {
      setEnableMarkerCreation(false);
      onEnableMarkerCreation(false);
    }
  };
  const handleGroupSelect = group => {
    setSelectedGroup(group);
  };
  const handleGroupIdSelect = group => {
    setSelectedGroupId(group);
  };
  const handlePostClick = marker => {
    onPostClick(marker);
  };
  const hasSearchResults = savedSearchResults.length > 0;

  const handleSearchReset = () => {
    setSavedSearchResults([]);
    setSelectedGroup([]);
  };
  const handleFormData = formData => {
    setReceivedFormData(formData);
  };
  /*
  useEffect(() => {
    if (receivedFormData) {
      instance
        .post(`/marker`, receivedFormData)
        .then(response => {
          console.log('POST request response:', response);
        })
        .catch(error => {
          console.error('POST request error:', error);
        });
    }
  }, [receivedFormData]);
  console.log(receivedFormData);
  */
  return (
    <>
      <div className={styles.markerTap}>
        <GroupSelect onSelect={handleGroupSelect} onGroupId={handleGroupIdSelect} />
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
        </div>
        <div className={styles.createMarker}>
          {hasSearchResults
            ? savedSearchResults.map((result, index) => <Posting key={index} {...result} />)
            : selectedGroup.map((marker, index) => (
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
        </div>
      </div>
      <div>
        {modalVisible && (
          <MarkerModal
            data={selectedMarker}
            groupId={selectedGroupId}
            onClose={closeModal}
            onFormData={handleFormData}
          />
        )}
      </div>
    </>
  );
};

export default MarkerTap;
